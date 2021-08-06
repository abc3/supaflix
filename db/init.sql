--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

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
-- Name: items; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.items (
    id bigint NOT NULL,
    title character varying,
    description text,
    created timestamp with time zone DEFAULT now(),
    duration integer
);


ALTER TABLE public.items OWNER TO supabase_admin;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.items ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: TABLE items; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.items TO postgres;
GRANT ALL ON TABLE public.items TO anon;
GRANT ALL ON TABLE public.items TO authenticated;
GRANT ALL ON TABLE public.items TO service_role;


--
-- Name: SEQUENCE items_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.items_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.items_id_seq TO anon;
GRANT ALL ON SEQUENCE public.items_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.items_id_seq TO service_role;


--
-- PostgreSQL database dump complete
--
