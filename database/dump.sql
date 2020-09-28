--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.categories ALTER COLUMN "categoryId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."categories_categoryId_seq";
DROP TABLE public.categories;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    "categoryId" integer NOT NULL,
    name text NOT NULL
);


--
-- Name: categories_categoryId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."categories_categoryId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_categoryId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."categories_categoryId_seq" OWNED BY public.categories."categoryId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL,
    "categoryId" integer
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: categories categoryId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN "categoryId" SET DEFAULT nextval('public."categories_categoryId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
1	1	1	2999
2	1	1	2999
3	1	1	2999
4	1	2	2595
5	1	2	2595
6	1	3	2900
7	1	4	999
8	2	1	2999
9	2	1	2999
10	2	2	2595
11	2	1	2999
12	2	1	2999
13	2	2	2595
14	2	3	2900
15	2	1	2999
16	3	1	2999
17	3	3	2900
18	3	5	9900
19	3	2	2595
20	3	1	2999
21	3	1	2999
22	3	2	2595
23	3	1	2999
24	3	1	2999
25	3	1	2999
26	3	3	2900
27	3	1	2999
28	3	1	2999
29	3	3	2900
30	3	1	2999
31	3	2	2595
32	3	1	2999
33	3	1	2999
34	3	1	2999
35	4	1	2999
36	4	2	2595
37	4	1	2999
38	4	3	2900
39	4	3	2900
40	4	1	2999
41	4	1	2999
42	4	1	2999
43	5	1	2999
44	5	2	2595
45	5	3	2900
46	6	1	2999
47	6	2	2595
48	7	1	38500
49	8	6	22000
50	8	6	22000
51	8	7	5000
52	8	7	5000
53	8	7	5000
54	8	8	7000
55	8	1	38500
56	8	7	5000
57	8	11	5999
58	9	11	5999
59	9	1	38500
60	10	6	22000
64	11	1	38500
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-07-29 13:01:06.636329-07
2	2020-07-29 22:34:56.779125-07
3	2020-07-30 16:34:04.592482-07
4	2020-07-30 18:27:02.458971-07
5	2020-07-30 18:48:39.030328-07
6	2020-08-25 15:14:11.913337-07
7	2020-09-15 09:40:37.90583-07
8	2020-09-22 14:13:22.638274-07
9	2020-09-25 16:00:54.298895-07
10	2020-09-28 14:30:43.204313-07
11	2020-09-28 15:05:04.592161-07
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories ("categoryId", name) FROM stdin;
3	striking
4	bjj
5	fitness
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
1	10	JULIUS P OH	00000000000	815 PLAZA DE TIERRA	2020-09-28 14:46:31.936463-07
2	11				2020-09-28 15:09:17.849718-07
3	11	JULIUS P OH	00000000000		2020-09-28 15:10:58.770648-07
4	11	sam song	1234567489123456		2020-09-28 15:11:30.97715-07
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription", "categoryId") FROM stdin;
1	Winning MS-600 White	38500	/images/winning-gloves-white.jpg	Winning® Professional Boxing Gloves, MS-600, 16oz, Lace-up Design, White. Approved by Mayweather.	Hand crafted in Japan. Best quality leather. Anti-thumbing stopper.	3
2	Winning FG-2900 Head Guard FG-2900	27000	/images/winning-headgear-white.jpg	Winning® Boxing Headgear, FG-2900, Face Guard Design, White. Premium light headgear for protection.	Lightweight construction: 270g. Ear protectors. Handcrafted in Japan. Synthetic leather.	3
6	Shoyoroll Competitor 20.8 Kimono White	22000	/images/shoyoroll-white-gi.jpg	Shoyoroll® Kimono. White. Breathable, lightweight and perfect for your everyday training.	Competitor 20.8 Kimono features Lightweight Pearl Weave top and Diamond Ripstop pants. Durable for everyday training, lightweight for competition. Breathable for movement. 	4
7	Ultra Premium Belt 2.0 Black	5000	/images/shoyoroll-black-belt.jpg	Shoyoroll® Premium Belt. Black. Lightweight, durable and sturdiness. 	Our 2020 Ultra Premium Belt 2.0, an upgraded version of our Ultra Premium Belt. This new iteration features our new Flex Core, our new standard code that offers sturdiness and flexibility. Other details include our signature 14 stitches across the length of the belt, white bordered rank bar and custom tonal silk screen print. The screen print reads 'Shoyoroll International' on one side and wise words from Sun Tzu on the other. Our 2020 Ultimate Premium Belt 2.0 will be available in White, Blue, Purple, Brown, and Black. 	4
8	Training Fitted Shorts	7000	/images/shoyoroll-shorts.jpg	Shoyoroll® Training Fitted Shorts. Navy. 4-Way Stretch Fabric. Made in USA.	Our CPTR 20.8 Training shorts is part of our Made in USA technical series, featuring a four-way stretch, slim and tapered cut.	4
9	Muae JSCA "Oniwakamaru" Special Edition	22200	/images/muaewear-gi-new.jpg	Muaewear® Special Edition Gi White. Made in Korea. Premium, limited-edition kimono.	550gsm single weave kimono jacket for sturdiness. 320gsm cotton pant for lightweight and durability. Artwork done by Yakuza Tattoo Artist.	4
10	Original Bar Soap	1500	/images/defense-soap.jpg	Defense Soap® Smooth, rich lather to remove dirt, grime and sweat and rinses clean.	This product was originally created to help wrestlers fight the skin infections associated with their sport. Our original bar soap continues to be our most popular and best-selling soap. Defense Soap’s bars are triple milled, meaning they are made and broken down three different times for consistency and quality. This creates a denser bar soap that lasts longer. The quality of our bar allows for a smooth, thick, and rich lather that collects and traps dirt, ensuring it is transported away from the skin when it is rinsed free. The natural tea tree and eucalyptus oil that we use in our bars provide a spectrum of antimicrobial benefits and promote healthy skin. Our bar soaps are made with all natural ingredients, free from parabens, sulfates, SLS, triclosan, and fragrances. This product is made in the USA.	5
11	Optimum Nutrition 100% Whey	5999	/images/on-whey.jpg	Gold Standard 100% Whey Protein 24g of Whey Protein with Amino Acids for Muscle Recovery and Growth*\nMuscle Building Whey Protein Powder*	Whey protein isolates are the purest form of whey and the main ingredient in Gold Standard 100% Whey™. Each serving provides 24 grams of rapidly digesting whey protein with low levels of fat, cholesterol, lactose and other stuff you can do without making Gold Standard 100% Whey™ the standard all other proteins are measured against.	5
12	Pre-Kaged Pre-Workout	3999	/images/preworkout.jpg	PRE-KAGED Pre-Workout Enhance energy, focus, and blood flow to your body when you need it most to push beyond the point you think you're done.*	Pre-Kaged is a maximum dosed pre-workout to boost your system for a heightened performance from a premium supplement with natural ingredients to deliver 6.5g of L-Citrulline, BCAAs, Leucine, organic Purcaf Caffeine, anitoxidants, and so much more.*	5
3	Mizuno Mid-Cut Type Boxing Shoes White - Navy	42000	/images/mizuno-shoes.jpg	Mizuno® Boxing Shoes  White-Navy. Premium footwear for boxing.	Material: Main body synthetic fiber mesh. Bottom material: Rubber. Weight 300g each. Made in Japan	3
4	Mizuno Sauna Suit, Black	15000	/images/mizuno-sauna-suit.jpg	Mizuno® Sauna Suit  Black. Ideal for weight reduction before competition.	The sauna suit by MIZUNO (Jacket + Pants) isolates body heat effectively to ensure an increased sweating. This sauna effect stimulate the metabolism and keeps your muscles warm. In connection with suitable training and nutrition the Mizuno sauna suit is perfect for weight loss.	3
5	Top King "Snake" Shin Guards (TKSGSS-02)	7800	/images/top-king-shinguards.jpg	Top King® Shin Guards. White/Silver. Designed with extra attention for maximum protection of your lower leg.	Top King Snake Shinguards are perfect for kickboxing and Muay Thai. They are made using genuine leather, with a neoprene lining. The padding consists of high quality latex foam. The rear hook and loop Velcro straps are adjustable. Their strategic placing means they will allow more movement of the calf muscles during training. The top of the shin pads extends high enough to protect the sensitive area below the knee cap. These shinguard are ultra lightweight  and ergonomically engineered. The shin and foot ridge support your leg’s natural shape and movement. Offering superior fit and protection, these shin pads are suitable for stand-up striking training and sparring.	3
13	Re-Kaged Post-Workout	3999	/images/postworkout.jpg	\nA powerful Whey Protein Isolate post-workout to supercharge muscle growth and recovery in the golden hour after training.*	Re-Kaged utlizes ProHydrolase to enhance absorption so your body gets a maximum dose of 28g of WPI protein and a complete amino acid profile including BCAAs, CAAs, NAAs, all 9 Essential Amino Acids, and Creatine HCl to maximize every rep.	5
14	IN-KAGED Intra Workout	2799	/images/intraworkout.jpg	An intra-workout helps extend muscle performance and re-fuel the body through workouts to push harder, longer when training.*	Think of Kaged Muscle's In-Kaged as rocket fuel during a pit stop mid race. As athletes train with high-intensity, amino acids are used to meet energy and performance demands.* Replenish them with BCAAs, Citrulline, Taurine, Tyrosine, and Coconut Water.	5
15	C-HCl CREATINE	1999	/images/creatine.jpg	Creatine HCl drastically increases its solubility in fluid and absorbs better to promote muscle growth and strength gains.*	Kaged Muscle uses the only patented form of Creatine HCl, which costs 3X more than the generic, to give consumers superior ingredients that get to work faster without a loading phase and delivers the results athletes demand.*	5
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 64, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 11, true);


--
-- Name: categories_categoryId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."categories_categoryId_seq"', 5, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 4, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY ("categoryId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

