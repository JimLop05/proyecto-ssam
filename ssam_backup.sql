--
-- PostgreSQL database dump
--

\restrict gwflMCpT6g4coLlbA1QwkIAMqUXEsUjZAWWa4fhCuSsaGhYOax7fgZNmmgghqt7

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2026-10-14 10:57:29

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.unidadtematica DROP CONSTRAINT unidadtematica_id_grado_fkey;
ALTER TABLE ONLY public.unidadtematica DROP CONSTRAINT unidadtematica_id_asig_fkey;
ALTER TABLE ONLY public.ue DROP CONSTRAINT ue_id_distrito_fkey;
ALTER TABLE ONLY public.ue DROP CONSTRAINT ue_id_dir_ue_fkey;
ALTER TABLE ONLY public.trimestre DROP CONSTRAINT trimestre_id_gestion_fkey;
ALTER TABLE ONLY public.subdir_dep DROP CONSTRAINT subdir_dep_id_usuariosd_fkey;
ALTER TABLE ONLY public.semana DROP CONSTRAINT semana_id_trimestre_fkey;
ALTER TABLE ONLY public.respuesta DROP CONSTRAINT respuesta_id_opcion_fkey;
ALTER TABLE ONLY public.respuesta DROP CONSTRAINT respuesta_id_intento_fkey;
ALTER TABLE ONLY public.pregunta DROP CONSTRAINT pregunta_id_item_fkey;
ALTER TABLE ONLY public.planificacion DROP CONSTRAINT planificacion_id_maestro_fkey;
ALTER TABLE ONLY public.planificacion DROP CONSTRAINT planificacion_id_clase_fkey;
ALTER TABLE ONLY public.pertenece DROP CONSTRAINT pertenece_id_usuarioe_fkey;
ALTER TABLE ONLY public.pertenece DROP CONSTRAINT pertenece_id_clase_fkey;
ALTER TABLE ONLY public.opcion DROP CONSTRAINT opcion_id_pregunta_fkey;
ALTER TABLE ONLY public.maestro DROP CONSTRAINT maestro_id_usuariom_fkey;
ALTER TABLE ONLY public.item DROP CONSTRAINT item_id_unid_tem_fkey;
ALTER TABLE ONLY public.intento DROP CONSTRAINT intento_id_unidad_tem_fkey;
ALTER TABLE ONLY public.intento DROP CONSTRAINT intento_id_evaluacion_fkey;
ALTER TABLE ONLY public.gestiona DROP CONSTRAINT gestiona_id_grado_fkey;
ALTER TABLE ONLY public.gestiona DROP CONSTRAINT gestiona_id_asig_fkey;
ALTER TABLE ONLY public.maestro DROP CONSTRAINT fk_maestro_departamento;
ALTER TABLE ONLY public.evaluacion DROP CONSTRAINT evaluacion_id_usuarioe_fkey;
ALTER TABLE ONLY public.evaluacion DROP CONSTRAINT evaluacion_id_clase_fkey;
ALTER TABLE ONLY public.evalua DROP CONSTRAINT evalua_id_unid_tem_fkey;
ALTER TABLE ONLY public.evalua DROP CONSTRAINT evalua_id_evaluacion_fkey;
ALTER TABLE ONLY public.estudiante DROP CONSTRAINT estudiante_id_usuarioe_fkey;
ALTER TABLE ONLY public.esta_formado DROP CONSTRAINT esta_formado_id_semana_fkey;
ALTER TABLE ONLY public.esta_formado DROP CONSTRAINT esta_formado_id_planificacion_fkey;
ALTER TABLE ONLY public.esta_formado DROP CONSTRAINT esta_formado_id_item_fkey;
ALTER TABLE ONLY public.distrito DROP CONSTRAINT distrito_id_dir_dis_fkey;
ALTER TABLE ONLY public.distrito DROP CONSTRAINT distrito_id_departamento_fkey;
ALTER TABLE ONLY public.dir_ue DROP CONSTRAINT dir_ue_id_usuariodu_fkey;
ALTER TABLE ONLY public.dir_dis DROP CONSTRAINT dir_dis_id_usuariodd_fkey;
ALTER TABLE ONLY public.departamento DROP CONSTRAINT departamento_id_usuariosd_fkey;
ALTER TABLE ONLY public.configuracion DROP CONSTRAINT configuracion_id_usuario_fkey;
ALTER TABLE ONLY public.clase DROP CONSTRAINT clase_id_ue_fkey;
ALTER TABLE ONLY public.clase DROP CONSTRAINT clase_id_maestro_fkey;
ALTER TABLE ONLY public.clase DROP CONSTRAINT clase_id_grado_fkey;
ALTER TABLE ONLY public.clase DROP CONSTRAINT clase_id_asig_fkey;
ALTER TABLE ONLY public.auditoria DROP CONSTRAINT auditoria_id_usuario_fkey;
ALTER TABLE ONLY public.asignatura DROP CONSTRAINT asignatura_id_area_fkey;
ALTER TABLE ONLY public.administrador DROP CONSTRAINT administrador_id_usuarioa_fkey;
DROP INDEX public.idx_usuario_username;
DROP INDEX public.idx_usuario_email;
DROP INDEX public.idx_respuesta_intento;
DROP INDEX public.idx_planificacion_clase;
DROP INDEX public.idx_pertenece_clase;
DROP INDEX public.idx_intento_fecha;
DROP INDEX public.idx_intento_evaluacion_unidad;
DROP INDEX public.idx_evaluacion_usuario_clase_fecha;
DROP INDEX public.idx_clase_ue;
DROP INDEX public.idx_clase_maestro;
DROP INDEX public.idx_auditoria_fecha;
ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_username_key;
ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_key;
ALTER TABLE ONLY public.unidadtematica DROP CONSTRAINT unidadtematica_pkey;
ALTER TABLE ONLY public.ue DROP CONSTRAINT ue_pkey;
ALTER TABLE ONLY public.ue DROP CONSTRAINT ue_id_dir_ue_key;
ALTER TABLE ONLY public.ue DROP CONSTRAINT "ue_cÃ³digo_ue_key";
ALTER TABLE ONLY public.trimestre DROP CONSTRAINT trimestre_pkey;
ALTER TABLE ONLY public.trimestre DROP CONSTRAINT trimestre_id_gestion_ordent_key;
ALTER TABLE ONLY public.subdir_dep DROP CONSTRAINT subdir_dep_pkey;
ALTER TABLE ONLY public.semana DROP CONSTRAINT semana_pkey;
ALTER TABLE ONLY public.semana DROP CONSTRAINT semana_id_trimestre_numero_semana_key;
ALTER TABLE ONLY public.respuesta DROP CONSTRAINT respuesta_pkey;
ALTER TABLE ONLY public.pregunta DROP CONSTRAINT pregunta_pkey;
ALTER TABLE ONLY public.planificacion DROP CONSTRAINT planificacion_pkey;
ALTER TABLE ONLY public.pertenece DROP CONSTRAINT pertenece_pkey;
ALTER TABLE ONLY public.opcion DROP CONSTRAINT opcion_pkey;
ALTER TABLE ONLY public.maestro DROP CONSTRAINT maestro_pkey;
ALTER TABLE ONLY public.item DROP CONSTRAINT item_pkey;
ALTER TABLE ONLY public.intento DROP CONSTRAINT intento_pkey;
ALTER TABLE ONLY public.grado DROP CONSTRAINT grado_pkey;
ALTER TABLE ONLY public.grado DROP CONSTRAINT grado_ordeng_key;
ALTER TABLE ONLY public.gestiona DROP CONSTRAINT gestiona_pkey;
ALTER TABLE ONLY public.gestion DROP CONSTRAINT gestion_pkey;
ALTER TABLE ONLY public.gestion DROP CONSTRAINT "gestion_aÃ±o_key";
ALTER TABLE ONLY public.evaluacion DROP CONSTRAINT evaluacion_pkey;
ALTER TABLE ONLY public.evalua DROP CONSTRAINT evalua_pkey;
ALTER TABLE ONLY public.estudiante DROP CONSTRAINT estudiante_pkey;
ALTER TABLE ONLY public.esta_formado DROP CONSTRAINT esta_formado_pkey;
ALTER TABLE ONLY public.distrito DROP CONSTRAINT distrito_pkey;
ALTER TABLE ONLY public.distrito DROP CONSTRAINT distrito_id_dir_dis_key;
ALTER TABLE ONLY public.distrito DROP CONSTRAINT "distrito_cÃ³digo_distrito_key";
ALTER TABLE ONLY public.dir_ue DROP CONSTRAINT dir_ue_pkey;
ALTER TABLE ONLY public.dir_dis DROP CONSTRAINT dir_dis_pkey;
ALTER TABLE ONLY public.departamento DROP CONSTRAINT departamento_pkey;
ALTER TABLE ONLY public.departamento DROP CONSTRAINT departamento_id_usuariosd_key;
ALTER TABLE ONLY public.departamento DROP CONSTRAINT "departamento_cÃ³digo_acceso_key";
ALTER TABLE ONLY public.configuracion DROP CONSTRAINT configuracion_pkey;
ALTER TABLE ONLY public.clase DROP CONSTRAINT clase_pkey;
ALTER TABLE ONLY public.auditoria DROP CONSTRAINT auditoria_pkey;
ALTER TABLE ONLY public.asignatura DROP CONSTRAINT asignatura_pkey;
ALTER TABLE ONLY public.asignatura DROP CONSTRAINT asignatura_codigo_asignatura_key;
ALTER TABLE ONLY public.area DROP CONSTRAINT area_pkey;
ALTER TABLE ONLY public.administrador DROP CONSTRAINT administrador_pkey;
ALTER TABLE public.usuario ALTER COLUMN id_usuario DROP DEFAULT;
ALTER TABLE public.unidadtematica ALTER COLUMN id_unid_tem DROP DEFAULT;
ALTER TABLE public.ue ALTER COLUMN id_ue DROP DEFAULT;
ALTER TABLE public.trimestre ALTER COLUMN id_trimestre DROP DEFAULT;
ALTER TABLE public.semana ALTER COLUMN id_semana DROP DEFAULT;
ALTER TABLE public.pregunta ALTER COLUMN id_pregunta DROP DEFAULT;
ALTER TABLE public.planificacion ALTER COLUMN id_planificacion DROP DEFAULT;
ALTER TABLE public.opcion ALTER COLUMN id_opcion DROP DEFAULT;
ALTER TABLE public.item ALTER COLUMN id_item DROP DEFAULT;
ALTER TABLE public.intento ALTER COLUMN id_intento DROP DEFAULT;
ALTER TABLE public.grado ALTER COLUMN id_grado DROP DEFAULT;
ALTER TABLE public.gestion ALTER COLUMN id_gestion DROP DEFAULT;
ALTER TABLE public.evaluacion ALTER COLUMN id_evaluacion DROP DEFAULT;
ALTER TABLE public.distrito ALTER COLUMN id_distrito DROP DEFAULT;
ALTER TABLE public.departamento ALTER COLUMN id_departamento DROP DEFAULT;
ALTER TABLE public.configuracion ALTER COLUMN id_config DROP DEFAULT;
ALTER TABLE public.clase ALTER COLUMN id_clase DROP DEFAULT;
ALTER TABLE public.auditoria ALTER COLUMN id_auditoria DROP DEFAULT;
ALTER TABLE public.asignatura ALTER COLUMN id_asig DROP DEFAULT;
ALTER TABLE public.area ALTER COLUMN id_area DROP DEFAULT;
DROP VIEW public.usuario_rol;
DROP SEQUENCE public.usuario_id_usuario_seq;
DROP TABLE public.usuario;
DROP SEQUENCE public.unidadtematica_id_unid_tem_seq;
DROP TABLE public.unidadtematica;
DROP SEQUENCE public.ue_id_ue_seq;
DROP TABLE public.ue;
DROP SEQUENCE public.trimestre_id_trimestre_seq;
DROP TABLE public.trimestre;
DROP TABLE public.subdir_dep;
DROP SEQUENCE public.semana_id_semana_seq;
DROP TABLE public.semana;
DROP TABLE public.respuesta;
DROP SEQUENCE public.pregunta_id_pregunta_seq;
DROP TABLE public.pregunta;
DROP SEQUENCE public.planificacion_id_planificacion_seq;
DROP TABLE public.planificacion;
DROP TABLE public.pertenece;
DROP SEQUENCE public.opcion_id_opcion_seq;
DROP TABLE public.opcion;
DROP TABLE public.maestro;
DROP SEQUENCE public.item_id_item_seq;
DROP TABLE public.item;
DROP SEQUENCE public.intento_id_intento_seq;
DROP TABLE public.intento;
DROP SEQUENCE public.grado_id_grado_seq;
DROP TABLE public.grado;
DROP TABLE public.gestiona;
DROP SEQUENCE public.gestion_id_gestion_seq;
DROP TABLE public.gestion;
DROP SEQUENCE public.evaluacion_id_evaluacion_seq;
DROP TABLE public.evaluacion;
DROP TABLE public.evalua;
DROP TABLE public.estudiante;
DROP TABLE public.esta_formado;
DROP SEQUENCE public.distrito_id_distrito_seq;
DROP TABLE public.distrito;
DROP TABLE public.dir_ue;
DROP TABLE public.dir_dis;
DROP SEQUENCE public.departamento_id_departamento_seq;
DROP TABLE public.departamento;
DROP SEQUENCE public.configuracion_id_config_seq;
DROP TABLE public.configuracion;
DROP SEQUENCE public.clase_id_clase_seq;
DROP TABLE public.clase;
DROP SEQUENCE public.auditoria_id_auditoria_seq;
DROP TABLE public.auditoria;
DROP SEQUENCE public.asignatura_id_asig_seq;
DROP TABLE public.asignatura;
DROP SEQUENCE public.area_id_area_seq;
DROP TABLE public.area;
DROP TABLE public.administrador;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 28548)
-- Name: administrador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.administrador (
    id_usuarioa integer NOT NULL,
    telefono character varying(20)
);


ALTER TABLE public.administrador OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 28688)
-- Name: area; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.area (
    id_area integer NOT NULL,
    tituloa text NOT NULL,
    concepto text,
    objetivo text,
    nivel_academico text,
    CONSTRAINT area_nivel_academico_check CHECK ((nivel_academico = 'Educación Secundaria Comunitaria Productiva'::text))
);


ALTER TABLE public.area OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 28687)
-- Name: area_id_area_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.area_id_area_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.area_id_area_seq OWNER TO postgres;

--
-- TOC entry 5299 (class 0 OID 0)
-- Dependencies: 233
-- Name: area_id_area_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.area_id_area_seq OWNED BY public.area.id_area;


--
-- TOC entry 236 (class 1259 OID 28698)
-- Name: asignatura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.asignatura (
    id_asig integer NOT NULL,
    nombrea character varying(50) NOT NULL,
    id_area integer NOT NULL,
    concepto text,
    objetivo text,
    codigo_asignatura character varying(20) NOT NULL
);


ALTER TABLE public.asignatura OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 28697)
-- Name: asignatura_id_asig_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.asignatura_id_asig_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.asignatura_id_asig_seq OWNER TO postgres;

--
-- TOC entry 5300 (class 0 OID 0)
-- Dependencies: 235
-- Name: asignatura_id_asig_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.asignatura_id_asig_seq OWNED BY public.asignatura.id_asig;


--
-- TOC entry 267 (class 1259 OID 29013)
-- Name: auditoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auditoria (
    id_auditoria integer NOT NULL,
    id_usuario integer NOT NULL,
    accion character varying(255) NOT NULL,
    tipo_accion character varying(20),
    detalles text,
    tabla_afectada character varying(50),
    registro_id integer,
    fecha date NOT NULL,
    hora time without time zone NOT NULL,
    ip_origen character varying(45),
    CONSTRAINT auditoria_tipo_accion_check CHECK (((tipo_accion)::text = ANY ((ARRAY['INSERT'::character varying, 'UPDATE'::character varying, 'DELETE'::character varying, 'LOGIN'::character varying, 'LOGOUT'::character varying, 'CONSULTA'::character varying])::text[])))
);


ALTER TABLE public.auditoria OWNER TO postgres;

--
-- TOC entry 266 (class 1259 OID 29012)
-- Name: auditoria_id_auditoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auditoria_id_auditoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auditoria_id_auditoria_seq OWNER TO postgres;

--
-- TOC entry 5301 (class 0 OID 0)
-- Dependencies: 266
-- Name: auditoria_id_auditoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auditoria_id_auditoria_seq OWNED BY public.auditoria.id_auditoria;


--
-- TOC entry 239 (class 1259 OID 28729)
-- Name: clase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clase (
    id_clase integer NOT NULL,
    nombrec character varying(50) NOT NULL,
    numest integer DEFAULT 0,
    password_clase character varying(20) NOT NULL,
    periodo character varying(10) NOT NULL,
    estado_clase character varying(20) DEFAULT 'ACTIVA'::character varying,
    id_ue integer NOT NULL,
    id_grado integer NOT NULL,
    id_maestro integer NOT NULL,
    id_asig integer NOT NULL,
    CONSTRAINT clase_estado_clase_check CHECK (((estado_clase)::text = ANY ((ARRAY['ACTIVA'::character varying, 'CERRADA'::character varying, 'EN_PROGRESO'::character varying])::text[])))
);


ALTER TABLE public.clase OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 28728)
-- Name: clase_id_clase_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clase_id_clase_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clase_id_clase_seq OWNER TO postgres;

--
-- TOC entry 5302 (class 0 OID 0)
-- Dependencies: 238
-- Name: clase_id_clase_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clase_id_clase_seq OWNED BY public.clase.id_clase;


--
-- TOC entry 265 (class 1259 OID 28995)
-- Name: configuracion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.configuracion (
    id_config integer NOT NULL,
    nombre_plataforma character varying(100) DEFAULT 'Sistema de Seguimiento AcadÃ©mico'::character varying NOT NULL,
    logo_url character varying(255),
    vision text,
    mision text,
    leyenda_de_pagina character varying(255),
    fecha_actualizacion timestamp without time zone DEFAULT now(),
    color_primario character varying(7) DEFAULT '#1a73e8'::character varying,
    color_secundario character varying(7) DEFAULT '#ffffff'::character varying,
    url_manual_usuario character varying(255),
    id_usuario integer
);


ALTER TABLE public.configuracion OWNER TO postgres;

--
-- TOC entry 264 (class 1259 OID 28994)
-- Name: configuracion_id_config_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.configuracion_id_config_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.configuracion_id_config_seq OWNER TO postgres;

--
-- TOC entry 5303 (class 0 OID 0)
-- Dependencies: 264
-- Name: configuracion_id_config_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.configuracion_id_config_seq OWNED BY public.configuracion.id_config;


--
-- TOC entry 226 (class 1259 OID 28615)
-- Name: departamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departamento (
    id_departamento integer NOT NULL,
    nombred character varying(50) NOT NULL,
    codigo_acceso character varying(20) NOT NULL,
    id_usuariosd integer,
    codigo_maestro character varying(30) DEFAULT 'N/A'::character varying NOT NULL,
    codigo_distrital character varying(30) DEFAULT 'N/A'::character varying NOT NULL,
    codigo_directorue character varying(30) DEFAULT 'N/A'::character varying NOT NULL,
    num_estd integer DEFAULT 0
);


ALTER TABLE public.departamento OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 28614)
-- Name: departamento_id_departamento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departamento_id_departamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departamento_id_departamento_seq OWNER TO postgres;

--
-- TOC entry 5304 (class 0 OID 0)
-- Dependencies: 225
-- Name: departamento_id_departamento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departamento_id_departamento_seq OWNED BY public.departamento.id_departamento;


--
-- TOC entry 221 (class 1259 OID 28568)
-- Name: dir_dis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dir_dis (
    id_usuariodd integer NOT NULL,
    fecha_ingreso date NOT NULL,
    gestion integer NOT NULL
);


ALTER TABLE public.dir_dis OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 28578)
-- Name: dir_ue; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dir_ue (
    id_usuariodu integer NOT NULL,
    telefono character varying(20)
);


ALTER TABLE public.dir_ue OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 28631)
-- Name: distrito; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.distrito (
    id_distrito integer NOT NULL,
    nombred character varying(50) NOT NULL,
    numue integer DEFAULT 0,
    codigo_distrito character varying(20) NOT NULL,
    id_dir_dis integer,
    id_departamento integer NOT NULL,
    num_estd integer
);


ALTER TABLE public.distrito OWNER TO postgres;

--
-- TOC entry 5305 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN distrito.num_estd; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.distrito.num_estd IS 'Número total de estudiantes en Secundaria Comunitaria Productiva 6°';


--
-- TOC entry 227 (class 1259 OID 28630)
-- Name: distrito_id_distrito_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.distrito_id_distrito_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.distrito_id_distrito_seq OWNER TO postgres;

--
-- TOC entry 5306 (class 0 OID 0)
-- Dependencies: 227
-- Name: distrito_id_distrito_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.distrito_id_distrito_seq OWNED BY public.distrito.id_distrito;


--
-- TOC entry 263 (class 1259 OID 28974)
-- Name: esta_formado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.esta_formado (
    id_planificacion integer NOT NULL,
    id_semana integer NOT NULL,
    id_item integer NOT NULL
);


ALTER TABLE public.esta_formado OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 28599)
-- Name: estudiante; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estudiante (
    id_usuarioe integer NOT NULL,
    fecha_nacimiento date NOT NULL,
    estado character varying(20) DEFAULT 'ACTIVO'::character varying,
    sexo character(1),
    tipo_estudiante character varying(20) DEFAULT 'PUBLICO'::character varying,
    CONSTRAINT estudiante_estado_check CHECK (((estado)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'RETIRADO'::character varying])::text[]))),
    CONSTRAINT estudiante_sexo_check CHECK ((sexo = ANY (ARRAY['M'::bpchar, 'F'::bpchar, 'O'::bpchar]))),
    CONSTRAINT estudiante_tipo_estudiante_check CHECK (((tipo_estudiante)::text = ANY ((ARRAY['PUBLICO'::character varying, 'PRIVADO'::character varying, 'FISCAL'::character varying])::text[])))
);


ALTER TABLE public.estudiante OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 28882)
-- Name: evalua; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evalua (
    id_evaluacion integer NOT NULL,
    id_unid_tem integer NOT NULL,
    nota_alta integer DEFAULT 0,
    nro_intentos integer DEFAULT 0,
    nota_promedio integer DEFAULT 0,
    estado character varying(20) DEFAULT 'NO_INICIADO'::character varying,
    CONSTRAINT evalua_estado_check CHECK (((estado)::text = ANY ((ARRAY['NO_INICIADO'::character varying, 'EN_PROGRESO'::character varying, 'APROBADO'::character varying, 'REPROBADO'::character varying])::text[])))
);


ALTER TABLE public.evalua OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 28841)
-- Name: evaluacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluacion (
    id_evaluacion integer NOT NULL,
    concepto character varying(100) NOT NULL,
    ponderacion integer DEFAULT 0,
    recomendacion text,
    fecha_inicio timestamp without time zone DEFAULT now(),
    estado_nivel character varying(20) DEFAULT 'PENDIENTE'::character varying,
    id_usuarioe integer NOT NULL,
    id_clase integer NOT NULL,
    CONSTRAINT evaluacion_estado_nivel_check CHECK (((estado_nivel)::text = ANY ((ARRAY['PENDIENTE'::character varying, 'EN_PROGRESO'::character varying, 'COMPLETADA'::character varying, 'CERRADA'::character varying])::text[])))
);


ALTER TABLE public.evaluacion OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 28840)
-- Name: evaluacion_id_evaluacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evaluacion_id_evaluacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evaluacion_id_evaluacion_seq OWNER TO postgres;

--
-- TOC entry 5307 (class 0 OID 0)
-- Dependencies: 249
-- Name: evaluacion_id_evaluacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evaluacion_id_evaluacion_seq OWNED BY public.evaluacion.id_evaluacion;


--
-- TOC entry 256 (class 1259 OID 28919)
-- Name: gestion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gestion (
    id_gestion integer NOT NULL,
    anio integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    estado character varying(20) DEFAULT 'ACTIVA'::character varying,
    CONSTRAINT gestion_estado_check CHECK (((estado)::text = ANY ((ARRAY['ACTIVA'::character varying, 'INACTIVA'::character varying])::text[])))
);


ALTER TABLE public.gestion OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 28918)
-- Name: gestion_id_gestion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gestion_id_gestion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gestion_id_gestion_seq OWNER TO postgres;

--
-- TOC entry 5308 (class 0 OID 0)
-- Dependencies: 255
-- Name: gestion_id_gestion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gestion_id_gestion_seq OWNED BY public.gestion.id_gestion;


--
-- TOC entry 237 (class 1259 OID 28713)
-- Name: gestiona; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gestiona (
    id_grado integer NOT NULL,
    id_asig integer NOT NULL
);


ALTER TABLE public.gestiona OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 28679)
-- Name: grado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grado (
    id_grado integer NOT NULL,
    titulog character varying(30) NOT NULL,
    ordeng integer NOT NULL
);


ALTER TABLE public.grado OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 28678)
-- Name: grado_id_grado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.grado_id_grado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.grado_id_grado_seq OWNER TO postgres;

--
-- TOC entry 5309 (class 0 OID 0)
-- Dependencies: 231
-- Name: grado_id_grado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.grado_id_grado_seq OWNED BY public.grado.id_grado;


--
-- TOC entry 252 (class 1259 OID 28864)
-- Name: intento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.intento (
    id_intento integer NOT NULL,
    fecha_intento date NOT NULL,
    hora_intento time without time zone NOT NULL,
    nro_respuestas_correctas integer DEFAULT 0,
    nota_unidad_tematica integer DEFAULT 0,
    id_unidad_tem integer NOT NULL,
    id_evaluacion integer NOT NULL
);


ALTER TABLE public.intento OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 28863)
-- Name: intento_id_intento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.intento_id_intento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.intento_id_intento_seq OWNER TO postgres;

--
-- TOC entry 5310 (class 0 OID 0)
-- Dependencies: 251
-- Name: intento_id_intento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.intento_id_intento_seq OWNED BY public.intento.id_intento;


--
-- TOC entry 244 (class 1259 OID 28795)
-- Name: item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item (
    id_item integer NOT NULL,
    nombreitem character varying(100) NOT NULL,
    id_unid_tem integer NOT NULL
);


ALTER TABLE public.item OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 28794)
-- Name: item_id_item_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_id_item_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.item_id_item_seq OWNER TO postgres;

--
-- TOC entry 5311 (class 0 OID 0)
-- Dependencies: 243
-- Name: item_id_item_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_id_item_seq OWNED BY public.item.id_item;


--
-- TOC entry 223 (class 1259 OID 28588)
-- Name: maestro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.maestro (
    id_usuariom integer NOT NULL,
    especialidad character varying(50) NOT NULL,
    categoria character varying(30) NOT NULL,
    fecha_asignacion date DEFAULT CURRENT_DATE,
    id_departamento integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.maestro OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 28826)
-- Name: opcion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.opcion (
    id_opcion integer NOT NULL,
    texto text NOT NULL,
    imagen character varying(255),
    es_correcta boolean DEFAULT false NOT NULL,
    imagen_retroalimentacion character varying(255),
    texto_retroalimentacion text,
    justificacion text,
    id_pregunta integer NOT NULL
);


ALTER TABLE public.opcion OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 28825)
-- Name: opcion_id_opcion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.opcion_id_opcion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.opcion_id_opcion_seq OWNER TO postgres;

--
-- TOC entry 5312 (class 0 OID 0)
-- Dependencies: 247
-- Name: opcion_id_opcion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.opcion_id_opcion_seq OWNED BY public.opcion.id_opcion;


--
-- TOC entry 240 (class 1259 OID 28758)
-- Name: pertenece; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pertenece (
    id_usuarioe integer NOT NULL,
    id_clase integer NOT NULL,
    fecha_inscripcion_clase timestamp without time zone DEFAULT now(),
    estado_en_clase character varying(20) DEFAULT 'ACTIVO'::character varying,
    CONSTRAINT pertenece_estado_check CHECK (((estado_en_clase)::text = ANY ((ARRAY['ACTIVO'::character varying, 'SUSPENDIDO'::character varying])::text[])))
);


ALTER TABLE public.pertenece OWNER TO postgres;

--
-- TOC entry 262 (class 1259 OID 28958)
-- Name: planificacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planificacion (
    id_planificacion integer NOT NULL,
    anio integer NOT NULL,
    descripcion text,
    fecha_creacion timestamp without time zone DEFAULT now(),
    estado character varying(20) DEFAULT 'BORRADOR'::character varying,
    id_maestro integer NOT NULL,
    id_clase integer,
    CONSTRAINT planificacion_estado_check CHECK (((estado)::text = ANY ((ARRAY['BORRADOR'::character varying, 'PUBLICADO'::character varying, 'ARCHIVADO'::character varying])::text[])))
);


ALTER TABLE public.planificacion OWNER TO postgres;

--
-- TOC entry 261 (class 1259 OID 28957)
-- Name: planificacion_id_planificacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.planificacion_id_planificacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.planificacion_id_planificacion_seq OWNER TO postgres;

--
-- TOC entry 5313 (class 0 OID 0)
-- Dependencies: 261
-- Name: planificacion_id_planificacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.planificacion_id_planificacion_seq OWNED BY public.planificacion.id_planificacion;


--
-- TOC entry 246 (class 1259 OID 28809)
-- Name: pregunta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pregunta (
    id_pregunta integer NOT NULL,
    descripcion text NOT NULL,
    imagen character varying(255),
    dificultad character varying(20),
    tiempo_limite_segundos integer DEFAULT 30,
    palabra_clave character varying(50),
    id_item integer NOT NULL,
    CONSTRAINT pregunta_dificultad_check CHECK (((dificultad)::text = ANY ((ARRAY['BAJA'::character varying, 'MEDIA'::character varying, 'ALTA'::character varying])::text[])))
);


ALTER TABLE public.pregunta OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 28808)
-- Name: pregunta_id_pregunta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pregunta_id_pregunta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pregunta_id_pregunta_seq OWNER TO postgres;

--
-- TOC entry 5314 (class 0 OID 0)
-- Dependencies: 245
-- Name: pregunta_id_pregunta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pregunta_id_pregunta_seq OWNED BY public.pregunta.id_pregunta;


--
-- TOC entry 254 (class 1259 OID 28902)
-- Name: respuesta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.respuesta (
    id_intento integer NOT NULL,
    id_opcion integer NOT NULL,
    es_correcta boolean DEFAULT false NOT NULL
);


ALTER TABLE public.respuesta OWNER TO postgres;

--
-- TOC entry 260 (class 1259 OID 28944)
-- Name: semana; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.semana (
    id_semana integer NOT NULL,
    numero_semana integer NOT NULL,
    dia_inicio date NOT NULL,
    dia_fin date NOT NULL,
    id_trimestre integer NOT NULL,
    observacion character varying(100)
);


ALTER TABLE public.semana OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 28943)
-- Name: semana_id_semana_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.semana_id_semana_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.semana_id_semana_seq OWNER TO postgres;

--
-- TOC entry 5315 (class 0 OID 0)
-- Dependencies: 259
-- Name: semana_id_semana_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.semana_id_semana_seq OWNED BY public.semana.id_semana;


--
-- TOC entry 220 (class 1259 OID 28558)
-- Name: subdir_dep; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subdir_dep (
    id_usuariosd integer NOT NULL
);


ALTER TABLE public.subdir_dep OWNER TO postgres;

--
-- TOC entry 258 (class 1259 OID 28930)
-- Name: trimestre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trimestre (
    id_trimestre integer NOT NULL,
    nombre character varying(30) NOT NULL,
    ordent integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    id_gestion integer NOT NULL
);


ALTER TABLE public.trimestre OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 28929)
-- Name: trimestre_id_trimestre_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trimestre_id_trimestre_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trimestre_id_trimestre_seq OWNER TO postgres;

--
-- TOC entry 5316 (class 0 OID 0)
-- Dependencies: 257
-- Name: trimestre_id_trimestre_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trimestre_id_trimestre_seq OWNED BY public.trimestre.id_trimestre;


--
-- TOC entry 230 (class 1259 OID 28653)
-- Name: ue; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ue (
    id_ue integer NOT NULL,
    nombre character varying(100) NOT NULL,
    num_est integer DEFAULT 0,
    tipo character varying(30),
    codigo_ue character varying(20) NOT NULL,
    direccion text,
    telefonoue character varying(20),
    zona character varying(50),
    id_distrito integer NOT NULL,
    id_dir_ue integer,
    CONSTRAINT ue_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['FISCAL'::character varying, 'PRIVADA'::character varying, 'CONVENIO'::character varying])::text[]))),
    CONSTRAINT ue_zona_check CHECK (((zona)::text = ANY ((ARRAY['URBANA'::character varying, 'PERIURBANA'::character varying, 'RURAL'::character varying])::text[])))
);


ALTER TABLE public.ue OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 28652)
-- Name: ue_id_ue_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ue_id_ue_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ue_id_ue_seq OWNER TO postgres;

--
-- TOC entry 5317 (class 0 OID 0)
-- Dependencies: 229
-- Name: ue_id_ue_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ue_id_ue_seq OWNED BY public.ue.id_ue;


--
-- TOC entry 242 (class 1259 OID 28774)
-- Name: unidadtematica; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unidadtematica (
    id_unid_tem integer NOT NULL,
    nombreut character varying(100) NOT NULL,
    objetivo text,
    id_grado integer NOT NULL,
    id_asig integer NOT NULL
);


ALTER TABLE public.unidadtematica OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 28773)
-- Name: unidadtematica_id_unid_tem_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.unidadtematica_id_unid_tem_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.unidadtematica_id_unid_tem_seq OWNER TO postgres;

--
-- TOC entry 5318 (class 0 OID 0)
-- Dependencies: 241
-- Name: unidadtematica_id_unid_tem_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.unidadtematica_id_unid_tem_seq OWNED BY public.unidadtematica.id_unid_tem;


--
-- TOC entry 218 (class 1259 OID 28533)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    username character varying(50) NOT NULL,
    nombre character varying(50) NOT NULL,
    apellido1 character varying(50) NOT NULL,
    apellido2 character varying(50),
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    estado character varying(20) DEFAULT 'ACTIVO'::character varying,
    fecha_creacion timestamp without time zone DEFAULT now(),
    fecha_ultimo_acceso timestamp without time zone,
    CONSTRAINT usuario_estado_check CHECK (((estado)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'BLOQUEADO'::character varying])::text[])))
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 28532)
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 5319 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;


--
-- TOC entry 268 (class 1259 OID 29378)
-- Name: usuario_rol; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.usuario_rol AS
 SELECT u.id_usuario,
    u.username,
    u.email,
        CASE
            WHEN (a.id_usuarioa IS NOT NULL) THEN 'ADMINISTRADOR'::text
            WHEN (m.id_usuariom IS NOT NULL) THEN 'MAESTRO'::text
            WHEN (e.id_usuarioe IS NOT NULL) THEN 'ESTUDIANTE'::text
            WHEN (du.id_usuariodu IS NOT NULL) THEN 'DIR_UE'::text
            WHEN (dd.id_usuariodd IS NOT NULL) THEN 'DIR_DIS'::text
            WHEN (s.id_usuariosd IS NOT NULL) THEN 'SUBDIR_DEP'::text
            ELSE 'USUARIO'::text
        END AS rol
   FROM ((((((public.usuario u
     LEFT JOIN public.administrador a ON ((u.id_usuario = a.id_usuarioa)))
     LEFT JOIN public.maestro m ON ((u.id_usuario = m.id_usuariom)))
     LEFT JOIN public.estudiante e ON ((u.id_usuario = e.id_usuarioe)))
     LEFT JOIN public.dir_ue du ON ((u.id_usuario = du.id_usuariodu)))
     LEFT JOIN public.dir_dis dd ON ((u.id_usuario = dd.id_usuariodd)))
     LEFT JOIN public.subdir_dep s ON ((u.id_usuario = s.id_usuariosd)));


ALTER VIEW public.usuario_rol OWNER TO postgres;

--
-- TOC entry 4902 (class 2604 OID 28691)
-- Name: area id_area; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.area ALTER COLUMN id_area SET DEFAULT nextval('public.area_id_area_seq'::regclass);


--
-- TOC entry 4903 (class 2604 OID 28701)
-- Name: asignatura id_asig; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignatura ALTER COLUMN id_asig SET DEFAULT nextval('public.asignatura_id_asig_seq'::regclass);


--
-- TOC entry 4939 (class 2604 OID 29016)
-- Name: auditoria id_auditoria; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auditoria ALTER COLUMN id_auditoria SET DEFAULT nextval('public.auditoria_id_auditoria_seq'::regclass);


--
-- TOC entry 4904 (class 2604 OID 28732)
-- Name: clase id_clase; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clase ALTER COLUMN id_clase SET DEFAULT nextval('public.clase_id_clase_seq'::regclass);


--
-- TOC entry 4934 (class 2604 OID 28998)
-- Name: configuracion id_config; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracion ALTER COLUMN id_config SET DEFAULT nextval('public.configuracion_id_config_seq'::regclass);


--
-- TOC entry 4892 (class 2604 OID 28618)
-- Name: departamento id_departamento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento ALTER COLUMN id_departamento SET DEFAULT nextval('public.departamento_id_departamento_seq'::regclass);


--
-- TOC entry 4897 (class 2604 OID 28634)
-- Name: distrito id_distrito; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.distrito ALTER COLUMN id_distrito SET DEFAULT nextval('public.distrito_id_distrito_seq'::regclass);


--
-- TOC entry 4915 (class 2604 OID 28844)
-- Name: evaluacion id_evaluacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion ALTER COLUMN id_evaluacion SET DEFAULT nextval('public.evaluacion_id_evaluacion_seq'::regclass);


--
-- TOC entry 4927 (class 2604 OID 28922)
-- Name: gestion id_gestion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestion ALTER COLUMN id_gestion SET DEFAULT nextval('public.gestion_id_gestion_seq'::regclass);


--
-- TOC entry 4901 (class 2604 OID 28682)
-- Name: grado id_grado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grado ALTER COLUMN id_grado SET DEFAULT nextval('public.grado_id_grado_seq'::regclass);


--
-- TOC entry 4919 (class 2604 OID 28867)
-- Name: intento id_intento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intento ALTER COLUMN id_intento SET DEFAULT nextval('public.intento_id_intento_seq'::regclass);


--
-- TOC entry 4910 (class 2604 OID 28798)
-- Name: item id_item; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item ALTER COLUMN id_item SET DEFAULT nextval('public.item_id_item_seq'::regclass);


--
-- TOC entry 4913 (class 2604 OID 28829)
-- Name: opcion id_opcion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opcion ALTER COLUMN id_opcion SET DEFAULT nextval('public.opcion_id_opcion_seq'::regclass);


--
-- TOC entry 4931 (class 2604 OID 28961)
-- Name: planificacion id_planificacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificacion ALTER COLUMN id_planificacion SET DEFAULT nextval('public.planificacion_id_planificacion_seq'::regclass);


--
-- TOC entry 4911 (class 2604 OID 28812)
-- Name: pregunta id_pregunta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pregunta ALTER COLUMN id_pregunta SET DEFAULT nextval('public.pregunta_id_pregunta_seq'::regclass);


--
-- TOC entry 4930 (class 2604 OID 28947)
-- Name: semana id_semana; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.semana ALTER COLUMN id_semana SET DEFAULT nextval('public.semana_id_semana_seq'::regclass);


--
-- TOC entry 4929 (class 2604 OID 28933)
-- Name: trimestre id_trimestre; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trimestre ALTER COLUMN id_trimestre SET DEFAULT nextval('public.trimestre_id_trimestre_seq'::regclass);


--
-- TOC entry 4899 (class 2604 OID 28656)
-- Name: ue id_ue; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ue ALTER COLUMN id_ue SET DEFAULT nextval('public.ue_id_ue_seq'::regclass);


--
-- TOC entry 4909 (class 2604 OID 28777)
-- Name: unidadtematica id_unid_tem; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidadtematica ALTER COLUMN id_unid_tem SET DEFAULT nextval('public.unidadtematica_id_unid_tem_seq'::regclass);


--
-- TOC entry 4885 (class 2604 OID 28536)
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);


--
-- TOC entry 5245 (class 0 OID 28548)
-- Dependencies: 219
-- Data for Name: administrador; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.administrador VALUES (1, '77777777');


--
-- TOC entry 5260 (class 0 OID 28688)
-- Dependencies: 234
-- Data for Name: area; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.area VALUES (4, 'Ciencia, Tecnología y Producción', NULL, 'Coadyuvar a romper la dependencia económica de un nuevo país intentando adaptar, potenciar y producir tecnologías propias y pertinentes aplicadas a nuestra realidad.', 'Educación Secundaria Comunitaria Productiva');


--
-- TOC entry 5262 (class 0 OID 28698)
-- Dependencies: 236
-- Data for Name: asignatura; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.asignatura VALUES (2, 'Matemática', 4, NULL, NULL, 'ESCPMat001');


--
-- TOC entry 5293 (class 0 OID 29013)
-- Dependencies: 267
-- Data for Name: auditoria; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5265 (class 0 OID 28729)
-- Dependencies: 239
-- Data for Name: clase; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.clase VALUES (3, '6to Rojo', 15, '123456', '2026', 'ACTIVA', 949, 6, 13, 2);
INSERT INTO public.clase VALUES (4, '6to Azul', 15, 'HPBCD8', '2026-A', 'ACTIVA', 949, 6, 13, 2);


--
-- TOC entry 5291 (class 0 OID 28995)
-- Dependencies: 265
-- Data for Name: configuracion; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.configuracion VALUES (2, 'Sistema de Seguimiento y Rendimiento Académico', '/src/assets/LogoSSAM.png', 'Plataforma Educativa al alcance de maestros y estudiantes', 'Facilitar la administración educativa mediante tecnología accesible, eficiente y segura para toda la comunidad educativa.', 'Tu plataforma de gestión académica al alcance de un clic', '2026-08-24 23:48:05.84572', '#8B1A1A', '#F59E0B', '/manuales/manual_usuario_2026.pdf', 1);


--
-- TOC entry 5252 (class 0 OID 28615)
-- Dependencies: 226
-- Data for Name: departamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.departamento VALUES (1, 'La Paz', 'Lp8xK2mZ', 8, 'M-LP-001', 'DIST-LP-01', 'DIR-LP-001', 48021);


--
-- TOC entry 5247 (class 0 OID 28568)
-- Dependencies: 221
-- Data for Name: dir_dis; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.dir_dis VALUES (7, '2024-01-15', 2026);


--
-- TOC entry 5248 (class 0 OID 28578)
-- Dependencies: 222
-- Data for Name: dir_ue; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.dir_ue VALUES (6, '69874521');


--
-- TOC entry 5254 (class 0 OID 28631)
-- Dependencies: 228
-- Data for Name: distrito; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.distrito VALUES (3, 'Achocalla', 21, 'A4R7T1', NULL, 1, 492);
INSERT INTO public.distrito VALUES (4, 'Ancoraimes', 10, 'B6H3N5', NULL, 1, 132);
INSERT INTO public.distrito VALUES (5, 'Apolo', 32, 'C9E1P8', NULL, 1, 267);
INSERT INTO public.distrito VALUES (6, 'Aucapata', 8, 'L5F2Q7', NULL, 1, 66);
INSERT INTO public.distrito VALUES (7, 'Ayata', 11, 'M3X6W4', NULL, 1, 93);
INSERT INTO public.distrito VALUES (8, 'Ayo Ayo', 8, 'N7J4V2', NULL, 1, 104);
INSERT INTO public.distrito VALUES (9, 'Batallas', 13, 'P1Y8R3', NULL, 1, 237);
INSERT INTO public.distrito VALUES (10, 'Cairoma', 11, 'Q4Z6T9', NULL, 1, 137);
INSERT INTO public.distrito VALUES (11, 'Cajuata/ Licoma Pampa (C.Villa Libertad Licom)', 11, 'S2K5M7', NULL, 1, 219);
INSERT INTO public.distrito VALUES (12, 'Calacoto', 11, 'U8B3L1', NULL, 1, 53);
INSERT INTO public.distrito VALUES (13, 'Calamarca', 12, 'W5D9A4', NULL, 1, 170);
INSERT INTO public.distrito VALUES (14, 'Caquiaviri/Nazacara De Pacajes', 11, 'X1F6P2', NULL, 1, 100);
INSERT INTO public.distrito VALUES (15, 'Caranavi', 48, 'Z7H4R8', NULL, 1, 859);
INSERT INTO public.distrito VALUES (16, 'Charaña', 5, 'E3J9T5', NULL, 1, 29);
INSERT INTO public.distrito VALUES (17, 'Chulumani (C. Villa De La Libertad)', 11, 'G5K2M6', NULL, 1, 207);
INSERT INTO public.distrito VALUES (18, 'Chuma', 12, 'R8C1V4', NULL, 1, 109);
INSERT INTO public.distrito VALUES (19, 'Colquencha/ Collana', 6, 'T2F9N7', NULL, 1, 169);
INSERT INTO public.distrito VALUES (20, 'Colquiri', 18, 'Y4P6L3', NULL, 1, 265);
INSERT INTO public.distrito VALUES (21, 'Combaya', 5, 'A7D3B8', NULL, 1, 22);
INSERT INTO public.distrito VALUES (22, 'Comanche', 5, 'C9E5H2', NULL, 1, 40);
INSERT INTO public.distrito VALUES (23, 'Copacabana', 11, 'F1J8R6', NULL, 1, 222);
INSERT INTO public.distrito VALUES (24, 'Coripata', 9, 'K4G2T9', NULL, 1, 296);
INSERT INTO public.distrito VALUES (25, 'Coro Coro/ Waldo Ballivian (A. Tumarapi)', 13, 'M7P5X3', NULL, 1, 125);
INSERT INTO public.distrito VALUES (26, 'Coroico', 10, 'N2Q9L4', NULL, 1, 276);
INSERT INTO public.distrito VALUES (27, 'Desaguadero', 5, 'R5S8F1', NULL, 1, 101);
INSERT INTO public.distrito VALUES (28, 'El Alto 1', 165, 'T6H3P7', NULL, 1, 9794);
INSERT INTO public.distrito VALUES (29, 'El Alto 2', 130, 'W1K4M8', NULL, 1, 7806);
INSERT INTO public.distrito VALUES (30, 'El Alto 3', 62, 'X9D6N2', NULL, 1, 3003);
INSERT INTO public.distrito VALUES (31, 'Gral. Juan J. Perez (Charazani) / Curva', 19, 'Z3V7F5', NULL, 1, 153);
INSERT INTO public.distrito VALUES (32, 'Guanay', 17, 'B8M1C9', NULL, 1, 198);
INSERT INTO public.distrito VALUES (33, 'Guaqui', 5, 'F5P4A7', NULL, 1, 94);
INSERT INTO public.distrito VALUES (34, 'Huarina', 10, 'K2J8Q3', NULL, 1, 137);
INSERT INTO public.distrito VALUES (35, 'Ichoca', 8, 'N7E1L6', NULL, 1, 47);
INSERT INTO public.distrito VALUES (36, 'Inquisivi', 17, 'R4T9M2', NULL, 1, 153);
INSERT INTO public.distrito VALUES (37, 'Irupana (C. Villa De Lanza)', 14, 'W6H3S8', NULL, 1, 202);
INSERT INTO public.distrito VALUES (38, 'Ixiamas', 33, 'A1C5F9', NULL, 1, 161);
INSERT INTO public.distrito VALUES (39, 'Jesus De Machaca', 15, 'D8K2P4', NULL, 1, 135);
INSERT INTO public.distrito VALUES (40, 'La Asunta', 39, 'G6N3R7', NULL, 1, 704);
INSERT INTO public.distrito VALUES (41, 'La Paz 1', 72, 'J9T1M5', NULL, 1, 3516);
INSERT INTO public.distrito VALUES (42, 'La Paz 2', 110, 'L2X8B6', NULL, 1, 6676);
INSERT INTO public.distrito VALUES (43, 'La Paz 3', 68, 'P5E4C9', NULL, 1, 2884);
INSERT INTO public.distrito VALUES (44, 'Laja', 20, 'S7F6K3', NULL, 1, 240);
INSERT INTO public.distrito VALUES (45, 'Luribay', 11, 'V3R9N1', NULL, 1, 122);
INSERT INTO public.distrito VALUES (46, 'Mapiri', 10, 'Y1W4H8', NULL, 1, 239);
INSERT INTO public.distrito VALUES (47, 'Mecapaca', 14, 'B9K2T7', NULL, 1, 226);
INSERT INTO public.distrito VALUES (48, 'Mocomoco', 16, 'C4M8P5', NULL, 1, 163);
INSERT INTO public.distrito VALUES (49, 'Palca', 19, 'F7N3D1', NULL, 1, 320);
INSERT INTO public.distrito VALUES (50, 'Palos Blancos', 23, 'J2R6W9', NULL, 1, 396);
INSERT INTO public.distrito VALUES (51, 'Papel Pampa', 6, 'M5E1V4', NULL, 1, 55);
INSERT INTO public.distrito VALUES (52, 'Patacamaya', 20, 'P8G3L7', NULL, 1, 465);
INSERT INTO public.distrito VALUES (53, 'Pelechuco', 12, 'S1T9K6', NULL, 1, 75);
INSERT INTO public.distrito VALUES (54, 'Pucarani', 24, 'W4C7F2', NULL, 1, 465);
INSERT INTO public.distrito VALUES (55, 'Puerto Acosta', 23, 'X9H5N8', NULL, 1, 229);
INSERT INTO public.distrito VALUES (56, 'Puerto Carabuco', 14, 'Z2M6P1', NULL, 1, 150);
INSERT INTO public.distrito VALUES (57, 'Puerto Perez', 6, 'D6R3Q4', NULL, 1, 71);
INSERT INTO public.distrito VALUES (58, 'Quime', 5, 'G8E1N9', NULL, 1, 94);
INSERT INTO public.distrito VALUES (59, 'San Andres De Machaca', 9, 'K4T7F2', NULL, 1, 54);
INSERT INTO public.distrito VALUES (60, 'San Buenaventura', 9, 'N1P6R8', NULL, 1, 151);
INSERT INTO public.distrito VALUES (61, 'San Pedro De Curahuara/ Chacarilla', 10, 'Q9D2M3', NULL, 1, 77);
INSERT INTO public.distrito VALUES (62, 'San Pedro De Tiquina/Tito Yupanqui (Parquipuj)', 7, 'S5V8K1', NULL, 1, 81);
INSERT INTO public.distrito VALUES (63, 'Santiago De Callapa (C. Callapa)', 7, 'W2X9F5', NULL, 1, 46);
INSERT INTO public.distrito VALUES (64, 'Santiago De Machaca/Catacora', 7, 'Y7J4N3', NULL, 1, 56);
INSERT INTO public.distrito VALUES (65, 'Sapahaqui', 10, 'A3C8T6', NULL, 1, 133);
INSERT INTO public.distrito VALUES (66, 'Sica Sica (C. Villa Aroma)', 20, 'E9P1B7', NULL, 1, 307);
INSERT INTO public.distrito VALUES (67, 'Sorata', 15, 'H6M4Q2', NULL, 1, 250);
INSERT INTO public.distrito VALUES (68, 'Tacacoma/ Quiabaya', 9, 'R2N8D5', NULL, 1, 106);
INSERT INTO public.distrito VALUES (69, 'Teoponte', 8, 'V5F3K9', NULL, 1, 108);
INSERT INTO public.distrito VALUES (70, 'Tiawanacu', 13, 'X1H7C4', NULL, 1, 235);
INSERT INTO public.distrito VALUES (71, 'Tipuani', 6, 'Z8G2P6', NULL, 1, 110);
INSERT INTO public.distrito VALUES (72, 'Umala', 7, 'B4M9E1', NULL, 1, 103);
INSERT INTO public.distrito VALUES (73, 'Viacha', 44, 'F7C3N8', NULL, 1, 1580);
INSERT INTO public.distrito VALUES (74, 'Yaco/ Malla', 10, 'K2R5J6', NULL, 1, 121);
INSERT INTO public.distrito VALUES (75, 'Yanacachi', 5, 'P9T1D4', NULL, 1, 75);
INSERT INTO public.distrito VALUES (2, 'Achacachi', 36, 'D8K2M9', NULL, 1, 622);


--
-- TOC entry 5289 (class 0 OID 28974)
-- Dependencies: 263
-- Data for Name: esta_formado; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.esta_formado VALUES (5, 1, 37);
INSERT INTO public.esta_formado VALUES (5, 2, 38);
INSERT INTO public.esta_formado VALUES (5, 3, 39);
INSERT INTO public.esta_formado VALUES (5, 4, 40);
INSERT INTO public.esta_formado VALUES (5, 5, 41);
INSERT INTO public.esta_formado VALUES (5, 6, 51);
INSERT INTO public.esta_formado VALUES (5, 7, 52);
INSERT INTO public.esta_formado VALUES (5, 8, 53);
INSERT INTO public.esta_formado VALUES (5, 9, 54);
INSERT INTO public.esta_formado VALUES (5, 10, 55);
INSERT INTO public.esta_formado VALUES (5, 11, 56);
INSERT INTO public.esta_formado VALUES (3, 1, 84);
INSERT INTO public.esta_formado VALUES (3, 2, 85);
INSERT INTO public.esta_formado VALUES (3, 3, 86);
INSERT INTO public.esta_formado VALUES (3, 4, 87);
INSERT INTO public.esta_formado VALUES (3, 4, 88);
INSERT INTO public.esta_formado VALUES (3, 15, 89);
INSERT INTO public.esta_formado VALUES (3, 15, 90);
INSERT INTO public.esta_formado VALUES (3, 16, 91);
INSERT INTO public.esta_formado VALUES (3, 17, 91);
INSERT INTO public.esta_formado VALUES (5, 12, 75);
INSERT INTO public.esta_formado VALUES (5, 13, 76);
INSERT INTO public.esta_formado VALUES (5, 14, 77);
INSERT INTO public.esta_formado VALUES (5, 15, 84);
INSERT INTO public.esta_formado VALUES (4, 1, 84);
INSERT INTO public.esta_formado VALUES (4, 2, 85);
INSERT INTO public.esta_formado VALUES (4, 3, 85);
INSERT INTO public.esta_formado VALUES (4, 4, 86);
INSERT INTO public.esta_formado VALUES (4, 5, 87);
INSERT INTO public.esta_formado VALUES (4, 5, 88);
INSERT INTO public.esta_formado VALUES (4, 6, 89);
INSERT INTO public.esta_formado VALUES (4, 7, 90);
INSERT INTO public.esta_formado VALUES (4, 8, 90);
INSERT INTO public.esta_formado VALUES (4, 9, 91);
INSERT INTO public.esta_formado VALUES (4, 10, 92);
INSERT INTO public.esta_formado VALUES (4, 10, 93);
INSERT INTO public.esta_formado VALUES (4, 11, 94);
INSERT INTO public.esta_formado VALUES (4, 12, 95);
INSERT INTO public.esta_formado VALUES (4, 13, 96);
INSERT INTO public.esta_formado VALUES (4, 14, 96);
INSERT INTO public.esta_formado VALUES (4, 15, 97);
INSERT INTO public.esta_formado VALUES (4, 16, 98);
INSERT INTO public.esta_formado VALUES (4, 17, 99);
INSERT INTO public.esta_formado VALUES (4, 18, 100);
INSERT INTO public.esta_formado VALUES (4, 19, 101);
INSERT INTO public.esta_formado VALUES (4, 20, 102);
INSERT INTO public.esta_formado VALUES (4, 21, 103);
INSERT INTO public.esta_formado VALUES (4, 22, 104);
INSERT INTO public.esta_formado VALUES (4, 23, 105);
INSERT INTO public.esta_formado VALUES (4, 24, 106);
INSERT INTO public.esta_formado VALUES (4, 25, 107);
INSERT INTO public.esta_formado VALUES (4, 26, 108);
INSERT INTO public.esta_formado VALUES (4, 27, 109);
INSERT INTO public.esta_formado VALUES (4, 28, 110);
INSERT INTO public.esta_formado VALUES (4, 29, 110);
INSERT INTO public.esta_formado VALUES (4, 30, 111);
INSERT INTO public.esta_formado VALUES (4, 31, 111);
INSERT INTO public.esta_formado VALUES (4, 32, 112);
INSERT INTO public.esta_formado VALUES (4, 33, 112);
INSERT INTO public.esta_formado VALUES (4, 34, 113);
INSERT INTO public.esta_formado VALUES (5, 16, 85);
INSERT INTO public.esta_formado VALUES (5, 17, 85);
INSERT INTO public.esta_formado VALUES (5, 18, 86);
INSERT INTO public.esta_formado VALUES (5, 19, 87);
INSERT INTO public.esta_formado VALUES (5, 20, 88);
INSERT INTO public.esta_formado VALUES (5, 21, 89);
INSERT INTO public.esta_formado VALUES (5, 22, 90);
INSERT INTO public.esta_formado VALUES (5, 23, 91);
INSERT INTO public.esta_formado VALUES (5, 24, 92);
INSERT INTO public.esta_formado VALUES (5, 24, 93);
INSERT INTO public.esta_formado VALUES (5, 24, 94);
INSERT INTO public.esta_formado VALUES (5, 25, 95);
INSERT INTO public.esta_formado VALUES (5, 26, 96);
INSERT INTO public.esta_formado VALUES (5, 27, 97);
INSERT INTO public.esta_formado VALUES (5, 28, 98);
INSERT INTO public.esta_formado VALUES (5, 29, 99);
INSERT INTO public.esta_formado VALUES (5, 30, 100);
INSERT INTO public.esta_formado VALUES (5, 31, 101);
INSERT INTO public.esta_formado VALUES (5, 32, 102);
INSERT INTO public.esta_formado VALUES (5, 33, 103);
INSERT INTO public.esta_formado VALUES (5, 34, 114);
INSERT INTO public.esta_formado VALUES (5, 35, 115);
INSERT INTO public.esta_formado VALUES (5, 36, 116);
INSERT INTO public.esta_formado VALUES (5, 37, 117);
INSERT INTO public.esta_formado VALUES (5, 38, 118);
INSERT INTO public.esta_formado VALUES (5, 39, 119);
INSERT INTO public.esta_formado VALUES (5, 40, 120);
INSERT INTO public.esta_formado VALUES (5, 41, 121);
INSERT INTO public.esta_formado VALUES (5, 42, 122);
INSERT INTO public.esta_formado VALUES (5, 43, 122);
INSERT INTO public.esta_formado VALUES (5, 44, 123);
INSERT INTO public.esta_formado VALUES (5, 45, 124);
INSERT INTO public.esta_formado VALUES (4, 35, 113);
INSERT INTO public.esta_formado VALUES (4, 36, 114);
INSERT INTO public.esta_formado VALUES (4, 37, 115);
INSERT INTO public.esta_formado VALUES (4, 38, 116);
INSERT INTO public.esta_formado VALUES (4, 39, 117);
INSERT INTO public.esta_formado VALUES (4, 40, 118);
INSERT INTO public.esta_formado VALUES (4, 41, 119);
INSERT INTO public.esta_formado VALUES (4, 42, 120);
INSERT INTO public.esta_formado VALUES (4, 43, 121);
INSERT INTO public.esta_formado VALUES (4, 44, 122);
INSERT INTO public.esta_formado VALUES (4, 45, 123);


--
-- TOC entry 5250 (class 0 OID 28599)
-- Dependencies: 224
-- Data for Name: estudiante; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.estudiante VALUES (4, '2008-05-15', 'ACTIVO', 'F', 'PUBLICO');
INSERT INTO public.estudiante VALUES (5, '2007-11-20', 'ACTIVO', 'M', 'FISCAL');
INSERT INTO public.estudiante VALUES (9, '2000-01-01', 'ACTIVO', 'M', 'PUBLICO');
INSERT INTO public.estudiante VALUES (14, '2000-01-01', 'ACTIVO', 'M', 'PUBLICO');
INSERT INTO public.estudiante VALUES (15, '2000-01-01', 'ACTIVO', 'M', 'PUBLICO');
INSERT INTO public.estudiante VALUES (16, '2000-01-01', 'ACTIVO', 'M', 'PUBLICO');


--
-- TOC entry 5279 (class 0 OID 28882)
-- Dependencies: 253
-- Data for Name: evalua; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.evalua VALUES (1, 23, 60, 1, 60, 'EN_PROGRESO');
INSERT INTO public.evalua VALUES (1, 25, 80, 1, 80, 'EN_PROGRESO');
INSERT INTO public.evalua VALUES (1, 28, 90, 2, 60, 'APROBADO');
INSERT INTO public.evalua VALUES (1, 26, 50, 1, 50, 'EN_PROGRESO');
INSERT INTO public.evalua VALUES (1, 27, 90, 1, 90, 'EN_PROGRESO');
INSERT INTO public.evalua VALUES (1, 24, 40, 1, 40, 'EN_PROGRESO');
INSERT INTO public.evalua VALUES (2, 25, 30, 1, 30, 'EN_PROGRESO');
INSERT INTO public.evalua VALUES (1, 22, 80, 11, 47, 'REPROBADO');


--
-- TOC entry 5276 (class 0 OID 28841)
-- Dependencies: 250
-- Data for Name: evaluacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.evaluacion VALUES (1, 'Evaluación de 6to Rojo', NULL, NULL, '2026-09-14 19:15:42.563893', 'EN_PROGRESO', 4, 3);
INSERT INTO public.evaluacion VALUES (2, 'Evaluación de 6to Rojo', NULL, NULL, '2026-10-02 15:45:20.018264', 'EN_PROGRESO', 14, 3);


--
-- TOC entry 5282 (class 0 OID 28919)
-- Dependencies: 256
-- Data for Name: gestion; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.gestion VALUES (4, 2026, '2026-02-02', '2026-12-02', 'ACTIVA');
INSERT INTO public.gestion VALUES (5, 2027, '2026-02-02', '2026-12-02', 'INACTIVA');
INSERT INTO public.gestion VALUES (6, 2028, '2026-02-02', '2026-12-02', 'INACTIVA');


--
-- TOC entry 5263 (class 0 OID 28713)
-- Dependencies: 237
-- Data for Name: gestiona; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.gestiona VALUES (6, 2);


--
-- TOC entry 5258 (class 0 OID 28679)
-- Dependencies: 232
-- Data for Name: grado; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.grado VALUES (1, 'Primero de Secundaria', 1);
INSERT INTO public.grado VALUES (2, 'Segundo de Secundaria', 2);
INSERT INTO public.grado VALUES (3, 'Tercero de Secundaria', 3);
INSERT INTO public.grado VALUES (4, 'Cuarto de Secundaria', 4);
INSERT INTO public.grado VALUES (5, 'Quinto de Secundaria', 5);
INSERT INTO public.grado VALUES (6, 'Sexto de Secundaria', 6);


--
-- TOC entry 5278 (class 0 OID 28864)
-- Dependencies: 252
-- Data for Name: intento; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.intento VALUES (1, '2026-09-14', '19:21:46.852982', 0, 0, 22, 1);
INSERT INTO public.intento VALUES (2, '2026-09-14', '19:25:32.810967', 0, 0, 22, 1);
INSERT INTO public.intento VALUES (3, '2026-09-14', '19:25:41.884327', 0, 0, 22, 1);
INSERT INTO public.intento VALUES (4, '2026-09-14', '19:33:51.497413', 1, 10, 22, 1);
INSERT INTO public.intento VALUES (5, '2026-09-14', '19:38:10.209498', 8, 80, 22, 1);
INSERT INTO public.intento VALUES (6, '2026-09-14', '19:39:02.455383', 0, 0, 22, 1);
INSERT INTO public.intento VALUES (7, '2026-09-14', '20:08:03.396415', 1, 10, 22, 1);
INSERT INTO public.intento VALUES (8, '2026-09-14', '20:20:21.100933', 3, 30, 22, 1);
INSERT INTO public.intento VALUES (9, '2026-09-14', '20:22:31.447346', 6, 60, 23, 1);
INSERT INTO public.intento VALUES (10, '2026-09-14', '21:16:13.825096', 3, 30, 28, 1);
INSERT INTO public.intento VALUES (11, '2026-09-14', '21:36:41.055806', 1, 10, 22, 1);
INSERT INTO public.intento VALUES (12, '2026-09-14', '23:33:20.131619', 8, 80, 25, 1);
INSERT INTO public.intento VALUES (13, '2026-09-14', '23:36:49.304782', 9, 90, 28, 1);
INSERT INTO public.intento VALUES (14, '2026-09-15', '16:48:20.790027', 5, 50, 26, 1);
INSERT INTO public.intento VALUES (15, '2026-09-15', '17:03:59.908089', 9, 90, 27, 1);
INSERT INTO public.intento VALUES (16, '2026-09-30', '15:29:33.167272', 4, 40, 24, 1);
INSERT INTO public.intento VALUES (17, '2026-09-30', '16:14:49.518845', 8, 80, 22, 1);
INSERT INTO public.intento VALUES (18, '2026-10-02', '15:46:30.621528', 3, 30, 25, 2);
INSERT INTO public.intento VALUES (19, '2026-10-06', '11:53:09.750218', 5, 50, 22, 1);


--
-- TOC entry 5270 (class 0 OID 28795)
-- Dependencies: 244
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.item VALUES (1, 'Ecuaciones lineales', 2);
INSERT INTO public.item VALUES (2, 'Resolución de problemas aplicados al contexto y la tecnología', 2);
INSERT INTO public.item VALUES (3, 'Sistemas de ecuaciones de primer grado con dos incógnitas. Métodos de resolución', 3);
INSERT INTO public.item VALUES (4, 'Sistemas de ecuaciones de primer grado con tres incógnitas. Método de resolución', 3);
INSERT INTO public.item VALUES (5, 'El conjunto de los números complejos, unidad Imaginaria y sus propiedades', 4);
INSERT INTO public.item VALUES (6, 'Potencias de la unidad imaginaria', 4);
INSERT INTO public.item VALUES (7, 'Números complejos y su representación gráfica', 4);
INSERT INTO public.item VALUES (8, 'Expresión binómica de los números complejos. Propiedades', 4);
INSERT INTO public.item VALUES (9, 'Operaciones (adición, sustracción, multiplicación y división)', 4);
INSERT INTO public.item VALUES (10, 'Función cuadrática y sus características', 5);
INSERT INTO public.item VALUES (11, 'Métodos de resolución de una ecuación cuadrática', 5);
INSERT INTO public.item VALUES (12, 'Análisis de la discriminante, soluciones imaginarias y propiedades', 5);
INSERT INTO public.item VALUES (13, 'Propiedades de las raíces de una ecuación cuadrática', 5);
INSERT INTO public.item VALUES (14, 'Sistemas de ecuaciones de segundo grado', 5);
INSERT INTO public.item VALUES (15, 'Desigualdad e inecuación, intervalo real y representación gráfica de los intervalos', 6);
INSERT INTO public.item VALUES (16, 'Inecuaciones lineales de una variable', 6);
INSERT INTO public.item VALUES (17, 'Inecuaciones con valor absoluto', 6);
INSERT INTO public.item VALUES (18, 'Inecuaciones cuadráticas y de grado superior', 6);
INSERT INTO public.item VALUES (19, 'Inecuaciones lineales de dos variables', 6);
INSERT INTO public.item VALUES (20, 'Sistema de inecuaciones', 6);
INSERT INTO public.item VALUES (21, 'Propiedades de logaritmos', 7);
INSERT INTO public.item VALUES (22, 'Función logarítmica. Ecuaciones logarítmicas', 7);
INSERT INTO public.item VALUES (23, 'Propiedades de los exponentes', 7);
INSERT INTO public.item VALUES (24, 'Función exponencial. Ecuaciones exponenciales', 7);
INSERT INTO public.item VALUES (25, 'Sistemas de ecuaciones logarítmicas y exponenciales', 7);
INSERT INTO public.item VALUES (26, 'Sucesiones numéricas, sucesión de Fibonacci', 8);
INSERT INTO public.item VALUES (27, 'Sumatorias y sus propiedades', 8);
INSERT INTO public.item VALUES (28, 'Progresiones aritméticas', 8);
INSERT INTO public.item VALUES (29, 'Progresiones geométricas', 8);
INSERT INTO public.item VALUES (30, 'Progresiones armónicas', 8);
INSERT INTO public.item VALUES (31, 'Suma en una sucesión geométrica - infinita decreciente', 8);
INSERT INTO public.item VALUES (32, 'Importancia de la matemática financiera, valor del dinero en el tiempo', 9);
INSERT INTO public.item VALUES (33, 'Interés simple y tasa de interés', 9);
INSERT INTO public.item VALUES (34, 'Tasa, tiempo, capital, valor, valor final, valor actual y descuentos a interés simple', 9);
INSERT INTO public.item VALUES (35, 'Interés compuesto en actividades financieras', 9);
INSERT INTO public.item VALUES (36, 'Créditos, inversiones y utilidades. Emprendimientos productivos', 9);
INSERT INTO public.item VALUES (37, 'Proposiciones simples y compuestas, notaciones y conectivos lógicos', 10);
INSERT INTO public.item VALUES (38, 'Operaciones proposicionales. Tablas de valor de verdad', 10);
INSERT INTO public.item VALUES (39, 'Clasificación de fórmulas proposicionales (tautología, Contradicción y Contingencia)', 10);
INSERT INTO public.item VALUES (40, 'Equivalencia lógica', 10);
INSERT INTO public.item VALUES (41, 'Álgebra de proposiciones', 10);
INSERT INTO public.item VALUES (42, 'GeoGebra y graficador de ecuaciones y finanzas', 11);
INSERT INTO public.item VALUES (43, 'Taller de pensamiento lógico. Ajedrez I, Sudoku, Cubo Rubik', 11);
INSERT INTO public.item VALUES (44, 'Progresiones y sucesiones', 12);
INSERT INTO public.item VALUES (45, 'Resolución de problemas aplicados al contexto y la tecnología', 12);
INSERT INTO public.item VALUES (46, 'Principios básicos de conteo, factorial de un número natural y sus propiedades', 13);
INSERT INTO public.item VALUES (47, 'Permutaciones simples y permutaciones con repetición', 13);
INSERT INTO public.item VALUES (48, 'Variaciones simples y variaciones con repetición', 13);
INSERT INTO public.item VALUES (49, 'Combinaciones simples', 13);
INSERT INTO public.item VALUES (50, 'Números combinatorios. Binomio de Newton', 13);
INSERT INTO public.item VALUES (51, 'Definiciones, organización de datos y tipos de variable', 14);
INSERT INTO public.item VALUES (52, 'Tablas de frecuencia y gráficos estadísticos', 14);
INSERT INTO public.item VALUES (53, 'Medidas de tendencia central', 14);
INSERT INTO public.item VALUES (54, 'Cuartiles, deciles y percentiles', 14);
INSERT INTO public.item VALUES (55, 'Medidas de dispersión', 14);
INSERT INTO public.item VALUES (56, 'Ajuste de curvas y regresión lineal. Representación gráfica e interpretación', 14);
INSERT INTO public.item VALUES (57, 'Definición de trigonometría. Ángulo trigonométrico y medida angular', 15);
INSERT INTO public.item VALUES (58, 'Sistemas de medición de ángulos: Sexagesimal y circular. Conversión de un sistema a otro', 15);
INSERT INTO public.item VALUES (59, 'Longitud de arco y área sector circular', 15);
INSERT INTO public.item VALUES (60, 'Razones trigonométricas. Ángulos notables', 15);
INSERT INTO public.item VALUES (61, 'Círculo trigonométrico y líneas trigonométricas', 15);
INSERT INTO public.item VALUES (62, 'Funciones trigonométricas en el plano cartesiano', 15);
INSERT INTO public.item VALUES (63, 'Gráficas funciones trigonométricas y sus propiedades periódicas', 15);
INSERT INTO public.item VALUES (64, 'Definición. Teorema de Pitágoras', 16);
INSERT INTO public.item VALUES (65, 'Funciones trigonométricas (seno, coseno y tangente)', 16);
INSERT INTO public.item VALUES (66, 'Resolución gráfica y analítica de triángulos rectángulos', 16);
INSERT INTO public.item VALUES (67, 'Teorema de Seno', 17);
INSERT INTO public.item VALUES (68, 'Teorema de Coseno', 17);
INSERT INTO public.item VALUES (69, 'Resolución de triángulos oblicuángulos', 17);
INSERT INTO public.item VALUES (70, 'Identidades trigonométricas fundamentales', 18);
INSERT INTO public.item VALUES (71, 'Identidades de la suma y diferencia de dos ángulos', 18);
INSERT INTO public.item VALUES (72, 'Identidades de ángulos dobles. Identidades de ángulo mitad', 18);
INSERT INTO public.item VALUES (73, 'Transformación de suma a producto y de producto a suma', 18);
INSERT INTO public.item VALUES (74, 'Demostración de identidades trigonométricas', 18);
INSERT INTO public.item VALUES (75, 'Resolución de ecuaciones trigonométricas elementales (lineales)', 19);
INSERT INTO public.item VALUES (76, 'Resolución de ecuaciones trigonométricas no elementales (cuadráticas)', 19);
INSERT INTO public.item VALUES (77, 'Resolución de problemas con ecuaciones trigonométricas', 19);
INSERT INTO public.item VALUES (78, 'Sistemas de coordenadas rectangulares. Distancia entre dos puntos', 20);
INSERT INTO public.item VALUES (79, 'División de un segmento en una razón dada. Área de un polígono', 20);
INSERT INTO public.item VALUES (80, 'Pendiente de una recta', 20);
INSERT INTO public.item VALUES (81, 'Ángulo entre dos rectas. Condiciones de paralelismo y perpendicularidad', 20);
INSERT INTO public.item VALUES (82, 'GeoGebra. Gráficas en estadística, trigonometría, geometría analítica', 21);
INSERT INTO public.item VALUES (83, 'Taller de pensamiento lógico. Ajedrez V', 21);
INSERT INTO public.item VALUES (84, 'Definición, pendiente de una recta y posición de rectas', 22);
INSERT INTO public.item VALUES (85, 'Ecuaciones de la recta (x5)', 22);
INSERT INTO public.item VALUES (86, 'Aplicaciones de la forma normal', 22);
INSERT INTO public.item VALUES (87, 'Distancia de un punto a una recta', 22);
INSERT INTO public.item VALUES (88, 'Distancia entre rectas paralelas', 22);
INSERT INTO public.item VALUES (89, 'Definición y elementos de la circunferencia', 23);
INSERT INTO public.item VALUES (90, 'Ecuaciones de la circunferencia (x3)', 23);
INSERT INTO public.item VALUES (91, 'Circunferencia que pasa por tres puntos', 23);
INSERT INTO public.item VALUES (92, 'Familia de circunferencias', 23);
INSERT INTO public.item VALUES (93, 'Eje radial entre circunferencias', 23);
INSERT INTO public.item VALUES (94, 'Tangente a una circunferencia', 23);
INSERT INTO public.item VALUES (95, 'Definición y elementos de la parábola', 24);
INSERT INTO public.item VALUES (96, 'Ecuaciones de la parábola', 24);
INSERT INTO public.item VALUES (97, 'Parábola que pasa por tres puntos', 24);
INSERT INTO public.item VALUES (98, 'Tangente a una parábola', 24);
INSERT INTO public.item VALUES (99, 'La función cuadrática y aplicaciones de la parábola', 24);
INSERT INTO public.item VALUES (100, 'Definición y elementos de la elipse. Propiedades de elipse', 25);
INSERT INTO public.item VALUES (101, 'Ecuaciones de la elipse', 25);
INSERT INTO public.item VALUES (102, 'Definición y elementos de la hipérbola. Propiedades de hipérbola', 25);
INSERT INTO public.item VALUES (103, 'Ecuaciones de la hipérbola', 25);
INSERT INTO public.item VALUES (104, 'Conjunto, elemento y relación de pertenencia. Diagramas de Venn', 26);
INSERT INTO public.item VALUES (105, 'Notación de conjuntos numéricos: por extensión o comprensión', 26);
INSERT INTO public.item VALUES (106, 'Relación entre conjuntos, conjuntos especiales: unitario, vacío, universal', 26);
INSERT INTO public.item VALUES (107, 'Operaciones entre conjuntos', 26);
INSERT INTO public.item VALUES (108, 'Leyes de operaciones con conjuntos', 26);
INSERT INTO public.item VALUES (109, 'Cardinalidad y problemas', 26);
INSERT INTO public.item VALUES (110, 'Análisis de funciones reales', 27);
INSERT INTO public.item VALUES (111, 'Límites', 27);
INSERT INTO public.item VALUES (112, 'Derivadas', 27);
INSERT INTO public.item VALUES (113, 'Integrales', 27);
INSERT INTO public.item VALUES (114, 'Operaciones con números reales. Exponentes y radicales', 28);
INSERT INTO public.item VALUES (115, 'Operaciones con expresiones algebraicas', 28);
INSERT INTO public.item VALUES (116, 'Resolución de ecuaciones y sistemas de ecuaciones', 28);
INSERT INTO public.item VALUES (117, 'Desigualdades e inecuaciones', 28);
INSERT INTO public.item VALUES (118, 'Ecuaciones exponenciales y logarítmicas', 28);
INSERT INTO public.item VALUES (119, 'Resolución de triángulos rectángulos y oblicuángulos', 28);
INSERT INTO public.item VALUES (120, 'Identidades y ecuaciones trigonométricas', 28);
INSERT INTO public.item VALUES (121, 'Progresiones y análisis combinatorio. Cálculo del término n-simo aplicando el Binomio de Newton', 28);
INSERT INTO public.item VALUES (122, 'Resolución de exámenes para diferentes instituciones superiores', 28);
INSERT INTO public.item VALUES (123, 'GeoGebra. Gráfica de lugares geométricos', 29);
INSERT INTO public.item VALUES (124, 'Taller de pensamiento lógico: Ajedrez VI', 29);


--
-- TOC entry 5249 (class 0 OID 28588)
-- Dependencies: 223
-- Data for Name: maestro; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.maestro VALUES (13, 'Matemáticas', 'Titular', '2026-08-29', 1);
INSERT INTO public.maestro VALUES (17, 'Matemáticas', 'Quinta', '2026-10-04', 1);


--
-- TOC entry 5274 (class 0 OID 28826)
-- Dependencies: 248
-- Data for Name: opcion; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.opcion VALUES (1, 'La longitud del segmento de recta comprendido entre dos puntos.', NULL, false, NULL, NULL, NULL, 2);
INSERT INTO public.opcion VALUES (2, 'El ángulo complementario que forma la recta con el eje "y".', NULL, false, NULL, NULL, NULL, 2);
INSERT INTO public.opcion VALUES (3, 'La distancia perpendicular desde el origen hasta la recta.', NULL, false, NULL, NULL, NULL, 2);
INSERT INTO public.opcion VALUES (5, 'Son rectas perpendiculares entre sí.', NULL, false, NULL, NULL, NULL, 3);
INSERT INTO public.opcion VALUES (6, 'Son rectas coincidentes (la misma recta).', NULL, false, NULL, NULL, NULL, 3);
INSERT INTO public.opcion VALUES (7, 'Son rectas paralelas no coincidentes.', NULL, true, NULL, NULL, NULL, 3);
INSERT INTO public.opcion VALUES (8, 'Se intersectan en un punto sobre el eje "y".', NULL, false, NULL, NULL, NULL, 3);
INSERT INTO public.opcion VALUES (17, 'Graficar el punto, trazar la pendiente y medir con regla.', NULL, false, NULL, NULL, NULL, 6);
INSERT INTO public.opcion VALUES (18, 'Sustituir el punto en la forma simétrica y despejar "b".', NULL, false, NULL, NULL, NULL, 6);
INSERT INTO public.opcion VALUES (19, 'Usar la forma general y resolver un sistema de ecuaciones.', NULL, false, NULL, NULL, NULL, 6);
INSERT INTO public.opcion VALUES (20, 'Sustituir el punto y la pendiente en la forma punto-pendiente y luego simplificar.', NULL, true, NULL, NULL, NULL, 6);
INSERT INTO public.opcion VALUES (22, 'Solo funciona para rectas que pasan por el origen.', NULL, false, NULL, NULL, NULL, 7);
INSERT INTO public.opcion VALUES (23, 'Es la única forma que permite calcular distancias directamente.', NULL, false, NULL, NULL, NULL, 7);
INSERT INTO public.opcion VALUES (24, 'Permite expresar cualquier recta (incluso verticales) sin necesidad de casos especiales.', NULL, true, NULL, NULL, NULL, 7);
INSERT INTO public.opcion VALUES (25, 'Verificar que la recta esté en su forma pendiente-ordenada.', NULL, false, NULL, NULL, NULL, 8);
INSERT INTO public.opcion VALUES (26, 'Calcular primero el punto de proyección ortogonal del punto sobre la recta.', NULL, false, NULL, NULL, NULL, 8);
INSERT INTO public.opcion VALUES (27, 'Asegurarse de que el punto P pertenezca a la recta.', NULL, false, NULL, NULL, NULL, 8);
INSERT INTO public.opcion VALUES (29, 'La longitud del segmento horizontal que une el punto con la recta.', NULL, false, NULL, NULL, NULL, 9);
INSERT INTO public.opcion VALUES (30, 'La longitud del segmento vertical que une el punto con la recta.', NULL, false, NULL, NULL, NULL, 9);
INSERT INTO public.opcion VALUES (31, 'El promedio de las distancias horizontal y vertical.', NULL, false, NULL, NULL, NULL, 9);
INSERT INTO public.opcion VALUES (32, 'La menor distancia posible, medida a lo largo de la perpendicular trazada desde el punto a la recta.', NULL, true, NULL, NULL, NULL, 9);
INSERT INTO public.opcion VALUES (33, 'Sumar las pendientes de ambas rectas y dividir entre 2.', NULL, false, NULL, NULL, NULL, 10);
INSERT INTO public.opcion VALUES (34, 'Igualar las ecuaciones y resolver un sistema de ecuaciones.', NULL, false, NULL, NULL, NULL, 10);
INSERT INTO public.opcion VALUES (35, 'Calcular las distancias de ambas rectas al origen y promediarlas.', NULL, false, NULL, NULL, NULL, 10);
INSERT INTO public.opcion VALUES (36, 'Tomar un punto cualquiera sobre L1 y calcular su distancia a L2.', NULL, true, NULL, NULL, NULL, 10);
INSERT INTO public.opcion VALUES (37, 'Que ambas rectas sean perpendiculares al eje "x".', NULL, false, NULL, NULL, NULL, 11);
INSERT INTO public.opcion VALUES (38, 'Que ambas rectas pasen por el origen de coordenadas.', NULL, false, NULL, NULL, NULL, 11);
INSERT INTO public.opcion VALUES (39, 'Que la suma de sus coeficientes independientes sea cero.', NULL, false, NULL, NULL, NULL, 11);
INSERT INTO public.opcion VALUES (41, 'Se encuentran a una distancia menor o igual a un radio dado desde un punto fijo.', NULL, false, NULL, NULL, NULL, 12);
INSERT INTO public.opcion VALUES (42, 'Equidistan de un punto fijo llamado centro, a una distancia constante llamada radio.', NULL, true, NULL, NULL, NULL, 12);
INSERT INTO public.opcion VALUES (43, 'Forman un polígono regular de infinitos lados.', NULL, false, NULL, NULL, NULL, 12);
INSERT INTO public.opcion VALUES (44, 'Tienen la propiedad de que la suma de distancias a dos focos es constante.', NULL, false, NULL, NULL, NULL, 12);
INSERT INTO public.opcion VALUES (45, 'Radio', NULL, false, NULL, NULL, NULL, 13);
INSERT INTO public.opcion VALUES (46, 'Diámetro', NULL, false, NULL, NULL, NULL, 13);
INSERT INTO public.opcion VALUES (47, 'Cuerda', NULL, true, NULL, NULL, NULL, 13);
INSERT INTO public.opcion VALUES (48, 'Arco', NULL, false, NULL, NULL, NULL, 13);
INSERT INTO public.opcion VALUES (53, 'Calcular la pendiente de la recta tangente.', NULL, false, NULL, NULL, NULL, 15);
INSERT INTO public.opcion VALUES (54, 'Completar cuadrados en x y en y para llevarla a la forma ordinaria.', NULL, true, NULL, NULL, NULL, 15);
INSERT INTO public.opcion VALUES (55, 'Despejar "y" para graficar la función.', NULL, false, NULL, NULL, NULL, 15);
INSERT INTO public.opcion VALUES (56, 'Multiplicar toda la ecuación por -1.', NULL, false, NULL, NULL, NULL, 15);
INSERT INTO public.opcion VALUES (57, 'Permite identificar directamente el centro y el radio.', NULL, false, NULL, NULL, NULL, 16);
INSERT INTO public.opcion VALUES (58, 'Es útil para trabajar con circunferencias que pasan por el origen.', NULL, false, NULL, NULL, NULL, 16);
INSERT INTO public.opcion VALUES (59, 'Se puede utilizar para representar cualquier circunferencia sin necesidad de fracciones.', NULL, true, NULL, NULL, NULL, 16);
INSERT INTO public.opcion VALUES (60, 'Solo funciona para circunferencias con centro en el origen.', NULL, false, NULL, NULL, NULL, 16);
INSERT INTO public.opcion VALUES (61, 'Graficar los puntos, unirlos y trazar la circunferencia con compás.', NULL, false, NULL, NULL, NULL, 17);
INSERT INTO public.opcion VALUES (63, 'Calcular el centro como el baricentro del triángulo formado por los puntos.', NULL, false, NULL, NULL, NULL, 17);
INSERT INTO public.opcion VALUES (65, 'Tienen el mismo radio.', NULL, false, NULL, NULL, NULL, 18);
INSERT INTO public.opcion VALUES (66, 'Pasan por los mismos dos puntos fijos (intersección de dos circunferencias dadas).', NULL, true, NULL, NULL, NULL, 18);
INSERT INTO public.opcion VALUES (67, 'Tienen el mismo centro.', NULL, false, NULL, NULL, NULL, 18);
INSERT INTO public.opcion VALUES (68, 'Son tangentes al eje "x".', NULL, false, NULL, NULL, NULL, 18);
INSERT INTO public.opcion VALUES (69, 'La recta que une los centros de ambas circunferencias.', NULL, false, NULL, NULL, NULL, 19);
INSERT INTO public.opcion VALUES (70, 'El lugar geométrico de los puntos que tienen igual potencia con respecto a ambas circunferencias.', NULL, true, NULL, NULL, NULL, 19);
INSERT INTO public.opcion VALUES (71, 'La circunferencia que pasa por los puntos de intersección de ambas.', NULL, false, NULL, NULL, NULL, 19);
INSERT INTO public.opcion VALUES (72, 'La recta perpendicular al radio en el punto de tangencia.', NULL, false, NULL, NULL, NULL, 19);
INSERT INTO public.opcion VALUES (73, 'La recta debe pasar por el centro de la circunferencia.', NULL, false, NULL, NULL, NULL, 20);
INSERT INTO public.opcion VALUES (74, 'La distancia del centro de la circunferencia a la recta debe ser igual al radio.', NULL, true, NULL, NULL, NULL, 20);
INSERT INTO public.opcion VALUES (75, 'La recta debe ser perpendicular al radio en cualquier punto.', NULL, false, NULL, NULL, NULL, 20);
INSERT INTO public.opcion VALUES (76, 'La recta debe intersectar a la circunferencia en dos puntos.', NULL, false, NULL, NULL, NULL, 20);
INSERT INTO public.opcion VALUES (77, 'Paralela al radio que pasa por P.', NULL, false, NULL, NULL, NULL, 21);
INSERT INTO public.opcion VALUES (78, 'Perpendicular al radio que pasa por P.', NULL, true, NULL, NULL, NULL, 21);
INSERT INTO public.opcion VALUES (79, 'Secante a la circunferencia en otro punto Q.', NULL, false, NULL, NULL, NULL, 21);
INSERT INTO public.opcion VALUES (80, 'Equidistante del centro y del punto P.', NULL, false, NULL, NULL, NULL, 21);
INSERT INTO public.opcion VALUES (81, 'Equidistan de un punto fijo llamado centro.', NULL, false, NULL, NULL, NULL, 22);
INSERT INTO public.opcion VALUES (82, 'Tienen la propiedad de que la suma de distancias a dos focos es constante.', NULL, false, NULL, NULL, NULL, 22);
INSERT INTO public.opcion VALUES (83, 'Equidistan de un punto fijo llamado foco y de una recta fija llamada directriz.', NULL, true, NULL, NULL, NULL, 22);
INSERT INTO public.opcion VALUES (84, 'Forman una curva cerrada simétrica respecto a dos ejes.', NULL, false, NULL, NULL, NULL, 22);
INSERT INTO public.opcion VALUES (85, 'La distancia del vértice al foco y del vértice a la directriz.', NULL, true, NULL, NULL, NULL, 23);
INSERT INTO public.opcion VALUES (86, 'La longitud del lado recto de la parábola.', NULL, false, NULL, NULL, NULL, 23);
INSERT INTO public.opcion VALUES (87, 'La coordenada "x" del vértice.', NULL, false, NULL, NULL, NULL, 23);
INSERT INTO public.opcion VALUES (88, 'La pendiente de la recta tangente en el vértice.', NULL, false, NULL, NULL, NULL, 23);
INSERT INTO public.opcion VALUES (93, 'Calcular la pendiente de la recta tangente.', NULL, false, NULL, NULL, NULL, 25);
INSERT INTO public.opcion VALUES (94, 'Identificar cuál variable está elevada al cuadrado y el signo del coeficiente.', NULL, true, NULL, NULL, NULL, 25);
INSERT INTO public.opcion VALUES (95, 'Graficar la parábola para visualizar su apertura.', NULL, false, NULL, NULL, NULL, 25);
INSERT INTO public.opcion VALUES (96, 'Encontrar el vértice y el foco.', NULL, false, NULL, NULL, NULL, 25);
INSERT INTO public.opcion VALUES (101, 'Graficar los puntos y estimar el vértice visualmente.', NULL, false, NULL, NULL, NULL, 27);
INSERT INTO public.opcion VALUES (104, 'Calcular el foco y la directriz a partir de las coordenadas de los puntos.', NULL, false, NULL, NULL, NULL, 27);
INSERT INTO public.opcion VALUES (105, 'Verificar que la recta pase por el vértice de la parábola.', NULL, false, NULL, NULL, NULL, 28);
INSERT INTO public.opcion VALUES (106, 'Calcular la pendiente de la recta y compararla con el parámetro "p".', NULL, false, NULL, NULL, NULL, 28);
INSERT INTO public.opcion VALUES (107, 'Resolver el sistema de ecuaciones (recta y parábola) y analizar que el discriminante de la ecuación cuadrática resultante sea igual a cero.', NULL, true, NULL, NULL, NULL, 28);
INSERT INTO public.opcion VALUES (108, 'Asegurarse de que la recta sea perpendicular a la directriz.', NULL, false, NULL, NULL, NULL, 28);
INSERT INTO public.opcion VALUES (109, 'Siempre un punto de corte con el eje "x".', NULL, false, NULL, NULL, NULL, 29);
INSERT INTO public.opcion VALUES (110, 'El punto donde la función alcanza su valor máximo o mínimo.', NULL, true, NULL, NULL, NULL, 29);
INSERT INTO public.opcion VALUES (111, 'El punto de inflexión de la curva.', NULL, false, NULL, NULL, NULL, 29);
INSERT INTO public.opcion VALUES (112, 'El valor de la intersección con el eje "y".', NULL, false, NULL, NULL, NULL, 29);
INSERT INTO public.opcion VALUES (113, 'Encontrar las raíces de la ecuación cuadrática.', NULL, false, NULL, NULL, NULL, 30);
INSERT INTO public.opcion VALUES (114, 'Calcular el valor de "c" en la función.', NULL, false, NULL, NULL, NULL, 30);
INSERT INTO public.opcion VALUES (116, 'Graficar la función y estimar el punto más alto o bajo.', NULL, false, NULL, NULL, NULL, 30);
INSERT INTO public.opcion VALUES (117, 'Todos los rayos paralelos al eje de simetría se reflejan y pasan por el foco.', NULL, true, NULL, NULL, NULL, 31);
INSERT INTO public.opcion VALUES (118, 'La parábola tiene la misma forma que una circunferencia.', NULL, false, NULL, NULL, NULL, 31);
INSERT INTO public.opcion VALUES (119, 'La distancia del foco a la directriz es siempre positiva.', NULL, false, NULL, NULL, NULL, 31);
INSERT INTO public.opcion VALUES (120, 'La parábola siempre pasa por el origen de coordenadas.', NULL, false, NULL, NULL, NULL, 31);
INSERT INTO public.opcion VALUES (121, 'Distancia a un punto fijo llamado foco es constante.', NULL, false, NULL, NULL, NULL, 32);
INSERT INTO public.opcion VALUES (122, 'Suma de distancias a dos puntos fijos llamados focos es constante.', NULL, true, NULL, NULL, NULL, 32);
INSERT INTO public.opcion VALUES (123, 'Diferencia de distancias a dos puntos fijos llamados focos es constante.', NULL, false, NULL, NULL, NULL, 32);
INSERT INTO public.opcion VALUES (124, 'Distancia a una recta fija llamada directriz es constante.', NULL, false, NULL, NULL, NULL, 32);
INSERT INTO public.opcion VALUES (129, 'Los rayos paralelos al eje mayor se reflejan y pasan por el foco.', NULL, false, NULL, NULL, NULL, 34);
INSERT INTO public.opcion VALUES (130, 'Un rayo emitido desde un foco se refleja y pasa por el otro foco.', NULL, true, NULL, NULL, NULL, 34);
INSERT INTO public.opcion VALUES (131, 'La elipse tiene la misma forma que una parábola.', NULL, false, NULL, NULL, NULL, 34);
INSERT INTO public.opcion VALUES (132, 'La suma de distancias a los focos es variable.', NULL, false, NULL, NULL, NULL, 34);
INSERT INTO public.opcion VALUES (137, 'Calcular la distancia focal "c".', NULL, false, NULL, NULL, NULL, 36);
INSERT INTO public.opcion VALUES (138, 'Graficar la elipse para visualizar su orientación.', NULL, false, NULL, NULL, NULL, 36);
INSERT INTO public.opcion VALUES (139, 'Identificar qué variable tiene el denominador más grande.', NULL, true, NULL, NULL, NULL, 36);
INSERT INTO public.opcion VALUES (140, 'Encontrar las coordenadas de los focos.', NULL, false, NULL, NULL, NULL, 36);
INSERT INTO public.opcion VALUES (141, 'Suma de distancias a dos puntos fijos llamados focos es constante.', NULL, false, NULL, NULL, NULL, 37);
INSERT INTO public.opcion VALUES (142, 'Diferencia de distancias a dos puntos fijos llamados focos es constante.', NULL, true, NULL, NULL, NULL, 37);
INSERT INTO public.opcion VALUES (143, 'Distancia a un punto fijo llamado foco es constante.', NULL, false, NULL, NULL, NULL, 37);
INSERT INTO public.opcion VALUES (144, 'Distancia a una recta fija llamada directriz es constante.', NULL, false, NULL, NULL, NULL, 37);
INSERT INTO public.opcion VALUES (145, 'Directrices', NULL, false, NULL, NULL, NULL, 38);
INSERT INTO public.opcion VALUES (146, 'Asíntotas', NULL, true, NULL, NULL, NULL, 38);
INSERT INTO public.opcion VALUES (147, 'Lado recto', NULL, false, NULL, NULL, NULL, 38);
INSERT INTO public.opcion VALUES (148, 'Eje conjugado', NULL, false, NULL, NULL, NULL, 38);
INSERT INTO public.opcion VALUES (149, 'La elipse tiene dos focos y la hipérbola solo uno.', NULL, false, NULL, NULL, NULL, 39);
INSERT INTO public.opcion VALUES (151, 'La elipse es una curva abierta y la hipérbola es cerrada.', NULL, false, NULL, NULL, NULL, 39);
INSERT INTO public.opcion VALUES (152, 'La hipérbola tiene vértices y la elipse no.', NULL, false, NULL, NULL, NULL, 39);
INSERT INTO public.opcion VALUES (157, 'Despejando "y" en la ecuación canónica.', NULL, false, NULL, NULL, NULL, 41);
INSERT INTO public.opcion VALUES (159, 'Encontrando los focos y uniéndolos.', NULL, false, NULL, NULL, NULL, 41);
INSERT INTO public.opcion VALUES (160, 'Calculando la distancia focal "c" y trazando perpendiculares.', NULL, false, NULL, NULL, NULL, 41);
INSERT INTO public.opcion VALUES (165, 'Todos los elementos que están en A o en B.', NULL, false, NULL, NULL, NULL, 43);
INSERT INTO public.opcion VALUES (166, 'Todos los elementos que están en A pero no en B.', NULL, false, NULL, NULL, NULL, 43);
INSERT INTO public.opcion VALUES (167, 'Todos los elementos que están tanto en A como en B.', NULL, true, NULL, NULL, NULL, 43);
INSERT INTO public.opcion VALUES (168, 'Todos los elementos que no están ni en A ni en B.', NULL, false, NULL, NULL, NULL, 43);
INSERT INTO public.opcion VALUES (173, 'Contener un solo elemento llamado conjunto unitario.', NULL, false, NULL, NULL, NULL, 45);
INSERT INTO public.opcion VALUES (174, 'No contener ningún elemento.', NULL, true, NULL, NULL, NULL, 45);
INSERT INTO public.opcion VALUES (175, 'Contener todos los elementos del universo.', NULL, false, NULL, NULL, NULL, 45);
INSERT INTO public.opcion VALUES (176, 'Ser igual al conjunto universal.', NULL, false, NULL, NULL, NULL, 45);
INSERT INTO public.opcion VALUES (181, 'Todos los elementos que están en A y también en B.', NULL, false, NULL, NULL, NULL, 47);
INSERT INTO public.opcion VALUES (182, 'Todos los elementos que están en A o en B (o en ambos).', NULL, true, NULL, NULL, NULL, 47);
INSERT INTO public.opcion VALUES (89, '$y^2 = 4px$', NULL, true, NULL, NULL, NULL, 24);
INSERT INTO public.opcion VALUES (183, 'Todos los elementos que están en A pero no en B.', NULL, false, NULL, NULL, NULL, 47);
INSERT INTO public.opcion VALUES (184, 'Todos los elementos que no están ni en A ni en B.', NULL, false, NULL, NULL, NULL, 47);
INSERT INTO public.opcion VALUES (185, 'Los elementos que están en A y también en B.', NULL, false, NULL, NULL, NULL, 48);
INSERT INTO public.opcion VALUES (186, 'Los elementos que están en B pero no en A.', NULL, false, NULL, NULL, NULL, 48);
INSERT INTO public.opcion VALUES (187, 'Los elementos que están en A pero no en B.', NULL, true, NULL, NULL, NULL, 48);
INSERT INTO public.opcion VALUES (188, 'Los elementos que están en A o en B.', NULL, false, NULL, NULL, NULL, 48);
INSERT INTO public.opcion VALUES (189, 'El complemento de A unido con el complemento de B.', NULL, false, NULL, NULL, NULL, 49);
INSERT INTO public.opcion VALUES (190, 'El complemento de A intersectado con el complemento de B.', NULL, true, NULL, NULL, NULL, 49);
INSERT INTO public.opcion VALUES (191, 'La unión de A y B.', NULL, false, NULL, NULL, NULL, 49);
INSERT INTO public.opcion VALUES (192, 'La intersección de A y B.', NULL, false, NULL, NULL, NULL, 49);
INSERT INTO public.opcion VALUES (201, 'El conjunto de todos los valores que puede tomar la variable dependiente "y".', NULL, false, NULL, NULL, NULL, 52);
INSERT INTO public.opcion VALUES (202, 'El conjunto de todos los valores de "x" para los cuales la función está definida y produce un valor real.', NULL, true, NULL, NULL, NULL, 52);
INSERT INTO public.opcion VALUES (203, 'El conjunto de puntos donde la función corta al eje "x".', NULL, false, NULL, NULL, NULL, 52);
INSERT INTO public.opcion VALUES (204, 'El valor máximo que alcanza la función en su recorrido.', NULL, false, NULL, NULL, NULL, 52);
INSERT INTO public.opcion VALUES (205, 'Cada elemento de A tiene una imagen diferente en B.', NULL, true, NULL, NULL, NULL, 53);
INSERT INTO public.opcion VALUES (206, 'Todos los elementos de B tienen al menos una preimagen en A.', NULL, false, NULL, NULL, NULL, 53);
INSERT INTO public.opcion VALUES (207, 'Cada elemento de B tiene una única preimagen en A.', NULL, false, NULL, NULL, NULL, 53);
INSERT INTO public.opcion VALUES (208, 'La función es creciente en todo su dominio.', NULL, false, NULL, NULL, NULL, 53);
INSERT INTO public.opcion VALUES (209, 'El valor exacto que toma la función en "a".', NULL, false, NULL, NULL, NULL, 54);
INSERT INTO public.opcion VALUES (210, 'El valor al que se aproxima la función cuando "x" se acerca a "a", sin necesidad de que la función esté definida en "a".', NULL, true, NULL, NULL, NULL, 54);
INSERT INTO public.opcion VALUES (211, 'La derivada de la función en el punto "a".', NULL, false, NULL, NULL, NULL, 54);
INSERT INTO public.opcion VALUES (212, 'El área bajo la curva desde el origen hasta "a".', NULL, false, NULL, NULL, NULL, 54);
INSERT INTO public.opcion VALUES (213, 'Concluir que el límite no existe.', NULL, false, NULL, NULL, NULL, 55);
INSERT INTO public.opcion VALUES (214, 'Multiplicar por el conjugado o factorizar para simplificar la expresión.', NULL, true, NULL, NULL, NULL, 55);
INSERT INTO public.opcion VALUES (215, 'Aplicar directamente la derivada sin simplificar.', NULL, false, NULL, NULL, NULL, 55);
INSERT INTO public.opcion VALUES (216, 'Sustituir "x" por valores cercanos a "a" y promediar.', NULL, false, NULL, NULL, NULL, 55);
INSERT INTO public.opcion VALUES (217, 'El valor de f(x) cuando x se acerca a "a" por valores mayores que "a".', NULL, false, NULL, NULL, NULL, 56);
INSERT INTO public.opcion VALUES (218, 'El valor de f(x) cuando x se acerca a "a" por valores menores que "a".', NULL, true, NULL, NULL, NULL, 56);
INSERT INTO public.opcion VALUES (219, 'El valor de f(x) cuando x tiende a infinito.', NULL, false, NULL, NULL, NULL, 56);
INSERT INTO public.opcion VALUES (220, 'El valor promedio de f(x) en el intervalo [a-1, a].', NULL, false, NULL, NULL, NULL, 56);
INSERT INTO public.opcion VALUES (221, 'El área bajo la curva en el punto "a".', NULL, false, NULL, NULL, NULL, 57);
INSERT INTO public.opcion VALUES (222, 'La pendiente de la recta secante que pasa por "a" y otro punto cercano.', NULL, false, NULL, NULL, NULL, 57);
INSERT INTO public.opcion VALUES (223, 'La pendiente de la recta tangente a la curva en el punto "a".', NULL, true, NULL, NULL, NULL, 57);
INSERT INTO public.opcion VALUES (224, 'El punto de intersección de la curva con el eje "y".', NULL, false, NULL, NULL, NULL, 57);
INSERT INTO public.opcion VALUES (225, 'Se deriva un producto de dos funciones.', NULL, false, NULL, NULL, NULL, 58);
INSERT INTO public.opcion VALUES (226, 'Se deriva el cociente de dos funciones.', NULL, false, NULL, NULL, NULL, 58);
INSERT INTO public.opcion VALUES (228, 'Se deriva una función exponencial.', NULL, false, NULL, NULL, NULL, 58);
INSERT INTO public.opcion VALUES (229, 'La función alcanza su valor máximo o mínimo absoluto.', NULL, false, NULL, NULL, NULL, 59);
INSERT INTO public.opcion VALUES (231, 'La función corta al eje "x".', NULL, false, NULL, NULL, NULL, 59);
INSERT INTO public.opcion VALUES (232, 'La función cambia de signo.', NULL, false, NULL, NULL, NULL, 59);
INSERT INTO public.opcion VALUES (233, 'La pendiente de la recta tangente en el intervalo.', NULL, false, NULL, NULL, NULL, 60);
INSERT INTO public.opcion VALUES (234, 'El área neta bajo la curva entre "a" y "b".', NULL, true, NULL, NULL, NULL, 60);
INSERT INTO public.opcion VALUES (235, 'La tasa de cambio promedio de la función.', NULL, false, NULL, NULL, NULL, 60);
INSERT INTO public.opcion VALUES (236, 'El valor máximo de la función en [a, b].', NULL, false, NULL, NULL, NULL, 60);
INSERT INTO public.opcion VALUES (237, 'La función original f(x), siempre que sea continua.', NULL, true, NULL, NULL, NULL, 61);
INSERT INTO public.opcion VALUES (238, 'El área bajo la curva en el punto.', NULL, false, NULL, NULL, NULL, 61);
INSERT INTO public.opcion VALUES (239, 'La pendiente de la recta secante.', NULL, false, NULL, NULL, NULL, 61);
INSERT INTO public.opcion VALUES (240, 'El valor promedio de la función en el intervalo.', NULL, false, NULL, NULL, NULL, 61);
INSERT INTO public.opcion VALUES (241, 'm y n sean números enteros positivos.', NULL, false, NULL, NULL, NULL, 62);
INSERT INTO public.opcion VALUES (242, 'a sea un número real cualquiera.', NULL, false, NULL, NULL, NULL, 62);
INSERT INTO public.opcion VALUES (243, 'a > 0 para exponentes fraccionarios o reales.', NULL, true, NULL, NULL, NULL, 62);
INSERT INTO public.opcion VALUES (244, 'm sea mayor que n.', NULL, false, NULL, NULL, NULL, 62);
INSERT INTO public.opcion VALUES (245, 'Olvidar el término 2ab y escribir a² + b².', NULL, true, NULL, NULL, NULL, 63);
INSERT INTO public.opcion VALUES (246, 'Escribir a² - 2ab + b².', NULL, false, NULL, NULL, NULL, 63);
INSERT INTO public.opcion VALUES (247, 'Escribir a² + 2ab - b².', NULL, false, NULL, NULL, NULL, 63);
INSERT INTO public.opcion VALUES (248, 'Escribir a² + b² + 2a²b².', NULL, false, NULL, NULL, NULL, 63);
INSERT INTO public.opcion VALUES (249, 'Método de sustitución.', NULL, false, NULL, NULL, NULL, 64);
INSERT INTO public.opcion VALUES (250, 'Método de igualación.', NULL, false, NULL, NULL, NULL, 64);
INSERT INTO public.opcion VALUES (251, 'Método de reducción (suma y resta).', NULL, true, NULL, NULL, NULL, 64);
INSERT INTO public.opcion VALUES (252, 'Método gráfico.', NULL, false, NULL, NULL, NULL, 64);
INSERT INTO public.opcion VALUES (253, 'La inecuación se mantiene igual.', NULL, false, NULL, NULL, NULL, 65);
INSERT INTO public.opcion VALUES (254, 'Solo cambia el sentido de la desigualdad.', NULL, false, NULL, NULL, NULL, 65);
INSERT INTO public.opcion VALUES (255, 'El signo de la desigualdad se invierte.', NULL, true, NULL, NULL, NULL, 65);
INSERT INTO public.opcion VALUES (256, 'La solución se convierte en un conjunto vacío.', NULL, false, NULL, NULL, NULL, 65);
INSERT INTO public.opcion VALUES (257, 'Graficar las funciones y = 2^x y y = 5 para buscar el punto de corte.', NULL, false, NULL, NULL, NULL, 66);
INSERT INTO public.opcion VALUES (258, 'Aplicar logaritmo a ambos lados para "bajar" la "x" del exponente.', NULL, true, NULL, NULL, NULL, 66);
INSERT INTO public.opcion VALUES (259, 'Despejar "x" dividiendo ambos lados entre 2.', NULL, false, NULL, NULL, NULL, 66);
INSERT INTO public.opcion VALUES (260, 'Elevar ambos lados al cuadrado.', NULL, false, NULL, NULL, NULL, 66);
INSERT INTO public.opcion VALUES (261, 'La Ley de Senos.', NULL, false, NULL, NULL, NULL, 67);
INSERT INTO public.opcion VALUES (262, 'La Ley de Cosenos.', NULL, true, NULL, NULL, NULL, 67);
INSERT INTO public.opcion VALUES (263, 'El Teorema de Pitágoras.', NULL, false, NULL, NULL, NULL, 67);
INSERT INTO public.opcion VALUES (264, 'Las razones trigonométricas (seno, coseno, tangente).', NULL, false, NULL, NULL, NULL, 67);
INSERT INTO public.opcion VALUES (265, 'Solo sirve para ángulos de 45°.', NULL, false, NULL, NULL, NULL, 68);
INSERT INTO public.opcion VALUES (266, 'Permite relacionar el seno y el coseno de un mismo ángulo sin usar un triángulo rectángulo.', NULL, true, NULL, NULL, NULL, 68);
INSERT INTO public.opcion VALUES (267, 'Se usa para calcular la tangente directamente.', NULL, false, NULL, NULL, NULL, 68);
INSERT INTO public.opcion VALUES (268, 'Solo se aplica en triángulos rectángulos.', NULL, false, NULL, NULL, NULL, 68);
INSERT INTO public.opcion VALUES (269, 'En la PA se suma una razón constante, y en la PG se multiplica por una razón constante.', NULL, true, NULL, NULL, NULL, 69);
INSERT INTO public.opcion VALUES (270, 'En la PA se multiplica una razón, y en la PG se suma.', NULL, false, NULL, NULL, NULL, 69);
INSERT INTO public.opcion VALUES (271, 'La PA solo tiene términos positivos.', NULL, false, NULL, NULL, NULL, 69);
INSERT INTO public.opcion VALUES (272, 'La PG no tiene aplicación en problemas reales.', NULL, false, NULL, NULL, NULL, 69);
INSERT INTO public.opcion VALUES (230, 'La derivada $f^{\prime}(x) = 0$ o no existe.', NULL, true, NULL, NULL, NULL, 59);
INSERT INTO public.opcion VALUES (227, 'Se deriva una función compuesta: $f(g(x))$.', NULL, true, NULL, NULL, NULL, 58);
INSERT INTO public.opcion VALUES (277, 'Desarrollar el problema entero desde cero en el borrador, sin importar el tiempo.', NULL, false, NULL, NULL, NULL, 71);
INSERT INTO public.opcion VALUES (278, 'Identificar de qué tema es y aplicar directamente la fórmula o relación clave.', NULL, true, NULL, NULL, NULL, 71);
INSERT INTO public.opcion VALUES (279, 'Sustituir todas las opciones en el enunciado para ver cuál cumple.', NULL, false, NULL, NULL, NULL, 71);
INSERT INTO public.opcion VALUES (280, 'Empezar siempre por la última pregunta.', NULL, false, NULL, NULL, NULL, 71);
INSERT INTO public.opcion VALUES (4, 'La razón de cambio vertical ($\Delta y$) con respecto al cambio horizontal ($\Delta x$).', NULL, true, NULL, NULL, NULL, 2);
INSERT INTO public.opcion VALUES (9, '$30^\circ$', NULL, false, NULL, NULL, NULL, 4);
INSERT INTO public.opcion VALUES (10, '$60^\circ$', NULL, false, NULL, NULL, NULL, 4);
INSERT INTO public.opcion VALUES (11, '$45^\circ$', NULL, true, NULL, NULL, NULL, 4);
INSERT INTO public.opcion VALUES (12, '$90^\circ$', NULL, false, NULL, NULL, NULL, 4);
INSERT INTO public.opcion VALUES (13, 'Forma punto-pendiente: $y - y_1 = m(x - x_1)$', NULL, false, NULL, NULL, NULL, 5);
INSERT INTO public.opcion VALUES (14, 'Forma pendiente-ordenada: $y = mx + b$', NULL, false, NULL, NULL, NULL, 5);
INSERT INTO public.opcion VALUES (15, 'Forma general: $Ax + By + C = 0$', NULL, false, NULL, NULL, NULL, 5);
INSERT INTO public.opcion VALUES (16, 'Forma simétrica: $\frac{x}{a} + \frac{y}{b} = 1$', NULL, true, NULL, NULL, NULL, 5);
INSERT INTO public.opcion VALUES (21, 'Siempre presenta la pendiente de manera explícita como el coeficiente $A$.', NULL, false, NULL, NULL, NULL, 7);
INSERT INTO public.opcion VALUES (28, 'Identificar correctamente los coeficientes $A$, $B$ y $C$ de la recta en su forma general.', NULL, true, NULL, NULL, NULL, 8);
INSERT INTO public.opcion VALUES (40, 'Que ambas rectas tengan la misma pendiente (o que sus coeficientes $A$ y $B$ sean proporcionales).', NULL, true, NULL, NULL, NULL, 11);
INSERT INTO public.opcion VALUES (49, '$r \geq 0$ (puede ser cero o positivo)', NULL, false, NULL, NULL, NULL, 14);
INSERT INTO public.opcion VALUES (50, '$r > 0$ (necesariamente positivo)', NULL, true, NULL, NULL, NULL, 14);
INSERT INTO public.opcion VALUES (51, '$r$ puede ser cualquier número real', NULL, false, NULL, NULL, NULL, 14);
INSERT INTO public.opcion VALUES (52, '$r \leq 0$ (negativo o cero)', NULL, false, NULL, NULL, NULL, 14);
INSERT INTO public.opcion VALUES (62, 'Sustituir cada punto en la forma general $x^2 + y^2 + Dx + Ey + F = 0$ y resolver un sistema de 3 ecuaciones con 3 incógnitas ($D$, $E$, $F$).', NULL, true, NULL, NULL, NULL, 17);
INSERT INTO public.opcion VALUES (64, 'Usar la ecuación ordinaria y despejar $h$, $k$ y $r$ directamente.', NULL, false, NULL, NULL, NULL, 17);
INSERT INTO public.opcion VALUES (90, '$y^2 = -4px$', NULL, false, NULL, NULL, NULL, 24);
INSERT INTO public.opcion VALUES (91, '$x^2 = 4py$', NULL, false, NULL, NULL, NULL, 24);
INSERT INTO public.opcion VALUES (92, '$x^2 = -4py$', NULL, false, NULL, NULL, NULL, 24);
INSERT INTO public.opcion VALUES (97, '$(-3, 2)$', NULL, true, NULL, NULL, NULL, 26);
INSERT INTO public.opcion VALUES (98, '$(3, -2)$', NULL, false, NULL, NULL, NULL, 26);
INSERT INTO public.opcion VALUES (99, '$(-3, -2)$', NULL, false, NULL, NULL, NULL, 26);
INSERT INTO public.opcion VALUES (100, '$(3, 2)$', NULL, false, NULL, NULL, NULL, 26);
INSERT INTO public.opcion VALUES (102, 'Plantear la ecuación $y = ax^2 + bx + c$ y resolver el sistema de 3 ecuaciones con los tres puntos.', NULL, true, NULL, NULL, NULL, 27);
INSERT INTO public.opcion VALUES (103, 'Usar la ecuación $(x - h)^2 = 4p(y - k)$ y sustituir solo el primer punto.', NULL, false, NULL, NULL, NULL, 27);
INSERT INTO public.opcion VALUES (115, 'Hallar las coordenadas del vértice usando $x_v = -\frac{b}{2a}$.', NULL, true, NULL, NULL, NULL, 30);
INSERT INTO public.opcion VALUES (125, 'Semieje menor ($b$)', NULL, false, NULL, NULL, NULL, 33);
INSERT INTO public.opcion VALUES (126, 'Distancia focal ($c$)', NULL, false, NULL, NULL, NULL, 33);
INSERT INTO public.opcion VALUES (127, 'Semieje mayor ($a$)', NULL, true, NULL, NULL, NULL, 33);
INSERT INTO public.opcion VALUES (128, 'Lado recto', NULL, false, NULL, NULL, NULL, 33);
INSERT INTO public.opcion VALUES (133, '$a^2 = b^2 + c^2$', NULL, true, NULL, NULL, NULL, 35);
INSERT INTO public.opcion VALUES (134, '$b^2 = a^2 + c^2$', NULL, false, NULL, NULL, NULL, 35);
INSERT INTO public.opcion VALUES (135, '$c^2 = a^2 + b^2$', NULL, false, NULL, NULL, NULL, 35);
INSERT INTO public.opcion VALUES (136, '$a^2 = b^2 - c^2$', NULL, false, NULL, NULL, NULL, 35);
INSERT INTO public.opcion VALUES (150, 'En la elipse, $a^2 = b^2 + c^2$, mientras que en la hipérbola, $c^2 = a^2 + b^2$.', NULL, true, NULL, NULL, NULL, 39);
INSERT INTO public.opcion VALUES (153, '$(\pm a, 0)$', NULL, true, NULL, NULL, NULL, 40);
INSERT INTO public.opcion VALUES (154, '$(0, \pm a)$', NULL, false, NULL, NULL, NULL, 40);
INSERT INTO public.opcion VALUES (155, '$(\pm c, 0)$', NULL, false, NULL, NULL, NULL, 40);
INSERT INTO public.opcion VALUES (156, '$(0, \pm c)$', NULL, false, NULL, NULL, NULL, 40);
INSERT INTO public.opcion VALUES (158, 'Usando las rectas $y = \pm\frac{b}{a}x$ para la hipérbola horizontal.', NULL, true, NULL, NULL, NULL, 41);
INSERT INTO public.opcion VALUES (161, '$\in$ se usa para elementos y $\subseteq$ para conjuntos.', NULL, true, NULL, NULL, NULL, 42);
INSERT INTO public.opcion VALUES (162, '$\in$ se usa para conjuntos y $\subseteq$ para elementos.', NULL, false, NULL, NULL, NULL, 42);
INSERT INTO public.opcion VALUES (163, 'Ambos símbolos significan lo mismo y son intercambiables.', NULL, false, NULL, NULL, NULL, 42);
INSERT INTO public.opcion VALUES (164, '$\in$ indica que un conjunto está dentro de otro, y $\subseteq$ indica que un elemento está en un conjunto.', NULL, false, NULL, NULL, NULL, 42);
INSERT INTO public.opcion VALUES (169, '$A = \{2, 4, 6, 8, 10\}$', NULL, true, NULL, NULL, NULL, 44);
INSERT INTO public.opcion VALUES (170, '$A = \{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\}$', NULL, false, NULL, NULL, NULL, 44);
INSERT INTO public.opcion VALUES (171, '$A = \{0, 2, 4, 6, 8, 10\}$', NULL, false, NULL, NULL, NULL, 44);
INSERT INTO public.opcion VALUES (172, '$A = \{2, 4, 6, 8\}$', NULL, false, NULL, NULL, NULL, 44);
INSERT INTO public.opcion VALUES (177, '$A$ y $B$ son conjuntos disjuntos.', NULL, false, NULL, NULL, NULL, 46);
INSERT INTO public.opcion VALUES (178, '$A \subset B$ ($A$ es subconjunto propio de $B$).', NULL, false, NULL, NULL, NULL, 46);
INSERT INTO public.opcion VALUES (179, '$A = B$ (son el mismo conjunto).', NULL, true, NULL, NULL, NULL, 46);
INSERT INTO public.opcion VALUES (180, '$A \cup B = \emptyset$', NULL, false, NULL, NULL, NULL, 46);
INSERT INTO public.opcion VALUES (193, '$A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$', NULL, true, NULL, NULL, NULL, 50);
INSERT INTO public.opcion VALUES (194, '$A \cup (B \cap C) = (A \cap B) \cup (A \cap C)$', NULL, false, NULL, NULL, NULL, 50);
INSERT INTO public.opcion VALUES (195, '$A \cap (B \cup C) = (A \cup B) \cap (A \cup C)$', NULL, false, NULL, NULL, NULL, 50);
INSERT INTO public.opcion VALUES (196, '$A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$', NULL, false, NULL, NULL, NULL, 50);
INSERT INTO public.opcion VALUES (197, '$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C|$', NULL, false, NULL, NULL, NULL, 51);
INSERT INTO public.opcion VALUES (198, '$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|$', NULL, true, NULL, NULL, NULL, 51);
INSERT INTO public.opcion VALUES (199, '$|A \cup B \cup C| = |A| + |B| + |C| + |A \cap B \cap C|$', NULL, false, NULL, NULL, NULL, 51);
INSERT INTO public.opcion VALUES (200, '$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B \cap C|$', NULL, false, NULL, NULL, NULL, 51);
INSERT INTO public.opcion VALUES (273, '$(x + y)^n = \sum \binom{n}{k} \cdot x^k \cdot y^{n-k}$', NULL, false, NULL, NULL, NULL, 70);
INSERT INTO public.opcion VALUES (274, '$(x + y)^n = \sum \binom{n}{k} \cdot x^{n-k} \cdot y^k$', NULL, true, NULL, NULL, NULL, 70);
INSERT INTO public.opcion VALUES (275, '$(x + y)^n = \sum \frac{n!}{(n-k)!} \cdot x^{n-k} \cdot y^k$', NULL, false, NULL, NULL, NULL, 70);
INSERT INTO public.opcion VALUES (276, '$(x + y)^n = x^n + y^n$', NULL, false, NULL, NULL, NULL, 70);


--
-- TOC entry 5266 (class 0 OID 28758)
-- Dependencies: 240
-- Data for Name: pertenece; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.pertenece VALUES (5, 3, '2026-10-12 16:17:28.147984', 'ACTIVO');
INSERT INTO public.pertenece VALUES (14, 3, '2026-10-12 16:17:28.147984', 'ACTIVO');
INSERT INTO public.pertenece VALUES (9, 3, '2026-10-12 16:17:28.147984', 'ACTIVO');
INSERT INTO public.pertenece VALUES (4, 3, '2026-10-12 16:17:28.147984', 'ACTIVO');
INSERT INTO public.pertenece VALUES (9, 4, '2026-10-12 17:59:46.967483', 'ACTIVO');


--
-- TOC entry 5288 (class 0 OID 28958)
-- Dependencies: 262
-- Data for Name: planificacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.planificacion VALUES (1, 2026, 'Planificación 2026', '2026-09-14 00:00:00', 'BORRADOR', 13, NULL);
INSERT INTO public.planificacion VALUES (2, 2026, 'Planificación 2026', '2026-10-05 00:00:00', 'BORRADOR', 13, NULL);
INSERT INTO public.planificacion VALUES (3, 2026, 'Planificación 2026', '2026-10-05 00:00:00', 'BORRADOR', 13, NULL);
INSERT INTO public.planificacion VALUES (4, 2026, 'Planificación 2026', '2026-10-12 00:00:00', 'BORRADOR', 13, 3);
INSERT INTO public.planificacion VALUES (5, 2026, 'Planificación 2026', '2026-10-13 00:00:00', 'BORRADOR', 13, 4);


--
-- TOC entry 5272 (class 0 OID 28809)
-- Dependencies: 246
-- Data for Name: pregunta; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.pregunta VALUES (2, 'La pendiente de una recta en el plano cartesiano es un valor numérico que cuantifica:', NULL, NULL, 30, NULL, 84);
INSERT INTO public.pregunta VALUES (5, 'De las cinco formas de la ecuación de la recta (punto-pendiente, pendiente-ordenada, cartesiana, simétrica y general), ¿cuál es la que entrega de manera más directa los puntos de corte con los ejes coordenados?', NULL, NULL, 40, NULL, 85);
INSERT INTO public.pregunta VALUES (9, 'Geométricamente, la distancia de un punto a una recta se define como:', NULL, NULL, 30, NULL, 87);
INSERT INTO public.pregunta VALUES (11, 'Antes de aplicar cualquier fórmula para hallar la distancia entre dos rectas, la condición indispensable que debe cumplirse es:', NULL, NULL, 45, NULL, 88);
INSERT INTO public.pregunta VALUES (12, 'La circunferencia se define como el conjunto de todos los puntos del plano que:', NULL, NULL, 30, NULL, 89);
INSERT INTO public.pregunta VALUES (13, 'En una circunferencia, el segmento que une dos puntos cualesquiera de la misma y que no necesariamente pasa por el centro se denomina:', NULL, NULL, 30, NULL, 89);
INSERT INTO public.pregunta VALUES (17, 'Para hallar la ecuación de una circunferencia que pasa por tres puntos no alineados, la estrategia fundamental consiste en:', NULL, NULL, 45, NULL, 91);
INSERT INTO public.pregunta VALUES (18, 'La "familia de circunferencias" es un concepto que agrupa a todas las circunferencias que:', NULL, NULL, 45, NULL, 92);
INSERT INTO public.pregunta VALUES (19, 'El eje radical de dos circunferencias no concéntricas es:', NULL, NULL, 50, NULL, 93);
INSERT INTO public.pregunta VALUES (20, 'Para determinar si una recta es tangente a una circunferencia, la condición fundamental que debe cumplirse es:', NULL, NULL, 40, NULL, 94);
INSERT INTO public.pregunta VALUES (22, 'La parábola se define como el conjunto de todos los puntos del plano que:', NULL, NULL, 30, NULL, 95);
INSERT INTO public.pregunta VALUES (24, 'La ecuación de una parábola con vértice en el origen y que abre hacia la derecha tiene la forma:', NULL, NULL, 35, NULL, 96);
INSERT INTO public.pregunta VALUES (25, 'Dada la ecuación de una parábola en su forma canónica, el primer paso estratégico para determinar su orientación (hacia dónde abre) es:', NULL, NULL, 40, NULL, 96);
INSERT INTO public.pregunta VALUES (27, 'Para hallar la ecuación de una parábola vertical que pasa por tres puntos dados, la estrategia fundamental consiste en:', NULL, NULL, 45, NULL, 97);
INSERT INTO public.pregunta VALUES (28, 'Para determinar si una recta es tangente a una parábola, la estrategia algebraica clave es:', NULL, NULL, 50, NULL, 98);
INSERT INTO public.pregunta VALUES (30, 'En problemas de optimización con funciones cuadráticas (ejemplo: maximizar área o minimizar costo), la estrategia clave para encontrar el valor óptimo es:', NULL, NULL, 45, NULL, 99);
INSERT INTO public.pregunta VALUES (31, 'La propiedad de la parábola que la hace útil en antenas parabólicas y faros de automóviles es que:', NULL, NULL, 40, NULL, 99);
INSERT INTO public.pregunta VALUES (32, 'La elipse se define como el conjunto de todos los puntos del plano cuya:', NULL, NULL, 30, NULL, 100);
INSERT INTO public.pregunta VALUES (33, 'En la elipse, la distancia desde el centro hasta uno de los vértices se denomina:', NULL, NULL, 35, NULL, 100);
INSERT INTO public.pregunta VALUES (34, 'Una propiedad importante de la elipse que tiene aplicaciones en medicina y acústica es que:', NULL, NULL, 40, NULL, 100);
INSERT INTO public.pregunta VALUES (36, 'Dada la ecuación de una elipse en su forma canónica, el primer paso estratégico para determinar si es horizontal o vertical es:', NULL, NULL, 45, NULL, 101);
INSERT INTO public.pregunta VALUES (37, 'La hipérbola se define como el conjunto de todos los puntos del plano cuya:', NULL, NULL, 30, NULL, 102);
INSERT INTO public.pregunta VALUES (38, 'En la hipérbola, las rectas que se aproximan a las ramas de la curva pero nunca la tocan se denominan:', NULL, NULL, 35, NULL, 102);
INSERT INTO public.pregunta VALUES (39, 'Una diferencia fundamental entre la elipse y la hipérbola es que:', NULL, NULL, 45, NULL, 102);
INSERT INTO public.pregunta VALUES (41, 'Para graficar una hipérbola correctamente, las asíntotas se obtienen a partir de la ecuación:', NULL, NULL, 45, NULL, 103);
INSERT INTO public.pregunta VALUES (49, 'Una de las leyes de De Morgan establece que el complemento de la unión de dos conjuntos es igual a:', NULL, NULL, 45, NULL, 108);
INSERT INTO public.pregunta VALUES (50, 'La ley distributiva de la unión sobre la intersección establece que:', NULL, NULL, 50, NULL, 108);
INSERT INTO public.pregunta VALUES (51, 'Para resolver un problema de cardinalidad con tres conjuntos (A, B, C), la fórmula del principio de inclusión-exclusión es:', NULL, NULL, 50, NULL, 109);
INSERT INTO public.pregunta VALUES (45, 'El conjunto denotado por $\emptyset$ se caracteriza por:', NULL, NULL, 25, NULL, 106);
INSERT INTO public.pregunta VALUES (3, 'Dadas dos rectas $L_1$ y $L_2$ en el plano, si sus pendientes son iguales $(m_1 = m_2)$ pero sus términos independientes son diferentes $(b_1 ≠ b_2)$, se puede afirmar que:', NULL, NULL, 25, NULL, 84);
INSERT INTO public.pregunta VALUES (6, 'Un estudiante necesita hallar la ecuación de una recta que pasa por el punto $(2, -3)$ y tiene $m=4$. La estrategia más rápida y directa es:', NULL, NULL, 35, NULL, 85);
INSERT INTO public.pregunta VALUES (7, 'La ecuación general de la recta $Ax + By + C = 0$ tiene la ventaja fundamental de que:', NULL, NULL, 35, NULL, 85);
INSERT INTO public.pregunta VALUES (16, 'La principal ventaja de expresar una circunferencia en su forma general $Ax^2 + By^2 + Dx + Ey + F = 0$ es:', NULL, NULL, 40, NULL, 90);
INSERT INTO public.pregunta VALUES (21, 'La recta tangente a una circunferencia en un punto $P$ tiene la propiedad de ser:', NULL, NULL, 30, NULL, 94);
INSERT INTO public.pregunta VALUES (52, 'El dominio de una función real $f(x)$ se define como:', NULL, NULL, 30, NULL, 110);
INSERT INTO public.pregunta VALUES (53, 'Una función $f: A → B$ es inyectiva (uno a uno) si:', NULL, NULL, 40, NULL, 110);
INSERT INTO public.pregunta VALUES (58, 'La regla de la cadena en derivación se utiliza cuando:', NULL, NULL, 40, NULL, 112);
INSERT INTO public.pregunta VALUES (61, 'El Teorema Fundamental del Cálculo establece que la derivada de la integral de una función es:', NULL, NULL, 45, NULL, 113);
INSERT INTO public.pregunta VALUES (64, 'Para resolver un sistema de ecuaciones lineales con dos incógnitas, el método más eficiente cuando los coeficientes de una incógnita son iguales o fácilmente igualables es:', NULL, NULL, 35, NULL, 116);
INSERT INTO public.pregunta VALUES (65, 'Al resolver una inecuación, ¿qué sucede cuando se multiplica o divide ambos lados por un número negativo?', NULL, NULL, 30, NULL, 117);
INSERT INTO public.pregunta VALUES (67, 'Para resolver un triángulo oblicuángulo (que no es rectángulo) cuando se conocen dos lados y el ángulo comprendido entre ellos (LAL), se debe usar estratégicamente:', NULL, NULL, 40, NULL, 119);
INSERT INTO public.pregunta VALUES (69, 'La diferencia fundamental entre una progresión aritmética (PA) y una progresión geométrica (PG) es que:', NULL, NULL, 30, NULL, 121);
INSERT INTO public.pregunta VALUES (71, 'Al enfrentar un examen de opción múltiple con un temporizador corto, la estrategia más efectiva después de leer el enunciado es:', NULL, NULL, 45, NULL, 122);
INSERT INTO public.pregunta VALUES (8, 'Para calcular la distancia de un punto $P(x_1, y_1)$ a una recta $L$, la estrategia fundamental que no puede omitirse es:', NULL, NULL, 45, NULL, 87);
INSERT INTO public.pregunta VALUES (10, 'Para calcular la distancia entre dos rectas paralelas $L_1$ y $L_2$, la estrategia más eficiente (que evita hacer dos cálculos de distancia) consiste en:', NULL, NULL, 45, NULL, 88);
INSERT INTO public.pregunta VALUES (14, 'En la ecuación ordinaria de la circunferencia: $(x - h)^2 + (y - k)^2 = r^2$, el parámetro $r$ debe cumplir la condición:', NULL, NULL, 35, NULL, 90);
INSERT INTO public.pregunta VALUES (15, 'Dada la ecuación general de la circunferencia: $x^2 + y^2 + Dx + Ey + F = 0$, el primer paso estratégico para encontrar su centro y radio es:', NULL, NULL, 40, NULL, 90);
INSERT INTO public.pregunta VALUES (23, 'En la ecuación de la parábola vertical $(x - h)^2 = 4p(y - k)$, el parámetro $p$ representa:', NULL, NULL, 35, NULL, 95);
INSERT INTO public.pregunta VALUES (26, 'En la ecuación de la parábola $(y - 2)^2 = 8(x + 3)$, las coordenadas del vértice son:', NULL, NULL, 40, NULL, 96);
INSERT INTO public.pregunta VALUES (48, 'La operación $A - B$ (diferencia) representa:', NULL, NULL, 30, NULL, 107);
INSERT INTO public.pregunta VALUES (54, 'El concepto de límite de una función $f(x)$ cuando $x$ tiende a un valor $a$ se refiere a:', NULL, NULL, 35, NULL, 111);
INSERT INTO public.pregunta VALUES (57, 'La derivada de una función $f(x)$ en un punto $x = a$, denotada como $f''(a)$, geométricamente representa:', NULL, NULL, 35, NULL, 112);
INSERT INTO public.pregunta VALUES (59, 'Los puntos críticos de una función $f(x)$ son aquellos donde:', NULL, NULL, 35, NULL, 112);
INSERT INTO public.pregunta VALUES (63, 'La identidad $(a + b)^2 = a^2 + 2ab + b^2$ es conocida como el cuadrado de un binomio. Un error común al aplicarla es:', NULL, NULL, 30, NULL, 115);
INSERT INTO public.pregunta VALUES (66, 'Para resolver la ecuación exponencial $2^x = 5$, la estrategia fundamental es:', NULL, NULL, 40, NULL, 118);
INSERT INTO public.pregunta VALUES (70, 'El desarrollo de $(x + y)^n$ utilizando el Binomio de Newton tiene la forma:', NULL, NULL, 45, NULL, 121);
INSERT INTO public.pregunta VALUES (4, 'La pendiente de una recta y su ángulo de inclinación ($\theta$) se relacionan mediante la expresión $m = \tan(\theta)$. Si una recta tiene pendiente $m = 1$, se puede afirmar que su ángulo de inclinación es:', NULL, NULL, 30, NULL, 84);
INSERT INTO public.pregunta VALUES (29, 'En la función cuadrática $f(x) = ax^2 + bx + c$ (con $a \neq 0$), el vértice de la parábola representa:', NULL, NULL, 35, NULL, 99);
INSERT INTO public.pregunta VALUES (35, 'En la ecuación canónica de la elipse horizontal con centro en el origen: $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$, la relación correcta entre $a$, $b$ y $c$ (distancia focal) es:', NULL, NULL, 40, NULL, 101);
INSERT INTO public.pregunta VALUES (40, 'En la ecuación canónica de la hipérbola horizontal con centro en el origen: $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$, las coordenadas de los vértices son:', NULL, NULL, 40, NULL, 103);
INSERT INTO public.pregunta VALUES (42, 'La diferencia fundamental entre los símbolos $\in$ (pertenencia) y $\subseteq$ (inclusión) es que:', NULL, NULL, 30, NULL, 104);
INSERT INTO public.pregunta VALUES (43, 'En un diagrama de Venn, la región sombreada que representa la intersección de dos conjuntos $A$ y $B$ ($A \cap B$) corresponde a:', NULL, NULL, 25, NULL, 104);
INSERT INTO public.pregunta VALUES (44, 'El conjunto $A = \{x \in \mathbb{N} \mid x \text{ es par y } x \leq 10\}$ expresado por extensión es:', NULL, NULL, 35, NULL, 105);
INSERT INTO public.pregunta VALUES (46, 'Si $A \subseteq B$ y $B \subseteq A$, entonces se cumple que:', NULL, NULL, 35, NULL, 106);
INSERT INTO public.pregunta VALUES (47, 'Dados dos conjuntos $A$ y $B$, la operación $A \cup B$ (unión) se define como el conjunto de:', NULL, NULL, 30, NULL, 107);
INSERT INTO public.pregunta VALUES (55, 'Al calcular un límite y obtener la forma indeterminada $\frac{0}{0}$, la estrategia más común para resolverlo es:', NULL, NULL, 45, NULL, 111);
INSERT INTO public.pregunta VALUES (56, 'El límite lateral por la izquierda de $f(x)$ cuando $x \to a^-$ se refiere a:', NULL, NULL, 35, NULL, 111);
INSERT INTO public.pregunta VALUES (60, 'La integral definida de una función $f(x)$ en el intervalo $[a, b]$, denotada como $\int_a^b f(x)\, dx$, geométricamente representa:', NULL, NULL, 35, NULL, 113);
INSERT INTO public.pregunta VALUES (62, 'La propiedad de los exponentes que establece que $(a^m)^n = a^{m \cdot n}$ es válida siempre que:', NULL, NULL, 35, NULL, 114);
INSERT INTO public.pregunta VALUES (68, 'La identidad trigonométrica fundamental $\text{sen}^2\theta + \cos^2\theta = 1$ es especialmente útil porque:', NULL, NULL, 35, NULL, 120);


--
-- TOC entry 5280 (class 0 OID 28902)
-- Dependencies: 254
-- Data for Name: respuesta; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.respuesta VALUES (1, 5, false);
INSERT INTO public.respuesta VALUES (1, 10, false);
INSERT INTO public.respuesta VALUES (2, 5, false);
INSERT INTO public.respuesta VALUES (2, 10, false);
INSERT INTO public.respuesta VALUES (3, 5, false);
INSERT INTO public.respuesta VALUES (3, 10, false);
INSERT INTO public.respuesta VALUES (4, 1, false);
INSERT INTO public.respuesta VALUES (4, 8, false);
INSERT INTO public.respuesta VALUES (4, 10, false);
INSERT INTO public.respuesta VALUES (4, 13, false);
INSERT INTO public.respuesta VALUES (4, 18, false);
INSERT INTO public.respuesta VALUES (4, 21, false);
INSERT INTO public.respuesta VALUES (4, 28, true);
INSERT INTO public.respuesta VALUES (4, 29, false);
INSERT INTO public.respuesta VALUES (4, 33, false);
INSERT INTO public.respuesta VALUES (4, 39, false);
INSERT INTO public.respuesta VALUES (5, 4, true);
INSERT INTO public.respuesta VALUES (5, 7, true);
INSERT INTO public.respuesta VALUES (5, 11, true);
INSERT INTO public.respuesta VALUES (5, 16, true);
INSERT INTO public.respuesta VALUES (5, 20, true);
INSERT INTO public.respuesta VALUES (5, 24, true);
INSERT INTO public.respuesta VALUES (5, 28, true);
INSERT INTO public.respuesta VALUES (5, 32, true);
INSERT INTO public.respuesta VALUES (5, 35, false);
INSERT INTO public.respuesta VALUES (5, 39, false);
INSERT INTO public.respuesta VALUES (6, 2, false);
INSERT INTO public.respuesta VALUES (6, 6, false);
INSERT INTO public.respuesta VALUES (6, 10, false);
INSERT INTO public.respuesta VALUES (6, 13, false);
INSERT INTO public.respuesta VALUES (6, 17, false);
INSERT INTO public.respuesta VALUES (6, 23, false);
INSERT INTO public.respuesta VALUES (6, 27, false);
INSERT INTO public.respuesta VALUES (6, 29, false);
INSERT INTO public.respuesta VALUES (6, 34, false);
INSERT INTO public.respuesta VALUES (6, 38, false);
INSERT INTO public.respuesta VALUES (7, 36, true);
INSERT INTO public.respuesta VALUES (7, 1, false);
INSERT INTO public.respuesta VALUES (7, 30, false);
INSERT INTO public.respuesta VALUES (7, 19, false);
INSERT INTO public.respuesta VALUES (7, 5, false);
INSERT INTO public.respuesta VALUES (7, 12, false);
INSERT INTO public.respuesta VALUES (7, 22, false);
INSERT INTO public.respuesta VALUES (7, 39, false);
INSERT INTO public.respuesta VALUES (7, 26, false);
INSERT INTO public.respuesta VALUES (7, 15, false);
INSERT INTO public.respuesta VALUES (8, 5, false);
INSERT INTO public.respuesta VALUES (8, 11, true);
INSERT INTO public.respuesta VALUES (8, 30, false);
INSERT INTO public.respuesta VALUES (8, 25, false);
INSERT INTO public.respuesta VALUES (8, 16, true);
INSERT INTO public.respuesta VALUES (8, 24, true);
INSERT INTO public.respuesta VALUES (8, 3, false);
INSERT INTO public.respuesta VALUES (9, 59, true);
INSERT INTO public.respuesta VALUES (9, 47, true);
INSERT INTO public.respuesta VALUES (9, 78, true);
INSERT INTO public.respuesta VALUES (9, 74, true);
INSERT INTO public.respuesta VALUES (9, 71, false);
INSERT INTO public.respuesta VALUES (9, 49, false);
INSERT INTO public.respuesta VALUES (9, 54, true);
INSERT INTO public.respuesta VALUES (9, 63, false);
INSERT INTO public.respuesta VALUES (9, 44, false);
INSERT INTO public.respuesta VALUES (9, 66, true);
INSERT INTO public.respuesta VALUES (10, 278, true);
INSERT INTO public.respuesta VALUES (10, 261, false);
INSERT INTO public.respuesta VALUES (10, 241, false);
INSERT INTO public.respuesta VALUES (10, 273, false);
INSERT INTO public.respuesta VALUES (10, 259, false);
INSERT INTO public.respuesta VALUES (10, 253, false);
INSERT INTO public.respuesta VALUES (10, 270, false);
INSERT INTO public.respuesta VALUES (10, 251, true);
INSERT INTO public.respuesta VALUES (10, 265, false);
INSERT INTO public.respuesta VALUES (10, 245, true);
INSERT INTO public.respuesta VALUES (11, 31, false);
INSERT INTO public.respuesta VALUES (11, 23, false);
INSERT INTO public.respuesta VALUES (11, 39, false);
INSERT INTO public.respuesta VALUES (11, 36, true);
INSERT INTO public.respuesta VALUES (11, 26, false);
INSERT INTO public.respuesta VALUES (11, 18, false);
INSERT INTO public.respuesta VALUES (11, 3, false);
INSERT INTO public.respuesta VALUES (12, 122, true);
INSERT INTO public.respuesta VALUES (12, 127, true);
INSERT INTO public.respuesta VALUES (12, 135, false);
INSERT INTO public.respuesta VALUES (12, 130, true);
INSERT INTO public.respuesta VALUES (12, 139, true);
INSERT INTO public.respuesta VALUES (12, 142, true);
INSERT INTO public.respuesta VALUES (12, 158, true);
INSERT INTO public.respuesta VALUES (12, 150, true);
INSERT INTO public.respuesta VALUES (12, 146, true);
INSERT INTO public.respuesta VALUES (12, 156, false);
INSERT INTO public.respuesta VALUES (13, 278, true);
INSERT INTO public.respuesta VALUES (13, 243, true);
INSERT INTO public.respuesta VALUES (13, 269, true);
INSERT INTO public.respuesta VALUES (13, 274, true);
INSERT INTO public.respuesta VALUES (13, 262, true);
INSERT INTO public.respuesta VALUES (13, 251, true);
INSERT INTO public.respuesta VALUES (13, 245, true);
INSERT INTO public.respuesta VALUES (13, 268, false);
INSERT INTO public.respuesta VALUES (13, 258, true);
INSERT INTO public.respuesta VALUES (13, 255, true);
INSERT INTO public.respuesta VALUES (14, 162, false);
INSERT INTO public.respuesta VALUES (14, 169, true);
INSERT INTO public.respuesta VALUES (14, 167, true);
INSERT INTO public.respuesta VALUES (14, 192, false);
INSERT INTO public.respuesta VALUES (14, 174, true);
INSERT INTO public.respuesta VALUES (14, 194, false);
INSERT INTO public.respuesta VALUES (14, 182, true);
INSERT INTO public.respuesta VALUES (14, 179, true);
INSERT INTO public.respuesta VALUES (15, 234, true);
INSERT INTO public.respuesta VALUES (15, 202, true);
INSERT INTO public.respuesta VALUES (15, 223, true);
INSERT INTO public.respuesta VALUES (15, 210, true);
INSERT INTO public.respuesta VALUES (15, 237, true);
INSERT INTO public.respuesta VALUES (15, 229, false);
INSERT INTO public.respuesta VALUES (15, 205, true);
INSERT INTO public.respuesta VALUES (15, 214, true);
INSERT INTO public.respuesta VALUES (15, 227, true);
INSERT INTO public.respuesta VALUES (15, 218, true);
INSERT INTO public.respuesta VALUES (16, 85, true);
INSERT INTO public.respuesta VALUES (16, 83, true);
INSERT INTO public.respuesta VALUES (16, 96, false);
INSERT INTO public.respuesta VALUES (16, 113, false);
INSERT INTO public.respuesta VALUES (16, 100, false);
INSERT INTO public.respuesta VALUES (16, 105, false);
INSERT INTO public.respuesta VALUES (16, 91, false);
INSERT INTO public.respuesta VALUES (16, 102, true);
INSERT INTO public.respuesta VALUES (16, 111, false);
INSERT INTO public.respuesta VALUES (16, 117, true);
INSERT INTO public.respuesta VALUES (17, 4, true);
INSERT INTO public.respuesta VALUES (17, 16, true);
INSERT INTO public.respuesta VALUES (17, 32, true);
INSERT INTO public.respuesta VALUES (17, 20, true);
INSERT INTO public.respuesta VALUES (17, 12, false);
INSERT INTO public.respuesta VALUES (17, 24, true);
INSERT INTO public.respuesta VALUES (17, 35, false);
INSERT INTO public.respuesta VALUES (17, 28, true);
INSERT INTO public.respuesta VALUES (17, 40, true);
INSERT INTO public.respuesta VALUES (17, 7, true);
INSERT INTO public.respuesta VALUES (18, 122, true);
INSERT INTO public.respuesta VALUES (18, 159, false);
INSERT INTO public.respuesta VALUES (18, 136, false);
INSERT INTO public.respuesta VALUES (18, 141, false);
INSERT INTO public.respuesta VALUES (18, 128, false);
INSERT INTO public.respuesta VALUES (18, 131, false);
INSERT INTO public.respuesta VALUES (18, 139, true);
INSERT INTO public.respuesta VALUES (18, 153, true);
INSERT INTO public.respuesta VALUES (18, 149, false);
INSERT INTO public.respuesta VALUES (18, 148, false);
INSERT INTO public.respuesta VALUES (19, 36, true);
INSERT INTO public.respuesta VALUES (19, 29, false);
INSERT INTO public.respuesta VALUES (19, 17, false);
INSERT INTO public.respuesta VALUES (19, 16, true);
INSERT INTO public.respuesta VALUES (19, 4, true);
INSERT INTO public.respuesta VALUES (19, 40, true);
INSERT INTO public.respuesta VALUES (19, 7, true);
INSERT INTO public.respuesta VALUES (19, 26, false);
INSERT INTO public.respuesta VALUES (19, 10, false);
INSERT INTO public.respuesta VALUES (19, 22, false);


--
-- TOC entry 5286 (class 0 OID 28944)
-- Dependencies: 260
-- Data for Name: semana; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.semana VALUES (1, 1, '2026-02-02', '2026-02-06', 1, 'Semana Hábil');
INSERT INTO public.semana VALUES (2, 2, '2026-02-09', '2026-02-13', 1, 'Semana Hábil');
INSERT INTO public.semana VALUES (3, 3, '2026-02-16', '2026-02-20', 1, 'Semana Hábil');
INSERT INTO public.semana VALUES (4, 4, '2026-02-23', '2026-02-27', 1, 'Semana Hábil');
INSERT INTO public.semana VALUES (5, 5, '2026-03-02', '2026-03-06', 1, 'Semana Hábil');
INSERT INTO public.semana VALUES (6, 6, '2026-03-09', '2026-03-13', 1, 'Semana Hábil');
INSERT INTO public.semana VALUES (7, 7, '2026-03-16', '2026-03-20', 1, 'Semana Hábil');
INSERT INTO public.semana VALUES (8, 8, '2026-03-23', '2026-03-27', 1, 'Semana Hábil');
INSERT INTO public.semana VALUES (9, 9, '2026-03-30', '2026-04-03', 1, 'Semana Hábil');
INSERT INTO public.semana VALUES (10, 10, '2026-04-06', '2026-04-10', 1, 'Semana Hábil');
INSERT INTO public.semana VALUES (11, 11, '2026-04-13', '2026-04-17', 1, 'Semana Hábil');
INSERT INTO public.semana VALUES (12, 12, '2026-04-20', '2026-04-24', 1, 'Semana Hábil');
INSERT INTO public.semana VALUES (13, 13, '2026-04-27', '2026-05-01', 1, 'Semana Hábil');
INSERT INTO public.semana VALUES (14, 14, '2026-05-04', '2026-05-08', 1, 'Semana Hábil');
INSERT INTO public.semana VALUES (15, 15, '2026-05-11', '2026-05-15', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (16, 16, '2026-05-18', '2026-05-22', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (17, 17, '2026-05-25', '2026-05-29', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (18, 18, '2026-06-01', '2026-06-05', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (19, 19, '2026-06-08', '2026-06-12', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (20, 20, '2026-06-15', '2026-06-19', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (21, 21, '2026-06-22', '2026-06-26', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (22, 22, '2026-06-29', '2026-07-03', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (25, 25, '2026-07-20', '2026-07-24', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (26, 26, '2026-07-27', '2026-07-31', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (27, 27, '2026-08-03', '2026-08-07', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (28, 28, '2026-08-10', '2026-08-14', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (29, 29, '2026-08-17', '2026-08-21', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (30, 30, '2026-08-24', '2026-08-28', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (31, 31, '2026-08-31', '2026-08-31', 2, 'Semana Hábil');
INSERT INTO public.semana VALUES (32, 32, '2026-09-01', '2026-09-04', 3, 'Semana Hábil');
INSERT INTO public.semana VALUES (33, 33, '2026-09-07', '2026-09-11', 3, 'Semana Hábil');
INSERT INTO public.semana VALUES (34, 34, '2026-09-14', '2026-09-18', 3, 'Semana Hábil');
INSERT INTO public.semana VALUES (35, 35, '2026-09-21', '2026-09-25', 3, 'Semana Hábil');
INSERT INTO public.semana VALUES (36, 36, '2026-09-28', '2026-10-02', 3, 'Semana Hábil');
INSERT INTO public.semana VALUES (37, 37, '2026-10-05', '2026-10-09', 3, 'Semana Hábil');
INSERT INTO public.semana VALUES (38, 38, '2026-10-12', '2026-10-16', 3, 'Semana Hábil');
INSERT INTO public.semana VALUES (39, 39, '2026-10-19', '2026-10-23', 3, 'Semana Hábil');
INSERT INTO public.semana VALUES (40, 40, '2026-10-26', '2026-10-30', 3, 'Semana Hábil');
INSERT INTO public.semana VALUES (41, 41, '2026-11-02', '2026-11-06', 3, 'Semana Hábil');
INSERT INTO public.semana VALUES (42, 42, '2026-11-09', '2026-11-13', 3, 'Semana Hábil');
INSERT INTO public.semana VALUES (43, 43, '2026-11-16', '2026-11-20', 3, 'Semana Hábil');
INSERT INTO public.semana VALUES (44, 44, '2026-11-23', '2026-11-27', 3, 'Semana Hábil');
INSERT INTO public.semana VALUES (45, 45, '2026-11-30', '2026-12-02', 3, 'Semana Hábil');
INSERT INTO public.semana VALUES (23, 23, '2026-07-06', '2026-07-10', 2, 'Descanso Pedagógico');
INSERT INTO public.semana VALUES (24, 24, '2026-07-13', '2026-07-17', 2, 'Descanso Pedagógico');


--
-- TOC entry 5246 (class 0 OID 28558)
-- Dependencies: 220
-- Data for Name: subdir_dep; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.subdir_dep VALUES (8);


--
-- TOC entry 5284 (class 0 OID 28930)
-- Dependencies: 258
-- Data for Name: trimestre; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.trimestre VALUES (1, 'Primer Trimestre', 1, '2026-02-02', '2026-05-08', 4);
INSERT INTO public.trimestre VALUES (2, 'Segundo Trimestre', 2, '2026-05-11', '2026-08-31', 4);
INSERT INTO public.trimestre VALUES (3, 'Tercer Trimestre', 3, '2026-09-01', '2026-12-02', 4);
INSERT INTO public.trimestre VALUES (4, 'Primer Trimestre', 1, '2027-02-01', '2027-04-30', 5);
INSERT INTO public.trimestre VALUES (5, 'Segundo Trimestre', 2, '2027-05-01', '2027-07-31', 5);
INSERT INTO public.trimestre VALUES (6, 'Tercer Trimestre', 3, '2027-08-01', '2027-11-30', 5);
INSERT INTO public.trimestre VALUES (7, 'Primer Trimestre', 1, '2028-02-01', '2028-04-30', 6);
INSERT INTO public.trimestre VALUES (8, 'Segundo Trimestre', 2, '2028-05-01', '2028-07-31', 6);
INSERT INTO public.trimestre VALUES (9, 'Tercer Trimestre', 3, '2028-08-01', '2028-11-30', 6);


--
-- TOC entry 5256 (class 0 OID 28653)
-- Dependencies: 230
-- Data for Name: ue; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ue VALUES (2, 'Akjerana', 6, NULL, 'LPach80720025', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (3, 'Antofagasta', 19, NULL, 'LPach80720050', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (4, 'Bautista Saavedra', 40, NULL, 'LPach80720047', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (5, 'Belen B', 11, NULL, 'LPach80720120', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (6, 'Casamaya', 16, NULL, 'LPach80720163', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (7, 'Challuyo Secundario', 16, NULL, 'LPach80720215', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (8, 'Cocotoni', 8, NULL, 'LPach80720078', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (9, 'Cohuani', 5, NULL, 'LPach80720193', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (10, 'Don Bosco De Chijipina Chico', 18, NULL, 'LPach80720051', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (11, 'Don Bosco De Villa Lealtad', 25, NULL, 'LPach80720210', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (12, 'Elizardo Perez - Warisata', 34, NULL, 'LPach80720171', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (13, 'Eufracio Ibañez', 10, NULL, 'LPach80720048', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (14, 'Frasquia', 10, NULL, 'LPach80720167', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (15, 'Franz Tamayo De Humacha', 24, NULL, 'LPach80720174', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (16, 'Gral. Juan Jose Torrez Gonzales', 19, NULL, 'LPach80720049', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (17, 'Gualberto Villarroel', 10, NULL, 'LPach80720121', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (18, 'Jaime Escalante', 9, NULL, 'LPach80720169', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (19, 'Japuraya Alta', 5, NULL, 'LPach80720024', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (20, 'Jose Antonio Plancarte', 38, NULL, 'LPach80720214', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (21, 'Las Americas', 17, NULL, 'LPach80720056', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (22, 'Mcal. Antonio Jose De Sucre', 13, NULL, 'LPach80720075', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (23, 'Mcal. Santa Cruz', 31, NULL, 'LPach80720002', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (24, 'Morocollo Apuvillqui', 5, NULL, 'LPach80720062', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (25, 'Murumamani', 12, NULL, 'LPach80720177', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (26, 'Nacional De Tahari', 7, NULL, 'LPach80720172', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (27, 'Nacional De Watari', 9, NULL, 'LPach80720036', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (28, 'Omasuyos Secundario', 60, NULL, 'LPach80720181', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (29, 'Pajchani Grande', 4, NULL, 'LPach80720067', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (30, 'Pongonhuyo', 11, NULL, 'LPach80720191', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (31, 'Rvdo. Padre Luis Espinal', 14, NULL, 'LPach80720044', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (32, 'San Simon De Ayacucho', 16, NULL, 'LPach80720022', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (33, 'Simon Bolivar', 20, NULL, 'LPach80720019', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (34, 'Simon Bolivar De Achacachi', 19, NULL, 'LPach80720052', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (35, 'Suñasihui', 5, NULL, 'LPach80720207', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (36, 'Tacamara B', 20, NULL, 'LPach80720173', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (37, 'Umapusa', 8, NULL, 'LPach80720144', NULL, NULL, NULL, 2, NULL);
INSERT INTO public.ue VALUES (38, 'Achocalla', 30, NULL, 'LPach50730001', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (39, 'Marcelo Quiroga Santa Cruz', 27, NULL, 'LPach50730002', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (40, 'Mcal. Sucre', 23, NULL, 'LPach50730003', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (41, '16 De Agosto', 14, NULL, 'LPach50730006', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (42, 'Uypaca', 7, NULL, 'LPach50730012', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (43, 'Cañuma', 20, NULL, 'LPach50730013', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (44, 'Villa Layuri', 13, NULL, 'LPach50730019', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (45, 'Amachuma', 34, NULL, 'LPach50730024', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (46, 'Ventilla', 0, NULL, 'LPach50730025', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (47, 'Tuni', 20, NULL, 'LPach50730026', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (48, 'Chañocahua', 55, NULL, 'LPach50730027', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (49, 'Bethsabe Salmon Vda. De Beltran', 17, NULL, 'LPach50730029', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (50, 'Los Angeles', 89, NULL, 'LPach50730035', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (51, 'Emma Vasquez De Arce', 59, NULL, 'LPach50730037', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (52, 'Franz Tamayo', 21, NULL, 'LPach50730039', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (53, 'Kurmi Wasi', 12, NULL, 'LPach50730040', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (54, 'Inti Raymi', 19, NULL, 'LPach50730043', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (55, 'Bolivia', 24, NULL, 'LPach50730044', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (56, 'German Busch Becerra', 0, NULL, 'LPach50730046', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (57, 'Florida', 0, NULL, 'LPach50730047', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (58, 'Franz Tamayo - Uncura', 8, NULL, 'LPach60730032', NULL, NULL, NULL, 3, NULL);
INSERT INTO public.ue VALUES (59, 'Ancoraimes', 41, NULL, 'LPanc70720001', NULL, NULL, NULL, 4, NULL);
INSERT INTO public.ue VALUES (60, 'Cajiata', 6, NULL, 'LPanc70720002', NULL, NULL, NULL, 4, NULL);
INSERT INTO public.ue VALUES (61, 'San Bernardo', 9, NULL, 'LPanc70720003', NULL, NULL, NULL, 4, NULL);
INSERT INTO public.ue VALUES (62, 'Gualberto Villarroel', 13, NULL, 'LPanc70720004', NULL, NULL, NULL, 4, NULL);
INSERT INTO public.ue VALUES (63, 'Pacoma', 7, NULL, 'LPanc70720005', NULL, NULL, NULL, 4, NULL);
INSERT INTO public.ue VALUES (64, 'Villa Macamaca', 24, NULL, 'LPanc70720006', NULL, NULL, NULL, 4, NULL);
INSERT INTO public.ue VALUES (65, 'Bolivariano Pocoata Grande', 9, NULL, 'LPanc70720023', NULL, NULL, NULL, 4, NULL);
INSERT INTO public.ue VALUES (66, 'Julian Apaza De Chinchaya', 9, NULL, 'LPanc70720025', NULL, NULL, NULL, 4, NULL);
INSERT INTO public.ue VALUES (67, 'Inca Huayna Capac', 7, NULL, 'LPanc70720036', NULL, NULL, NULL, 4, NULL);
INSERT INTO public.ue VALUES (68, '6 De Junio', 7, NULL, 'LPanc70720047', NULL, NULL, NULL, 4, NULL);
INSERT INTO public.ue VALUES (69, 'Yuyo Aten', 14, NULL, 'LPapo70680028', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (70, 'Jose Manuel Pando', 46, NULL, 'LPapo80670001', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (71, 'Fatima', 36, NULL, 'LPapo80670002', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (72, 'Luis Oblitas Del Carpio', 11, NULL, 'LPapo80670003', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (73, 'Inca', 11, NULL, 'LPapo80670004', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (74, 'Juan Agua', 10, NULL, 'LPapo80670012', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (75, 'San Pedro', 7, NULL, 'LPapo80670013', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (76, 'Santa Catalina', 3, NULL, 'LPapo80670017', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (77, 'Aten', 8, NULL, 'LPapo80670018', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (78, 'Suturi', 0, NULL, 'LPapo80670019', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (79, 'Huaratumo', 2, NULL, 'LPapo80670020', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (80, 'Irimo', 7, NULL, 'LPapo80670021', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (81, 'Santa Barbara', 8, NULL, 'LPapo80670027', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (82, 'Santa Rosa', 0, NULL, 'LPapo80670035', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (83, 'Pucasucho', 2, NULL, 'LPapo80670036', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (84, 'Curiza', 0, NULL, 'LPapo80670037', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (85, 'Raviana', 3, NULL, 'LPapo80670045', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (86, 'Azariama', 4, NULL, 'LPapo80670048', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (87, 'Suyo Suyo', 0, NULL, 'LPapo80670053', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (88, 'San Fermin', 4, NULL, 'LPapo80670055', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (89, 'Machua', 5, NULL, 'LPapo80670058', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (90, 'Los Altos', 0, NULL, 'LPapo80670059', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (91, 'Apacheta', 12, NULL, 'LPapo80670060', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (92, 'Puchahui', 22, NULL, 'LPapo80670067', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (93, 'Correo', 7, NULL, 'LPapo80670068', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (94, 'Mulihuara', 2, NULL, 'LPapo80670072', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (95, 'Copacabana', 0, NULL, 'LPapo80670073', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (96, 'Nazario Pardo Valle', 31, NULL, 'LPapo80670078', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (97, 'Ilipana Yuyo', 2, NULL, 'LPapo80670081', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (98, 'Jose Miguel Lanza', 9, NULL, 'LPapo80670084', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (99, 'Madidi', 1, NULL, 'LPapo80670088', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (100, 'Yuyo Aten', 0, NULL, 'LPapo80670028', NULL, NULL, NULL, 5, NULL);
INSERT INTO public.ue VALUES (101, 'Memeconi', 7, NULL, 'LPauc60680024', NULL, NULL, NULL, 6, NULL);
INSERT INTO public.ue VALUES (102, 'Yanahuaya', 12, NULL, 'LPauc60690001', NULL, NULL, NULL, 6, NULL);
INSERT INTO public.ue VALUES (103, 'Rosario', 15, NULL, 'LPauc60690005', NULL, NULL, NULL, 6, NULL);
INSERT INTO public.ue VALUES (104, 'Angel Gemio Ergueta', 5, NULL, 'LPauc60690006', NULL, NULL, NULL, 6, NULL);
INSERT INTO public.ue VALUES (105, 'Hugo Camacho', 6, NULL, 'LPauc60690007', NULL, NULL, NULL, 6, NULL);
INSERT INTO public.ue VALUES (106, 'Ticani', 1, NULL, 'LPauc60690012', NULL, NULL, NULL, 6, NULL);
INSERT INTO public.ue VALUES (107, 'Pucara', 12, NULL, 'LPauc60690014', NULL, NULL, NULL, 6, NULL);
INSERT INTO public.ue VALUES (108, '2 De Agosto', 8, NULL, 'LPauc60690016', NULL, NULL, NULL, 6, NULL);
INSERT INTO public.ue VALUES (109, 'Huancanipampa', 6, NULL, 'LPaya70690001', NULL, NULL, NULL, 7, NULL);
INSERT INTO public.ue VALUES (110, 'Nemecio Aliaga Benavente', 8, NULL, 'LPaya70690002', NULL, NULL, NULL, 7, NULL);
INSERT INTO public.ue VALUES (111, 'Llachisquia', 7, NULL, 'LPaya70690011', NULL, NULL, NULL, 7, NULL);
INSERT INTO public.ue VALUES (112, 'Sayhuani', 10, NULL, 'LPaya70690012', NULL, NULL, NULL, 7, NULL);
INSERT INTO public.ue VALUES (113, 'Humanasi', 12, NULL, 'LPaya70690013', NULL, NULL, NULL, 7, NULL);
INSERT INTO public.ue VALUES (114, 'Caquiña', 8, NULL, 'LPaya70690016', NULL, NULL, NULL, 7, NULL);
INSERT INTO public.ue VALUES (115, 'Cuibaja', 8, NULL, 'LPaya70690018', NULL, NULL, NULL, 7, NULL);
INSERT INTO public.ue VALUES (116, 'Villa Rosario', 6, NULL, 'LPaya70690025', NULL, NULL, NULL, 7, NULL);
INSERT INTO public.ue VALUES (117, 'Mcal. Andres De Santa Cruz', 7, NULL, 'LPaya70690027', NULL, NULL, NULL, 7, NULL);
INSERT INTO public.ue VALUES (118, 'Elizardo Perez', 21, NULL, 'LPaya70690029', NULL, NULL, NULL, 7, NULL);
INSERT INTO public.ue VALUES (119, 'Tipuhuaya', 0, NULL, 'LPaya70690031', NULL, NULL, NULL, 7, NULL);
INSERT INTO public.ue VALUES (120, 'Jose Ballivian', 4, NULL, 'LPayo60610003', NULL, NULL, NULL, 8, NULL);
INSERT INTO public.ue VALUES (121, 'Quillcoma Yanamuyo', 7, NULL, 'LPayo60610015', NULL, NULL, NULL, 8, NULL);
INSERT INTO public.ue VALUES (122, 'Nacional De Ayo Ayo', 18, NULL, 'LPayo60610019', NULL, NULL, NULL, 8, NULL);
INSERT INTO public.ue VALUES (123, 'Simon Bolivar', 21, NULL, 'LPayo60610020', NULL, NULL, NULL, 8, NULL);
INSERT INTO public.ue VALUES (124, 'Nacional Topater', 21, NULL, 'LPayo60610021', NULL, NULL, NULL, 8, NULL);
INSERT INTO public.ue VALUES (125, 'Tupac Katari De Cumbre Vilacota', 7, NULL, 'LPayo60610022', NULL, NULL, NULL, 8, NULL);
INSERT INTO public.ue VALUES (126, 'Pomasara', 15, NULL, 'LPayo60610027', NULL, NULL, NULL, 8, NULL);
INSERT INTO public.ue VALUES (127, 'Milliri', 11, NULL, 'LPayo60610028', NULL, NULL, NULL, 8, NULL);
INSERT INTO public.ue VALUES (128, 'Cutusuma', 7, NULL, 'LPbat50620006', NULL, NULL, NULL, 9, NULL);
INSERT INTO public.ue VALUES (129, 'Boliviano Cubano', 32, NULL, 'LPbat60620005', NULL, NULL, NULL, 9, NULL);
INSERT INTO public.ue VALUES (130, 'Cullucachi Ii', 10, NULL, 'LPbat60620009', NULL, NULL, NULL, 9, NULL);
INSERT INTO public.ue VALUES (131, 'Julian Tupac Katari', 15, NULL, 'LPbat60620018', NULL, NULL, NULL, 9, NULL);
INSERT INTO public.ue VALUES (132, 'Republica De Colombia', 16, NULL, 'LPbat60620026', NULL, NULL, NULL, 9, NULL);
INSERT INTO public.ue VALUES (133, 'Chirapaca', 16, NULL, 'LPbat60620029', NULL, NULL, NULL, 9, NULL);
INSERT INTO public.ue VALUES (134, 'Franz Tamayo De Chachacomani', 13, NULL, 'LPbat60620031', NULL, NULL, NULL, 9, NULL);
INSERT INTO public.ue VALUES (135, 'Fray Jose Antonio Zampa', 14, NULL, 'LPbat60620033', NULL, NULL, NULL, 9, NULL);
INSERT INTO public.ue VALUES (136, 'Calasaya', 27, NULL, 'LPbat60620038', NULL, NULL, NULL, 9, NULL);
INSERT INTO public.ue VALUES (137, 'Franz Tamayo De Yaurichambi', 13, NULL, 'LPbat60620051', NULL, NULL, NULL, 9, NULL);
INSERT INTO public.ue VALUES (138, '2 De Agosto', 49, NULL, 'LPbat60620061', NULL, NULL, NULL, 9, NULL);
INSERT INTO public.ue VALUES (139, 'Libertador Simon Bolivar', 20, NULL, 'LPbat60620089', NULL, NULL, NULL, 9, NULL);
INSERT INTO public.ue VALUES (140, 'Alto Peñas', 5, NULL, 'LPbat60620092', NULL, NULL, NULL, 9, NULL);
INSERT INTO public.ue VALUES (141, 'La Lloja', 4, NULL, 'LPcai40650003', NULL, NULL, NULL, 10, NULL);
INSERT INTO public.ue VALUES (142, 'Pucarani', 6, NULL, 'LPcai40650004', NULL, NULL, NULL, 10, NULL);
INSERT INTO public.ue VALUES (143, 'Bolivia', 16, NULL, 'LPcai40650005', NULL, NULL, NULL, 10, NULL);
INSERT INTO public.ue VALUES (144, 'Huichuraya', 4, NULL, 'LPcai40650016', NULL, NULL, NULL, 10, NULL);
INSERT INTO public.ue VALUES (145, 'El Asiento', 16, NULL, 'LPcai40650021', NULL, NULL, NULL, 10, NULL);
INSERT INTO public.ue VALUES (146, 'Araca Torrepampa', 14, NULL, 'LPcai40650023', NULL, NULL, NULL, 10, NULL);
INSERT INTO public.ue VALUES (147, 'Collpani', 17, NULL, 'LPcai40650027', NULL, NULL, NULL, 10, NULL);
INSERT INTO public.ue VALUES (148, 'Sacani Castilloma', 5, NULL, 'LPcai40650033', NULL, NULL, NULL, 10, NULL);
INSERT INTO public.ue VALUES (149, 'Luis Espinal Camps', 10, NULL, 'LPcai40650039', NULL, NULL, NULL, 10, NULL);
INSERT INTO public.ue VALUES (150, 'German Busch Becerra', 27, NULL, 'LPcai40650041', NULL, NULL, NULL, 10, NULL);
INSERT INTO public.ue VALUES (151, 'Vicente Mercado Pardo', 18, NULL, 'LPcai40650045', NULL, NULL, NULL, 10, NULL);
INSERT INTO public.ue VALUES (152, 'Asociada Cañamina', 28, NULL, 'LPcaj60640004', NULL, NULL, NULL, 11, NULL);
INSERT INTO public.ue VALUES (153, 'Turculi', 5, NULL, 'LPcaj60640005', NULL, NULL, NULL, 11, NULL);
INSERT INTO public.ue VALUES (154, 'Villa Libertad', 36, NULL, 'LPcaj60640007', NULL, NULL, NULL, 11, NULL);
INSERT INTO public.ue VALUES (155, 'Asociada Villa Barrientos', 22, NULL, 'LPcaj60640017', NULL, NULL, NULL, 11, NULL);
INSERT INTO public.ue VALUES (156, 'Pedro Domingo Murillo', 6, NULL, 'LPcaj60640023', NULL, NULL, NULL, 11, NULL);
INSERT INTO public.ue VALUES (157, 'Huaritolo', 6, NULL, 'LPcaj60640024', NULL, NULL, NULL, 11, NULL);
INSERT INTO public.ue VALUES (158, 'Siquimirani', 17, NULL, 'LPcaj60640025', NULL, NULL, NULL, 11, NULL);
INSERT INTO public.ue VALUES (159, 'Simon Bolivar', 11, NULL, 'LPcaj60640032', NULL, NULL, NULL, 11, NULL);
INSERT INTO public.ue VALUES (160, 'Circuata Ii', 19, NULL, 'LPcaj60640033', NULL, NULL, NULL, 11, NULL);
INSERT INTO public.ue VALUES (161, 'Miguillas Ii', 24, NULL, 'LPcaj60640037', NULL, NULL, NULL, 11, NULL);
INSERT INTO public.ue VALUES (162, 'Asociada Cajuata', 45, NULL, 'LPcaj60640044', NULL, NULL, NULL, 11, NULL);
INSERT INTO public.ue VALUES (163, 'Tupaltupa', 4, NULL, 'LPcal60710007', NULL, NULL, NULL, 12, NULL);
INSERT INTO public.ue VALUES (164, 'Jorge Zarco Kramer', 8, NULL, 'LPcal60710020', NULL, NULL, NULL, 12, NULL);
INSERT INTO public.ue VALUES (165, 'Eduardo Abaroa', 2, NULL, 'LPcal60710030', NULL, NULL, NULL, 12, NULL);
INSERT INTO public.ue VALUES (166, 'Playa Vinto', 1, NULL, 'LPcal60710052', NULL, NULL, NULL, 12, NULL);
INSERT INTO public.ue VALUES (167, 'Wariscata', 4, NULL, 'LPcal60710055', NULL, NULL, NULL, 12, NULL);
INSERT INTO public.ue VALUES (168, 'Franz Tamayo', 9, NULL, 'LPcal60710056', NULL, NULL, NULL, 12, NULL);
INSERT INTO public.ue VALUES (169, 'Heroes Del Pacifico', 6, NULL, 'LPcal60710057', NULL, NULL, NULL, 12, NULL);
INSERT INTO public.ue VALUES (170, 'Simon Bolivar De Audiencia', 5, NULL, 'LPcal60710059', NULL, NULL, NULL, 12, NULL);
INSERT INTO public.ue VALUES (171, 'Antofagasta B', 6, NULL, 'LPcal60710060', NULL, NULL, NULL, 12, NULL);
INSERT INTO public.ue VALUES (172, 'Simon Bolivar De Calacoto', 4, NULL, 'LPcal60710061', NULL, NULL, NULL, 12, NULL);
INSERT INTO public.ue VALUES (173, 'Chaqueña B', 4, NULL, 'LPcal60710064', NULL, NULL, NULL, 12, NULL);
INSERT INTO public.ue VALUES (174, 'Gualberto Villarroel', 10, NULL, 'LPcal50610001', NULL, NULL, NULL, 13, NULL);
INSERT INTO public.ue VALUES (175, 'Roberto Perez Paton', 26, NULL, 'LPcal50610007', NULL, NULL, NULL, 13, NULL);
INSERT INTO public.ue VALUES (176, 'Porvenir De Cañuma', 12, NULL, 'LPcal50610008', NULL, NULL, NULL, 13, NULL);
INSERT INTO public.ue VALUES (177, 'Vilaque Panamericana', 16, NULL, 'LPcal50610015', NULL, NULL, NULL, 13, NULL);
INSERT INTO public.ue VALUES (178, 'Senkata Alta', 14, NULL, 'LPcal50610016', NULL, NULL, NULL, 13, NULL);
INSERT INTO public.ue VALUES (179, 'San Antonio', 18, NULL, 'LPcal50610017', NULL, NULL, NULL, 13, NULL);
INSERT INTO public.ue VALUES (180, 'Franz Tamayo', 13, NULL, 'LPcal50610022', NULL, NULL, NULL, 13, NULL);
INSERT INTO public.ue VALUES (181, 'Choritotora', 9, NULL, 'LPcal50610023', NULL, NULL, NULL, 13, NULL);
INSERT INTO public.ue VALUES (182, 'German Busch De Caluyo', 13, NULL, 'LPcal50610025', NULL, NULL, NULL, 13, NULL);
INSERT INTO public.ue VALUES (183, 'Juan Jose Torrez', 11, NULL, 'LPcal50610030', NULL, NULL, NULL, 13, NULL);
INSERT INTO public.ue VALUES (184, 'Venezuela De Totorani', 12, NULL, 'LPcal50610035', NULL, NULL, NULL, 13, NULL);
INSERT INTO public.ue VALUES (185, 'Hugo Rafael Chavez Frias', 16, NULL, 'LPcal50610036', NULL, NULL, NULL, 13, NULL);
INSERT INTO public.ue VALUES (186, 'Juan Jose Torrez Gonzales', 3, NULL, 'LPcaq20710014', NULL, NULL, NULL, 14, NULL);
INSERT INTO public.ue VALUES (187, 'Nazacara', 8, NULL, 'LPcaq20710016', NULL, NULL, NULL, 14, NULL);
INSERT INTO public.ue VALUES (188, 'Nacional De Caquiaviri', 8, NULL, 'LPcaq70710002', NULL, NULL, NULL, 14, NULL);
INSERT INTO public.ue VALUES (189, 'Nacional De Achiri', 12, NULL, 'LPcaq70710013', NULL, NULL, NULL, 14, NULL);
INSERT INTO public.ue VALUES (190, 'Nacional De Antaquira Villa Belen', 9, NULL, 'LPcaq70710032', NULL, NULL, NULL, 14, NULL);
INSERT INTO public.ue VALUES (191, 'Antonio Diaz Villamil De Vichaya', 18, NULL, 'LPcaq70710033', NULL, NULL, NULL, 14, NULL);
INSERT INTO public.ue VALUES (192, 'Nacional De Laura Llokolloko', 6, NULL, 'LPcaq70710042', NULL, NULL, NULL, 14, NULL);
INSERT INTO public.ue VALUES (193, 'Nacional De Kasillunca', 6, NULL, 'LPcaq70710047', NULL, NULL, NULL, 14, NULL);
INSERT INTO public.ue VALUES (194, 'Villa Chocorosi', 10, NULL, 'LPcaq70710054', NULL, NULL, NULL, 14, NULL);
INSERT INTO public.ue VALUES (195, 'Bartolina Sisa', 8, NULL, 'LPcaq70710065', NULL, NULL, NULL, 14, NULL);
INSERT INTO public.ue VALUES (196, 'Mcal. Sucre', 12, NULL, 'LPcaq70710068', NULL, NULL, NULL, 14, NULL);
INSERT INTO public.ue VALUES (197, 'Daniel Sanchez Bustamante', 17, NULL, 'LPcar80540008', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (198, 'Eduardo Zuazo Cuenca', 20, NULL, 'LPcar80540011', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (199, 'Libertador Simon Bolivar', 43, NULL, 'LPcar80540013', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (200, 'Rio Mercedes', 11, NULL, 'LPcar80540026', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (201, 'Caserios Nueve', 13, NULL, 'LPcar80540034', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (202, 'San Lorenzo', 16, NULL, 'LPcar80540036', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (203, 'Bajo Israel', 9, NULL, 'LPcar80540042', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (204, 'Cnl. Manchego', 14, NULL, 'LPcar80540048', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (205, 'San Silverio', 10, NULL, 'LPcar80540053', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (206, 'Moscovia', 17, NULL, 'LPcar80540072', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (207, '1ro. De Mayo', 5, NULL, 'LPcar80540074', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (208, 'Villa Alianza', 8, NULL, 'LPcar80540077', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (209, 'Villamontes', 10, NULL, 'LPcar80540092', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (210, 'Nueva Llusta', 5, NULL, 'LPcar80540095', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (211, 'Villa El Carmen', 8, NULL, 'LPcar80540096', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (212, 'San Antonio', 35, NULL, 'LPcar80540099', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (213, 'Mercedes', 6, NULL, 'LPcar80540100', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (214, 'Pedro Domingo Murillo', 21, NULL, 'LPcar80540104', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (215, 'Villa Victoria', 6, NULL, 'LPcar80540107', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (216, 'Flor De Mayo', 0, NULL, 'LPcar80540111', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (217, 'Collasuyo', 12, NULL, 'LPcar80540114', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (218, 'Entre Rios Km. 52', 0, NULL, 'LPcar80540121', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (219, 'Mcal. Andres De Santa Cruz', 11, NULL, 'LPcar80540128', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (220, 'Madre Maria Federica', 93, NULL, 'LPcar80540134', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (221, 'Rene Zenon Portillo Chavarria', 5, NULL, 'LPcar80540135', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (222, 'Uyunense', 5, NULL, 'LPcar80540137', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (223, 'Simon Bolivar I', 4, NULL, 'LPcar80540140', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (224, 'Illimani Los Andes', 11, NULL, 'LPcar80540143', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (225, 'Colorados De Bolivia', 26, NULL, 'LPcar80540155', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (226, 'German Busch De Alcoche', 16, NULL, 'LPcar80540156', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (227, 'Taypiplaya Secundaria', 13, NULL, 'LPcar80540157', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (228, 'Gualberto Villarroel Ii', 8, NULL, 'LPcar80540158', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (229, 'Nacional Caranavi Secundario', 34, NULL, 'LPcar80540160', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (230, 'John Fitzgerald Kennedy Secundario', 96, NULL, 'LPcar80540161', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (231, 'Guillermo Molina Ii', 22, NULL, 'LPcar80540162', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (232, 'Martin Cardenas', 18, NULL, 'LPcar80540163', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (233, 'Max Havelaar', 5, NULL, 'LPcar80540165', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (234, 'Villa El Porvenir', 9, NULL, 'LPcar80540166', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (235, 'Mejillones Ii', 21, NULL, 'LPcar80540169', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (236, 'Vida Y Verdad', 41, NULL, 'LPcar80540173', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (237, 'Adventista Caranavi', 39, NULL, 'LPcar80540180', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (238, 'Bella Vista Ii', 7, NULL, 'LPcar80540181', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (239, 'Caranavi Bolivia', 27, NULL, 'LPcar80540201', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (240, 'Justino Sea Valencia', 8, NULL, 'LPcar80540222', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (241, 'Tupac Katari A', 8, NULL, 'LPcar80540224', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (242, 'Carmelo Nay', 24, NULL, 'LPcar80540234', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (243, 'Broncini De Caranavi', 0, NULL, 'LPcar80540264', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (244, 'Yara Caranavi', 22, NULL, 'LPcar80540265', NULL, NULL, NULL, 15, NULL);
INSERT INTO public.ue VALUES (245, 'Eduardo Abaroa', 20, NULL, 'LPcha40710002', NULL, NULL, NULL, 16, NULL);
INSERT INTO public.ue VALUES (246, 'Rio Blanco', 2, NULL, 'LPcha40710007', NULL, NULL, NULL, 16, NULL);
INSERT INTO public.ue VALUES (247, 'Piñuta', 4, NULL, 'LPcha40710022', NULL, NULL, NULL, 16, NULL);
INSERT INTO public.ue VALUES (248, 'Gualberto Villarroel', 1, NULL, 'LPcha40710025', NULL, NULL, NULL, 16, NULL);
INSERT INTO public.ue VALUES (249, 'Sicuani Tripartito', 2, NULL, 'LPcha40710032', NULL, NULL, NULL, 16, NULL);
INSERT INTO public.ue VALUES (250, 'Buenaventura Alcazar', 9, NULL, 'LPchu80630001', NULL, NULL, NULL, 17, NULL);
INSERT INTO public.ue VALUES (251, 'Crispin Andrade Y Portugal', 15, NULL, 'LPchu80630002', NULL, NULL, NULL, 17, NULL);
INSERT INTO public.ue VALUES (252, 'Huancane B', 17, NULL, 'LPchu80630006', NULL, NULL, NULL, 17, NULL);
INSERT INTO public.ue VALUES (253, 'Juan Ramos De Tajma', 18, NULL, 'LPchu80630007', NULL, NULL, NULL, 17, NULL);
INSERT INTO public.ue VALUES (254, 'Chimasi', 22, NULL, 'LPchu80630009', NULL, NULL, NULL, 17, NULL);
INSERT INTO public.ue VALUES (255, 'Bartolina Sisa', 13, NULL, 'LPchu80630014', NULL, NULL, NULL, 17, NULL);
INSERT INTO public.ue VALUES (256, 'Naranjani', 22, NULL, 'LPchu80630016', NULL, NULL, NULL, 17, NULL);
INSERT INTO public.ue VALUES (257, 'Yarija', 7, NULL, 'LPchu80630020', NULL, NULL, NULL, 17, NULL);
INSERT INTO public.ue VALUES (258, 'Pasto Pata', 30, NULL, 'LPchu80630028', NULL, NULL, NULL, 17, NULL);
INSERT INTO public.ue VALUES (259, 'Cutusuma', 6, NULL, 'LPchu80630035', NULL, NULL, NULL, 17, NULL);
INSERT INTO public.ue VALUES (260, 'Miguel Mercado Encinas', 48, NULL, 'LPchu80630039', NULL, NULL, NULL, 17, NULL);
INSERT INTO public.ue VALUES (261, 'Chajlaya', 5, NULL, 'LPchu80690001', NULL, NULL, NULL, 18, NULL);
INSERT INTO public.ue VALUES (262, 'Churubamba', 0, NULL, 'LPchu80690002', NULL, NULL, NULL, 18, NULL);
INSERT INTO public.ue VALUES (263, 'Gral. Maximiliano Ortiz A', 13, NULL, 'LPchu80690005', NULL, NULL, NULL, 18, NULL);
INSERT INTO public.ue VALUES (264, 'Pocohuaya A', 3, NULL, 'LPchu80690012', NULL, NULL, NULL, 18, NULL);
INSERT INTO public.ue VALUES (265, 'Huallapa', 8, NULL, 'LPchu80690013', NULL, NULL, NULL, 18, NULL);
INSERT INTO public.ue VALUES (266, 'Luquisani', 9, NULL, 'LPchu80690025', NULL, NULL, NULL, 18, NULL);
INSERT INTO public.ue VALUES (267, 'Tahari', 8, NULL, 'LPchu80690028', NULL, NULL, NULL, 18, NULL);
INSERT INTO public.ue VALUES (268, 'Sococoni B', 10, NULL, 'LPchu80690029', NULL, NULL, NULL, 18, NULL);
INSERT INTO public.ue VALUES (269, 'Timusi', 10, NULL, 'LPchu80690034', NULL, NULL, NULL, 18, NULL);
INSERT INTO public.ue VALUES (270, 'Jichuhuaya', 9, NULL, 'LPchu80690039', NULL, NULL, NULL, 18, NULL);
INSERT INTO public.ue VALUES (271, 'Capayque', 18, NULL, 'LPchu80690046', NULL, NULL, NULL, 18, NULL);
INSERT INTO public.ue VALUES (272, 'Uripampa', 16, NULL, 'LPchu80690051', NULL, NULL, NULL, 18, NULL);
INSERT INTO public.ue VALUES (273, 'Nacional Litoral', 67, NULL, 'LPcol30610003', NULL, NULL, NULL, 19, NULL);
INSERT INTO public.ue VALUES (274, 'Eduardo Abaroa', 33, NULL, 'LPcol30610006', NULL, NULL, NULL, 19, NULL);
INSERT INTO public.ue VALUES (275, 'Calama', 13, NULL, 'LPcol30610010', NULL, NULL, NULL, 19, NULL);
INSERT INTO public.ue VALUES (276, 'Adventista San Marcos De Collana', 4, NULL, 'LPcol30610019', NULL, NULL, NULL, 19, NULL);
INSERT INTO public.ue VALUES (277, 'Tcnl. Max Toledo', 32, NULL, 'LPcol30610023', NULL, NULL, NULL, 19, NULL);
INSERT INTO public.ue VALUES (278, 'Tupac Katari', 20, NULL, 'LPcol60610012', NULL, NULL, NULL, 19, NULL);
INSERT INTO public.ue VALUES (279, 'Ajamarca', 2, NULL, 'LPcol50640001', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (280, 'Chillijta', 8, NULL, 'LPcol50640002', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (281, 'Caluyo', 11, NULL, 'LPcol50640006', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (282, 'Aranjuez', 16, NULL, 'LPcol50640014', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (283, 'Caquena', 4, NULL, 'LPcol50640021', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (284, 'Junin B', 46, NULL, 'LPcol50640036', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (285, 'Llanquera', 10, NULL, 'LPcol50640037', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (286, 'Chicote Grande', 0, NULL, 'LPcol50640042', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (287, 'Mohoza', 6, NULL, 'LPcol50640043', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (288, 'Parani', 3, NULL, 'LPcol50640054', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (289, 'Pauca', 4, NULL, 'LPcol50640059', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (290, 'Utavi', 7, NULL, 'LPcol50640064', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (291, 'Pipini', 2, NULL, 'LPcol50640070', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (292, 'Juan Pablo Ii', 3, NULL, 'LPcol50640074', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (293, 'Ladislao Cabrera', 14, NULL, 'LPcol50640080', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (294, 'Carlos Montenegro', 66, NULL, 'LPcol50640083', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (295, 'Aniceto Arce Industrial', 59, NULL, 'LPcol50640084', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (296, 'Pedro Domingo Murillo A', 4, NULL, 'LPcol50640091', NULL, NULL, NULL, 20, NULL);
INSERT INTO public.ue VALUES (297, 'Huaycho', 3, NULL, 'LPcom40680005', NULL, NULL, NULL, 21, NULL);
INSERT INTO public.ue VALUES (298, 'Chiacani', 0, NULL, 'LPcom40680007', NULL, NULL, NULL, 21, NULL);
INSERT INTO public.ue VALUES (299, 'Eduardo Abaroa', 6, NULL, 'LPcom40680011', NULL, NULL, NULL, 21, NULL);
INSERT INTO public.ue VALUES (300, 'Gualberto Villarroel', 6, NULL, 'LPcom40680020', NULL, NULL, NULL, 21, NULL);
INSERT INTO public.ue VALUES (301, 'Nacional De Ticamblaya', 7, NULL, 'LPcom40680023', NULL, NULL, NULL, 21, NULL);
INSERT INTO public.ue VALUES (302, 'Kella Kella Alta', 4, NULL, 'LPcom50710005', NULL, NULL, NULL, 22, NULL);
INSERT INTO public.ue VALUES (303, 'Nacional De Comanche', 25, NULL, 'LPcom50710012', NULL, NULL, NULL, 22, NULL);
INSERT INTO public.ue VALUES (304, 'Tocopilla Cantuyo B', 5, NULL, 'LPcom50710019', NULL, NULL, NULL, 22, NULL);
INSERT INTO public.ue VALUES (305, 'Tuli Grande', 4, NULL, 'LPcom50710020', NULL, NULL, NULL, 22, NULL);
INSERT INTO public.ue VALUES (306, 'Jose Ballivian', 2, NULL, 'LPcom50710021', NULL, NULL, NULL, 22, NULL);
INSERT INTO public.ue VALUES (307, '6 De Junio', 29, NULL, 'LPcop80570002', NULL, NULL, NULL, 23, NULL);
INSERT INTO public.ue VALUES (308, 'Challa Pampa', 9, NULL, 'LPcop80570004', NULL, NULL, NULL, 23, NULL);
INSERT INTO public.ue VALUES (309, 'Challa B', 14, NULL, 'LPcop80570005', NULL, NULL, NULL, 23, NULL);
INSERT INTO public.ue VALUES (310, 'Huacuyo B', 13, NULL, 'LPcop80570026', NULL, NULL, NULL, 23, NULL);
INSERT INTO public.ue VALUES (311, 'Kasani', 10, NULL, 'LPcop80570027', NULL, NULL, NULL, 23, NULL);
INSERT INTO public.ue VALUES (312, 'Republica De Venezuela', 17, NULL, 'LPcop80570034', NULL, NULL, NULL, 23, NULL);
INSERT INTO public.ue VALUES (313, 'Yumani', 10, NULL, 'LPcop80570035', NULL, NULL, NULL, 23, NULL);
INSERT INTO public.ue VALUES (314, 'Copacabana', 55, NULL, 'LPcop80570036', NULL, NULL, NULL, 23, NULL);
INSERT INTO public.ue VALUES (315, 'Siripaca A', 8, NULL, 'LPcop80570037', NULL, NULL, NULL, 23, NULL);
INSERT INTO public.ue VALUES (316, 'Cnl. Felix Rosa Tejada', 54, NULL, 'LPcop80570038', NULL, NULL, NULL, 23, NULL);
INSERT INTO public.ue VALUES (317, 'Villa Rosario De Chissi', 3, NULL, 'LPcop80570041', NULL, NULL, NULL, 23, NULL);
INSERT INTO public.ue VALUES (318, 'Mcal. Andres De Santa Cruz', 36, NULL, 'LPcor70600001', NULL, NULL, NULL, 24, NULL);
INSERT INTO public.ue VALUES (319, 'Cap. Luis Rivero Sanchez', 17, NULL, 'LPcor70600002', NULL, NULL, NULL, 24, NULL);
INSERT INTO public.ue VALUES (320, 'Franz Tamayo De Trinidad Pampa', 48, NULL, 'LPcor70600004', NULL, NULL, NULL, 24, NULL);
INSERT INTO public.ue VALUES (321, 'San Agustin', 16, NULL, 'LPcor70600005', NULL, NULL, NULL, 24, NULL);
INSERT INTO public.ue VALUES (322, 'Felix Ballivian', 27, NULL, 'LPcor70600012', NULL, NULL, NULL, 24, NULL);
INSERT INTO public.ue VALUES (323, 'San Juan', 28, NULL, 'LPcor70600020', NULL, NULL, NULL, 24, NULL);
INSERT INTO public.ue VALUES (324, 'Santiago Tocoroni', 40, NULL, 'LPcor70600024', NULL, NULL, NULL, 24, NULL);
INSERT INTO public.ue VALUES (325, 'Eduardo Abaroa', 71, NULL, 'LPcor70600030', NULL, NULL, NULL, 24, NULL);
INSERT INTO public.ue VALUES (326, 'Elizardo Perez', 13, NULL, 'LPcor70600035', NULL, NULL, NULL, 24, NULL);
INSERT INTO public.ue VALUES (327, 'Pedro Kramer Secundaria', 31, NULL, 'LPcor80710002', NULL, NULL, NULL, 25, NULL);
INSERT INTO public.ue VALUES (328, 'German Busch', 4, NULL, 'LPcor80710006', NULL, NULL, NULL, 25, NULL);
INSERT INTO public.ue VALUES (329, 'Gualberto Villarroel De Sewenkani', 2, NULL, 'LPcor80710010', NULL, NULL, NULL, 25, NULL);
INSERT INTO public.ue VALUES (330, 'Oscar Unzaga De La Vega', 3, NULL, 'LPcor80710015', NULL, NULL, NULL, 25, NULL);
INSERT INTO public.ue VALUES (331, 'Janko Marca Sirpa', 6, NULL, 'LPcor80710018', NULL, NULL, NULL, 25, NULL);
INSERT INTO public.ue VALUES (332, 'Cancasilla', 4, NULL, 'LPcor80710022', NULL, NULL, NULL, 25, NULL);
INSERT INTO public.ue VALUES (333, 'Elizardo Perez', 6, NULL, 'LPcor80710024', NULL, NULL, NULL, 25, NULL);
INSERT INTO public.ue VALUES (334, 'Alfredo Guillen Pinto', 6, NULL, 'LPcor80710031', NULL, NULL, NULL, 25, NULL);
INSERT INTO public.ue VALUES (335, 'Anco Aque', 12, NULL, 'LPcor80710032', NULL, NULL, NULL, 25, NULL);
INSERT INTO public.ue VALUES (336, 'Pedro Domingo Murillo De Tomata', 7, NULL, 'LPcor80710036', NULL, NULL, NULL, 25, NULL);
INSERT INTO public.ue VALUES (337, 'Pedro Domingo Murillo', 13, NULL, 'LPcor80710038', NULL, NULL, NULL, 25, NULL);
INSERT INTO public.ue VALUES (338, 'Republica Del Japon', 5, NULL, 'LPcor80710042', NULL, NULL, NULL, 25, NULL);
INSERT INTO public.ue VALUES (339, 'Antofagasta', 26, NULL, 'LPcor80710046', NULL, NULL, NULL, 25, NULL);
INSERT INTO public.ue VALUES (340, 'Felix Reyes Ortiz', 23, NULL, 'LPcor80600001', NULL, NULL, NULL, 26, NULL);
INSERT INTO public.ue VALUES (341, 'Guerrilleros Lanza Fe Y Alegria', 69, NULL, 'LPcor80600005', NULL, NULL, NULL, 26, NULL);
INSERT INTO public.ue VALUES (342, 'Cruz Loma', 44, NULL, 'LPcor80600006', NULL, NULL, NULL, 26, NULL);
INSERT INTO public.ue VALUES (343, 'San Pablo', 9, NULL, 'LPcor80600012', NULL, NULL, NULL, 26, NULL);
INSERT INTO public.ue VALUES (344, 'Pacallo', 23, NULL, 'LPcor80600019', NULL, NULL, NULL, 26, NULL);
INSERT INTO public.ue VALUES (345, 'Franz Tamayo', 21, NULL, 'LPcor80600024', NULL, NULL, NULL, 26, NULL);
INSERT INTO public.ue VALUES (346, 'Villa Rosario', 17, NULL, 'LPcor80600026', NULL, NULL, NULL, 26, NULL);
INSERT INTO public.ue VALUES (347, 'San Francisco Xavier', 13, NULL, 'LPcor80600035', NULL, NULL, NULL, 26, NULL);
INSERT INTO public.ue VALUES (348, 'Challa', 25, NULL, 'LPcor80600037', NULL, NULL, NULL, 26, NULL);
INSERT INTO public.ue VALUES (349, 'Santa Rosa De Quilo Quilo', 32, NULL, 'LPcor80600065', NULL, NULL, NULL, 26, NULL);
INSERT INTO public.ue VALUES (350, 'Azafranal', 14, NULL, 'LPdes50660002', NULL, NULL, NULL, 27, NULL);
INSERT INTO public.ue VALUES (351, 'San Juan Huancollo', 16, NULL, 'LPdes50660004', NULL, NULL, NULL, 27, NULL);
INSERT INTO public.ue VALUES (352, 'Simon Bolivar', 7, NULL, 'LPdes50660009', NULL, NULL, NULL, 27, NULL);
INSERT INTO public.ue VALUES (353, 'Jose Ballivian', 17, NULL, 'LPdes50660013', NULL, NULL, NULL, 27, NULL);
INSERT INTO public.ue VALUES (354, 'Batallon Colorados', 47, NULL, 'LPdes50660014', NULL, NULL, NULL, 27, NULL);
INSERT INTO public.ue VALUES (355, 'Juan Carlos Flores Bedregal', 118, NULL, 'LPeal40730150', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (356, 'Bicentenario Libertador Simon Bolivar', 90, NULL, 'LPeal40730151', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (357, 'Pedro Domingo Murillo B', 86, NULL, 'LPeal40730153', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (358, 'Rio Seco Noche', 29, NULL, 'LPeal40730154', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (359, 'Roberto Alvarado Daza B', 60, NULL, 'LPeal40730155', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (360, 'Walter Alpire Duran B', 153, NULL, 'LPeal40730158', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (361, 'Yunguyo Fe Y Alegria Tarde', 93, NULL, 'LPeal40730159', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (362, 'Armada Boliviana', 47, NULL, 'LPeal40730162', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (363, '6 De Marzo Tarde', 42, NULL, 'LPeal40730163', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (364, 'Brasil Tarde', 128, NULL, 'LPeal40730165', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (365, 'San Vicente De Paul', 105, NULL, 'LPeal40730168', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (366, 'Villa Tunari Tarde', 91, NULL, 'LPeal40730169', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (367, 'Mariscal. De Zepita Mañana', 44, NULL, 'LPeal40730171', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (368, 'Ocomisto', 16, NULL, 'LPeal40730172', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (369, 'Republica Del Uruguay', 25, NULL, 'LPeal40730173', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (370, 'Republica Popular De China', 72, NULL, 'LPeal40730174', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (371, 'Villandrani', 21, NULL, 'LPeal40730176', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (372, 'Huayna Potosi Mañana', 84, NULL, 'LPeal40730177', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (373, 'Mcal. Sucre', 105, NULL, 'LPeal40730179', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (374, 'Marcelo Quiroga Santa Cruz', 186, NULL, 'LPeal40730180', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (375, 'Almirante Miguel Grau B', 56, NULL, 'LPeal40730184', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (376, 'Nueva Esperanza B', 35, NULL, 'LPeal40730187', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (377, 'Ingavi Tarde', 84, NULL, 'LPeal40730189', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (378, 'Jose Antonio Paredes Candia', 156, NULL, 'LPeal40730191', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (379, 'Illimani Mañana', 91, NULL, 'LPeal40730193', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (380, 'Mcal. Andres De Santa Cruz', 158, NULL, 'LPeal40730194', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (381, 'Jose Luis Suarez Guzman', 81, NULL, 'LPeal40730196', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (382, 'El Carmen', 31, NULL, 'LPeal40730198', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (383, 'Bautista Saavedra', 151, NULL, 'LPeal40730199', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (384, 'Republica De Bolivia', 102, NULL, 'LPeal40730200', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (385, 'Republica De Cuba Del Caribe', 27, NULL, 'LPeal40730201', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (386, 'Eduardo Avaroa 1', 23, NULL, 'LPeal40730202', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (387, 'Libertad', 73, NULL, 'LPeal40730211', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (388, 'Dr. Carlos Montenegro', 53, NULL, 'LPeal40730213', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (389, 'El Alto Integracion', 17, NULL, 'LPeal40730214', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (390, 'Abel Iturralde B', 104, NULL, 'LPeal40730215', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (391, 'Juvenal Mariaca B', 52, NULL, 'LPeal40730217', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (392, 'Julian Apaza', 19, NULL, 'LPeal40730220', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (393, 'Santa Maria De Los Angeles Mañana', 103, NULL, 'LPeal40730221', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (394, 'Santa Maria De Los Angeles Tarde', 84, NULL, 'LPeal40730222', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (395, 'Huyustus Republica De Austria', 40, NULL, 'LPeal40730223', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (396, 'Cesar Chavez Taborga', 39, NULL, 'LPeal40730226', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (397, 'Gualberto Villarroel B', 40, NULL, 'LPeal40730228', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (398, 'Juan Jose Torrez Gonzales A', 18, NULL, 'LPeal40730231', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (399, 'Juan Jose Torrez Gonzales B', 75, NULL, 'LPeal40730232', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (400, 'San Jose Fe Y Alegria A', 160, NULL, 'LPeal40730233', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (401, 'Los Andes Mañana', 129, NULL, 'LPeal40730236', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (402, 'Los Andes Tarde', 76, NULL, 'LPeal40730237', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (403, 'Gran Bretaña Mañana', 118, NULL, 'LPeal40730238', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (404, 'Antofagasta', 36, NULL, 'LPeal40730239', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (405, 'Elizardo Perez Tarde', 154, NULL, 'LPeal40730242', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (406, 'Aida Del Portillo De Mendoza', 44, NULL, 'LPeal40730244', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (407, 'Mcal. Jose Ballivian D', 116, NULL, 'LPeal40730245', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (408, 'Mercedes Belzu De Dorado B', 61, NULL, 'LPeal40730247', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (409, 'Luis Espinal Camps Fe Y Alegria Tarde', 119, NULL, 'LPeal40730250', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (410, 'Mcal. Jose Ballivian A', 108, NULL, 'LPeal40730252', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (411, 'Puerto De Guaqui Tarde', 77, NULL, 'LPeal40730253', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (412, 'Litoral', 79, NULL, 'LPeal40730257', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (413, 'Rafael Pabon', 44, NULL, 'LPeal40730258', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (414, 'Adventista Harry Pittman', 102, NULL, 'LPeal40730272', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (415, 'Bethel', 102, NULL, 'LPeal40730276', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (416, 'Libertad', 23, NULL, 'LPeal40730283', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (417, 'F.A.B. Tcnl. Rafael Pabon Cuevas', 227, NULL, 'LPeal40730284', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (418, 'San Miguel', 34, NULL, 'LPeal40730285', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (419, 'Emmanuel', 12, NULL, 'LPeal40730286', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (420, 'Santa Barbara', 38, NULL, 'LPeal40730292', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (421, 'Carlos Palenque Aviles', 45, NULL, 'LPeal40730293', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (422, 'Eben - Ezer', 32, NULL, 'LPeal40730295', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (423, 'Sagrado Corazon De Jesus', 101, NULL, 'LPeal40730298', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (424, 'Nazareno Basil Miller', 99, NULL, 'LPeal40730303', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (425, 'Daniel Sanchez Bustamante El Alto', 17, NULL, 'LPeal40730305', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (426, 'Republica De Rusia', 236, NULL, 'LPeal40730312', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (427, 'Adrian Castillo Nava B', 103, NULL, 'LPeal40730313', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (428, 'Nueva Jerusalen', 35, NULL, 'LPeal40730316', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (429, 'San Luis De Gonzaga B', 81, NULL, 'LPeal40730325', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (430, 'Puerto De Mejillones', 70, NULL, 'LPeal40730335', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (431, 'Alipio Valencia Vega', 43, NULL, 'LPeal40730341', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (432, 'Adventista San Jose', 61, NULL, 'LPeal40730344', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (433, '16 De Agosto', 68, NULL, 'LPeal40730346', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (434, 'Mcal. De Ayacucho', 10, NULL, 'LPeal40730353', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (435, 'Mcal. Antonio Jose De Sucre Tarde', 71, NULL, 'LPeal40730358', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (436, 'Jesus Maria Fe Y Alegria', 56, NULL, 'LPeal40730366', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (437, 'Ecologico 25 De Julio B', 68, NULL, 'LPeal40730374', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (438, 'San Javieri', 0, NULL, 'LPeal40730376', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (439, 'Juana Azurduy De Padilla', 54, NULL, 'LPeal40730395', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (440, 'Manuel Ascencio Padilla', 63, NULL, 'LPeal40730396', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (441, 'Solidaridad', 30, NULL, 'LPeal40730398', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (442, 'Republica De Cuba', 90, NULL, 'LPeal40730399', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (443, 'Tokio', 52, NULL, 'LPeal40730400', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (444, 'Republica Federal De Alemania', 100, NULL, 'LPeal40730401', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (445, 'Gualberto Villarroel', 63, NULL, 'LPeal40730402', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (446, '21 De Septiembre Señor De Lagunas', 87, NULL, 'LPeal40730403', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (447, 'San Jose De Yunguyo B', 39, NULL, 'LPeal40730404', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (448, 'San Marcos', 52, NULL, 'LPeal40730426', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (449, 'Pablo Zarate Villca', 54, NULL, 'LPeal40730429', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (450, 'Santa Rosa De Lima', 54, NULL, 'LPeal40730435', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (451, 'Adventista Del Septimo Dia Movimiento De Reforma', 7, NULL, 'LPeal40730438', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (452, 'Humberto Portocarrero Tarde', 125, NULL, 'LPeal40730441', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (453, 'Kollasuyo', 41, NULL, 'LPeal40730442', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (454, 'Karl Alexander', 75, NULL, 'LPeal40730445', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (455, 'Santisima Trinidad', 33, NULL, 'LPeal40730447', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (456, 'Taiwan', 28, NULL, 'LPeal40730448', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (457, 'Betania', 30, NULL, 'LPeal40730454', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (458, 'Boliviano Portugal', 53, NULL, 'LPeal40730456', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (459, 'Simon Bolivar', 65, NULL, 'LPeal40730463', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (460, 'San Felipe', 50, NULL, 'LPeal40730464', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (461, 'Latinoamericano', 50, NULL, 'LPeal40730469', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (462, 'Tcnl. Av. Rafael Pabon Cuevas Iii', 87, NULL, 'LPeal40730474', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (463, '1ro. De Octubre', 20, NULL, 'LPeal40730476', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (464, 'German Busch I', 45, NULL, 'LPeal40730477', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (465, 'Comandante Hugo Rafael Chavez Frias', 39, NULL, 'LPeal40730478', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (466, 'Interandino Boliviano', 32, NULL, 'LPeal40730481', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (467, '3 De Marzo', 34, NULL, 'LPeal40730482', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (468, 'Austria', 30, NULL, 'LPeal40730487', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (469, 'Don Bosco', 54, NULL, 'LPeal40730489', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (470, 'Metodista Andino', 26, NULL, 'LPeal40730490', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (471, 'Juancito Pinto', 21, NULL, 'LPeal40730491', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (472, 'Republica De Iran', 39, NULL, 'LPeal40730492', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (473, 'Patria Nueva', 31, NULL, 'LPeal40730497', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (474, 'Republica Bolivariana De Venezuela', 19, NULL, 'LPeal40730503', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (475, 'Heroes De Octubre', 64, NULL, 'LPeal40730504', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (476, 'Manuel Rigoberto Paredes', 40, NULL, 'LPeal40730505', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (477, 'Fuerza Aerea Argentina', 33, NULL, 'LPeal40730507', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (478, 'Corazon De Sud America', 12, NULL, 'LPeal40730509', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (479, 'Nuevo Amanecer Boliviano', 22, NULL, 'LPeal40730510', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (480, 'Ernesto Che Guevara', 23, NULL, 'LPeal40730513', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (481, 'Dionicio Morales', 27, NULL, 'LPeal40730514', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (482, 'Republica Corea Del Norte', 35, NULL, 'LPeal40730525', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (483, 'Republica Del Japon Mañana', 50, NULL, 'LPeal40730526', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (484, 'Mercedario', 16, NULL, 'LPeal40730528', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (485, 'Jaime Escalante Gutierrez', 22, NULL, 'LPeal40730539', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (486, '16 De Febrero B', 84, NULL, 'LPeal40730544', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (487, 'Maria Ayma Mamani', 35, NULL, 'LPeal40730545', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (488, 'Rafael Mendoza Castellon B', 147, NULL, 'LPeal40730547', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (489, 'Ana Maria Romero De Campero', 43, NULL, 'LPeal40730551', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (490, 'Habana Cuba', 17, NULL, 'LPeal40730553', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (491, 'Nueva Miraflores', 38, NULL, 'LPeal40730568', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (492, 'Paraiso', 17, NULL, 'LPeal40730569', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (493, '17 De Octubre', 0, NULL, 'LPeal40730570', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (494, 'España - Bolivia', 24, NULL, 'LPeal40730571', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (495, 'Nueva Esperanza Santuario Señor De Lagunas', 15, NULL, 'LPeal40730572', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (496, 'Nuestra Señora De La Paz', 8, NULL, 'LPeal40730573', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (497, 'Alejandro Maldonado', 8, NULL, 'LPeal40730582', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (498, 'Republica De Mexico', 7, NULL, 'LPeal40730589', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (499, 'San Julian De Las Nieves', 15, NULL, 'LPeal40730605', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (500, 'Playa Verde', 0, NULL, 'LPeal40730607', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (501, 'Heroina Bartolina Sisa', 18, NULL, 'LPeal40730611', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (502, 'Milluni', 0, NULL, 'LPeal40730617', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (503, 'Noruega Mañana', 94, NULL, 'LPeal40730622', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (504, 'El Progreso B', 92, NULL, 'LPeal40730624', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (505, '24 De Junio', 0, NULL, 'LPeal40730625', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (506, 'Villa Cooperativa B', 75, NULL, 'LPeal40730633', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (507, 'Venezuela B', 102, NULL, 'LPeal40730634', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (508, 'Franz Tamayo De Rio Seco B', 85, NULL, 'LPeal40730635', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (509, 'Union Europea B', 54, NULL, 'LPeal40730636', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (510, 'Yunguyo Fe Y Alegria B', 101, NULL, 'LPeal40730640', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (511, 'Señor De Lagunas 2000', 0, NULL, 'LPeal40730641', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (512, 'Oscar Alfaro B Mañana', 107, NULL, 'LPeal40730646', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (513, 'Heroes Del Litoral', 0, NULL, 'LPeal40730647', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (514, 'Arco Iris Norte B', 82, NULL, 'LPeal40730671', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (515, 'Gregorio Churata Condori', 0, NULL, 'LPeal40730676', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (516, 'Libertad Franz Tamayo B', 48, NULL, 'LPeal40730683', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (517, 'Teofilo Lopez Flores', 0, NULL, 'LPeal40730690', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (518, 'San Francisco De Asis', 0, NULL, 'LPeal40730735', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (519, 'Republica Del Peru - B', 0, NULL, 'LPeal40730759', NULL, NULL, NULL, 28, NULL);
INSERT INTO public.ue VALUES (520, '12 De Octubre Tarde', 87, NULL, 'LPeal40730002', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (521, 'Andres Bello', 70, NULL, 'LPeal40730007', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (522, 'Heroes Del Pacifico', 150, NULL, 'LPeal40730008', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (523, 'Gral. Armando Escobar Uria Tarde', 66, NULL, 'LPeal40730010', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (524, 'Guido Villagomez Loma', 49, NULL, 'LPeal40730011', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (525, 'Vicente Donoso Torrez B', 99, NULL, 'LPeal40730014', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (526, 'Eufrasio Ibañez Rivero', 101, NULL, 'LPeal40730016', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (527, 'Puerto De Mejillones Ciudad Satelite', 160, NULL, 'LPeal40730019', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (528, 'Bolivia Mañana', 66, NULL, 'LPeal40730023', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (529, 'Rotary Chuquiago Marka Tarde', 108, NULL, 'LPeal40730026', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (530, 'Juan Pablo Ii Don Bosco', 63, NULL, 'LPeal40730027', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (531, 'Santiago I', 52, NULL, 'LPeal40730028', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (532, 'Brasilia Tarde', 25, NULL, 'LPeal40730029', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (533, 'Brasilia Noche', 20, NULL, 'LPeal40730031', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (534, 'Mcal. Andres De Santa Cruz De Alpacoma', 15, NULL, 'LPeal40730036', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (535, 'Andres Bello Tarde', 48, NULL, 'LPeal40730038', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (536, 'Juan Capriles Tarde', 37, NULL, 'LPeal40730039', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (537, 'Juan Capriles Mañana', 83, NULL, 'LPeal40730040', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (538, 'Eva Peron', 40, NULL, 'LPeal40730043', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (539, 'Tarapaca', 82, NULL, 'LPeal40730044', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (540, '6 De Junio B', 49, NULL, 'LPeal40730045', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (541, 'Libertad En Las Americas Mañana', 62, NULL, 'LPeal40730046', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (542, 'Libertad En Las Americas Tarde', 20, NULL, 'LPeal40730047', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (543, 'Tejada Triangular', 23, NULL, 'LPeal40730048', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (544, 'Vicente Tejada Tarde', 34, NULL, 'LPeal40730050', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (545, 'Vicente Tejada Noche', 20, NULL, 'LPeal40730051', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (546, 'Adventista Salomon', 58, NULL, 'LPeal40730057', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (547, 'Shalom', 80, NULL, 'LPeal40730058', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (548, 'Republica De Francia Tarde', 135, NULL, 'LPeal40730061', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (549, 'Eduardo Abaroa Tarde', 67, NULL, 'LPeal40730063', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (550, 'Union Europea B', 102, NULL, 'LPeal40730065', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (551, 'Simon Bolivar Tarde', 117, NULL, 'LPeal40730067', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (552, 'Bolivar Municipal', 81, NULL, 'LPeal40730068', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (553, 'Villa El Carmen Tarde', 29, NULL, 'LPeal40730070', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (554, 'Union Bolivariana', 64, NULL, 'LPeal40730071', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (555, 'Puerto De Rosario Mañana', 139, NULL, 'LPeal40730073', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (556, 'Senkata Convifacg Tarde', 96, NULL, 'LPeal40730083', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (557, 'Noel Kempf Mercado', 50, NULL, 'LPeal40730084', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (558, '6 De Junio C Mañana', 73, NULL, 'LPeal40730085', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (559, 'Adventista Franz Tamayo', 137, NULL, 'LPeal40730088', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (560, 'Oscar Alfaro A', 16, NULL, 'LPeal40730089', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (561, 'Mutual La Paz', 12, NULL, 'LPeal40730090', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (562, 'Amor De Dios', 73, NULL, 'LPeal40730092', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (563, 'Luis Espinal Tarde De Collpani', 131, NULL, 'LPeal40730095', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (564, 'Nestor Paz Zamora Mañana', 84, NULL, 'LPeal40730099', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (565, 'Luis Espinal Camps Aeropuerto Mañana', 64, NULL, 'LPeal40730100', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (566, 'Jesus Obrero Mañana', 179, NULL, 'LPeal40730102', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (567, '1ro. De Mayo Tarde', 103, NULL, 'LPeal40730105', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (568, 'Illimani Tarde', 110, NULL, 'LPeal40730107', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (569, 'San Luis Tarde', 82, NULL, 'LPeal40730110', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (570, 'San Luis De Gonzaga A', 22, NULL, 'LPeal40730111', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (571, 'San Pedro De Charapaqui', 18, NULL, 'LPeal40730112', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (572, 'La Paz Tarde', 66, NULL, 'LPeal40730114', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (573, 'Amig Chaco', 31, NULL, 'LPeal40730115', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (574, 'Martin Cardenas Hermosa B', 156, NULL, 'LPeal40730116', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (575, 'Martin Cardenas Hermosa D', 42, NULL, 'LPeal40730119', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (576, 'Cosmos 79 Mañana', 105, NULL, 'LPeal40730121', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (577, 'Villa Alemania', 101, NULL, 'LPeal40730123', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (578, 'Alto De La Alianza Mañana', 78, NULL, 'LPeal40730124', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (579, 'Marcelo Quiroga Santa Cruz Tarde', 31, NULL, 'LPeal40730127', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (580, 'San Juan Tarde', 44, NULL, 'LPeal40730130', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (581, 'Tcnl. Rafael Pabon', 38, NULL, 'LPeal40730132', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (582, '6 De Junio De Cosmos 79', 54, NULL, 'LPeal40730134', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (583, 'Julian Apaza Tarde', 54, NULL, 'LPeal40730136', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (584, 'Sebastián Obermaier', 6, NULL, 'LPeal40730138', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (585, 'Calama Tarde', 114, NULL, 'LPeal40730140', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (586, 'Gral. Juan Jose Torrez Gonzales', 39, NULL, 'LPeal40730141', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (587, 'Jesus De Nazareth', 65, NULL, 'LPeal40730144', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (588, 'John Dalton', 43, NULL, 'LPeal40730146', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (589, 'Fernando Bravo Fe Y Alegria', 83, NULL, 'LPeal40730260', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (590, 'Fernando Nogales Castro Fe Y Alegria', 64, NULL, 'LPeal40730261', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (591, 'La Primera', 55, NULL, 'LPeal40730262', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (592, 'Octavio Campero Echazu', 10, NULL, 'LPeal40730267', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (593, 'Catolico San Agustin', 35, NULL, 'LPeal40730271', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (594, '7 De Septiembre', 52, NULL, 'LPeal40730273', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (595, 'Majestuosa Bolivia', 25, NULL, 'LPeal40730275', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (596, 'Adolfo Kolping', 62, NULL, 'LPeal40730296', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (597, 'Republica De Cuba Pacajes', 32, NULL, 'LPeal40730314', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (598, 'Ayacucho Tarde', 55, NULL, 'LPeal40730338', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (599, 'Divino Amparo', 28, NULL, 'LPeal40730354', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (600, 'William Booth', 5, NULL, 'LPeal40730362', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (601, 'San Jeronimo Noche', 38, NULL, 'LPeal40730365', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (602, 'Boliviano Holandes', 116, NULL, 'LPeal40730368', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (603, 'Puerto De Rosario Noche', 15, NULL, 'LPeal40730370', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (604, 'Principe De Luz', 101, NULL, 'LPeal40730380', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (605, 'Villa Adela Yunguyo', 62, NULL, 'LPeal40730394', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (606, 'Reino De Belgica', 52, NULL, 'LPeal40730415', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (607, 'Marcelina', 22, NULL, 'LPeal40730419', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (608, 'Las Rosas', 27, NULL, 'LPeal40730420', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (609, 'Luz A Las Naciones', 43, NULL, 'LPeal40730422', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (610, 'Candelaria', 35, NULL, 'LPeal40730432', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (611, 'San Andres', 9, NULL, 'LPeal40730434', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (612, 'Jesus De Belen', 24, NULL, 'LPeal40730444', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (613, 'Hna. Maria Teresa Lajusticia', 56, NULL, 'LPeal40730458', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (614, 'Boliviano Aleman 16 De Febrero', 40, NULL, 'LPeal40730467', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (615, 'Del Sur', 68, NULL, 'LPeal40730468', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (616, 'San Juan Bautista De La Salle', 72, NULL, 'LPeal40730470', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (617, 'Real Del Sur', 36, NULL, 'LPeal40730471', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (618, 'Ascinalss', 44, NULL, 'LPeal40730479', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (619, 'Republica De Canada', 57, NULL, 'LPeal40730483', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (620, 'Chijini Alto', 39, NULL, 'LPeal40730484', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (621, 'Maria De Los Angeles', 7, NULL, 'LPeal40730485', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (622, 'Pablo Neruda', 25, NULL, 'LPeal40730518', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (623, 'Republica De Chile', 42, NULL, 'LPeal40730521', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (624, 'Adolfo Kolping Santiago Ii', 31, NULL, 'LPeal40730522', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (625, 'Holanda Tarde', 63, NULL, 'LPeal40730529', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (626, 'Villa Sajama B', 51, NULL, 'LPeal40730538', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (627, 'Juan Pablo Ii B', 78, NULL, 'LPeal40730543', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (628, 'America I', 47, NULL, 'LPeal40730546', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (629, 'Jose Manuel Pando Tarde', 49, NULL, 'LPeal40730550', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (630, '3 De Mayo B', 71, NULL, 'LPeal40730552', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (631, 'El Paraiso B', 94, NULL, 'LPeal40730559', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (632, 'Villa Victoria B', 38, NULL, 'LPeal40730560', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (633, 'Adela Zamudio A', 52, NULL, 'LPeal40730562', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (634, 'Las Delicias B', 62, NULL, 'LPeal40730563', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (635, 'Horizontes B', 62, NULL, 'LPeal40730567', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (636, 'Primavera B', 37, NULL, 'LPeal40730590', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (637, 'Pekin', 19, NULL, 'LPeal40730591', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (638, 'Dr. Aniceto Arce B', 47, NULL, 'LPeal40730592', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (639, 'Inglés Daza Catholic', 19, NULL, 'LPeal40730608', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (640, 'Piloto Intervida De Fe Y Alegria', 49, NULL, 'LPeal40730609', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (641, 'San Martin B', 20, NULL, 'LPeal40730613', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (642, 'Cuerpo De Cristo Fe Y Alegria B', 78, NULL, 'LPeal40730614', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (643, 'Mercedes Elio De Rivero B', 94, NULL, 'LPeal40730616', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (644, 'Natividad B', 40, NULL, 'LPeal40730618', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (645, 'Gran Poder B', 58, NULL, 'LPeal40730620', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (646, '9 De Julio', 71, NULL, 'LPeal40730621', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (647, 'Retama B', 72, NULL, 'LPeal40730623', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (648, 'Adventista Reid Shepard', 66, NULL, 'LPeal40730675', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (649, 'San Martin De Porres', 84, NULL, 'LPeal70620075', NULL, NULL, NULL, 29, NULL);
INSERT INTO public.ue VALUES (650, 'España Tarde', 100, NULL, 'LPeal40730079', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (651, 'Topater Don Bosco B', 50, NULL, 'LPeal40730086', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (652, 'Maranata', 155, NULL, 'LPeal40730408', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (653, 'Adventista Shalom', 71, NULL, 'LPeal40730413', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (654, 'Avelino Siñani', 52, NULL, 'LPeal40730430', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (655, 'Copacabana I', 20, NULL, 'LPeal40730436', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (656, 'Republica De Italia', 27, NULL, 'LPeal40730449', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (657, 'Nueva Esperanza', 25, NULL, 'LPeal40730457', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (658, 'Ecologico Baden Powell', 23, NULL, 'LPeal40730461', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (659, 'San Silvestre', 26, NULL, 'LPeal40730488', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (660, '17 De Octubre', 38, NULL, 'LPeal40730495', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (661, 'Villa Imperial', 60, NULL, 'LPeal40730496', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (662, 'Alonzo De Mendoza', 35, NULL, 'LPeal40730498', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (663, 'Akapana Fuerza Andina', 20, NULL, 'LPeal40730501', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (664, 'San Agustin B', 56, NULL, 'LPeal40730511', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (665, 'Luz De Belen', 30, NULL, 'LPeal40730512', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (666, 'Dionicio Morales Choque', 9, NULL, 'LPeal40730516', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (667, 'Arco Iris', 17, NULL, 'LPeal40730519', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (668, 'Atipiris Mañana', 86, NULL, 'LPeal40730530', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (669, '15 De Abril', 25, NULL, 'LPeal40730533', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (670, '25 De Julio Senkata B', 89, NULL, 'LPeal40730534', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (671, 'Modelo Sur', 25, NULL, 'LPeal40730536', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (672, 'Virgen De Urkupiña', 0, NULL, 'LPeal40730537', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (673, 'Illimani 26 De Abril A', 85, NULL, 'LPeal40730548', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (674, 'Luis Espinal Nuevo Ventilla', 8, NULL, 'LPeal40730554', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (675, 'Comandante Ernesto Che Guevara B', 84, NULL, 'LPeal40730555', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (676, 'Tarapaca Junthuma B', 85, NULL, 'LPeal40730556', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (677, '27 De Mayo B', 83, NULL, 'LPeal40730557', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (678, '31 De Octubre B', 82, NULL, 'LPeal40730558', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (679, 'Simon Bolivar Sur', 19, NULL, 'LPeal40730574', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (680, '5 De Agosto Las Nieves', 11, NULL, 'LPeal40730575', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (681, '23 De Marzo B', 86, NULL, 'LPeal40730577', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (682, 'Jardines Del Sur', 34, NULL, 'LPeal40730578', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (683, 'San Sebastian B', 66, NULL, 'LPeal40730579', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (684, 'America Panoramica B', 51, NULL, 'LPeal40730580', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (685, 'Boliviano Japones B', 62, NULL, 'LPeal40730581', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (686, 'Ecologico Los Pinos B', 81, NULL, 'LPeal40730585', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (687, 'Catolico Mercedes B', 58, NULL, 'LPeal40730586', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (688, 'Boliviano Aleman Florida B', 30, NULL, 'LPeal40730587', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (689, 'Bolivia Mar B', 76, NULL, 'LPeal40730588', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (690, 'Virgen Del Socavon', 24, NULL, 'LPeal40730606', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (691, 'Nuevo Amanecer De Fe Y Alegria B', 84, NULL, 'LPeal40730615', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (692, 'Cristal B', 82, NULL, 'LPeal40730619', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (693, 'San Antonio B', 72, NULL, 'LPeal40730626', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (694, 'Iberdrola B', 49, NULL, 'LPeal40730627', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (695, '18 De Diciembre B', 50, NULL, 'LPeal40730628', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (696, 'Tarapaca 7 De Octubre B', 50, NULL, 'LPeal40730629', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (697, 'Jardines B', 57, NULL, 'LPeal40730637', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (698, 'Republica Del Japon B', 55, NULL, 'LPeal40730638', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (699, 'Simon Bolivar B', 44, NULL, 'LPeal40730639', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (700, '2 De Febrero', 0, NULL, 'LPeal40730672', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (701, 'Sebastian Pagador - B', 35, NULL, 'LPeal40730673', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (702, '16 De Noviembre - B', 61, NULL, 'LPeal40730674', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (703, 'Boliviano Americano - B', 54, NULL, 'LPeal40730685', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (704, 'Virgen De Copacabana B', 33, NULL, 'LPeal40730686', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (705, 'Abya Yala', 0, NULL, 'LPeal40730691', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (706, 'Fred Nuñez Gonzales Señor De Mayo', 0, NULL, 'LPeal40730709', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (707, 'Tupac Amaru B', 30, NULL, 'LPeal40730728', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (708, 'Venezuela Plan 3000 B', 53, NULL, 'LPeal40730730', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (709, 'Ventilla I B', 50, NULL, 'LPeal40730737', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (710, '24 De Julio B', 51, NULL, 'LPeal40730738', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (711, 'Republica Bolivariana De Venezuela B', 29, NULL, 'LPeal40730739', NULL, NULL, NULL, 30, NULL);
INSERT INTO public.ue VALUES (712, 'Qutapampa', 0, NULL, 'LPgjp70580004', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (713, 'Cañizaya Ii', 0, NULL, 'LPgjp70580005', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (714, 'Yawar Mallku', 8, NULL, 'LPgjp80580001', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (715, 'Chari', 0, NULL, 'LPgjp80580005', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (716, 'Apacheta', 6, NULL, 'LPgjp80580007', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (717, 'Chullina', 9, NULL, 'LPgjp80580008', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (718, 'Khazu', 8, NULL, 'LPgjp80580010', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (719, 'Carijana', 8, NULL, 'LPgjp80580012', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (720, 'Pauje Yuyo', 9, NULL, 'LPgjp80580015', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (721, 'Sayhuani', 5, NULL, 'LPgjp80580022', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (722, 'Moyapampa', 6, NULL, 'LPgjp80580024', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (723, 'Llachuani', 9, NULL, 'LPgjp80580027', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (724, 'San Pedro De Curva', 12, NULL, 'LPgjp80580032', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (725, 'San Juan De Caalaya', 3, NULL, 'LPgjp80580034', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (726, 'Taypi Cañuhuma', 5, NULL, 'LPgjp80580037', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (727, 'Charazani Nacion Kallawaya', 22, NULL, 'LPgjp80580043', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (728, 'Soto Pata', 22, NULL, 'LPgjp80580052', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (729, 'Florida', 0, NULL, 'LPgjp80580058', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (730, 'Isqani 2', 21, NULL, 'LPgjp80580060', NULL, NULL, NULL, 31, NULL);
INSERT INTO public.ue VALUES (731, 'Pajonal Vilaque', 7, NULL, 'LPgua30680006', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (732, 'Amaguaya', 3, NULL, 'LPgua70680001', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (733, 'Lipichi', 0, NULL, 'LPgua70680002', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (734, 'Mariapo', 8, NULL, 'LPgua70680007', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (735, 'San Jose De Pelera', 16, NULL, 'LPgua70680009', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (736, 'Carura B', 14, NULL, 'LPgua70680010', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (737, 'Candelaria B', 11, NULL, 'LPgua70680015', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (738, 'Challana', 14, NULL, 'LPgua70680016', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (739, 'Poroma', 6, NULL, 'LPgua70680017', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (740, 'Trapicheponte', 0, NULL, 'LPgua70680021', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (741, 'Michiplaya', 5, NULL, 'LPgua70680025', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (742, 'Carlos Crespo', 39, NULL, 'LPgua70680036', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (743, '14 De Septiembre De Witoponte', 14, NULL, 'LPgua70680037', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (744, 'Taniplaya', 4, NULL, 'LPgua70680043', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (745, 'Nacional Guanay', 50, NULL, 'LPgua70680044', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (746, 'Kelequelera', 5, NULL, 'LPgua70680065', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (747, 'Chacapa', 2, NULL, 'LPgua70680100', NULL, NULL, NULL, 32, NULL);
INSERT INTO public.ue VALUES (748, 'Carlos Palenque Aviles', 10, NULL, 'LPgua70660005', NULL, NULL, NULL, 33, NULL);
INSERT INTO public.ue VALUES (749, 'San Antonio B', 14, NULL, 'LPgua70660010', NULL, NULL, NULL, 33, NULL);
INSERT INTO public.ue VALUES (750, 'Antofagasta', 8, NULL, 'LPgua70660017', NULL, NULL, NULL, 33, NULL);
INSERT INTO public.ue VALUES (751, 'Mcal. Andres De Santa Cruz', 41, NULL, 'LPgua70660021', NULL, NULL, NULL, 33, NULL);
INSERT INTO public.ue VALUES (752, 'Tomas Katari', 21, NULL, 'LPgua70660022', NULL, NULL, NULL, 33, NULL);
INSERT INTO public.ue VALUES (753, 'Sergio Almaraz Paz', 10, NULL, 'LPhua80720080', NULL, NULL, NULL, 34, NULL);
INSERT INTO public.ue VALUES (754, 'Jose Miguel Lanza', 36, NULL, 'LPhua80720085', NULL, NULL, NULL, 34, NULL);
INSERT INTO public.ue VALUES (755, 'Soncachi Chico', 4, NULL, 'LPhua80720087', NULL, NULL, NULL, 34, NULL);
INSERT INTO public.ue VALUES (756, 'Juan Chalco', 8, NULL, 'LPhua80720095', NULL, NULL, NULL, 34, NULL);
INSERT INTO public.ue VALUES (757, 'Ismael Montes', 22, NULL, 'LPhua80720100', NULL, NULL, NULL, 34, NULL);
INSERT INTO public.ue VALUES (758, 'Copancara', 16, NULL, 'LPhua80720103', NULL, NULL, NULL, 34, NULL);
INSERT INTO public.ue VALUES (759, 'Coromata Baja', 11, NULL, 'LPhua80720109', NULL, NULL, NULL, 34, NULL);
INSERT INTO public.ue VALUES (760, 'Rene Barrientos Ortuño', 9, NULL, 'LPhua80720112', NULL, NULL, NULL, 34, NULL);
INSERT INTO public.ue VALUES (761, 'Huatajata Secundario', 13, NULL, 'LPhua80720195', NULL, NULL, NULL, 34, NULL);
INSERT INTO public.ue VALUES (762, 'Pedro Domingo Murillo', 8, NULL, 'LPhua80720196', NULL, NULL, NULL, 34, NULL);
INSERT INTO public.ue VALUES (763, 'Pedro Domingo Murillo', 5, NULL, 'LPich40640003', NULL, NULL, NULL, 35, NULL);
INSERT INTO public.ue VALUES (764, 'Simon Bolivar', 4, NULL, 'LPich40640004', NULL, NULL, NULL, 35, NULL);
INSERT INTO public.ue VALUES (765, 'Yahuaroco', 6, NULL, 'LPich40640013', NULL, NULL, NULL, 35, NULL);
INSERT INTO public.ue VALUES (766, 'Zenobio Gallardo Vega De Matha', 0, NULL, 'LPich40640014', NULL, NULL, NULL, 35, NULL);
INSERT INTO public.ue VALUES (767, 'Luruta', 3, NULL, 'LPich40640025', NULL, NULL, NULL, 35, NULL);
INSERT INTO public.ue VALUES (768, 'Eduardo Abaroa', 7, NULL, 'LPich40640031', NULL, NULL, NULL, 35, NULL);
INSERT INTO public.ue VALUES (769, 'German Busch De Challa', 6, NULL, 'LPich40640033', NULL, NULL, NULL, 35, NULL);
INSERT INTO public.ue VALUES (770, 'Ichoca Ii', 16, NULL, 'LPich40640039', NULL, NULL, NULL, 35, NULL);
INSERT INTO public.ue VALUES (771, 'Arcopongo I', 13, NULL, 'LPinq80640001', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (772, 'Giovanni Delgado De Siquimirani', 12, NULL, 'LPinq80640005', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (773, 'Tupac Katari', 11, NULL, 'LPinq80640010', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (774, 'Cavari', 7, NULL, 'LPinq80640018', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (775, 'Chiarhuta', 9, NULL, 'LPinq80640021', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (776, 'Rene Barrientos', 8, NULL, 'LPinq80640032', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (777, 'Esperanza Nueva De Patohoco', 4, NULL, 'LPinq80640033', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (778, 'Gualberto Villarroel De Palmarpampa', 9, NULL, 'LPinq80640034', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (779, 'Simon Bolivar', 16, NULL, 'LPinq80640040', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (780, 'Siguas', 9, NULL, 'LPinq80640045', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (781, 'Sita', 7, NULL, 'LPinq80640052', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (782, 'Canqui Chico', 5, NULL, 'LPinq80640053', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (783, 'Ventilla', 7, NULL, 'LPinq80640058', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (784, 'Elizardo Perez De Locotani', 12, NULL, 'LPinq80640065', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (785, 'Copacabana', 7, NULL, 'LPinq80640067', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (786, 'Kanamarca', 11, NULL, 'LPinq80640094', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (787, 'Pedro Domingo Murillo', 6, NULL, 'LPinq80640084', NULL, NULL, NULL, 36, NULL);
INSERT INTO public.ue VALUES (788, '5 De Mayo', 70, NULL, 'LPiru70630001', NULL, NULL, NULL, 37, NULL);
INSERT INTO public.ue VALUES (789, 'Eduviges Vda. De Hertzog', 0, NULL, 'LPiru70630002', NULL, NULL, NULL, 37, NULL);
INSERT INTO public.ue VALUES (790, 'Victorio Lanza', 8, NULL, 'LPiru70630004', NULL, NULL, NULL, 37, NULL);
INSERT INTO public.ue VALUES (791, 'Victor Centellas', 4, NULL, 'LPiru70630005', NULL, NULL, NULL, 37, NULL);
INSERT INTO public.ue VALUES (792, 'Chicaloma', 12, NULL, 'LPiru70630006', NULL, NULL, NULL, 37, NULL);
INSERT INTO public.ue VALUES (793, 'German Busch', 17, NULL, 'LPiru70630007', NULL, NULL, NULL, 37, NULL);
INSERT INTO public.ue VALUES (794, 'Franz Tamayo', 14, NULL, 'LPiru70630009', NULL, NULL, NULL, 37, NULL);
INSERT INTO public.ue VALUES (795, 'Taca', 7, NULL, 'LPiru70630011', NULL, NULL, NULL, 37, NULL);
INSERT INTO public.ue VALUES (796, 'Iquico', 7, NULL, 'LPiru70630015', NULL, NULL, NULL, 37, NULL);
INSERT INTO public.ue VALUES (797, 'Tcnl. Rafael Pabon', 8, NULL, 'LPiru70630016', NULL, NULL, NULL, 37, NULL);
INSERT INTO public.ue VALUES (798, 'Pariguaya', 7, NULL, 'LPiru70630022', NULL, NULL, NULL, 37, NULL);
INSERT INTO public.ue VALUES (799, 'La Plazuela', 7, NULL, 'LPiru70630030', NULL, NULL, NULL, 37, NULL);
INSERT INTO public.ue VALUES (800, 'Isquircani', 20, NULL, 'LPiru70630038', NULL, NULL, NULL, 37, NULL);
INSERT INTO public.ue VALUES (801, 'Union Huiri', 21, NULL, 'LPiru70630066', NULL, NULL, NULL, 37, NULL);
INSERT INTO public.ue VALUES (802, 'Ixiamas', 74, NULL, 'LPixi70590001', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (803, '10 De Abril', 5, NULL, 'LPixi70590002', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (804, 'Tahua', 3, NULL, 'LPixi70590004', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (805, 'Carmen Del Emero', 9, NULL, 'LPixi70590006', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (806, 'Esperanza Del Madidi', 6, NULL, 'LPixi70590009', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (807, 'Colombia', 0, NULL, 'LPixi70590010', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (808, 'Santa Ana', 1, NULL, 'LPixi70590011', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (809, 'Ojaqui', 1, NULL, 'LPixi70590012', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (810, 'Barracon', 2, NULL, 'LPixi70590016', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (811, 'Santa Rosa De Maravilla', 4, NULL, 'LPixi80590020', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (812, 'La Paz Del Beni', 0, NULL, 'LPixi80590021', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (813, 'Santa Anita Del Rio Beni', 1, NULL, 'LPixi80590022', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (814, 'Puerto Perez', 0, NULL, 'LPixi80590023', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (815, 'Las Mercedes', 2, NULL, 'LPixi80590024', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (816, 'San Felipe', 1, NULL, 'LPixi80590025', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (817, 'Tomas Katari', 13, NULL, 'LPixi80590027', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (818, 'Bruno Racua', 2, NULL, 'LPixi80590029', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (819, 'Toromonas', 8, NULL, 'LPixi80590030', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (820, 'El Tigre', 3, NULL, 'LPixi80590033', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (821, 'Manurimi', 1, NULL, 'LPixi80590035', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (822, 'Puerto Ruso', 0, NULL, 'LPixi80590037', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (823, 'Segundo Flor De Mayo', 1, NULL, 'LPixi80590038', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (824, 'Nueva Esperanza', 0, NULL, 'LPixi80590039', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (825, '15 De Agosto', 15, NULL, 'LPixi80590040', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (826, 'Candelaria De Madidi', 0, NULL, 'LPixi80590041', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (827, 'Campo Central', 1, NULL, 'LPixi80590044', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (828, 'El Carmen', 1, NULL, 'LPixi80590048', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (829, 'Mataquio', 0, NULL, 'LPixi80590050', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (830, 'La Palca', 1, NULL, 'LPixi80590053', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (831, 'Lumbrera', 2, NULL, 'LPixi80590054', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (832, 'Puerto Cobija', 0, NULL, 'LPixi80590055', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (833, 'Bolivar', 3, NULL, 'LPixi80590056', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (834, 'Mañere', 1, NULL, 'LPixi80590057', NULL, NULL, NULL, 38, NULL);
INSERT INTO public.ue VALUES (835, 'Cuipa España', 5, NULL, 'LPjes80660059', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (836, 'Santo Domingo B', 3, NULL, 'LPjes80660062', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (837, 'Fray Gabriel Maria Landini', 23, NULL, 'LPjes80660080', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (838, 'Jancohaque Abajo', 4, NULL, 'LPjes80660085', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (839, 'Irohito Urus', 4, NULL, 'LPjes80660086', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (840, 'Aguallamaya', 5, NULL, 'LPjes80660088', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (841, 'Jose Carrasco', 8, NULL, 'LPjes80660092', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (842, 'Sullcatiti Lahuacollo', 12, NULL, 'LPjes80660094', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (843, 'Oscar Unzaga De La Vega', 17, NULL, 'LPjes80660099', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (844, 'Mejillones', 9, NULL, 'LPjes80660103', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (845, 'Sullcatiti Arriba A', 5, NULL, 'LPjes80660108', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (846, 'Neptal Viris', 17, NULL, 'LPjes80660114', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (847, 'Chama', 12, NULL, 'LPjes80660116', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (848, 'Republica De Noruega', 3, NULL, 'LPjes80660160', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (849, 'Franz Tamayo', 8, NULL, 'LPjes80660184', NULL, NULL, NULL, 39, NULL);
INSERT INTO public.ue VALUES (850, 'Cotapata', 32, NULL, 'LPasu40630001', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (851, 'Villa Litoral', 13, NULL, 'LPasu40630011', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (852, 'Charia', 23, NULL, 'LPasu40630015', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (853, 'Siguani Grande', 29, NULL, 'LPasu40630016', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (854, 'San José', 16, NULL, 'LPasu40630019', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (855, 'Quinuni', 36, NULL, 'LPasu40630023', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (856, 'Copalani', 22, NULL, 'LPasu40630026', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (857, 'Callisaya', 12, NULL, 'LPasu40630032', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (858, 'Yanamayo 2', 24, NULL, 'LPasu40630033', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (859, 'La Calzada', 28, NULL, 'LPasu40630034', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (860, 'Las Mercedes', 19, NULL, 'LPasu40630035', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (861, 'Santa Rosa', 16, NULL, 'LPasu40630036', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (862, 'Totora Grande', 13, NULL, 'LPasu40630038', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (863, 'San Agustin', 15, NULL, 'LPasu40630039', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (864, 'Puerto Rico', 30, NULL, 'LPasu40630045', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (865, '10 De Febrero', 29, NULL, 'LPasu40630046', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (866, 'Chamaca', 10, NULL, 'LPasu40630047', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (867, 'Palmeras', 12, NULL, 'LPasu40630048', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (868, 'Colopampa Grande', 27, NULL, 'LPasu40630049', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (869, 'San Pedro C', 21, NULL, 'LPasu40630055', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (870, 'Adventista La Asunta', 22, NULL, 'LPasu40630057', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (871, 'Segunda San Martin', 7, NULL, 'LPasu40630058', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (872, 'Cuarta Bolivar', 20, NULL, 'LPasu40630061', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (873, 'Franz Tamayo De Illimani', 10, NULL, 'LPasu40630063', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (874, 'Nueva Florida', 7, NULL, 'LPasu40630065', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (875, 'Luis Ramos', 35, NULL, 'LPasu40630066', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (876, 'San Jorge', 9, NULL, 'LPasu40630067', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (877, 'Elizardo Perez', 11, NULL, 'LPasu40630068', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (878, 'Nuevos Horizontes', 24, NULL, 'LPasu40630075', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (879, 'El Palmar', 6, NULL, 'LPasu40630077', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (880, 'Villa Porvenir', 18, NULL, 'LPasu40630085', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (881, 'La Asunta', 88, NULL, 'LPasu40630089', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (882, 'Boopi Motacal', 11, NULL, 'LPasu40630092', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (883, 'Jahuira Pampa', 9, NULL, 'LPasu40630093', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (884, 'Luis Espinal Camps', 0, NULL, 'LPasu40630114', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (885, 'Elizardo Perez - La Asunta "B"', 0, NULL, 'LPasu40630119', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (886, 'Ubaldo Chuquimia Garcia', 0, NULL, 'LPasu40630122', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (887, 'Vida Y Verdad', 0, NULL, 'LPasu40630123', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (888, 'Simon Bolivar Iii', 0, NULL, 'LPasu80540220', NULL, NULL, NULL, 40, NULL);
INSERT INTO public.ue VALUES (889, 'Jorge Cabrera Acuña', 18, NULL, 'LPlap40730021', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (890, 'George Washington', 12, NULL, 'LPlap80730002', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (891, 'Simon Bolivar Nro. 2', 25, NULL, 'LPlap80730010', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (892, 'Simon Bolivar Nro. 1', 117, NULL, 'LPlap80730012', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (893, 'Bolivia Iv', 66, NULL, 'LPlap80730019', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (894, 'San Luis', 71, NULL, 'LPlap80730022', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (895, 'Ignacio Calderon Fe Y Alegria Ii', 125, NULL, 'LPlap80730025', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (896, 'Puerto Rico', 67, NULL, 'LPlap80730027', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (897, 'Humberto Vasquez Machicado', 17, NULL, 'LPlap80730028', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (898, 'Jose Carrasco Torrico', 21, NULL, 'LPlap80730029', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (899, 'Republica De Costa Rica', 0, NULL, 'LPlap80730032', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (900, 'Daniel Sanchez Bustamante I', 19, NULL, 'LPlap80730036', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (901, 'Daniel Sanchez Bustamante Ii', 104, NULL, 'LPlap80730037', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (902, 'Luis Espinal Camps Nro. 2', 63, NULL, 'LPlap80730042', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (903, 'Republica Oriental Del Uruguay', 20, NULL, 'LPlap80730046', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (904, 'Uruguay', 42, NULL, 'LPlap80730047', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (905, 'Adventista Los Andes', 149, NULL, 'LPlap80730060', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (906, 'Carlos Bravo', 22, NULL, 'LPlap80730066', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (907, 'Eduardo Abaroa Iii', 48, NULL, 'LPlap80730067', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (908, 'Libertad Nro. 1', 16, NULL, 'LPlap80730069', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (909, 'Ferroviario', 59, NULL, 'LPlap80730071', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (910, 'Holanda Tarde', 64, NULL, 'LPlap80730073', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (911, 'Holanda Mañana', 114, NULL, 'LPlap80730074', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (912, 'Faustino Suarez', 11, NULL, 'LPlap80730076', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (913, 'Cnl. Max Toledo', 10, NULL, 'LPlap80730077', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (914, 'Alfonso Pardo Uzeda', 17, NULL, 'LPlap80730080', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (915, 'Sagrado Corazon De Jesus', 27, NULL, 'LPlap80730081', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (916, 'Abraham Reyes Fe Y Alegria', 103, NULL, 'LPlap80730099', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (917, 'Santo Tomas Fe Y Alegria', 77, NULL, 'LPlap80730104', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (918, 'Niceforo Rojas', 35, NULL, 'LPlap80730107', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (919, 'Heriberto Guillen Pinto', 0, NULL, 'LPlap80730109', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (920, '25 De Mayo', 41, NULL, 'LPlap80730113', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (921, 'Marien Garten C', 150, NULL, 'LPlap80730116', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (922, 'Eloy Alvarez Plata - Turno Tarde', 33, NULL, 'LPlap80730118', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (923, 'Fabril 18 De Mayo Ii', 53, NULL, 'LPlap80730119', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (924, 'Lucio Velasco Flores', 26, NULL, 'LPlap80730121', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (925, 'San Javier De Fe Y Alegria', 18, NULL, 'LPlap80730122', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (926, 'Franz Tamayo Nro. 1', 17, NULL, 'LPlap80730131', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (927, 'Franz Tamayo Nro. 2', 37, NULL, 'LPlap80730132', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (928, 'Franz Tamayo Nro. 3', 99, NULL, 'LPlap80730133', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (929, 'Republica De Italia', 23, NULL, 'LPlap80730140', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (930, 'Los Amigos', 18, NULL, 'LPlap80730144', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (931, 'Santa Maria Mazzarello I', 38, NULL, 'LPlap80730146', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (932, 'Parroquial San Jose', 27, NULL, 'LPlap80730151', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (933, 'Humboldt Uni Loyola', 52, NULL, 'LPlap80730362', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (934, 'Americano', 169, NULL, 'LPlap80730459', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (935, 'Amerinst', 258, NULL, 'LPlap80730460', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (936, 'Republica Del Peru', 10, NULL, 'LPlap80730462', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (937, 'Republica De Colombia', 29, NULL, 'LPlap80730463', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (938, 'Republica Del Ecuador', 54, NULL, 'LPlap80730464', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (939, 'Agustin Aspiazu', 75, NULL, 'LPlap80730468', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (940, 'Claudio Sanjines', 67, NULL, 'LPlap80730469', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (941, 'Maria Auxiliadora I', 58, NULL, 'LPlap80730485', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (942, 'Desmaissieres Rr Adoratrices', 44, NULL, 'LPlap80730487', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (943, 'Saint Peter S', 18, NULL, 'LPlap80730489', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (944, 'Bautista Canadiense', 66, NULL, 'LPlap80730492', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (945, 'Amoretti', 40, NULL, 'LPlap80730515', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (946, 'Gregorio Reynolds', 103, NULL, 'LPlap80730516', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (947, 'San Fernandoaysoc', 28, NULL, 'LPlap80730519', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (948, 'Italo Boliviano Cristoforo Colombo', 59, NULL, 'LPlap80730551', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (949, '20 De Octubre I', 34, NULL, 'LPlap80730567', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (950, 'Bolivia Ii', 17, NULL, 'LPlap80730630', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (951, 'Filadelfia', 12, NULL, 'LPlap80730672', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (952, 'San Miguel De Alpacoma', 15, NULL, 'LPlap80730673', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (953, 'Hugo Chavez Frias', 29, NULL, 'LPlap80730704', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (954, 'Artemio Camargo', 12, NULL, 'LPlap80730762', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (955, 'Antofagasta Noruego Nro. 2', 49, NULL, 'LPlap80730804', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (956, 'San Jose Ii', 28, NULL, 'LPlap80730835', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (957, 'Jose Santos Vargas Ii', 32, NULL, 'LPlap80730879', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (958, 'Nueva Bolivia', 10, NULL, 'LPlap80730943', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (959, 'Principe De Paz Ls', 10, NULL, 'LPlap80730950', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (960, '27 De Julio S.R.L.', 19, NULL, 'LPlap80730952', NULL, NULL, NULL, 41, NULL);
INSERT INTO public.ue VALUES (961, 'Gualberto Villarroel Nro. 1', 42, NULL, 'LPlap80730083', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (962, 'Gualberto Villarroel Nro. 2', 151, NULL, 'LPlap80730084', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (963, 'Gualberto Villarroel Nro. 3', 32, NULL, 'LPlap80730085', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (964, 'Domingo Faustino Sarmiento', 61, NULL, 'LPlap80730098', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (965, '1ro. De Mayo', 38, NULL, 'LPlap80730173', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (966, '6 De Junio A', 60, NULL, 'LPlap80730306', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (967, 'Francisco De Miranda A', 23, NULL, 'LPlap80730311', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (968, 'Fuerzas Armadas De La Nacion B', 79, NULL, 'LPlap80730314', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (969, 'Chasquipampa B', 31, NULL, 'LPlap80730323', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (970, 'San Andres A', 82, NULL, 'LPlap80730325', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (971, 'Rvdo. Padre Walter Strub A', 67, NULL, 'LPlap80730327', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (972, 'Rose Marie Galindo De Barrientos B', 49, NULL, 'LPlap80730330', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (973, 'La Salle A', 76, NULL, 'LPlap80730331', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (974, 'Santa Rosa La Florida B', 42, NULL, 'LPlap80730333', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (975, 'Juan Herschel B', 14, NULL, 'LPlap80730338', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (976, 'Enrique Lindemann A', 63, NULL, 'LPlap80730339', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (977, 'Enrique Lindemann B', 125, NULL, 'LPlap80730340', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (978, 'Enrique Lindemann C', 29, NULL, 'LPlap80730341', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (979, 'Juan Pablo Ii', 18, NULL, 'LPlap80730342', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (980, 'Aleman Mariscal Braun', 68, NULL, 'LPlap80730346', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (981, 'Cumbre', 15, NULL, 'LPlap80730347', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (982, 'Montessori', 47, NULL, 'LPlap80730348', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (983, 'Yachay Wasy Leonardo Da Vinci', 13, NULL, 'LPlap80730353', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (984, 'San Ignacio', 177, NULL, 'LPlap80730354', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (985, 'Saint Andrew''S', 78, NULL, 'LPlap80730356', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (986, 'Domingo Savio A', 75, NULL, 'LPlap80730359', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (987, 'Saint Germain', 4, NULL, 'LPlap80730360', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (988, 'Los Pinos', 98, NULL, 'LPlap80730364', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (989, 'American Educational Association', 38, NULL, 'LPlap80730370', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (990, 'Libertadores De America', 5, NULL, 'LPlap80730373', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (991, 'Vida Y Verdad', 52, NULL, 'LPlap80730375', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (992, 'Franco Boliviano', 54, NULL, 'LPlap80730376', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (993, 'Mcal. De Zepita', 0, NULL, 'LPlap80730377', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (994, 'Horizontes', 10, NULL, 'LPlap80730385', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (995, 'Bethesda', 28, NULL, 'LPlap80730389', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (996, 'Rosa Gattorno', 33, NULL, 'LPlap80730390', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (997, 'Don Bosco A', 164, NULL, 'LPlap80730391', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (998, 'Sagrados Corazones A', 145, NULL, 'LPlap80730397', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (999, 'Damian De Veuster', 48, NULL, 'LPlap80730399', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1000, 'La Paz B', 120, NULL, 'LPlap80730402', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1001, 'La Paz A', 178, NULL, 'LPlap80730403', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1002, 'Jose Marti', 10, NULL, 'LPlap80730404', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1003, 'My. Jose Agustin Castrillo', 12, NULL, 'LPlap80730407', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1004, 'Las Americas', 21, NULL, 'LPlap80730416', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1005, 'Juan Federico Zuazo', 22, NULL, 'LPlap80730418', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1006, 'Venezuela B', 36, NULL, 'LPlap80730420', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1007, 'Venezuela C', 70, NULL, 'LPlap80730421', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1008, 'San Simon De Ayacucho B', 14, NULL, 'LPlap80730424', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1009, 'San Simon De Ayacucho A', 145, NULL, 'LPlap80730425', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1010, 'Boliviano Noruego B', 42, NULL, 'LPlap80730431', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1011, 'Hugo Davila A', 164, NULL, 'LPlap80730432', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1012, 'Hugo Davila B', 138, NULL, 'LPlap80730433', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1013, 'Manuel Vicente Ballivian', 16, NULL, 'LPlap80730435', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1014, 'Dora Schmidt B', 34, NULL, 'LPlap80730438', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1015, 'Dora Schmidt A', 98, NULL, 'LPlap80730439', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1016, 'Georges Rouma B', 39, NULL, 'LPlap80730441', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1017, 'Juan Francisco Bedregal', 27, NULL, 'LPlap80730445', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1018, 'Republica De Panama', 35, NULL, 'LPlap80730446', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1019, 'Felipe Segundo Guzman', 77, NULL, 'LPlap80730447', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1020, 'Max Valdivia', 81, NULL, 'LPlap80730448', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1021, 'German Busch A', 78, NULL, 'LPlap80730449', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1022, 'German Busch B', 137, NULL, 'LPlap80730450', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1023, 'German Busch C', 19, NULL, 'LPlap80730451', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1024, 'Yugoslavia B', 28, NULL, 'LPlap80730456', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1025, 'Amor De Dios', 103, NULL, 'LPlap80730477', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1026, 'Don Bosco C', 84, NULL, 'LPlap80730478', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1027, 'Educacion Integral America', 34, NULL, 'LPlap80730482', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1028, 'Santa Teresa', 64, NULL, 'LPlap80730484', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1029, 'Santa Maria', 31, NULL, 'LPlap80730488', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1030, 'Anglo Americano', 20, NULL, 'LPlap80730491', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1031, 'San Antonio De Padua I', 185, NULL, 'LPlap80730497', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1032, 'Miguel De Cervantes Saavedra', 30, NULL, 'LPlap80730500', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1033, 'Santa Ana Ii', 91, NULL, 'LPlap80730513', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1034, 'Fray Bernardino De Cardenas', 71, NULL, 'LPlap80730518', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1035, 'San Calixto', 187, NULL, 'LPlap80730522', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1036, 'San Francisco De La Tercera Orden', 123, NULL, 'LPlap80730524', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1037, 'Instituto De Educacion Bancaria', 68, NULL, 'LPlap80730525', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1038, 'Bichito De Luz Nuestra Señora De Itati', 40, NULL, 'LPlap80730539', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1039, 'Ingles Catolico', 85, NULL, 'LPlap80730547', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1040, 'Del Ejercito La Paz', 184, NULL, 'LPlap80730553', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1041, 'Boliviano Noruego A', 41, NULL, 'LPlap80730585', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1042, 'Americano Nestor Peñaranda 2', 49, NULL, 'LPlap80730603', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1043, 'Rene Barrientos Ortuño B', 91, NULL, 'LPlap80730621', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1044, 'Hermann Gmeiner B', 46, NULL, 'LPlap80730643', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1045, 'San Judas Tadeo', 29, NULL, 'LPlap80730675', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1046, 'Rene Barrientos Ortuño A', 105, NULL, 'LPlap80730680', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1047, 'Rosario', 12, NULL, 'LPlap80730694', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1048, 'Boliviano Del Sur', 44, NULL, 'LPlap80730708', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1049, 'Domingo Savio B', 74, NULL, 'LPlap80730712', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1050, 'La Salle B', 93, NULL, 'LPlap80730715', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1051, 'Gran Bretaña B', 19, NULL, 'LPlap80730731', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1052, 'Utasawa', 15, NULL, 'LPlap80730738', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1053, 'Dr. Martin Cardenas Hermosa', 18, NULL, 'LPlap80730739', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1054, 'Victor Paz Estenssoro', 23, NULL, 'LPlap80730753', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1055, 'Yachaykuna Srl', 0, NULL, 'LPlap80730759', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1056, 'Boliviano Achumani', 28, NULL, 'LPlap80730772', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1057, 'Americano Obrajes', 97, NULL, 'LPlap80730774', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1058, 'Pantini', 13, NULL, 'LPlap80730775', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1059, 'Internacional Tierras Altas', 19, NULL, 'LPlap80730787', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1060, 'Ruso Boliviano', 4, NULL, 'LPlap80730798', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1061, 'Naval Heroes Del Pacifico', 126, NULL, 'LPlap80730810', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1062, 'Voces Vitales', 6, NULL, 'LPlap80730822', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1063, 'Lynns', 27, NULL, 'LPlap80730829', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1064, 'Iyambae', 5, NULL, 'LPlap80730895', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1065, 'Cooperativa Educacional Loreto R.L.', 32, NULL, 'LPlap80730932', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1066, 'Adventista La Paz', 138, NULL, 'LPlap80730934', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1067, 'Chasquipampa D', 127, NULL, 'LPlap80730939', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1068, 'España B', 61, NULL, 'LPlap80730940', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1069, 'Achumani B', 60, NULL, 'LPlap80730942', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1070, 'Crear Juntos Edei', 0, NULL, 'LPlap80730949', NULL, NULL, NULL, 42, NULL);
INSERT INTO public.ue VALUES (1071, 'Republica De Francia A', 84, NULL, 'LPlap80730152', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1072, 'Republica De Francia B', 48, NULL, 'LPlap80730153', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1073, 'David Pinilla', 43, NULL, 'LPlap80730156', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1074, 'Ricardo Jose Bustamante B', 23, NULL, 'LPlap80730162', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1075, 'La Merced B', 90, NULL, 'LPlap80730166', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1076, 'Pablo Iturri Jurado B', 63, NULL, 'LPlap80730175', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1077, 'Adolfo Costa Du Rels', 66, NULL, 'LPlap80730176', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1078, 'Alfredo Vargas B', 61, NULL, 'LPlap80730180', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1079, 'Elisa De Ballivian', 60, NULL, 'LPlap80730192', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1080, 'Natalia Palacios', 61, NULL, 'LPlap80730193', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1081, 'Antonio Diaz Villamil A', 74, NULL, 'LPlap80730194', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1082, 'Luis Alberto Pabon A', 10, NULL, 'LPlap80730199', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1083, 'Luis Alberto Pabon B', 49, NULL, 'LPlap80730200', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1084, 'Maria Inmaculada', 65, NULL, 'LPlap80730201', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1085, 'Nuestra Señora De La Paz Ii', 67, NULL, 'LPlap80730205', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1086, 'Irene Nava De Castillo A', 113, NULL, 'LPlap80730209', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1087, 'Isaac Maldonado Reque', 46, NULL, 'LPlap80730211', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1088, 'Rene Zamora', 45, NULL, 'LPlap80730213', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1089, 'Ricardo Jaimes Freyre', 8, NULL, 'LPlap80730224', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1090, 'Jacqueline Kennedy', 15, NULL, 'LPlap80730226', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1091, 'Juan Lechin Oquendo', 11, NULL, 'LPlap80730228', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1092, 'Lourdes', 35, NULL, 'LPlap80730238', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1093, 'Nuestra Señora De Fatima', 50, NULL, 'LPlap80730248', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1094, 'Sergio Mauricio Villegas B', 53, NULL, 'LPlap80730252', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1095, 'Iv Centenario', 9, NULL, 'LPlap80730254', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1096, 'Hno. Pacifico Feletti', 32, NULL, 'LPlap80730257', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1097, 'Armando Escobar Uria B', 14, NULL, 'LPlap80730262', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1098, 'Delia Gambarte De Quezada B', 46, NULL, 'LPlap80730264', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1099, 'Villa Armonia', 8, NULL, 'LPlap80730266', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1100, 'Pedro Poveda A', 100, NULL, 'LPlap80730268', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1101, 'Caracas B', 12, NULL, 'LPlap80730271', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1102, 'Elodia De Lijeron', 0, NULL, 'LPlap80730275', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1103, 'Copacabana B', 44, NULL, 'LPlap80730279', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1104, 'Copacabana C', 74, NULL, 'LPlap80730280', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1105, 'Copacabana D', 20, NULL, 'LPlap80730281', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1106, 'Sergio Almaraz', 41, NULL, 'LPlap80730283', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1107, 'San Antonio I', 14, NULL, 'LPlap80730289', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1108, 'Mejillones', 37, NULL, 'LPlap80730291', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1109, '13 De Junio', 21, NULL, 'LPlap80730293', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1110, 'Niño Jesus Ciudad Del Niño', 31, NULL, 'LPlap80730294', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1111, 'Cristo Rey', 23, NULL, 'LPlap80730296', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1112, 'Jerusalem', 20, NULL, 'LPlap80730297', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1113, 'Paz Nery Nava Ii', 8, NULL, 'LPlap80730298', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1114, 'Santisima Trinidad', 40, NULL, 'LPlap80730509', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1115, 'Americana', 40, NULL, 'LPlap80730510', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1116, 'Zongo Choro', 5, NULL, 'LPlap80730537', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1117, 'Pater Noster', 18, NULL, 'LPlap80730541', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1118, 'Maria Inmaculada A', 52, NULL, 'LPlap80730543', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1119, 'Rene Barrientos Ortuño', 24, NULL, 'LPlap80730548', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1120, 'Mcal. Antonio Jose De Sucre A', 10, NULL, 'LPlap80730549', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1121, 'Simon Rodriguez Carreño', 112, NULL, 'LPlap80730561', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1122, 'San Simon I', 21, NULL, 'LPlap80730574', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1123, 'Topater', 83, NULL, 'LPlap80730592', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1124, 'Don Bosco De Pampahasi D', 68, NULL, 'LPlap80730614', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1125, 'Nueva Jerusalem', 20, NULL, 'LPlap80730674', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1126, 'Villa Callapa', 0, NULL, 'LPlap80730682', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1127, 'Cristiano Vida Nueva', 99, NULL, 'LPlap80730702', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1128, '10 De Junio', 29, NULL, 'LPlap80730736', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1129, 'Luis Ernst', 30, NULL, 'LPlap80730758', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1130, 'Valle Hermoso', 26, NULL, 'LPlap80730764', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1131, 'Cahua Grande', 7, NULL, 'LPlap80730783', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1132, 'Bicentenario La Paz', 24, NULL, 'LPlap80730788', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1133, 'Las Delicias Prof. Jaime Escalante', 21, NULL, 'LPlap80730791', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1134, 'Kalajahuira B', 42, NULL, 'LPlap80730803', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1135, 'Sergio Suarez Figueroa B', 20, NULL, 'LPlap80730824', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1136, 'Ave María Fundación Manos Abiertas Virgen De La Natividad', 79, NULL, 'LPlap80730922', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1137, 'Gral. Jose De San Martin A', 83, NULL, 'LPlap80730945', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1138, 'Hernando Siles Reyes B', 137, NULL, 'LPlap80730947', NULL, NULL, NULL, 43, NULL);
INSERT INTO public.ue VALUES (1139, 'Ismael Montes', 12, NULL, 'LPlaj70620001', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1140, 'Gualberto Villarroel De Sacacani', 11, NULL, 'LPlaj70620003', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1141, 'Curva Pucara', 8, NULL, 'LPlaj70620004', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1142, 'Pedro Domingo Murillo A', 46, NULL, 'LPlaj70620005', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1143, 'Los Andes', 6, NULL, 'LPlaj70620007', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1144, 'Julian Apaza', 8, NULL, 'LPlaj70620008', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1145, 'Copajira A', 11, NULL, 'LPlaj70620010', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1146, 'Tambillo', 16, NULL, 'LPlaj70620011', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1147, 'Callamarca', 11, NULL, 'LPlaj70620014', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1148, 'Cantuyo', 9, NULL, 'LPlaj70620028', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1149, 'Santa Rosa', 12, NULL, 'LPlaj70620034', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1150, 'Heroes Del 15 De Enero', 10, NULL, 'LPlaj70620043', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1151, 'Comandante Hugo Chavez Frias', 7, NULL, 'LPlaj70620050', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1152, 'Rene Barrientos Ortuño', 4, NULL, 'LPlaj70620057', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1153, 'Japon', 12, NULL, 'LPlaj70620062', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1154, 'Reino De Noruega B', 0, NULL, 'LPlaj70620063', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1155, 'Capacasi', 26, NULL, 'LPlaj70620066', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1156, 'Republica De Iran', 0, NULL, 'LPlaj70620078', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1157, 'Republica Bolivariana De Venezuela', 31, NULL, 'LPlaj70620079', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1158, 'Berlin', 0, NULL, 'LPlaj70620081', NULL, NULL, NULL, 44, NULL);
INSERT INTO public.ue VALUES (1159, 'Eduardo Abaroa', 4, NULL, 'LPlur80650006', NULL, NULL, NULL, 45, NULL);
INSERT INTO public.ue VALUES (1160, 'Rvdo. Leoncio Victor Arauzo', 15, NULL, 'LPlur80650007', NULL, NULL, NULL, 45, NULL);
INSERT INTO public.ue VALUES (1161, 'Venezuela', 17, NULL, 'LPlur80650010', NULL, NULL, NULL, 45, NULL);
INSERT INTO public.ue VALUES (1162, 'Anchallani Republica Venezuela', 5, NULL, 'LPlur80650013', NULL, NULL, NULL, 45, NULL);
INSERT INTO public.ue VALUES (1163, 'Azambo', 9, NULL, 'LPlur80650017', NULL, NULL, NULL, 45, NULL);
INSERT INTO public.ue VALUES (1164, 'El Porvenir', 0, NULL, 'LPlur80650021', NULL, NULL, NULL, 45, NULL);
INSERT INTO public.ue VALUES (1165, 'Cutty', 8, NULL, 'LPlur80650024', NULL, NULL, NULL, 45, NULL);
INSERT INTO public.ue VALUES (1166, 'Simon Bolivar', 13, NULL, 'LPlur80650031', NULL, NULL, NULL, 45, NULL);
INSERT INTO public.ue VALUES (1167, 'Marcelo Quiroga Santa Cruz De Poroma', 12, NULL, 'LPlur80650035', NULL, NULL, NULL, 45, NULL);
INSERT INTO public.ue VALUES (1168, 'Bravo', 10, NULL, 'LPlur80650045', NULL, NULL, NULL, 45, NULL);
INSERT INTO public.ue VALUES (1169, 'San Juan De Porvenir', 29, NULL, 'LPlur80650051', NULL, NULL, NULL, 45, NULL);
INSERT INTO public.ue VALUES (1170, 'Santa Rosa', 41, NULL, 'LPmap20680005', NULL, NULL, NULL, 46, NULL);
INSERT INTO public.ue VALUES (1171, 'Vilaque Grande', 12, NULL, 'LPmap70680022', NULL, NULL, NULL, 46, NULL);
INSERT INTO public.ue VALUES (1172, '1ro. De Mayo De Charopampa', 21, NULL, 'LPmap70680023', NULL, NULL, NULL, 46, NULL);
INSERT INTO public.ue VALUES (1173, '16 De Julio De Mapiri', 48, NULL, 'LPmap70680029', NULL, NULL, NULL, 46, NULL);
INSERT INTO public.ue VALUES (1174, 'Cañapampa', 13, NULL, 'LPmap70680030', NULL, NULL, NULL, 46, NULL);
INSERT INTO public.ue VALUES (1175, 'Yaycura', 10, NULL, 'LPmap70680031', NULL, NULL, NULL, 46, NULL);
INSERT INTO public.ue VALUES (1176, 'Padre Gotardo Kaiser', 61, NULL, 'LPmap70680035', NULL, NULL, NULL, 46, NULL);
INSERT INTO public.ue VALUES (1177, 'Sorata Ltda', 14, NULL, 'LPmap70680053', NULL, NULL, NULL, 46, NULL);
INSERT INTO public.ue VALUES (1178, 'Chimate', 6, NULL, 'LPmap70680082', NULL, NULL, NULL, 46, NULL);
INSERT INTO public.ue VALUES (1179, 'Juan Jose Torrez', 13, NULL, 'LPmap70680105', NULL, NULL, NULL, 46, NULL);
INSERT INTO public.ue VALUES (1180, 'Sagrada Familia', 42, NULL, 'LPmec60730001', NULL, NULL, NULL, 47, NULL);
INSERT INTO public.ue VALUES (1181, 'El Rosario', 17, NULL, 'LPmec60730002', NULL, NULL, NULL, 47, NULL);
INSERT INTO public.ue VALUES (1182, 'San Miguel De El Palomar', 15, NULL, 'LPmec60730004', NULL, NULL, NULL, 47, NULL);
INSERT INTO public.ue VALUES (1183, 'Guillermo Frias', 27, NULL, 'LPmec60730007', NULL, NULL, NULL, 47, NULL);
INSERT INTO public.ue VALUES (1184, 'Jupapina', 25, NULL, 'LPmec60730008', NULL, NULL, NULL, 47, NULL);
INSERT INTO public.ue VALUES (1185, '6 De Junio De Caracarani', 4, NULL, 'LPmec60730015', NULL, NULL, NULL, 47, NULL);
INSERT INTO public.ue VALUES (1186, 'German Busch', 4, NULL, 'LPmec60730019', NULL, NULL, NULL, 47, NULL);
INSERT INTO public.ue VALUES (1187, 'Santiago De Collana', 11, NULL, 'LPmec60730024', NULL, NULL, NULL, 47, NULL);
INSERT INTO public.ue VALUES (1188, 'Marcelo Quiroga Santa Cruz', 6, NULL, 'LPmec60730027', NULL, NULL, NULL, 47, NULL);
INSERT INTO public.ue VALUES (1189, 'San Simon De Ayacucho', 6, NULL, 'LPmec60730044', NULL, NULL, NULL, 47, NULL);
INSERT INTO public.ue VALUES (1190, 'Nuevo Amanecer Mecapaca', 7, NULL, 'LPmec60730046', NULL, NULL, NULL, 47, NULL);
INSERT INTO public.ue VALUES (1191, 'Señor De Exaltacion', 0, NULL, 'LPmec60730050', NULL, NULL, NULL, 47, NULL);
INSERT INTO public.ue VALUES (1192, 'Millocato', 16, NULL, 'LPmec70730044', NULL, NULL, NULL, 47, NULL);
INSERT INTO public.ue VALUES (1193, 'Mallasa', 46, NULL, 'LPmec70730056', NULL, NULL, NULL, 47, NULL);
INSERT INTO public.ue VALUES (1194, 'Eliodoro Camacho De Mocomoco', 10, NULL, 'LPmoc70700001', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1195, 'Italaque', 2, NULL, 'LPmoc70700002', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1196, 'Pacaures', 14, NULL, 'LPmoc70700003', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1197, 'Tajani B', 21, NULL, 'LPmoc70700005', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1198, 'Quilima Challapata', 11, NULL, 'LPmoc70700007', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1199, 'Yocarhuaya', 7, NULL, 'LPmoc70700011', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1200, 'Punama', 17, NULL, 'LPmoc70700016', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1201, 'Huyu Huyu', 12, NULL, 'LPmoc70700022', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1202, 'Ingas', 7, NULL, 'LPmoc70700033', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1203, 'Chiñisco', 12, NULL, 'LPmoc70700039', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1204, 'Ilave', 10, NULL, 'LPmoc70700046', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1205, 'San Luis De Wilacala', 14, NULL, 'LPmoc70700053', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1206, 'Huarachani', 2, NULL, 'LPmoc70700057', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1207, 'San Jose De Pacobamba', 10, NULL, 'LPmoc70700060', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1208, 'Taypi Ayca', 10, NULL, 'LPmoc80700033', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1209, 'Cajcachi', 4, NULL, 'LPmoc80700115', NULL, NULL, NULL, 48, NULL);
INSERT INTO public.ue VALUES (1210, 'Joaquin Herrmann De Villa Apaña', 21, NULL, 'LPpal60730029', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1211, 'Pedro Domingo Murillo I', 27, NULL, 'LPpal70730001', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1212, 'Simon Bolivar', 16, NULL, 'LPpal70730002', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1213, 'Tuhuaco', 7, NULL, 'LPpal70730007', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1214, 'Tacapaya', 0, NULL, 'LPpal70730008', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1215, 'Pacuani', 11, NULL, 'LPpal70730009', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1216, 'Cohoni', 16, NULL, 'LPpal70730013', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1217, 'Cayimbaya', 13, NULL, 'LPpal70730022', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1218, 'Mutuhuaya', 11, NULL, 'LPpal70730023', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1219, 'Hussi', 12, NULL, 'LPpal70730029', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1220, 'San Geronimo De Uni', 17, NULL, 'LPpal70730031', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1221, 'Pedro Domingo Murillo Ii', 23, NULL, 'LPpal70730032', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1222, 'Tahuapalca', 7, NULL, 'LPpal70730042', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1223, 'Cachapaya', 14, NULL, 'LPpal70730043', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1224, 'Challasirca', 12, NULL, 'LPpal70730049', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1225, 'Villa Cotaña', 11, NULL, 'LPpal70730057', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1226, 'Zona Zona', 0, NULL, 'LPpal70730064', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1227, 'Jach''A Uru', 27, NULL, 'LPpal70730065', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1228, 'Santa Rosa De Lima B', 75, NULL, 'LPpal70730068', NULL, NULL, NULL, 49, NULL);
INSERT INTO public.ue VALUES (1229, 'Alfredo Ovando Candia', 15, NULL, 'LPpal50630002', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1230, 'Santa Ana De Mosetenes', 12, NULL, 'LPpal50630009', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1231, 'San Miguel De Huachi', 21, NULL, 'LPpal50630015', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1232, 'Covendo', 14, NULL, 'LPpal50630020', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1233, 'Inicua', 25, NULL, 'LPpal50630026', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1234, 'El Sillar', 15, NULL, 'LPpal50630032', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1235, 'La Cascada', 10, NULL, 'LPpal50630033', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1236, 'Tucupi', 18, NULL, 'LPpal50630037', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1237, 'Cocochi', 10, NULL, 'LPpal50630039', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1238, 'Puerto Carmen', 18, NULL, 'LPpal50630041', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1239, 'Agua Dulce', 15, NULL, 'LPpal50630042', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1240, 'Villa Concepcion', 15, NULL, 'LPpal50630045', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1241, 'Cumbre', 6, NULL, 'LPpal50630047', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1242, 'Palos Blancos B', 80, NULL, 'LPpal50630055', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1243, 'Juan Pablo Ii', 14, NULL, 'LPpal50630056', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1244, 'Sapecho B', 42, NULL, 'LPpal50630057', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1245, 'San Jose', 13, NULL, 'LPpal50630059', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1246, 'Charcas Ii', 12, NULL, 'LPpal50630062', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1247, 'El Moseten', 5, NULL, 'LPpal50630067', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1248, 'Suapi', 0, NULL, 'LPpal50630078', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1249, 'Norte Amazonico Palos Blancos', 7, NULL, 'LPpal50630081', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1250, 'Arancibia De Mosetenes', 0, NULL, 'LPpal50630083', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1251, 'Padre Roberto Eckerstofer', 29, NULL, 'LPpal50630085', NULL, NULL, NULL, 50, NULL);
INSERT INTO public.ue VALUES (1252, 'Papel Pampa', 19, NULL, 'LPpap70560004', NULL, NULL, NULL, 51, NULL);
INSERT INTO public.ue VALUES (1253, 'Santos Marca Thola', 9, NULL, 'LPpap70560012', NULL, NULL, NULL, 51, NULL);
INSERT INTO public.ue VALUES (1254, 'Gualberto Villarroel', 6, NULL, 'LPpap70560020', NULL, NULL, NULL, 51, NULL);
INSERT INTO public.ue VALUES (1255, 'Julian Apaza', 8, NULL, 'LPpap70560023', NULL, NULL, NULL, 51, NULL);
INSERT INTO public.ue VALUES (1256, 'Waldo Ballivian', 5, NULL, 'LPpap70560028', NULL, NULL, NULL, 51, NULL);
INSERT INTO public.ue VALUES (1257, 'Villa Esperanza', 8, NULL, 'LPpap70560029', NULL, NULL, NULL, 51, NULL);
INSERT INTO public.ue VALUES (1258, 'Nacional Ayacucho', 13, NULL, 'LPpat40610001', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1259, 'Taipillanga', 11, NULL, 'LPpat40610005', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1260, 'Colchani', 8, NULL, 'LPpat40610007', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1261, 'Belen Iquiaca', 11, NULL, 'LPpat40610012', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1262, 'Franz Tamayo De Chiaraque', 15, NULL, 'LPpat40610017', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1263, 'German Busch A', 100, NULL, 'LPpat40610023', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1264, 'Nacional De Patacamaya A', 89, NULL, 'LPpat40610029', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1265, 'Chiarumani', 8, NULL, 'LPpat40610030', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1266, 'Simon Bolivar De Chacoma', 5, NULL, 'LPpat40610031', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1267, 'Viscachani', 19, NULL, 'LPpat40610032', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1268, 'Porvenir', 13, NULL, 'LPpat40610037', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1269, 'Cnl. Roberto Pabon Mañana', 45, NULL, 'LPpat40610038', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1270, 'Moderna', 16, NULL, 'LPpat40610049', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1271, 'Patacamaya', 60, NULL, 'LPpat40610052', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1272, 'Calama', 0, NULL, 'LPpat40610054', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1273, 'Pedro Domingo Murillo', 36, NULL, 'LPpat40610059', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1274, '23 De Marzo De San Martin Iquiaca', 10, NULL, 'LPpat40610062', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1275, 'Gral. Juan Jose Torrez', 0, NULL, 'LPpat40610068', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1276, 'Elizardo Perez', 6, NULL, 'LPpat40610072', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1277, 'Adventista Patacamaya', 0, NULL, 'LPpat40610076', NULL, NULL, NULL, 52, NULL);
INSERT INTO public.ue VALUES (1278, 'Sorapata', 7, NULL, 'LPpel70670001', NULL, NULL, NULL, 53, NULL);
INSERT INTO public.ue VALUES (1279, 'Ulla Ulla - Ucha Ucha', 16, NULL, 'LPpel70670003', NULL, NULL, NULL, 53, NULL);
INSERT INTO public.ue VALUES (1280, 'Puyo Puyo', 4, NULL, 'LPpel70670006', NULL, NULL, NULL, 53, NULL);
INSERT INTO public.ue VALUES (1281, 'Hichocollo', 6, NULL, 'LPpel70670007', NULL, NULL, NULL, 53, NULL);
INSERT INTO public.ue VALUES (1282, 'Antaquilla', 10, NULL, 'LPpel70670009', NULL, NULL, NULL, 53, NULL);
INSERT INTO public.ue VALUES (1283, 'Litoral De Agua Blanca', 8, NULL, 'LPpel70670010', NULL, NULL, NULL, 53, NULL);
INSERT INTO public.ue VALUES (1284, 'Puina', 3, NULL, 'LPpel70670018', NULL, NULL, NULL, 53, NULL);
INSERT INTO public.ue VALUES (1285, 'Santiago De Pelechuco', 6, NULL, 'LPpel70670022', NULL, NULL, NULL, 53, NULL);
INSERT INTO public.ue VALUES (1286, 'San Juan De Hilo Hilo', 9, NULL, 'LPpel70670023', NULL, NULL, NULL, 53, NULL);
INSERT INTO public.ue VALUES (1287, 'San Antonio De Suchez', 6, NULL, 'LPpel70670028', NULL, NULL, NULL, 53, NULL);
INSERT INTO public.ue VALUES (1288, 'San Agustin De Keara', 0, NULL, 'LPpel70670030', NULL, NULL, NULL, 53, NULL);
INSERT INTO public.ue VALUES (1289, 'San Miguel De Thapi', 0, NULL, 'LPpel70670032', NULL, NULL, NULL, 53, NULL);
INSERT INTO public.ue VALUES (1290, 'Cnl. Angel Avendaño Herrera', 11, NULL, 'LPpuc50620025', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1291, 'Boliviano Japones', 50, NULL, 'LPpuc60620045', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1292, 'San Salvador', 19, NULL, 'LPpuc80620002', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1293, 'Franz Tamayo', 50, NULL, 'LPpuc80620003', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1294, 'Collasuyo', 31, NULL, 'LPpuc80620005', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1295, 'Elizardo Perez', 14, NULL, 'LPpuc80620007', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1296, 'Mcal. De Ayacucho', 22, NULL, 'LPpuc80620008', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1297, 'Dr. Mario Gutierrez Gutierrez', 26, NULL, 'LPpuc80620009', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1298, '16 De Julio', 50, NULL, 'LPpuc80620010', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1299, 'Pampajasi', 20, NULL, 'LPpuc80620015', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1300, 'Republica Bolivariana De Venezuela', 19, NULL, 'LPpuc80620016', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1301, 'Santa Ana', 14, NULL, 'LPpuc80620020', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1302, 'German Busch', 11, NULL, 'LPpuc80620021', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1303, 'Ancocagua', 25, NULL, 'LPpuc80620033', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1304, 'Chojñacollo', 9, NULL, 'LPpuc80620037', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1305, 'Catavi', 7, NULL, 'LPpuc80620047', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1306, 'Caleria', 8, NULL, 'LPpuc80620049', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1307, 'Marcelo Quiroga Santa Cruz', 10, NULL, 'LPpuc80620051', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1308, 'Huarisuyo', 0, NULL, 'LPpuc80620055', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1309, 'Cota Cota', 19, NULL, 'LPpuc80620060', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1310, 'Juan Jose Torrez De Korila', 11, NULL, 'LPpuc80620066', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1311, 'Andino', 5, NULL, 'LPpuc80620072', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1312, 'Marco Adelio Guzman - Chacalleta', 9, NULL, 'LPpuc80620073', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1313, 'Bahia Cohana', 25, NULL, 'LPpuc80620082', NULL, NULL, NULL, 54, NULL);
INSERT INTO public.ue VALUES (1314, 'Nicolas Acosta', 17, NULL, 'LPpue80700001', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1315, 'Escoma', 30, NULL, 'LPpue80700002', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1316, 'Bolivia', 16, NULL, 'LPpue80700003', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1317, 'Nacional Puerto Belen', 9, NULL, 'LPpue80700004', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1318, 'Taypi Chiñaya B', 10, NULL, 'LPpue80700006', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1319, 'Sañuta', 4, NULL, 'LPpue80700013', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1320, '4 De Abril', 14, NULL, 'LPpue80700017', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1321, 'Villa Ticata', 4, NULL, 'LPpue80700040', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1322, 'Jichuiri', 8, NULL, 'LPpue80700041', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1323, 'Cotapata', 2, NULL, 'LPpue80700045', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1324, '29 De Septiembre', 7, NULL, 'LPpue80700053', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1325, 'Sallacucho', 8, NULL, 'LPpue80700065', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1326, 'Cala Cala', 5, NULL, 'LPpue80700070', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1327, 'Villa Puni', 3, NULL, 'LPpue80700072', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1328, 'Cutucutu', 17, NULL, 'LPpue80700083', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1329, 'Orurillo', 5, NULL, 'LPpue80700089', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1330, 'Lago Sagrado De Tanavacas', 8, NULL, 'LPpue80700098', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1331, 'Pococata', 3, NULL, 'LPpue80700102', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1332, 'Jupani Grande', 12, NULL, 'LPpue80700106', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1333, 'Centro Belen', 6, NULL, 'LPpue80700117', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1334, 'San Francisco', 12, NULL, 'LPpue80700127', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1335, 'San Jose', 29, NULL, 'LPpue80700128', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1336, 'Mosaico Don Bosco', 0, NULL, 'LPpue80700131', NULL, NULL, NULL, 55, NULL);
INSERT INTO public.ue VALUES (1337, 'Copusquia A', 9, NULL, 'LPpue60700002', NULL, NULL, NULL, 56, NULL);
INSERT INTO public.ue VALUES (1338, 'Juan Jose Torrez Gonzales', 10, NULL, 'LPpue60700005', NULL, NULL, NULL, 56, NULL);
INSERT INTO public.ue VALUES (1339, 'Manuel Rigoberto Paredes', 21, NULL, 'LPpue60700007', NULL, NULL, NULL, 56, NULL);
INSERT INTO public.ue VALUES (1340, 'Martin Cardenas Hermosa', 43, NULL, 'LPpue60700008', NULL, NULL, NULL, 56, NULL);
INSERT INTO public.ue VALUES (1341, 'Republica Bolivariana De Venezuela', 14, NULL, 'LPpue60700010', NULL, NULL, NULL, 56, NULL);
INSERT INTO public.ue VALUES (1342, 'Chipuspuri', 3, NULL, 'LPpue60700022', NULL, NULL, NULL, 56, NULL);
INSERT INTO public.ue VALUES (1343, 'Mariscal Sucre', 3, NULL, 'LPpue60700025', NULL, NULL, NULL, 56, NULL);
INSERT INTO public.ue VALUES (1344, 'Chorobamba', 11, NULL, 'LPpue60700026', NULL, NULL, NULL, 56, NULL);
INSERT INTO public.ue VALUES (1345, 'Mollipongo', 6, NULL, 'LPpue60700041', NULL, NULL, NULL, 56, NULL);
INSERT INTO public.ue VALUES (1346, 'Pasarani', 9, NULL, 'LPpue60700051', NULL, NULL, NULL, 56, NULL);
INSERT INTO public.ue VALUES (1347, 'Santiago De Okola', 7, NULL, 'LPpue60700056', NULL, NULL, NULL, 56, NULL);
INSERT INTO public.ue VALUES (1348, 'Santiago Pampa', 6, NULL, 'LPpue60700060', NULL, NULL, NULL, 56, NULL);
INSERT INTO public.ue VALUES (1349, 'Chuani B', 8, NULL, 'LPpue60700071', NULL, NULL, NULL, 56, NULL);
INSERT INTO public.ue VALUES (1350, 'Artesanal Don Bosco', 0, NULL, 'LPpue60700072', NULL, NULL, NULL, 56, NULL);
INSERT INTO public.ue VALUES (1351, 'Dr. Marcelo Quiroga Santa Cruz', 8, NULL, 'LPpue50620001', NULL, NULL, NULL, 57, NULL);
INSERT INTO public.ue VALUES (1352, 'Dr. Bautista Saavedra', 15, NULL, 'LPpue50620005', NULL, NULL, NULL, 57, NULL);
INSERT INTO public.ue VALUES (1353, 'Khanapata', 12, NULL, 'LPpue50620008', NULL, NULL, NULL, 57, NULL);
INSERT INTO public.ue VALUES (1354, 'Cumana', 6, NULL, 'LPpue50620011', NULL, NULL, NULL, 57, NULL);
INSERT INTO public.ue VALUES (1355, 'Isla Quehuaya', 9, NULL, 'LPpue50620015', NULL, NULL, NULL, 57, NULL);
INSERT INTO public.ue VALUES (1356, '16 De Julio', 21, NULL, 'LPpue50620020', NULL, NULL, NULL, 57, NULL);
INSERT INTO public.ue VALUES (1357, 'Nacional De Quime', 52, NULL, 'LPqui70640002', NULL, NULL, NULL, 58, NULL);
INSERT INTO public.ue VALUES (1358, 'Mcal. Sucre', 9, NULL, 'LPqui70640003', NULL, NULL, NULL, 58, NULL);
INSERT INTO public.ue VALUES (1359, 'Simon Bolivar', 13, NULL, 'LPqui70640008', NULL, NULL, NULL, 58, NULL);
INSERT INTO public.ue VALUES (1360, 'Camillaya', 4, NULL, 'LPqui70640009', NULL, NULL, NULL, 58, NULL);
INSERT INTO public.ue VALUES (1361, 'Choquetanga Grande', 16, NULL, 'LPqui70640015', NULL, NULL, NULL, 58, NULL);
INSERT INTO public.ue VALUES (1362, '1ro. De Mayo', 7, NULL, 'LPsan80660078', NULL, NULL, NULL, 59, NULL);
INSERT INTO public.ue VALUES (1364, 'Alto De La Alianza', 7, NULL, 'LPsan80660121', NULL, NULL, NULL, 59, NULL);
INSERT INTO public.ue VALUES (1369, 'Batallon Colorados De Bolivia', 2, NULL, 'LPsan80660204', NULL, NULL, NULL, 59, NULL);
INSERT INTO public.ue VALUES (1370, 'Bolivia Mar', 12, NULL, 'LPsan80660050', NULL, NULL, NULL, 59, NULL);
INSERT INTO public.ue VALUES (1371, 'Boliviano Japones', 4, NULL, 'LPsan80660067', NULL, NULL, NULL, 59, NULL);
INSERT INTO public.ue VALUES (1381, 'Jose Olvis Arias', 3, NULL, 'LPsan80660155', NULL, NULL, NULL, 59, NULL);
INSERT INTO public.ue VALUES (1389, 'San Andres', 4, NULL, 'LPsan80660073', NULL, NULL, NULL, 59, NULL);
INSERT INTO public.ue VALUES (1396, 'Tupac Katari B', 9, NULL, 'LPsan80660202', NULL, NULL, NULL, 59, NULL);
INSERT INTO public.ue VALUES (1398, 'Villa Pusuma', 6, NULL, 'LPsan80660149', NULL, NULL, NULL, 59, NULL);
INSERT INTO public.ue VALUES (1403, 'Buena Vista', 6, NULL, 'LPsanb80590007', NULL, NULL, NULL, 60, NULL);
INSERT INTO public.ue VALUES (1408, 'Guerrilleros Lanza', 16, NULL, 'LPsanb80590003', NULL, NULL, NULL, 60, NULL);
INSERT INTO public.ue VALUES (1410, 'Jose Manuel Pando', 14, NULL, 'LPsanb80590001', NULL, NULL, NULL, 60, NULL);
INSERT INTO public.ue VALUES (1414, 'Pie De Montaña', 4, NULL, 'LPsanb70590024', NULL, NULL, NULL, 60, NULL);
INSERT INTO public.ue VALUES (1416, 'San Buenaventura', 51, NULL, 'LPsanb80590002', NULL, NULL, NULL, 60, NULL);
INSERT INTO public.ue VALUES (1418, 'San Jose De Uchupiamonas', 7, NULL, 'LPsanb80590018', NULL, NULL, NULL, 60, NULL);
INSERT INTO public.ue VALUES (1419, 'San Miguel', 4, NULL, 'LPsanb80590006', NULL, NULL, NULL, 60, NULL);
INSERT INTO public.ue VALUES (1420, 'Santa Ana', 11, NULL, 'LPsanb70590018', NULL, NULL, NULL, 60, NULL);
INSERT INTO public.ue VALUES (1423, 'Tumupasa B', 38, NULL, 'LPsanb70590017', NULL, NULL, NULL, 60, NULL);
INSERT INTO public.ue VALUES (1426, 'Simon Bolivar', 7, NULL, 'LPsanp70560027', NULL, NULL, NULL, 61, NULL);
INSERT INTO public.ue VALUES (1427, 'Mcal. Sucre', 6, NULL, 'LPsanp80560001', NULL, NULL, NULL, 61, NULL);
INSERT INTO public.ue VALUES (1428, 'Hernando Siles', 9, NULL, 'LPsanp80560007', NULL, NULL, NULL, 61, NULL);
INSERT INTO public.ue VALUES (1429, 'Nacional Eduardo Abaroa', 6, NULL, 'LPsanp80560011', NULL, NULL, NULL, 61, NULL);
INSERT INTO public.ue VALUES (1430, 'Luis Espinal', 7, NULL, 'LPsanp80560015', NULL, NULL, NULL, 61, NULL);
INSERT INTO public.ue VALUES (1431, 'Chojña', 8, NULL, 'LPsanp80560016', NULL, NULL, NULL, 61, NULL);
INSERT INTO public.ue VALUES (1432, 'Huisco Kari', 20, NULL, 'LPsanp80560027', NULL, NULL, NULL, 61, NULL);
INSERT INTO public.ue VALUES (1433, 'Calama', 4, NULL, 'LPsanp80560032', NULL, NULL, NULL, 61, NULL);
INSERT INTO public.ue VALUES (1434, 'Chacarilla', 4, NULL, 'LPsanp80560034', NULL, NULL, NULL, 61, NULL);
INSERT INTO public.ue VALUES (1435, 'Puerto Aroma', 6, NULL, 'LPsanp80560038', NULL, NULL, NULL, 61, NULL);
INSERT INTO public.ue VALUES (1436, 'Nacional Tito Yupanqui', 13, NULL, 'LPsant60570001', NULL, NULL, NULL, 62, NULL);
INSERT INTO public.ue VALUES (1437, 'Simon Bolivar', 31, NULL, 'LPsant70570001', NULL, NULL, NULL, 62, NULL);
INSERT INTO public.ue VALUES (1438, 'Villa Amacari', 4, NULL, 'LPsant70570004', NULL, NULL, NULL, 62, NULL);
INSERT INTO public.ue VALUES (1439, 'San Pablo De Tiquina', 19, NULL, 'LPsant70570008', NULL, NULL, NULL, 62, NULL);
INSERT INTO public.ue VALUES (1440, 'Lupalaya', 3, NULL, 'LPsant70570009', NULL, NULL, NULL, 62, NULL);
INSERT INTO public.ue VALUES (1441, 'Isla Taquiri', 5, NULL, 'LPsant70570012', NULL, NULL, NULL, 62, NULL);
INSERT INTO public.ue VALUES (1442, 'Puerto Mejillones', 6, NULL, 'LPsant70570013', NULL, NULL, NULL, 62, NULL);
INSERT INTO public.ue VALUES (1443, 'German Busch De Canuta', 9, NULL, 'LPsanc10710002', NULL, NULL, NULL, 63, NULL);
INSERT INTO public.ue VALUES (1444, 'Romero Pampa B', 6, NULL, 'LPsanc10710014', NULL, NULL, NULL, 63, NULL);
INSERT INTO public.ue VALUES (1445, 'Huayllapanta', 8, NULL, 'LPsanc10710015', NULL, NULL, NULL, 63, NULL);
INSERT INTO public.ue VALUES (1446, 'Nacional Santiago De Callapa', 6, NULL, 'LPsanc10710030', NULL, NULL, NULL, 63, NULL);
INSERT INTO public.ue VALUES (1447, 'Nacional De Calteca', 7, NULL, 'LPsanc10710036', NULL, NULL, NULL, 63, NULL);
INSERT INTO public.ue VALUES (1448, 'Tupac Amaru', 4, NULL, 'LPsanc10710039', NULL, NULL, NULL, 63, NULL);
INSERT INTO public.ue VALUES (1449, 'Simon Bolivar Mcal. Sucre', 6, NULL, 'LPsanc10710040', NULL, NULL, NULL, 63, NULL);
INSERT INTO public.ue VALUES (1450, 'Catacora', 5, NULL, 'LPsand70550001', NULL, NULL, NULL, 64, NULL);
INSERT INTO public.ue VALUES (1451, 'Pairumani Grande', 2, NULL, 'LPsand70550007', NULL, NULL, NULL, 64, NULL);
INSERT INTO public.ue VALUES (1452, 'Añufani', 5, NULL, 'LPsand80550015', NULL, NULL, NULL, 64, NULL);
INSERT INTO public.ue VALUES (1453, 'Litoral', 34, NULL, 'LPsand80550016', NULL, NULL, NULL, 64, NULL);
INSERT INTO public.ue VALUES (1454, 'Huaripujo', 5, NULL, 'LPsand80550017', NULL, NULL, NULL, 64, NULL);
INSERT INTO public.ue VALUES (1455, 'Berenguela', 1, NULL, 'LPsand80550019', NULL, NULL, NULL, 64, NULL);
INSERT INTO public.ue VALUES (1456, 'Villa Exaltacion', 4, NULL, 'LPsand80550020', NULL, NULL, NULL, 64, NULL);
INSERT INTO public.ue VALUES (1457, 'Ayahuayco', 10, NULL, 'LPsap70650001', NULL, NULL, NULL, 65, NULL);
INSERT INTO public.ue VALUES (1458, 'San Marcos', 18, NULL, 'LPsap70650005', NULL, NULL, NULL, 65, NULL);
INSERT INTO public.ue VALUES (1459, 'Khola', 13, NULL, 'LPsap70650007', NULL, NULL, NULL, 65, NULL);
INSERT INTO public.ue VALUES (1460, 'Chivisivi', 7, NULL, 'LPsap70650013', NULL, NULL, NULL, 65, NULL);
INSERT INTO public.ue VALUES (1461, 'Huancane', 7, NULL, 'LPsap70650014', NULL, NULL, NULL, 65, NULL);
INSERT INTO public.ue VALUES (1462, 'Cobija De Kahata', 12, NULL, 'LPsap70650018', NULL, NULL, NULL, 65, NULL);
INSERT INTO public.ue VALUES (1463, 'Macamaca', 37, NULL, 'LPsap70650024', NULL, NULL, NULL, 65, NULL);
INSERT INTO public.ue VALUES (1464, 'Tacobamba', 9, NULL, 'LPsap70650033', NULL, NULL, NULL, 65, NULL);
INSERT INTO public.ue VALUES (1465, 'Cacha', 6, NULL, 'LPsap70650039', NULL, NULL, NULL, 65, NULL);
INSERT INTO public.ue VALUES (1466, 'Rene Barrientos Ortuño', 14, NULL, 'LPsap70650040', NULL, NULL, NULL, 65, NULL);
INSERT INTO public.ue VALUES (1467, 'Nacional De Sica Sica', 40, NULL, 'LPsic80610001', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1468, 'Bartolina Sisa A', 8, NULL, 'LPsic80610003', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1469, 'Lahuachaca', 13, NULL, 'LPsic80610011', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1470, 'Integral Ayamaya', 12, NULL, 'LPsic80610013', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1471, 'Hurinzaya', 3, NULL, 'LPsic80610022', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1472, 'Collpa Belen', 14, NULL, 'LPsic80610027', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1473, 'German Busch', 23, NULL, 'LPsic80610029', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1474, 'Konani', 17, NULL, 'LPsic80610030', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1475, 'Prof. Elizardo Perez', 11, NULL, 'LPsic80610032', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1476, 'Marina Nuñez Del Prado', 13, NULL, 'LPsic80610037', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1477, 'Nacional De Chijmuni', 10, NULL, 'LPsic80610042', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1478, 'Tawantinsuyo', 9, NULL, 'LPsic80610047', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1479, 'Cala Cala', 10, NULL, 'LPsic80610053', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1480, 'Jose Manuel Pando', 9, NULL, 'LPsic80610054', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1481, 'Huanocollo', 9, NULL, 'LPsic80610055', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1482, 'Jaruma A', 13, NULL, 'LPsic80610059', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1483, '6 De Junio', 1, NULL, 'LPsic80610069', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1484, 'Nacional Pujravi', 39, NULL, 'LPsic80610075', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1485, 'Prof. Elizardo Perez B', 19, NULL, 'LPsic80610079', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1486, 'Eden B', 34, NULL, 'LPsic80610084', NULL, NULL, NULL, 66, NULL);
INSERT INTO public.ue VALUES (1487, 'Carazani', 6, NULL, 'LPsor40680015', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1488, 'Machacamarca', 0, NULL, 'LPsor60680026', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1489, 'Atahuallpani', 11, NULL, 'LPsor80680001', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1490, 'Avispaya', 6, NULL, 'LPsor80680006', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1491, 'Cocoyo', 8, NULL, 'LPsor80680010', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1492, 'Chejje', 7, NULL, 'LPsor80680016', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1493, 'Juan De Dios Bosque', 23, NULL, 'LPsor80680024', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1494, 'Laripata', 27, NULL, 'LPsor80680033', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1495, 'Jucumarini', 4, NULL, 'LPsor80680043', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1496, 'Yani', 9, NULL, 'LPsor80680053', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1497, 'Itulaya', 8, NULL, 'LPsor80680054', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1498, 'Juan Xxiii Fe Y Alegria', 67, NULL, 'LPsor80680060', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1499, 'San Antonio', 3, NULL, 'LPsor80680061', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1500, 'German Rodriguez', 16, NULL, 'LPsor80680062', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1501, 'Gral. Enrique Peñaranda Del Castillo', 55, NULL, 'LPsor80680076', NULL, NULL, NULL, 67, NULL);
INSERT INTO public.ue VALUES (1502, 'Julio Cordero Villavicencio', 14, NULL, 'LPtac60680001', NULL, NULL, NULL, 68, NULL);
INSERT INTO public.ue VALUES (1503, 'Tarata', 12, NULL, 'LPtac60680002', NULL, NULL, NULL, 68, NULL);
INSERT INTO public.ue VALUES (1504, 'Marcupata', 2, NULL, 'LPtac60680008', NULL, NULL, NULL, 68, NULL);
INSERT INTO public.ue VALUES (1505, '16 De Julio', 22, NULL, 'LPtac60680012', NULL, NULL, NULL, 68, NULL);
INSERT INTO public.ue VALUES (1506, 'Conzata', 15, NULL, 'LPtac60680013', NULL, NULL, NULL, 68, NULL);
INSERT INTO public.ue VALUES (1507, 'Pallayunga', 16, NULL, 'LPtac60680019', NULL, NULL, NULL, 68, NULL);
INSERT INTO public.ue VALUES (1508, 'Ananea', 8, NULL, 'LPtac60680025', NULL, NULL, NULL, 68, NULL);
INSERT INTO public.ue VALUES (1509, 'Chumisa', 9, NULL, 'LPtac60680028', NULL, NULL, NULL, 68, NULL);
INSERT INTO public.ue VALUES (1510, 'Tacachaca', 8, NULL, 'LPtac60680030', NULL, NULL, NULL, 68, NULL);
INSERT INTO public.ue VALUES (1511, 'Mayaya B', 44, NULL, 'LPteo70680045', NULL, NULL, NULL, 69, NULL);
INSERT INTO public.ue VALUES (1512, 'Bella Vista', 5, NULL, 'LPteo70680060', NULL, NULL, NULL, 69, NULL);
INSERT INTO public.ue VALUES (1513, 'Uyapi', 4, NULL, 'LPteo70680076', NULL, NULL, NULL, 69, NULL);
INSERT INTO public.ue VALUES (1514, 'Tomachi', 16, NULL, 'LPteo70680077', NULL, NULL, NULL, 69, NULL);
INSERT INTO public.ue VALUES (1515, 'Nacional De Teoponte', 18, NULL, 'LPteo70680080', NULL, NULL, NULL, 69, NULL);
INSERT INTO public.ue VALUES (1516, 'Villa Aroma', 8, NULL, 'LPteo70680085', NULL, NULL, NULL, 69, NULL);
INSERT INTO public.ue VALUES (1517, 'Marcelo Quenta Ortiz', 5, NULL, 'LPteo70680093', NULL, NULL, NULL, 69, NULL);
INSERT INTO public.ue VALUES (1518, 'Tajlihui', 8, NULL, 'LPteo70680097', NULL, NULL, NULL, 69, NULL);
INSERT INTO public.ue VALUES (1519, 'Arthur Posnansky', 33, NULL, 'LPtia60660003', NULL, NULL, NULL, 70, NULL);
INSERT INTO public.ue VALUES (1520, 'Holanda', 12, NULL, 'LPtia60660005', NULL, NULL, NULL, 70, NULL);
INSERT INTO public.ue VALUES (1521, 'Causaya', 11, NULL, 'LPtia60660007', NULL, NULL, NULL, 70, NULL);
INSERT INTO public.ue VALUES (1522, 'Naciones Unidas', 16, NULL, 'LPtia60660010', NULL, NULL, NULL, 70, NULL);
INSERT INTO public.ue VALUES (1523, 'Felipe Pizarro', 10, NULL, 'LPtia60660016', NULL, NULL, NULL, 70, NULL);
INSERT INTO public.ue VALUES (1524, 'Mcal. Andres De Santa Cruz', 23, NULL, 'LPtia60660020', NULL, NULL, NULL, 70, NULL);
INSERT INTO public.ue VALUES (1525, 'Yanarico', 23, NULL, 'LPtia60660025', NULL, NULL, NULL, 70, NULL);
INSERT INTO public.ue VALUES (1526, 'Julian Apaza', 15, NULL, 'LPtia60660028', NULL, NULL, NULL, 70, NULL);
INSERT INTO public.ue VALUES (1527, 'Juan Jose Torrez', 22, NULL, 'LPtia60660033', NULL, NULL, NULL, 70, NULL);
INSERT INTO public.ue VALUES (1528, 'Nacional Litoral', 4, NULL, 'LPtia60660037', NULL, NULL, NULL, 70, NULL);
INSERT INTO public.ue VALUES (1529, 'Fray Jose Antonio Zampa', 9, NULL, 'LPtia60660042', NULL, NULL, NULL, 70, NULL);
INSERT INTO public.ue VALUES (1530, 'Isla Sicuya', 6, NULL, 'LPtia60660045', NULL, NULL, NULL, 70, NULL);
INSERT INTO public.ue VALUES (1531, 'Jose Ballivian', 51, NULL, 'LPtia60660047', NULL, NULL, NULL, 70, NULL);
INSERT INTO public.ue VALUES (1532, 'Oscar Unzaga De La Vega', 44, NULL, 'LPtip30680001', NULL, NULL, NULL, 71, NULL);
INSERT INTO public.ue VALUES (1533, 'German Busch', 5, NULL, 'LPtip30680003', NULL, NULL, NULL, 71, NULL);
INSERT INTO public.ue VALUES (1534, 'Pedro Domingo Murillo', 7, NULL, 'LPtip30680010', NULL, NULL, NULL, 71, NULL);
INSERT INTO public.ue VALUES (1535, 'San Juanito Montecarlo', 12, NULL, 'LPtip30680014', NULL, NULL, NULL, 71, NULL);
INSERT INTO public.ue VALUES (1536, '16 De Julio', 16, NULL, 'LPtip30680015', NULL, NULL, NULL, 71, NULL);
INSERT INTO public.ue VALUES (1537, 'Mariscal Andres De Santa Cruz Ii', 26, NULL, 'LPtip30680021', NULL, NULL, NULL, 71, NULL);
INSERT INTO public.ue VALUES (1538, 'Huari Belen B', 7, NULL, 'LPuma70610003', NULL, NULL, NULL, 72, NULL);
INSERT INTO public.ue VALUES (1539, 'Amistad Franco Boliviano', 19, NULL, 'LPuma70610012', NULL, NULL, NULL, 72, NULL);
INSERT INTO public.ue VALUES (1540, 'Santiago De Ventilla', 12, NULL, 'LPuma70610015', NULL, NULL, NULL, 72, NULL);
INSERT INTO public.ue VALUES (1541, 'Cañaviri', 21, NULL, 'LPuma70610021', NULL, NULL, NULL, 72, NULL);
INSERT INTO public.ue VALUES (1542, 'Asuncion De Huancarama', 16, NULL, 'LPuma70610024', NULL, NULL, NULL, 72, NULL);
INSERT INTO public.ue VALUES (1543, 'Pedro Domingo Murillo B', 12, NULL, 'LPuma70610040', NULL, NULL, NULL, 72, NULL);
INSERT INTO public.ue VALUES (1544, 'San Jose', 16, NULL, 'LPuma70610042', NULL, NULL, NULL, 72, NULL);
INSERT INTO public.ue VALUES (1545, '6 De Junio', 53, NULL, 'LPvia40730081', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1546, '20 De Octubre', 29, NULL, 'LPvia80660005', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1547, 'Jose Ballivian A', 211, NULL, 'LPvia80660006', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1548, 'Mariscal Jose Ballivian B', 151, NULL, 'LPvia80660007', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1549, 'Andres De Santa Cruz', 14, NULL, 'LPvia80660013', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1550, 'Achica Arriba', 25, NULL, 'LPvia80660016', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1551, 'San Miguel De Mazo Cruz', 19, NULL, 'LPvia80660017', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1552, 'Hacia El Mar', 37, NULL, 'LPvia80660022', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1553, 'Tupac Katari De Collagua', 7, NULL, 'LPvia80660030', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1554, 'Hilata Santa Trinidad', 11, NULL, 'LPvia80660031', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1555, 'Gualberto Villarroel De Coniri', 10, NULL, 'LPvia80660038', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1556, 'Calama', 6, NULL, 'LPvia80660043', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1557, 'Litoral', 4, NULL, 'LPvia80660045', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1558, 'Bartolina Sisa', 3, NULL, 'LPvia80660048', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1559, 'Elizardo Perez', 14, NULL, 'LPvia80660126', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1560, 'Jekeri', 5, NULL, 'LPvia80660128', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1561, 'Viliroco B', 71, NULL, 'LPvia80660136', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1562, 'Rosa Agramont', 16, NULL, 'LPvia80660137', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1563, 'Nueva Esperanza', 25, NULL, 'LPvia80660141', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1564, 'John Fitzgerald Kennedy', 31, NULL, 'LPvia80660162', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1565, 'Jose Ballivian De Hichuraya', 18, NULL, 'LPvia80660163', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1566, 'Jose Ballivian C', 50, NULL, 'LPvia80660168', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1567, 'Ingavi', 81, NULL, 'LPvia80660169', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1568, '3 De Mayo', 7, NULL, 'LPvia80660178', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1569, 'Fabrica De Cemento', 22, NULL, 'LPvia80660185', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1570, 'San Luis', 14, NULL, 'LPvia80660188', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1571, 'Adventista Viacha', 54, NULL, 'LPvia80660189', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1572, 'Nestor Paz Zamora', 137, NULL, 'LPvia80660207', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1573, 'Gral. Hugo Banzer Suarez', 30, NULL, 'LPvia80660209', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1574, 'Mariscal Santa Cruz', 36, NULL, 'LPvia80660211', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1575, 'Republica Del Japon', 54, NULL, 'LPvia80660212', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1576, 'Nueva Tilata', 10, NULL, 'LPvia80660213', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1577, 'Fred Nuñez Gonzales', 90, NULL, 'LPvia80660215', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1578, 'William Booth', 3, NULL, 'LPvia80660216', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1579, 'Walter Marañon Altamirano', 24, NULL, 'LPvia80660217', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1580, 'Tilata Don Bosco', 0, NULL, 'LPvia80660220', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1581, '14 De Noviembre Paz Y Unidad A', 87, NULL, 'LPvia80660221', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1582, 'Republica De Corea Del Sur', 0, NULL, 'LPvia80660222', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1583, 'Republica Islamica De Iran', 0, NULL, 'LPvia80660223', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1584, 'Batalla Alto De La Alianza', 0, NULL, 'LPvia80660226', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1585, 'Hugo Ordoñez Saravia', 61, NULL, 'LPvia80660229', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1586, 'Juancito Pinto', 0, NULL, 'LPvia80660230', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1587, 'Inmaculada Concepcion De Maria', 0, NULL, 'LPvia80660232', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1588, 'La Florida B', 60, NULL, 'LPvia80660240', NULL, NULL, NULL, 73, NULL);
INSERT INTO public.ue VALUES (1589, 'Chucamarca', 4, NULL, 'LPyac60650001', NULL, NULL, NULL, 74, NULL);
INSERT INTO public.ue VALUES (1590, 'Hornuni', 10, NULL, 'LPyac60650011', NULL, NULL, NULL, 74, NULL);
INSERT INTO public.ue VALUES (1591, 'Republica De Venezuela', 15, NULL, 'LPyac60650015', NULL, NULL, NULL, 74, NULL);
INSERT INTO public.ue VALUES (1592, 'Yaco', 12, NULL, 'LPyac60650019', NULL, NULL, NULL, 74, NULL);
INSERT INTO public.ue VALUES (1593, 'Challoma', 4, NULL, 'LPyac60650026', NULL, NULL, NULL, 74, NULL);
INSERT INTO public.ue VALUES (1594, 'Daniel Gomez Garcia', 13, NULL, 'LPyac60650027', NULL, NULL, NULL, 74, NULL);
INSERT INTO public.ue VALUES (1595, 'Malla', 17, NULL, 'LPyac60650028', NULL, NULL, NULL, 74, NULL);
INSERT INTO public.ue VALUES (1596, 'German Busch De Tablachaca', 20, NULL, 'LPyac60650033', NULL, NULL, NULL, 74, NULL);
INSERT INTO public.ue VALUES (1597, 'Iracachi', 14, NULL, 'LPyac60650034', NULL, NULL, NULL, 74, NULL);
INSERT INTO public.ue VALUES (1598, 'Jachapampa', 12, NULL, 'LPyac70650045', NULL, NULL, NULL, 74, NULL);
INSERT INTO public.ue VALUES (1599, 'Felix Ernesto Moscoso', 14, NULL, 'LPyan60630001', NULL, NULL, NULL, 75, NULL);
INSERT INTO public.ue VALUES (1600, 'Machacamarca', 18, NULL, 'LPyan60630004', NULL, NULL, NULL, 75, NULL);
INSERT INTO public.ue VALUES (1601, 'Florida', 13, NULL, 'LPyan60630009', NULL, NULL, NULL, 75, NULL);
INSERT INTO public.ue VALUES (1602, 'Suiqui Milamilani', 14, NULL, 'LPyan60630013', NULL, NULL, NULL, 75, NULL);
INSERT INTO public.ue VALUES (1603, 'Jorge Zalles', 16, NULL, 'LPyan60630017', NULL, NULL, NULL, 75, NULL);


--
-- TOC entry 5268 (class 0 OID 28774)
-- Dependencies: 242
-- Data for Name: unidadtematica; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.unidadtematica VALUES (2, 'Ecuaciones algebraicas', NULL, 4, 2);
INSERT INTO public.unidadtematica VALUES (3, 'Sistemas de ecuaciones lineales en la actividad productiva de la región', NULL, 4, 2);
INSERT INTO public.unidadtematica VALUES (4, 'Números imaginarios y complejos en la naturaleza', NULL, 4, 2);
INSERT INTO public.unidadtematica VALUES (5, 'Ecuaciones de segundo grado y función cuadrática en la resolución de problemas del contexto', NULL, 4, 2);
INSERT INTO public.unidadtematica VALUES (6, 'Desigualdades e inecuaciones', NULL, 4, 2);
INSERT INTO public.unidadtematica VALUES (7, 'Función exponencial y logarítmica', NULL, 4, 2);
INSERT INTO public.unidadtematica VALUES (8, 'Sucesiones, progresiones aritméticas - geométricas', NULL, 4, 2);
INSERT INTO public.unidadtematica VALUES (9, 'Matemática financiera', NULL, 4, 2);
INSERT INTO public.unidadtematica VALUES (10, 'La lógica y el desarrollo del pensamiento lógico matemático', NULL, 4, 2);
INSERT INTO public.unidadtematica VALUES (11, 'Laboratorio matemático', NULL, 4, 2);
INSERT INTO public.unidadtematica VALUES (12, 'Aplicación de las progresiones en la cotidianidad', NULL, 5, 2);
INSERT INTO public.unidadtematica VALUES (13, 'Análisis combinatorio en situaciones concretas', NULL, 5, 2);
INSERT INTO public.unidadtematica VALUES (14, 'Estadística descriptiva en procesos productivos y fenómenos sociales', NULL, 5, 2);
INSERT INTO public.unidadtematica VALUES (15, 'Trigonometría y su aplicación en la tecnología', NULL, 5, 2);
INSERT INTO public.unidadtematica VALUES (16, 'Triángulos rectángulos en el desarrollo de la ciencia y la tecnología', NULL, 5, 2);
INSERT INTO public.unidadtematica VALUES (17, 'Triángulos oblicuángulos en el desarrollo de la ciencia y la tecnología', NULL, 5, 2);
INSERT INTO public.unidadtematica VALUES (18, 'Identidades trigonométricas y su valor en la productividad', NULL, 5, 2);
INSERT INTO public.unidadtematica VALUES (19, 'Ecuaciones trigonométricas', NULL, 5, 2);
INSERT INTO public.unidadtematica VALUES (20, 'Introducción a la geometría analítica aplicada al contexto y a la tecnología', NULL, 5, 2);
INSERT INTO public.unidadtematica VALUES (21, 'Laboratorio matemático', NULL, 5, 2);
INSERT INTO public.unidadtematica VALUES (22, 'La línea recta', NULL, 6, 2);
INSERT INTO public.unidadtematica VALUES (23, 'La circunferencia', NULL, 6, 2);
INSERT INTO public.unidadtematica VALUES (24, 'Parábola', NULL, 6, 2);
INSERT INTO public.unidadtematica VALUES (25, 'La elipse e hipérbola', NULL, 6, 2);
INSERT INTO public.unidadtematica VALUES (26, 'Teoría de conjuntos', NULL, 6, 2);
INSERT INTO public.unidadtematica VALUES (27, 'Introducción al análisis matemático', NULL, 6, 2);
INSERT INTO public.unidadtematica VALUES (28, 'Álgebra y trigonometría preuniversitaria', NULL, 6, 2);
INSERT INTO public.unidadtematica VALUES (29, 'Laboratorio matemático', NULL, 6, 2);


--
-- TOC entry 5244 (class 0 OID 28533)
-- Dependencies: 218
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuario VALUES (3, 'laura.maestra', 'Laura', 'García', 'Mendoza', 'laura@maestra.com', '$2b$10$UaQ7wc/luUnig2HGfcD5Ju8rUvU8iaUfBEelU5/Mg8WyO0krjT5oO', 'ACTIVO', '2026-08-24 21:23:05.628003', NULL);
INSERT INTO public.usuario VALUES (7, 'ana.dirdis', 'Ana', 'Quispe', 'Vargas', 'ana@dirdis.com', '$2b$10$7BlXqUUaLbkTOKPPNFrJauNGdWFj.286/8bW2GPwZ99DVQ9fFkrAW', 'ACTIVO', '2026-08-24 21:24:48.112355', NULL);
INSERT INTO public.usuario VALUES (2, 'carlos.maestro', 'Carlos', 'Ramírez', 'López', 'carlos@maestro.com', '$2b$10$uokghIdDSXK5Pcf4pdm17ublEeuFB25Iuae42ghMQYah11YsoQZia', 'ACTIVO', '2026-08-24 21:22:50.553394', '2026-08-24 22:34:56.519387');
INSERT INTO public.usuario VALUES (6, 'juan.dirue', 'Juan', 'Fernández', 'Pérez', 'juan@dirue.com', '$2b$10$AGawalJSTdsP7VkQzOMa/uDaPbrxBUHnZcTrCjP3xW3NVaPWI68/i', 'ACTIVO', '2026-08-24 21:24:16.941702', '2026-08-24 22:46:33.651873');
INSERT INTO public.usuario VALUES (16, 'Tu', 'Tucito', 'Rojas', '', 'tu@estudiante.com', '$2b$10$mV9YO6YLVrl4dJKxjY6CJOm124DCm5J8Vb4wjE8iKGhF1.9agLU02', 'ACTIVO', '2026-10-04 18:57:12.060983', '2026-10-04 18:57:12.168835');
INSERT INTO public.usuario VALUES (10, 'Alejo', 'Alejandro', 'Cuevas', 'Diaz', 'alejandro@maestro.com', '$2b$10$mXr3eB3t3EgPdT1QmliAPOtcICbtBctuIZa1Y4fkFnAOS2L/iBaIK', 'ACTIVO', '2026-08-29 11:37:58.24363', '2026-08-29 11:38:18.155106');
INSERT INTO public.usuario VALUES (11, 'Pepe', 'Pedro', 'Perez', 'Robles', 'pedro@maestro.com', '$2b$10$MAHSocyl/S/C4BKbqFmo9O2y189PFGrBl6q515NJsZnd0YA7GUdNa', 'ACTIVO', '2026-08-29 12:27:39.560768', '2026-08-29 12:32:04.172234');
INSERT INTO public.usuario VALUES (12, 'Yo', 'Yoni', 'Quispe', 'Garcia', 'yoni@maestro.com', '$2b$10$XRNOwp8amevzSUIzpwLfd.2HD/vr31/usQWOOhrQqjmPUlE61zwPC', 'ACTIVO', '2026-08-29 12:40:30.191096', NULL);
INSERT INTO public.usuario VALUES (17, 'Jhimy ', 'Jhimy ', 'Loza', 'Garcia', 'Jhimy@maestro.com', '$2b$10$4qZKtHT7JODYpXIhy7YyA.TIFGvjEzahPuc6.S72MXtBcHt2en4gq', 'ACTIVO', '2026-10-04 19:21:51.350057', '2026-10-04 19:28:23.971934');
INSERT INTO public.usuario VALUES (15, 'Jhimy', 'Jhimy', 'Humerez', '', 'Jhimy@estudiante.com', '$2b$10$S6f5O6XMbt62AVULE1mtYOaVl8aydPLnokBp0UWM5yG2N.4L3IaKa', 'ACTIVO', '2026-10-04 18:48:20.791023', '2026-10-04 19:33:19.304215');
INSERT INTO public.usuario VALUES (13, 'Carlos', 'Carola', 'Quispe', 'Luna', 'carola@maestro.com', '$2b$10$SmR1vSNTnZyRblpX1Qx9Oe4LDkp3hPLGBzXRv.Ou5LsrNRoGFgeAm', 'ACTIVO', '2026-08-29 12:56:02.949692', '2026-10-13 21:57:33.134127');
INSERT INTO public.usuario VALUES (8, 'luis.subdir', 'Luis', 'Torrez', 'Mamani', 'luis@subdir.com', '$2b$10$fNpAH8Z7ZkHH19oVmi7N4eptwFQpVUr9rAlgg9UbMbNitDRQpxHT6', 'ACTIVO', '2026-08-24 21:26:13.285953', '2026-10-14 08:34:56.005058');
INSERT INTO public.usuario VALUES (4, 'maria.estudiante', 'María', 'Gonzales', 'Quispe', 'maria@estudiante.com', '$2b$10$/68fvzMHofvDZKyrHL.Rm.OcrPUNk8rPwD39yMfSyWjpVYlGz6oNC', 'ACTIVO', '2026-08-24 21:23:34.552047', '2026-10-14 08:50:39.0787');
INSERT INTO public.usuario VALUES (9, 'Vico', 'Helmer', 'Cuevas', 'Diaz', 'helmer@estudiante.com', '$2b$10$wRHszA8bBR8Pz2UtjDCGvOFx3f19HfFuVRXpPDaJq3GEVfsK/w/V.', 'ACTIVO', '2026-08-29 11:35:16.634236', '2026-10-12 17:59:35.814527');
INSERT INTO public.usuario VALUES (14, 'lorema', 'lorena', 'mendoza', 'aduviri', 'lorenayumega@hotmail.com', '$2b$10$Ot.i73epx/abB8sd/MkJ9.oNxAfGuVlkwm31zADhOXMKPAY8oeaaO', 'ACTIVO', '2026-10-02 15:42:17.241039', '2026-10-02 15:43:36.943329');
INSERT INTO public.usuario VALUES (1, 'admin', 'Admin', 'Sistema', 'SSAM', 'admin@ssam.com', '$2b$10$FOctiNZ63BjzyuhxrRJAK.0g6a8rrqy7XSPIVwGE/XGPHPOAqXz8.', 'ACTIVO', '2026-08-24 21:21:34.572989', '2026-10-12 23:41:07.426337');
INSERT INTO public.usuario VALUES (5, 'jose.estudiante', 'José', 'Mamani', 'Calle', 'jose@estudiante.com', '$2b$10$AmnLgNGxQL90MwuQqGlv2elhZtDem63urk.rpDB.cFtqty4kRzpXG', 'ACTIVO', '2026-08-24 21:23:49.655506', '2026-10-11 20:14:14.260976');


--
-- TOC entry 5320 (class 0 OID 0)
-- Dependencies: 233
-- Name: area_id_area_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.area_id_area_seq', 4, true);


--
-- TOC entry 5321 (class 0 OID 0)
-- Dependencies: 235
-- Name: asignatura_id_asig_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asignatura_id_asig_seq', 2, true);


--
-- TOC entry 5322 (class 0 OID 0)
-- Dependencies: 266
-- Name: auditoria_id_auditoria_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auditoria_id_auditoria_seq', 1, false);


--
-- TOC entry 5323 (class 0 OID 0)
-- Dependencies: 238
-- Name: clase_id_clase_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clase_id_clase_seq', 4, true);


--
-- TOC entry 5324 (class 0 OID 0)
-- Dependencies: 264
-- Name: configuracion_id_config_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.configuracion_id_config_seq', 2, true);


--
-- TOC entry 5325 (class 0 OID 0)
-- Dependencies: 225
-- Name: departamento_id_departamento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departamento_id_departamento_seq', 1, true);


--
-- TOC entry 5326 (class 0 OID 0)
-- Dependencies: 227
-- Name: distrito_id_distrito_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.distrito_id_distrito_seq', 75, true);


--
-- TOC entry 5327 (class 0 OID 0)
-- Dependencies: 249
-- Name: evaluacion_id_evaluacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evaluacion_id_evaluacion_seq', 2, true);


--
-- TOC entry 5328 (class 0 OID 0)
-- Dependencies: 255
-- Name: gestion_id_gestion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gestion_id_gestion_seq', 6, true);


--
-- TOC entry 5329 (class 0 OID 0)
-- Dependencies: 231
-- Name: grado_id_grado_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grado_id_grado_seq', 6, true);


--
-- TOC entry 5330 (class 0 OID 0)
-- Dependencies: 251
-- Name: intento_id_intento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.intento_id_intento_seq', 19, true);


--
-- TOC entry 5331 (class 0 OID 0)
-- Dependencies: 243
-- Name: item_id_item_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_id_item_seq', 124, true);


--
-- TOC entry 5332 (class 0 OID 0)
-- Dependencies: 247
-- Name: opcion_id_opcion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.opcion_id_opcion_seq', 280, true);


--
-- TOC entry 5333 (class 0 OID 0)
-- Dependencies: 261
-- Name: planificacion_id_planificacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planificacion_id_planificacion_seq', 5, true);


--
-- TOC entry 5334 (class 0 OID 0)
-- Dependencies: 245
-- Name: pregunta_id_pregunta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pregunta_id_pregunta_seq', 71, true);


--
-- TOC entry 5335 (class 0 OID 0)
-- Dependencies: 259
-- Name: semana_id_semana_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.semana_id_semana_seq', 45, true);


--
-- TOC entry 5336 (class 0 OID 0)
-- Dependencies: 257
-- Name: trimestre_id_trimestre_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trimestre_id_trimestre_seq', 9, true);


--
-- TOC entry 5337 (class 0 OID 0)
-- Dependencies: 229
-- Name: ue_id_ue_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ue_id_ue_seq', 1603, true);


--
-- TOC entry 5338 (class 0 OID 0)
-- Dependencies: 241
-- Name: unidadtematica_id_unid_tem_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.unidadtematica_id_unid_tem_seq', 29, true);


--
-- TOC entry 5339 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 17, true);


--
-- TOC entry 4964 (class 2606 OID 28552)
-- Name: administrador administrador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrador
    ADD CONSTRAINT administrador_pkey PRIMARY KEY (id_usuarioa);


--
-- TOC entry 4998 (class 2606 OID 28696)
-- Name: area area_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.area
    ADD CONSTRAINT area_pkey PRIMARY KEY (id_area);


--
-- TOC entry 5000 (class 2606 OID 28707)
-- Name: asignatura asignatura_codigo_asignatura_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignatura
    ADD CONSTRAINT asignatura_codigo_asignatura_key UNIQUE (codigo_asignatura);


--
-- TOC entry 5002 (class 2606 OID 28705)
-- Name: asignatura asignatura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignatura
    ADD CONSTRAINT asignatura_pkey PRIMARY KEY (id_asig);


--
-- TOC entry 5052 (class 2606 OID 29021)
-- Name: auditoria auditoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auditoria
    ADD CONSTRAINT auditoria_pkey PRIMARY KEY (id_auditoria);


--
-- TOC entry 5006 (class 2606 OID 28737)
-- Name: clase clase_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clase
    ADD CONSTRAINT clase_pkey PRIMARY KEY (id_clase);


--
-- TOC entry 5050 (class 2606 OID 29006)
-- Name: configuracion configuracion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracion
    ADD CONSTRAINT configuracion_pkey PRIMARY KEY (id_config);


--
-- TOC entry 4976 (class 2606 OID 28622)
-- Name: departamento departamento_cÃ³digo_acceso_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT "departamento_cÃ³digo_acceso_key" UNIQUE (codigo_acceso);


--
-- TOC entry 4978 (class 2606 OID 28624)
-- Name: departamento departamento_id_usuariosd_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_id_usuariosd_key UNIQUE (id_usuariosd);


--
-- TOC entry 4980 (class 2606 OID 28620)
-- Name: departamento departamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_pkey PRIMARY KEY (id_departamento);


--
-- TOC entry 4968 (class 2606 OID 28572)
-- Name: dir_dis dir_dis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dir_dis
    ADD CONSTRAINT dir_dis_pkey PRIMARY KEY (id_usuariodd);


--
-- TOC entry 4970 (class 2606 OID 28582)
-- Name: dir_ue dir_ue_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dir_ue
    ADD CONSTRAINT dir_ue_pkey PRIMARY KEY (id_usuariodu);


--
-- TOC entry 4982 (class 2606 OID 28639)
-- Name: distrito distrito_cÃ³digo_distrito_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.distrito
    ADD CONSTRAINT "distrito_cÃ³digo_distrito_key" UNIQUE (codigo_distrito);


--
-- TOC entry 4984 (class 2606 OID 28641)
-- Name: distrito distrito_id_dir_dis_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.distrito
    ADD CONSTRAINT distrito_id_dir_dis_key UNIQUE (id_dir_dis);


--
-- TOC entry 4986 (class 2606 OID 28637)
-- Name: distrito distrito_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.distrito
    ADD CONSTRAINT distrito_pkey PRIMARY KEY (id_distrito);


--
-- TOC entry 5048 (class 2606 OID 28978)
-- Name: esta_formado esta_formado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.esta_formado
    ADD CONSTRAINT esta_formado_pkey PRIMARY KEY (id_planificacion, id_semana, id_item);


--
-- TOC entry 4974 (class 2606 OID 28608)
-- Name: estudiante estudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT estudiante_pkey PRIMARY KEY (id_usuarioe);


--
-- TOC entry 5028 (class 2606 OID 28891)
-- Name: evalua evalua_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evalua
    ADD CONSTRAINT evalua_pkey PRIMARY KEY (id_evaluacion, id_unid_tem);


--
-- TOC entry 5021 (class 2606 OID 28852)
-- Name: evaluacion evaluacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion
    ADD CONSTRAINT evaluacion_pkey PRIMARY KEY (id_evaluacion);


--
-- TOC entry 5033 (class 2606 OID 28928)
-- Name: gestion gestion_aÃ±o_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestion
    ADD CONSTRAINT "gestion_aÃ±o_key" UNIQUE (anio);


--
-- TOC entry 5035 (class 2606 OID 28926)
-- Name: gestion gestion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestion
    ADD CONSTRAINT gestion_pkey PRIMARY KEY (id_gestion);


--
-- TOC entry 5004 (class 2606 OID 28717)
-- Name: gestiona gestiona_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestiona
    ADD CONSTRAINT gestiona_pkey PRIMARY KEY (id_grado, id_asig);


--
-- TOC entry 4994 (class 2606 OID 28686)
-- Name: grado grado_ordeng_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grado
    ADD CONSTRAINT grado_ordeng_key UNIQUE (ordeng);


--
-- TOC entry 4996 (class 2606 OID 28684)
-- Name: grado grado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grado
    ADD CONSTRAINT grado_pkey PRIMARY KEY (id_grado);


--
-- TOC entry 5026 (class 2606 OID 28871)
-- Name: intento intento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intento
    ADD CONSTRAINT intento_pkey PRIMARY KEY (id_intento);


--
-- TOC entry 5015 (class 2606 OID 28802)
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id_item);


--
-- TOC entry 4972 (class 2606 OID 28593)
-- Name: maestro maestro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maestro
    ADD CONSTRAINT maestro_pkey PRIMARY KEY (id_usuariom);


--
-- TOC entry 5019 (class 2606 OID 28834)
-- Name: opcion opcion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opcion
    ADD CONSTRAINT opcion_pkey PRIMARY KEY (id_opcion);


--
-- TOC entry 5011 (class 2606 OID 28762)
-- Name: pertenece pertenece_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pertenece
    ADD CONSTRAINT pertenece_pkey PRIMARY KEY (id_usuarioe, id_clase);


--
-- TOC entry 5046 (class 2606 OID 28968)
-- Name: planificacion planificacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificacion
    ADD CONSTRAINT planificacion_pkey PRIMARY KEY (id_planificacion);


--
-- TOC entry 5017 (class 2606 OID 28819)
-- Name: pregunta pregunta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pregunta
    ADD CONSTRAINT pregunta_pkey PRIMARY KEY (id_pregunta);


--
-- TOC entry 5031 (class 2606 OID 28907)
-- Name: respuesta respuesta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuesta
    ADD CONSTRAINT respuesta_pkey PRIMARY KEY (id_intento, id_opcion);


--
-- TOC entry 5041 (class 2606 OID 28951)
-- Name: semana semana_id_trimestre_numero_semana_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.semana
    ADD CONSTRAINT semana_id_trimestre_numero_semana_key UNIQUE (id_trimestre, numero_semana);


--
-- TOC entry 5043 (class 2606 OID 28949)
-- Name: semana semana_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.semana
    ADD CONSTRAINT semana_pkey PRIMARY KEY (id_semana);


--
-- TOC entry 4966 (class 2606 OID 28562)
-- Name: subdir_dep subdir_dep_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subdir_dep
    ADD CONSTRAINT subdir_dep_pkey PRIMARY KEY (id_usuariosd);


--
-- TOC entry 5037 (class 2606 OID 28937)
-- Name: trimestre trimestre_id_gestion_ordent_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trimestre
    ADD CONSTRAINT trimestre_id_gestion_ordent_key UNIQUE (id_gestion, ordent);


--
-- TOC entry 5039 (class 2606 OID 28935)
-- Name: trimestre trimestre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trimestre
    ADD CONSTRAINT trimestre_pkey PRIMARY KEY (id_trimestre);


--
-- TOC entry 4988 (class 2606 OID 28665)
-- Name: ue ue_cÃ³digo_ue_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ue
    ADD CONSTRAINT "ue_cÃ³digo_ue_key" UNIQUE (codigo_ue);


--
-- TOC entry 4990 (class 2606 OID 28667)
-- Name: ue ue_id_dir_ue_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ue
    ADD CONSTRAINT ue_id_dir_ue_key UNIQUE (id_dir_ue);


--
-- TOC entry 4992 (class 2606 OID 28663)
-- Name: ue ue_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ue
    ADD CONSTRAINT ue_pkey PRIMARY KEY (id_ue);


--
-- TOC entry 5013 (class 2606 OID 28781)
-- Name: unidadtematica unidadtematica_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidadtematica
    ADD CONSTRAINT unidadtematica_pkey PRIMARY KEY (id_unid_tem);


--
-- TOC entry 4958 (class 2606 OID 28547)
-- Name: usuario usuario_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);


--
-- TOC entry 4960 (class 2606 OID 28543)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4962 (class 2606 OID 28545)
-- Name: usuario usuario_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_username_key UNIQUE (username);


--
-- TOC entry 5053 (class 1259 OID 29036)
-- Name: idx_auditoria_fecha; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_auditoria_fecha ON public.auditoria USING btree (fecha);


--
-- TOC entry 5007 (class 1259 OID 29033)
-- Name: idx_clase_maestro; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_clase_maestro ON public.clase USING btree (id_maestro);


--
-- TOC entry 5008 (class 1259 OID 29034)
-- Name: idx_clase_ue; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_clase_ue ON public.clase USING btree (id_ue);


--
-- TOC entry 5022 (class 1259 OID 29027)
-- Name: idx_evaluacion_usuario_clase_fecha; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_evaluacion_usuario_clase_fecha ON public.evaluacion USING btree (id_usuarioe, id_clase, fecha_inicio);


--
-- TOC entry 5023 (class 1259 OID 29028)
-- Name: idx_intento_evaluacion_unidad; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_intento_evaluacion_unidad ON public.intento USING btree (id_evaluacion, id_unidad_tem);


--
-- TOC entry 5024 (class 1259 OID 29035)
-- Name: idx_intento_fecha; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_intento_fecha ON public.intento USING btree (fecha_intento);


--
-- TOC entry 5009 (class 1259 OID 29030)
-- Name: idx_pertenece_clase; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_pertenece_clase ON public.pertenece USING btree (id_clase);


--
-- TOC entry 5044 (class 1259 OID 29507)
-- Name: idx_planificacion_clase; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_planificacion_clase ON public.planificacion USING btree (id_clase);


--
-- TOC entry 5029 (class 1259 OID 29029)
-- Name: idx_respuesta_intento; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_respuesta_intento ON public.respuesta USING btree (id_intento);


--
-- TOC entry 4955 (class 1259 OID 29031)
-- Name: idx_usuario_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_usuario_email ON public.usuario USING btree (email);


--
-- TOC entry 4956 (class 1259 OID 29032)
-- Name: idx_usuario_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_usuario_username ON public.usuario USING btree (username);


--
-- TOC entry 5054 (class 2606 OID 28553)
-- Name: administrador administrador_id_usuarioa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrador
    ADD CONSTRAINT administrador_id_usuarioa_fkey FOREIGN KEY (id_usuarioa) REFERENCES public.usuario(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 5066 (class 2606 OID 28708)
-- Name: asignatura asignatura_id_area_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignatura
    ADD CONSTRAINT asignatura_id_area_fkey FOREIGN KEY (id_area) REFERENCES public.area(id_area) ON DELETE CASCADE;


--
-- TOC entry 5096 (class 2606 OID 29022)
-- Name: auditoria auditoria_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auditoria
    ADD CONSTRAINT auditoria_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 5069 (class 2606 OID 28753)
-- Name: clase clase_id_asig_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clase
    ADD CONSTRAINT clase_id_asig_fkey FOREIGN KEY (id_asig) REFERENCES public.asignatura(id_asig) ON DELETE CASCADE;


--
-- TOC entry 5070 (class 2606 OID 28743)
-- Name: clase clase_id_grado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clase
    ADD CONSTRAINT clase_id_grado_fkey FOREIGN KEY (id_grado) REFERENCES public.grado(id_grado) ON DELETE CASCADE;


--
-- TOC entry 5071 (class 2606 OID 28748)
-- Name: clase clase_id_maestro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clase
    ADD CONSTRAINT clase_id_maestro_fkey FOREIGN KEY (id_maestro) REFERENCES public.maestro(id_usuariom) ON DELETE CASCADE;


--
-- TOC entry 5072 (class 2606 OID 28738)
-- Name: clase clase_id_ue_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clase
    ADD CONSTRAINT clase_id_ue_fkey FOREIGN KEY (id_ue) REFERENCES public.ue(id_ue) ON DELETE CASCADE;


--
-- TOC entry 5095 (class 2606 OID 29007)
-- Name: configuracion configuracion_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracion
    ADD CONSTRAINT configuracion_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE SET NULL;


--
-- TOC entry 5061 (class 2606 OID 28625)
-- Name: departamento departamento_id_usuariosd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_id_usuariosd_fkey FOREIGN KEY (id_usuariosd) REFERENCES public.subdir_dep(id_usuariosd) ON DELETE SET NULL;


--
-- TOC entry 5056 (class 2606 OID 28573)
-- Name: dir_dis dir_dis_id_usuariodd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dir_dis
    ADD CONSTRAINT dir_dis_id_usuariodd_fkey FOREIGN KEY (id_usuariodd) REFERENCES public.usuario(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 5057 (class 2606 OID 28583)
-- Name: dir_ue dir_ue_id_usuariodu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dir_ue
    ADD CONSTRAINT dir_ue_id_usuariodu_fkey FOREIGN KEY (id_usuariodu) REFERENCES public.usuario(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 5062 (class 2606 OID 28647)
-- Name: distrito distrito_id_departamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.distrito
    ADD CONSTRAINT distrito_id_departamento_fkey FOREIGN KEY (id_departamento) REFERENCES public.departamento(id_departamento) ON DELETE CASCADE;


--
-- TOC entry 5063 (class 2606 OID 28642)
-- Name: distrito distrito_id_dir_dis_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.distrito
    ADD CONSTRAINT distrito_id_dir_dis_fkey FOREIGN KEY (id_dir_dis) REFERENCES public.dir_dis(id_usuariodd) ON DELETE SET NULL;


--
-- TOC entry 5092 (class 2606 OID 28989)
-- Name: esta_formado esta_formado_id_item_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.esta_formado
    ADD CONSTRAINT esta_formado_id_item_fkey FOREIGN KEY (id_item) REFERENCES public.item(id_item) ON DELETE CASCADE;


--
-- TOC entry 5093 (class 2606 OID 28979)
-- Name: esta_formado esta_formado_id_planificacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.esta_formado
    ADD CONSTRAINT esta_formado_id_planificacion_fkey FOREIGN KEY (id_planificacion) REFERENCES public.planificacion(id_planificacion) ON DELETE CASCADE;


--
-- TOC entry 5094 (class 2606 OID 28984)
-- Name: esta_formado esta_formado_id_semana_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.esta_formado
    ADD CONSTRAINT esta_formado_id_semana_fkey FOREIGN KEY (id_semana) REFERENCES public.semana(id_semana) ON DELETE CASCADE;


--
-- TOC entry 5060 (class 2606 OID 28609)
-- Name: estudiante estudiante_id_usuarioe_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT estudiante_id_usuarioe_fkey FOREIGN KEY (id_usuarioe) REFERENCES public.usuario(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 5084 (class 2606 OID 28892)
-- Name: evalua evalua_id_evaluacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evalua
    ADD CONSTRAINT evalua_id_evaluacion_fkey FOREIGN KEY (id_evaluacion) REFERENCES public.evaluacion(id_evaluacion) ON DELETE CASCADE;


--
-- TOC entry 5085 (class 2606 OID 28897)
-- Name: evalua evalua_id_unid_tem_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evalua
    ADD CONSTRAINT evalua_id_unid_tem_fkey FOREIGN KEY (id_unid_tem) REFERENCES public.unidadtematica(id_unid_tem) ON DELETE CASCADE;


--
-- TOC entry 5080 (class 2606 OID 28858)
-- Name: evaluacion evaluacion_id_clase_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion
    ADD CONSTRAINT evaluacion_id_clase_fkey FOREIGN KEY (id_clase) REFERENCES public.clase(id_clase) ON DELETE CASCADE;


--
-- TOC entry 5081 (class 2606 OID 28853)
-- Name: evaluacion evaluacion_id_usuarioe_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluacion
    ADD CONSTRAINT evaluacion_id_usuarioe_fkey FOREIGN KEY (id_usuarioe) REFERENCES public.estudiante(id_usuarioe) ON DELETE CASCADE;


--
-- TOC entry 5058 (class 2606 OID 29388)
-- Name: maestro fk_maestro_departamento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maestro
    ADD CONSTRAINT fk_maestro_departamento FOREIGN KEY (id_departamento) REFERENCES public.departamento(id_departamento) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5067 (class 2606 OID 28723)
-- Name: gestiona gestiona_id_asig_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestiona
    ADD CONSTRAINT gestiona_id_asig_fkey FOREIGN KEY (id_asig) REFERENCES public.asignatura(id_asig) ON DELETE CASCADE;


--
-- TOC entry 5068 (class 2606 OID 28718)
-- Name: gestiona gestiona_id_grado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestiona
    ADD CONSTRAINT gestiona_id_grado_fkey FOREIGN KEY (id_grado) REFERENCES public.grado(id_grado) ON DELETE CASCADE;


--
-- TOC entry 5082 (class 2606 OID 28877)
-- Name: intento intento_id_evaluacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intento
    ADD CONSTRAINT intento_id_evaluacion_fkey FOREIGN KEY (id_evaluacion) REFERENCES public.evaluacion(id_evaluacion) ON DELETE CASCADE;


--
-- TOC entry 5083 (class 2606 OID 28872)
-- Name: intento intento_id_unidad_tem_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intento
    ADD CONSTRAINT intento_id_unidad_tem_fkey FOREIGN KEY (id_unidad_tem) REFERENCES public.unidadtematica(id_unid_tem) ON DELETE CASCADE;


--
-- TOC entry 5077 (class 2606 OID 28803)
-- Name: item item_id_unid_tem_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_unid_tem_fkey FOREIGN KEY (id_unid_tem) REFERENCES public.unidadtematica(id_unid_tem) ON DELETE CASCADE;


--
-- TOC entry 5059 (class 2606 OID 28594)
-- Name: maestro maestro_id_usuariom_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maestro
    ADD CONSTRAINT maestro_id_usuariom_fkey FOREIGN KEY (id_usuariom) REFERENCES public.usuario(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 5079 (class 2606 OID 28835)
-- Name: opcion opcion_id_pregunta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opcion
    ADD CONSTRAINT opcion_id_pregunta_fkey FOREIGN KEY (id_pregunta) REFERENCES public.pregunta(id_pregunta) ON DELETE CASCADE;


--
-- TOC entry 5073 (class 2606 OID 28768)
-- Name: pertenece pertenece_id_clase_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pertenece
    ADD CONSTRAINT pertenece_id_clase_fkey FOREIGN KEY (id_clase) REFERENCES public.clase(id_clase) ON DELETE CASCADE;


--
-- TOC entry 5074 (class 2606 OID 28763)
-- Name: pertenece pertenece_id_usuarioe_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pertenece
    ADD CONSTRAINT pertenece_id_usuarioe_fkey FOREIGN KEY (id_usuarioe) REFERENCES public.estudiante(id_usuarioe) ON DELETE CASCADE;


--
-- TOC entry 5090 (class 2606 OID 29502)
-- Name: planificacion planificacion_id_clase_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificacion
    ADD CONSTRAINT planificacion_id_clase_fkey FOREIGN KEY (id_clase) REFERENCES public.clase(id_clase);


--
-- TOC entry 5091 (class 2606 OID 28969)
-- Name: planificacion planificacion_id_maestro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificacion
    ADD CONSTRAINT planificacion_id_maestro_fkey FOREIGN KEY (id_maestro) REFERENCES public.maestro(id_usuariom) ON DELETE CASCADE;


--
-- TOC entry 5078 (class 2606 OID 28820)
-- Name: pregunta pregunta_id_item_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pregunta
    ADD CONSTRAINT pregunta_id_item_fkey FOREIGN KEY (id_item) REFERENCES public.item(id_item) ON DELETE CASCADE;


--
-- TOC entry 5086 (class 2606 OID 28908)
-- Name: respuesta respuesta_id_intento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuesta
    ADD CONSTRAINT respuesta_id_intento_fkey FOREIGN KEY (id_intento) REFERENCES public.intento(id_intento) ON DELETE CASCADE;


--
-- TOC entry 5087 (class 2606 OID 28913)
-- Name: respuesta respuesta_id_opcion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuesta
    ADD CONSTRAINT respuesta_id_opcion_fkey FOREIGN KEY (id_opcion) REFERENCES public.opcion(id_opcion) ON DELETE CASCADE;


--
-- TOC entry 5089 (class 2606 OID 28952)
-- Name: semana semana_id_trimestre_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.semana
    ADD CONSTRAINT semana_id_trimestre_fkey FOREIGN KEY (id_trimestre) REFERENCES public.trimestre(id_trimestre) ON DELETE CASCADE;


--
-- TOC entry 5055 (class 2606 OID 28563)
-- Name: subdir_dep subdir_dep_id_usuariosd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subdir_dep
    ADD CONSTRAINT subdir_dep_id_usuariosd_fkey FOREIGN KEY (id_usuariosd) REFERENCES public.usuario(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 5088 (class 2606 OID 28938)
-- Name: trimestre trimestre_id_gestion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trimestre
    ADD CONSTRAINT trimestre_id_gestion_fkey FOREIGN KEY (id_gestion) REFERENCES public.gestion(id_gestion) ON DELETE CASCADE;


--
-- TOC entry 5064 (class 2606 OID 28673)
-- Name: ue ue_id_dir_ue_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ue
    ADD CONSTRAINT ue_id_dir_ue_fkey FOREIGN KEY (id_dir_ue) REFERENCES public.dir_ue(id_usuariodu) ON DELETE SET NULL;


--
-- TOC entry 5065 (class 2606 OID 28668)
-- Name: ue ue_id_distrito_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ue
    ADD CONSTRAINT ue_id_distrito_fkey FOREIGN KEY (id_distrito) REFERENCES public.distrito(id_distrito) ON DELETE CASCADE;


--
-- TOC entry 5075 (class 2606 OID 28789)
-- Name: unidadtematica unidadtematica_id_asig_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidadtematica
    ADD CONSTRAINT unidadtematica_id_asig_fkey FOREIGN KEY (id_asig) REFERENCES public.asignatura(id_asig) ON DELETE CASCADE;


--
-- TOC entry 5076 (class 2606 OID 28784)
-- Name: unidadtematica unidadtematica_id_grado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidadtematica
    ADD CONSTRAINT unidadtematica_id_grado_fkey FOREIGN KEY (id_grado) REFERENCES public.grado(id_grado) ON DELETE CASCADE;


-- Completed on 2026-10-14 10:57:30

--
-- PostgreSQL database dump complete
--

\unrestrict gwflMCpT6g4coLlbA1QwkIAMqUXEsUjZAWWa4fhCuSsaGhYOax7fgZNmmgghqt7

