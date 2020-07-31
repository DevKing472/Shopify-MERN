require('dotenv/config');
const express = require('express');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const app = express();
app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected!\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "image",
           "name",
           "price",
           "productId",
           "shortDescription"
    from   "products"
  `;

  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/products/:productId', (req, res, next) => {
  // { productId: '1'}
  const id = req.params.productId;
  const params = [id];
  const sql = `
      select *
        from "products"
        where "productId" = $1;
      `;
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        next(new ClientError(`Cannot find product with macthing id ${id}`, 404));
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(error => {
      next(error);
    });
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    res.json([]);
  } else {
    const sql = `
    select "c"."cartItemId",
            "c"."price",
            "p"."productId",
            "p"."image",
            "p"."name",
            "p"."shortDescription"
    from "cartItems" as "c"
    join "products" as "p" using ("productId")
    where "c"."cartId" = $1
    `;
    const params = [req.session.cartId];
    db.query(sql, params)
      .then(response => {
        res.status(200).json(response.rows);
      })
      .catch(err => { next(err); });
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId);
  if (productId > 0) {
    const sql = `
      select "price"
      from "products"
      where "productId" = $1
    `;
    const value = [productId];
    db.query(sql, value)
      .then(response => {
        if (!response.rows.length) {
          throw new ClientError(`Cannot find a product with productId ${productId}`, 400);
        } else if (req.session.cartId) {
          return ({
            price: response.rows[0].price,
            newCartId: req.session.cartId
          });
        } else {
          const sql = `
          insert into "carts" ("cartId", "createdAt")
            values (default, default)
            returning "cartId";
        `;
          return db.query(sql)
            .then(result => {
              const cartPrice = {};
              cartPrice.price = response.rows[0].price;
              cartPrice.newCartId = result.rows[0].cartId;
              return cartPrice;
            });
        }
      })
      .then(response => {
        req.session.cartId = response.newCartId;
        const sql = `
        insert into "cartItems" ("cartId", "productId", "price")
        values ($1, $2, $3)
        returning "cartItemId"
      `;
        const params = [response.newCartId, productId, response.price];
        return db.query(sql, params)
          .then(result => {
            const cartItemId = result.rows[0].cartItemId;
            return cartItemId;
          });
      })
      .then(response => {
        const cartItemId = response;
        const sql = `
      select "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
      where "c"."cartItemId" = $1`;
        const value = [cartItemId];
        return db.query(sql, value)
          .then(response => {
            const cartProduct = response.rows[0];
            res.status(200).json(cartProduct);
          });
      })
      .catch(error => { next(error); });
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
