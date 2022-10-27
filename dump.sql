--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    body text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.followers (
    id integer NOT NULL,
    follower_id integer NOT NULL,
    followed_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: followers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.followers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: followers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.followers_id_seq OWNED BY public.followers.id;


--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: hashtags_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags_posts (
    id integer NOT NULL,
    hashtag_id integer NOT NULL,
    post_id integer NOT NULL
);


--
-- Name: hashtags_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_posts_id_seq OWNED BY public.hashtags_posts.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_url text NOT NULL,
    body text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: reposts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reposts (
    id integer NOT NULL,
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: reposts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reposts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reposts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reposts_id_seq OWNED BY public.reposts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(150) NOT NULL,
    email character varying(200) NOT NULL,
    password text NOT NULL,
    picture_url text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: followers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers ALTER COLUMN id SET DEFAULT nextval('public.followers_id_seq'::regclass);


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: hashtags_posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags_posts ALTER COLUMN id SET DEFAULT nextval('public.hashtags_posts_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: reposts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts ALTER COLUMN id SET DEFAULT nextval('public.reposts_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.comments VALUES (1, 26, 3, 'Muito bacana', '2022-10-25 19:59:36.022536');


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: hashtags_posts; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (2, 1, 'https://linkedin.com', '', '2022-10-19 17:26:56.008615');
INSERT INTO public.posts VALUES (3, 1, 'https://growth.design', 'Muito bom', '2022-10-19 17:27:52.997572');
INSERT INTO public.posts VALUES (26, 5, 'https://facebook.com/', 'kajkjdkadka', '2022-10-23 21:24:15.016415');


--
-- Data for Name: reposts; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 2, 'e28c46ef-5b8a-4d23-ac66-c62a858035d6', true, '2022-10-22 09:53:35.755938');
INSERT INTO public.sessions VALUES (2, 2, '352675ec-ccc1-41a5-a98b-ac347e2b8d99', true, '2022-10-22 10:06:10.957164');
INSERT INTO public.sessions VALUES (3, 2, '621d2cf7-ef87-4ba5-9fa2-4806955d5c5a', true, '2022-10-22 10:17:05.817933');
INSERT INTO public.sessions VALUES (4, 2, '4b747fad-9f89-4ccc-a60b-572f5962a599', true, '2022-10-22 10:20:52.757014');
INSERT INTO public.sessions VALUES (5, 2, '50f79875-1c0d-4408-a6d7-23de85f18f03', true, '2022-10-22 10:22:55.118396');
INSERT INTO public.sessions VALUES (6, 2, 'c664c7ce-732c-4cb5-8ca1-e303ff9ba4e2', true, '2022-10-22 10:26:58.095533');
INSERT INTO public.sessions VALUES (7, 3, '75d87ec2-6d97-4d41-b99d-16be6ec7ae12', true, '2022-10-22 10:30:04.916776');
INSERT INTO public.sessions VALUES (8, 3, '610adcc1-10b8-4c28-a013-fb4e857f4ebf', true, '2022-10-22 10:34:09.614989');
INSERT INTO public.sessions VALUES (9, 3, '618443f3-3d5e-403d-813f-5e01e1086184', true, '2022-10-22 10:36:46.148328');
INSERT INTO public.sessions VALUES (10, 4, '0296309d-fde9-4598-a03c-9f43c6ed9e91', true, '2022-10-22 10:49:34.565521');
INSERT INTO public.sessions VALUES (11, 4, '6d294612-c504-4b53-af35-ac72ccea6512', true, '2022-10-22 10:55:43.096615');
INSERT INTO public.sessions VALUES (12, 3, '71ed340b-2c84-4e2a-9399-1acd9a638902', true, '2022-10-22 11:13:30.101054');
INSERT INTO public.sessions VALUES (13, 3, '61ac8bbb-6cb4-48e6-be74-d6ad4d872d8d', true, '2022-10-22 11:17:09.332784');
INSERT INTO public.sessions VALUES (14, 3, '907fcad8-7537-43e7-bb0d-f59e856cee28', true, '2022-10-22 11:31:24.43033');
INSERT INTO public.sessions VALUES (15, 3, 'e09ffbfd-c3a5-42c3-bb60-ff379c5935ab', true, '2022-10-22 11:38:33.303772');
INSERT INTO public.sessions VALUES (16, 3, 'd989137c-1f8e-44e7-a309-6f14862e3959', true, '2022-10-22 11:53:30.814629');
INSERT INTO public.sessions VALUES (17, 3, '7d8ae3e6-2ee8-4176-8461-faf15b4287d8', true, '2022-10-22 11:58:08.300704');
INSERT INTO public.sessions VALUES (18, 3, 'e7b6933e-3a6e-46af-a6e6-57e815e32aa9', true, '2022-10-22 12:06:02.006732');
INSERT INTO public.sessions VALUES (19, 3, '5bc57da9-c140-40a6-8733-d8cb1d1f4dbb', true, '2022-10-22 12:31:12.247653');
INSERT INTO public.sessions VALUES (20, 3, '5a377a8b-ce7a-4914-93b9-914677d57416', true, '2022-10-22 12:34:06.872898');
INSERT INTO public.sessions VALUES (21, 3, '49b1d47e-a48e-4e3c-a26b-bf0127e680d6', true, '2022-10-22 12:41:25.493348');
INSERT INTO public.sessions VALUES (22, 3, 'f5cd9e43-3ba5-42fa-9c33-fcaff282f651', true, '2022-10-22 12:43:10.228249');
INSERT INTO public.sessions VALUES (23, 3, 'f2ad20a4-68d1-4219-850f-5aee6afc5c87', true, '2022-10-22 12:50:09.074752');
INSERT INTO public.sessions VALUES (24, 3, '20121420-b1c0-4233-a40e-2ee5a934eb59', true, '2022-10-22 13:03:46.385358');
INSERT INTO public.sessions VALUES (25, 3, '3f586e62-f2e3-4b9d-a9ed-17f27cae9cb1', true, '2022-10-22 13:06:17.505597');
INSERT INTO public.sessions VALUES (26, 3, '9e5a6bde-9d8e-481d-9fde-c3eb78ab7de9', true, '2022-10-22 13:09:34.963805');
INSERT INTO public.sessions VALUES (27, 3, '00a173d8-1846-478e-86f1-f42c2d23476e', true, '2022-10-22 13:11:19.014398');
INSERT INTO public.sessions VALUES (28, 3, 'a93d9b75-ebcc-4e7c-89bf-05c792d6e9f4', true, '2022-10-22 13:14:25.17012');
INSERT INTO public.sessions VALUES (29, 3, '22634102-90e9-49f5-b912-b5f03e0a1973', true, '2022-10-22 13:14:52.522796');
INSERT INTO public.sessions VALUES (30, 3, '32938d3f-c9f6-409f-9fc4-0ce95858f0c3', true, '2022-10-22 13:36:14.403034');
INSERT INTO public.sessions VALUES (31, 3, '2868b1cd-cc12-4b89-b88f-87a4bbb4af4b', true, '2022-10-22 13:36:31.07542');
INSERT INTO public.sessions VALUES (32, 3, '26e94238-d788-4b58-a2c1-cad681d69543', true, '2022-10-22 14:00:20.691753');
INSERT INTO public.sessions VALUES (34, 3, '5317cca1-679e-4e8e-a382-0a1a6b846d45', true, '2022-10-22 15:14:03.127666');
INSERT INTO public.sessions VALUES (33, 3, 'ff9d8c5f-8209-4a60-bf88-5a4370c07ecc', false, '2022-10-22 14:39:08.868867');
INSERT INTO public.sessions VALUES (35, 3, '3989cd76-3a06-41d0-b3c3-0707f69c6da6', false, '2022-10-22 19:54:17.639403');
INSERT INTO public.sessions VALUES (36, 3, '4ad3ec69-168b-4665-956f-4dac72aee819', false, '2022-10-22 19:55:07.022351');
INSERT INTO public.sessions VALUES (37, 3, '3bab3cd3-f7f6-4037-943a-9c014868037e', false, '2022-10-22 20:47:34.564998');
INSERT INTO public.sessions VALUES (38, 3, 'c0c0a07f-a4b9-49da-a0cd-27945ff759df', false, '2022-10-22 20:50:13.639274');
INSERT INTO public.sessions VALUES (39, 3, '10fd0acc-1a08-4577-8e7c-2b7b1c85c0af', false, '2022-10-22 21:07:47.376084');
INSERT INTO public.sessions VALUES (40, 3, '9c7e574e-4ebf-4161-a71e-97bd0f1f89d8', false, '2022-10-22 21:09:35.703592');
INSERT INTO public.sessions VALUES (41, 3, '0beec016-f17d-4b5d-bc98-319f656358f6', false, '2022-10-22 21:10:56.022762');
INSERT INTO public.sessions VALUES (42, 3, 'd77de0e1-4271-4fea-8fc1-e131f53cf36e', false, '2022-10-22 21:17:43.971019');
INSERT INTO public.sessions VALUES (43, 3, '0c58f0b2-2567-4307-8f66-325f0357fb25', false, '2022-10-22 21:19:17.196329');
INSERT INTO public.sessions VALUES (44, 3, 'f21964e3-9794-47d4-a774-62d2c315c1b6', false, '2022-10-22 21:26:00.814062');
INSERT INTO public.sessions VALUES (45, 3, '929a6be5-1c3b-413e-a592-754ad59147a0', false, '2022-10-22 21:28:20.950615');
INSERT INTO public.sessions VALUES (46, 3, 'ee6eaed7-5b3c-486d-bd23-5e84a0a6f17a', false, '2022-10-22 21:35:15.596866');
INSERT INTO public.sessions VALUES (47, 3, '737627f9-5e18-4a8d-a822-7dfa307550c3', false, '2022-10-22 21:37:19.615209');
INSERT INTO public.sessions VALUES (48, 3, '04cbf63c-e478-4750-baee-a1842e327c7c', false, '2022-10-23 09:23:14.399508');
INSERT INTO public.sessions VALUES (49, 3, '2b6ef28e-848b-43b7-bbe4-8391574ec5e6', false, '2022-10-23 09:25:26.518597');
INSERT INTO public.sessions VALUES (50, 3, '301821fb-fe68-44a8-aa65-1125bf557738', false, '2022-10-23 09:27:13.890672');
INSERT INTO public.sessions VALUES (51, 3, '8833ad2b-93ba-4b0e-9c46-1fad7b8ec33d', false, '2022-10-23 09:41:28.925444');
INSERT INTO public.sessions VALUES (52, 3, '62da1303-0157-4321-9904-7fb9c221843e', false, '2022-10-23 09:47:44.213221');
INSERT INTO public.sessions VALUES (53, 3, 'dcd3be46-5aaf-4e10-9c23-9866f29c46c4', false, '2022-10-23 09:49:11.49171');
INSERT INTO public.sessions VALUES (54, 3, 'b5fd292b-dc22-472d-97bd-ab3ebc4da137', false, '2022-10-23 09:51:04.150786');
INSERT INTO public.sessions VALUES (55, 3, '0d3fb3a5-b4db-4252-96b5-2ba97f587b00', false, '2022-10-23 09:52:40.742785');
INSERT INTO public.sessions VALUES (56, 3, '65927531-fb4d-401c-93d5-fcec3e7d6c60', false, '2022-10-23 09:55:27.581263');
INSERT INTO public.sessions VALUES (57, 3, '8331ed9b-43a8-4aa8-b271-9868a1235643', false, '2022-10-23 09:59:37.886494');
INSERT INTO public.sessions VALUES (58, 3, 'd24779fd-1f0d-4fc4-9bc9-4310ee38008a', false, '2022-10-23 10:04:40.428598');
INSERT INTO public.sessions VALUES (59, 3, 'e92de75b-9406-43a7-8168-7741ed0a6b05', false, '2022-10-23 10:06:19.948162');
INSERT INTO public.sessions VALUES (60, 3, '6297a67c-c3ea-489e-9d56-dd178729e623', false, '2022-10-23 10:23:32.66727');
INSERT INTO public.sessions VALUES (61, 3, '54af8503-ff85-46fb-a240-6598af660283', false, '2022-10-23 10:32:58.638651');
INSERT INTO public.sessions VALUES (62, 3, 'efa00097-2f2f-412f-bd48-8093ebef13ea', false, '2022-10-23 10:33:12.810966');
INSERT INTO public.sessions VALUES (63, 3, '05d78e69-8efc-4250-bff9-ba419ec05bd0', false, '2022-10-23 10:34:44.591762');
INSERT INTO public.sessions VALUES (64, 3, 'e64b2c78-b31c-412c-a8c8-fc696d9c4c8c', false, '2022-10-23 10:42:17.371666');
INSERT INTO public.sessions VALUES (65, 3, 'bebdd255-a88a-4281-a986-8953929ea20b', false, '2022-10-23 10:50:04.039706');
INSERT INTO public.sessions VALUES (66, 3, 'a53d6a81-7fbe-46a2-8a91-49852f8acae8', false, '2022-10-23 11:02:49.857592');
INSERT INTO public.sessions VALUES (67, 3, '3efa080b-d6ee-45fc-912e-7dc467bb93b1', false, '2022-10-23 11:08:37.936703');
INSERT INTO public.sessions VALUES (68, 3, 'd611faa2-dc60-4595-8094-13ab28a0a65d', false, '2022-10-23 11:28:47.539788');
INSERT INTO public.sessions VALUES (69, 3, 'bd912957-ead8-4dbe-9d04-02d22e65df3d', false, '2022-10-23 11:33:13.776867');
INSERT INTO public.sessions VALUES (70, 3, '1272f2f4-5492-481f-9911-2d1cf3145f76', false, '2022-10-23 11:36:30.51473');
INSERT INTO public.sessions VALUES (71, 3, 'ce3cdb00-a077-40f4-90cb-8259daa6733d', false, '2022-10-23 11:42:16.285371');
INSERT INTO public.sessions VALUES (72, 3, '97ddbb87-0b9c-48b0-bf8e-f5655e7d31d5', false, '2022-10-23 11:57:04.470817');
INSERT INTO public.sessions VALUES (73, 3, '058b719f-91ac-4477-abf9-b1d76c356b39', false, '2022-10-23 11:58:48.383455');
INSERT INTO public.sessions VALUES (74, 3, 'c11ffdbb-88b6-473d-8132-be129c081584', false, '2022-10-23 12:08:30.137282');
INSERT INTO public.sessions VALUES (75, 3, 'c99543d5-3cef-4357-bdb8-5101f293e999', false, '2022-10-23 12:11:46.084433');
INSERT INTO public.sessions VALUES (76, 3, '0ada9109-465f-4ee9-8dd5-5ecf7dbdffdf', false, '2022-10-23 12:34:52.614155');
INSERT INTO public.sessions VALUES (77, 3, '9747285e-e4ce-4a00-bafb-01b48c92171e', false, '2022-10-23 12:46:49.975942');
INSERT INTO public.sessions VALUES (78, 3, '105c7d76-9ee8-45fb-8217-f2481b522467', false, '2022-10-23 12:47:24.016445');
INSERT INTO public.sessions VALUES (79, 3, '74ba2cd5-f435-4981-ac17-84e322a2d3d2', false, '2022-10-23 12:52:26.743358');
INSERT INTO public.sessions VALUES (80, 3, 'e02ae0f6-89a5-4616-852e-7debf7d66c03', false, '2022-10-23 13:14:31.794999');
INSERT INTO public.sessions VALUES (81, 3, 'b5febeff-a2af-4c4a-b381-0c309f6af1dc', false, '2022-10-23 13:15:44.932293');
INSERT INTO public.sessions VALUES (82, 3, '902dc34e-0896-4076-8903-181256cda053', false, '2022-10-23 13:15:57.210694');
INSERT INTO public.sessions VALUES (83, 3, 'e59f15db-bfa6-4553-9902-e80980badccb', false, '2022-10-23 13:28:42.130378');
INSERT INTO public.sessions VALUES (84, 3, '763ca2e8-0ae4-4a40-bdd9-9631a4c6cdd2', false, '2022-10-23 13:32:11.900292');
INSERT INTO public.sessions VALUES (85, 3, 'c053ee12-f521-4503-bd8c-a55983df4f8f', false, '2022-10-23 13:32:38.512863');
INSERT INTO public.sessions VALUES (86, 3, '402ed6c4-feb3-4669-986e-10ec643dddab', false, '2022-10-23 13:42:10.59083');
INSERT INTO public.sessions VALUES (87, 3, '7c23aa8b-9c75-4ec7-86d6-585610014d0e', false, '2022-10-23 13:45:35.587783');
INSERT INTO public.sessions VALUES (88, 3, 'f74f6126-d653-4f05-ba25-96ed4fb4bf7b', false, '2022-10-23 13:47:11.230674');
INSERT INTO public.sessions VALUES (89, 3, 'de06a748-2f4b-42e5-a357-aa72d8a07575', false, '2022-10-23 13:50:57.93746');
INSERT INTO public.sessions VALUES (90, 3, 'd551c6a9-6240-4b82-95f1-24bfb3abac98', false, '2022-10-23 13:52:29.283405');
INSERT INTO public.sessions VALUES (91, 3, '14610a13-a1ff-42cd-88d7-4018c477bcb6', false, '2022-10-23 13:53:47.244582');
INSERT INTO public.sessions VALUES (92, 3, 'ad78a6c4-f191-48d8-b6bb-571f91e85bf8', false, '2022-10-23 13:54:39.66984');
INSERT INTO public.sessions VALUES (93, 3, 'ad44956e-5b2d-4da1-a7a1-4e21577c920f', false, '2022-10-23 13:59:11.221614');
INSERT INTO public.sessions VALUES (94, 3, '32518de1-647e-47e6-ac5d-8223a31ee0d4', false, '2022-10-23 14:00:15.049621');
INSERT INTO public.sessions VALUES (95, 5, '090c567f-4fd3-44c9-b2eb-fad235a51920', false, '2022-10-23 21:09:41.767699');
INSERT INTO public.sessions VALUES (96, 5, '37d9dc90-c321-4be2-b63f-4d823eb0b10f', false, '2022-10-23 21:12:45.369663');
INSERT INTO public.sessions VALUES (97, 5, '180ced31-d9cf-430d-b226-22ab769d94d5', false, '2022-10-23 21:15:08.730597');
INSERT INTO public.sessions VALUES (98, 5, '1d201418-386a-45f2-b896-ac150ee24ffb', false, '2022-10-23 21:22:06.015');
INSERT INTO public.sessions VALUES (99, 5, '99e0fede-ae11-4e50-9541-95ed6fbe43bf', false, '2022-10-23 21:28:13.421383');
INSERT INTO public.sessions VALUES (100, 5, 'a3f2532a-031e-485f-81e0-63081e55a313', false, '2022-10-23 21:34:48.244364');
INSERT INTO public.sessions VALUES (101, 5, '8aceceee-926a-49be-93a9-fb999fbaf9d9', false, '2022-10-23 21:37:37.401213');
INSERT INTO public.sessions VALUES (102, 5, '40ee6f7c-1f79-47d2-8b10-c742021e0848', false, '2022-10-24 10:22:17.5252');
INSERT INTO public.sessions VALUES (103, 5, 'b8b3284d-f2a5-4349-b176-e2e51a933700', false, '2022-10-24 10:28:25.352947');
INSERT INTO public.sessions VALUES (104, 5, '2036b3c2-e16b-43c6-b00a-454cf5158aa0', true, '2022-10-24 10:39:51.137523');
INSERT INTO public.sessions VALUES (105, 5, '4e970079-d5fd-4fa6-aa77-33966ca1ff16', true, '2022-10-24 16:13:07.014036');
INSERT INTO public.sessions VALUES (106, 5, '06780607-6a77-403d-a47e-ee1f3d326ce8', true, '2022-10-26 14:15:09.381466');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'amanda', 'amanda@fiuza.com', '12345678', 'https://naosei.com', '2022-10-19 17:22:24.201471');
INSERT INTO public.users VALUES (2, 'Pikachu', 'pikachu@yago.com', '$2b$10$26Hta2Z3LfXhSBllMtL6d.EIXPO2YnVnc0fRrttlCZfAqxNUz9Jqu', 'https://ne45.com.br/wp-content/uploads/2022/06/Design-sem-nome-2022-06-23T214320.309-560x600.jpg', '2022-10-22 09:53:10.286087');
INSERT INTO public.users VALUES (3, 'T. Galhardo', 'galhardo@thiago.com', '$2b$10$pdVsurZ24xz9CotJ3ccV5OpcySXKCiokW8f5GhHl7BYLYZhcJDn8S', 'https://bolavip.com/__export/1659443489091/sites/bolavip/img/2022/08/02/agif22072820524017_crop1659443488412.jpg_1159711837.jpg', '2022-10-22 10:29:44.28348');
INSERT INTO public.users VALUES (4, 'Usuário Teste', 'usuario@teste.com', '$2b$10$NI7e408WOl48rRU0kfuneOVy2.HFBlQv/0DonU26FFJjalr.CB7KK', 'https://cdn-icons-png.flaticon.com/512/149/149071.png', '2022-10-22 10:49:18.503329');
INSERT INTO public.users VALUES (5, 'onepiece', 'onepiece@yago.com', '$2b$10$CkkCDXmAMIKcG.J8mUPKgeRa2w8U9a9t10GZvfgMqWkjfdUaYVpgC', 'https://classic.exame.com/wp-content/uploads/2022/08/one-piece.jpg?quality=70&strip=info&w=1024', '2022-10-23 21:09:21.743752');


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, true);


--
-- Name: followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.followers_id_seq', 1, false);


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 1, false);


--
-- Name: hashtags_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_posts_id_seq', 1, false);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 7, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 26, true);


--
-- Name: reposts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reposts_id_seq', 1, false);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 106, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: hashtags_posts hashtags_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags_posts
    ADD CONSTRAINT hashtags_posts_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: reposts reposts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: followers followers_followed_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_followed_id_fkey FOREIGN KEY (followed_id) REFERENCES public.users(id);


--
-- Name: followers followers_follower_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.users(id);


--
-- Name: hashtags_posts hashtags_posts_hashtag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags_posts
    ADD CONSTRAINT hashtags_posts_hashtag_id_fkey FOREIGN KEY (hashtag_id) REFERENCES public.hashtags(id);


--
-- Name: hashtags_posts hashtags_posts_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags_posts
    ADD CONSTRAINT hashtags_posts_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: likes likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: likes likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: reposts reposts_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: reposts reposts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

