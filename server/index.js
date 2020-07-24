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
