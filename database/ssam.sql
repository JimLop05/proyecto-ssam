-- ============================================================
-- SISTEMA DE SEGUIMIENTO Y RENDIMIENTO ACADÉMICO EN MATEMÁTICAS
-- BASE DE DATOS - POSTGRESQL
-- ============================================================

-- 1. TABLA USUARIO (BASE PARA TODOS LOS ROLES)
CREATE TABLE USUARIO (
    id_usuario SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido1 VARCHAR(50) NOT NULL,
    apellido2 VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL, -- Hash de bcrypt
    estado VARCHAR(20) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'INACTIVO', 'BLOQUEADO')),
    fecha_creacion TIMESTAMP DEFAULT NOW(),
    fecha_ultimo_acceso TIMESTAMP
);

-- 2. TABLAS DE ROLES (HERENCIA)
CREATE TABLE ADMINISTRADOR (
    id_usuarioA INTEGER PRIMARY KEY REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    teléfono VARCHAR(20)
);

CREATE TABLE SUBDIR_DEP (
    id_usuarioSD INTEGER PRIMARY KEY REFERENCES USUARIO(id_usuario) ON DELETE CASCADE
);

CREATE TABLE DIR_DIS (
    id_usuarioDD INTEGER PRIMARY KEY REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    fecha_ingreso DATE NOT NULL,
    gestion INTEGER NOT NULL
);

CREATE TABLE DIR_UE (
    id_usuarioDU INTEGER PRIMARY KEY REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    teléfono VARCHAR(20)
);

CREATE TABLE MAESTRO (
    id_usuarioM INTEGER PRIMARY KEY REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    especialidad VARCHAR(50) NOT NULL,
    categoría VARCHAR(30) NOT NULL,
    fecha_asignacion DATE DEFAULT CURRENT_DATE
);

CREATE TABLE ESTUDIANTE (
    id_usuarioE INTEGER PRIMARY KEY REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    fecha_nacimiento DATE NOT NULL,
    estado VARCHAR(20) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'INACTIVO', 'RETIRADO')),
    sexo CHAR(1) CHECK (sexo IN ('M', 'F', 'O')),
    tipo_estudiante VARCHAR(20) DEFAULT 'PUBLICO' CHECK (tipo_estudiante IN ('PUBLICO', 'PRIVADO', 'FISCAL'))
);

-- 3. TABLAS GEOGRÁFICAS
CREATE TABLE DEPARTAMENTO (
    id_departamento SERIAL PRIMARY KEY,
    nombreD VARCHAR(50) NOT NULL,
    código_acceso VARCHAR(20) UNIQUE NOT NULL,
    id_usuarioSD INTEGER UNIQUE REFERENCES SUBDIR_DEP(id_usuarioSD) ON DELETE SET NULL
);

CREATE TABLE DISTRITO (
    id_distrito SERIAL PRIMARY KEY,
    nombreD VARCHAR(50) NOT NULL,
    numUE INTEGER DEFAULT 0,
    código_distrito VARCHAR(20) UNIQUE NOT NULL,
    id_dir_dis INTEGER UNIQUE REFERENCES DIR_DIS(id_usuarioDD) ON DELETE SET NULL,
    id_departamento INTEGER NOT NULL REFERENCES DEPARTAMENTO(id_departamento) ON DELETE CASCADE
);

CREATE TABLE UE (
    id_ue SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    num_est INTEGER DEFAULT 0,
    tipo VARCHAR(30) CHECK (tipo IN ('FISCAL', 'PRIVADA', 'CONVENIO')),
    código_ue VARCHAR(20) UNIQUE NOT NULL,
    dirección TEXT,
    telefonoUE VARCHAR(20),
    zona VARCHAR(50) CHECK (zona IN ('URBANA', 'PERIURBANA', 'RURAL')),
    id_distrito INTEGER NOT NULL REFERENCES DISTRITO(id_distrito) ON DELETE CASCADE,
    id_dir_ue INTEGER UNIQUE REFERENCES DIR_UE(id_usuarioDU) ON DELETE SET NULL
);

-- 4. ACADÉMICO - GRADOS, ÁREAS, ASIGNATURAS
CREATE TABLE GRADO (
    id_grado SERIAL PRIMARY KEY,
    título VARCHAR(30) NOT NULL,
    ordenG INTEGER NOT NULL UNIQUE
);

CREATE TABLE AREA (
    id_area SERIAL PRIMARY KEY,
    tituloA VARCHAR(50) NOT NULL,
    concepto TEXT,
    objetivo TEXT,
    nivel_academico VARCHAR(20) CHECK (nivel_academico IN ('PRIMARIA', 'SECUNDARIA', 'BACHILLERATO'))
);

CREATE TABLE ASIGNATURA (
    id_asig SERIAL PRIMARY KEY,
    nombreA VARCHAR(50) NOT NULL,
    id_area INTEGER NOT NULL REFERENCES AREA(id_area) ON DELETE CASCADE,
    concepto TEXT,
    objetivo TEXT,
    codigo_asignatura VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE GESTIONA (
    id_grado INTEGER NOT NULL REFERENCES GRADO(id_grado) ON DELETE CASCADE,
    id_asig INTEGER NOT NULL REFERENCES ASIGNATURA(id_asig) ON DELETE CASCADE,
    PRIMARY KEY (id_grado, id_asig)
);

-- 5. CLASE Y PERTENECE
CREATE TABLE CLASE (
    id_clase SERIAL PRIMARY KEY,
    nombreC VARCHAR(50) NOT NULL,
    numEst INTEGER DEFAULT 0,
    contraseña VARCHAR(20) NOT NULL,
    periodo VARCHAR(10) NOT NULL, -- Ej: '2025-2026'
    estado_clase VARCHAR(20) DEFAULT 'ACTIVA' CHECK (estado_clase IN ('ACTIVA', 'CERRADA', 'EN_PROGRESO')),
    id_ue INTEGER NOT NULL REFERENCES UE(id_ue) ON DELETE CASCADE,
    id_grado INTEGER NOT NULL REFERENCES GRADO(id_grado) ON DELETE CASCADE,
    id_maestro INTEGER NOT NULL REFERENCES MAESTRO(id_usuarioM) ON DELETE CASCADE,
    id_asig INTEGER NOT NULL REFERENCES ASIGNATURA(id_asig) ON DELETE CASCADE
);

CREATE TABLE PERTENECE (
    id_usuarioE INTEGER NOT NULL REFERENCES ESTUDIANTE(id_usuarioE) ON DELETE CASCADE,
    id_clase INTEGER NOT NULL REFERENCES CLASE(id_clase) ON DELETE CASCADE,
    PRIMARY KEY (id_usuarioE, id_clase)
);

-- 6. PLANIFICACIÓN CURRICULAR
CREATE TABLE UNIDADTEMATICA (
    id_unid_tem SERIAL PRIMARY KEY,
    nombreUT VARCHAR(100) NOT NULL,
    orden INTEGER NOT NULL,
    objetivo TEXT,
    id_grado INTEGER NOT NULL REFERENCES GRADO(id_grado) ON DELETE CASCADE,
    id_asig INTEGER NOT NULL REFERENCES ASIGNATURA(id_asig) ON DELETE CASCADE,
    UNIQUE (id_grado, id_asig, orden)
);

CREATE TABLE ITEM (
    id_item SERIAL PRIMARY KEY,
    nombreItem VARCHAR(100) NOT NULL,
    numero_preguntas INTEGER DEFAULT 0,
    orden INTEGER NOT NULL,
    nivel_item VARCHAR(30) CHECK (nivel_item IN ('BASICO', 'INTERMEDIO', 'AVANZADO')),
    id_unid_tem INTEGER NOT NULL REFERENCES UNIDADTEMATICA(id_unid_tem) ON DELETE CASCADE
);

CREATE TABLE PREGUNTA (
    id_pregunta SERIAL PRIMARY KEY,
    descripción TEXT NOT NULL,
    imagen VARCHAR(255), -- URL
    tipo_pregunta VARCHAR(30) NOT NULL CHECK (tipo_pregunta IN ('OPCION_MULTIPLE', 'VERDADERO_FALSO', 'ORDENA')),
    dificultad VARCHAR(20) CHECK (dificultad IN ('BAJA', 'MEDIA', 'ALTA')),
    tiempo_limite_segundos INTEGER DEFAULT 30,
    palabra_clave VARCHAR(50),
    id_item INTEGER NOT NULL REFERENCES ITEM(id_item) ON DELETE CASCADE
);

CREATE TABLE OPCION (
    id_opcion SERIAL PRIMARY KEY,
    texto TEXT NOT NULL,
    imagen VARCHAR(255), -- URL
    es_correcta BOOLEAN NOT NULL DEFAULT FALSE,
    imagen_retroalimentacion VARCHAR(255), -- URL
    texto_retroalimentacion TEXT,
    justificación TEXT,
    id_pregunta INTEGER NOT NULL REFERENCES PREGUNTA(id_pregunta) ON DELETE CASCADE
);

-- 7. EVALUACIONES, INTENTOS Y RESPUESTAS
CREATE TABLE EVALUACION (
    id_evaluacion SERIAL PRIMARY KEY,
    concepto VARCHAR(100) NOT NULL,
    ponderación INTEGER DEFAULT 0,
    recomendación TEXT,
    fecha_inicio TIMESTAMP DEFAULT NOW(),
    estado_nivel VARCHAR(20) DEFAULT 'PENDIENTE' CHECK (estado_nivel IN ('PENDIENTE', 'EN_PROGRESO', 'COMPLETADA', 'CERRADA')),
    id_usuarioE INTEGER NOT NULL REFERENCES ESTUDIANTE(id_usuarioE) ON DELETE CASCADE,
    id_clase INTEGER NOT NULL REFERENCES CLASE(id_clase) ON DELETE CASCADE
);

CREATE TABLE INTENTO (
    id_intento SERIAL PRIMARY KEY,
    fecha_intento DATE NOT NULL,
    hora_intento TIME NOT NULL,
    nro_respuestas_correctas INTEGER DEFAULT 0,
    nota_unidad_tematica INTEGER DEFAULT 0, -- Nota entera
    id_unidad_tem INTEGER NOT NULL REFERENCES UNIDADTEMATICA(id_unid_tem) ON DELETE CASCADE,
    id_evaluacion INTEGER NOT NULL REFERENCES EVALUACION(id_evaluacion) ON DELETE CASCADE
);

CREATE TABLE EVALUA (
    id_evaluacion INTEGER NOT NULL REFERENCES EVALUACION(id_evaluacion) ON DELETE CASCADE,
    id_unid_tem INTEGER NOT NULL REFERENCES UNIDADTEMATICA(id_unid_tem) ON DELETE CASCADE,
    nota_alta INTEGER DEFAULT 0,
    nro_intentos INTEGER DEFAULT 0,
    nota_promedio INTEGER DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'NO_INICIADO' CHECK (estado IN ('NO_INICIADO', 'EN_PROGRESO', 'APROBADO', 'REPROBADO')),
    PRIMARY KEY (id_evaluacion, id_unid_tem)
);

CREATE TABLE RESPUESTA (
    id_intento INTEGER NOT NULL REFERENCES INTENTO(id_intento) ON DELETE CASCADE,
    id_opcion INTEGER NOT NULL REFERENCES OPCION(id_opcion) ON DELETE CASCADE,
    es_correcta BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id_intento, id_opcion)
);

-- 8. GESTIÓN ACADÉMICA (AÑOS, TRIMESTRES, SEMANAS)
CREATE TABLE GESTION (
    id_gestion SERIAL PRIMARY KEY,
    año INTEGER NOT NULL UNIQUE,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado VARCHAR(20) DEFAULT 'ACTIVA' CHECK (estado IN ('ACTIVA', 'CERRADA', 'PLANIFICACION'))
);

CREATE TABLE TRIMESTRE (
    id_trimestre SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    ordenT INTEGER NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    id_gestion INTEGER NOT NULL REFERENCES GESTION(id_gestion) ON DELETE CASCADE,
    UNIQUE (id_gestion, ordenT)
);

CREATE TABLE SEMANA (
    id_semana SERIAL PRIMARY KEY,
    numero_semana INTEGER NOT NULL,
    dia_inicio DATE NOT NULL,
    dia_fin DATE NOT NULL,
    id_trimestre INTEGER NOT NULL REFERENCES TRIMESTRE(id_trimestre) ON DELETE CASCADE,
    UNIQUE (id_trimestre, numero_semana)
);

-- 9. PLANIFICACIÓN DOCENTE
CREATE TABLE PLANIFICACION (
    id_planificacion SERIAL PRIMARY KEY,
    año INTEGER NOT NULL,
    descripción TEXT,
    fecha_creacion TIMESTAMP DEFAULT NOW(),
    estado VARCHAR(20) DEFAULT 'BORRADOR' CHECK (estado IN ('BORRADOR', 'PUBLICADO', 'ARCHIVADO')),
    id_maestro INTEGER NOT NULL REFERENCES MAESTRO(id_usuarioM) ON DELETE CASCADE
);

CREATE TABLE ESTA_FORMADO (
    id_planificacion INTEGER NOT NULL REFERENCES PLANIFICACION(id_planificacion) ON DELETE CASCADE,
    id_semana INTEGER NOT NULL REFERENCES SEMANA(id_semana) ON DELETE CASCADE,
    id_item INTEGER NOT NULL REFERENCES ITEM(id_item) ON DELETE CASCADE,
    PRIMARY KEY (id_planificacion, id_semana, id_item)
);

-- 10. CONFIGURACIÓN Y AUDITORÍA
CREATE TABLE CONFIGURACION (
    id_config SERIAL PRIMARY KEY,
    nombre_plataforma VARCHAR(100) NOT NULL DEFAULT 'Sistema de Seguimiento Académico',
    logo_url VARCHAR(255),
    visión TEXT,
    misión TEXT,
    leyenda_de_pagina VARCHAR(255),
    fecha_actualizacion TIMESTAMP DEFAULT NOW(),
    color_primario VARCHAR(7) DEFAULT '#1a73e8',
    color_secundario VARCHAR(7) DEFAULT '#ffffff',
    url_manual_usuario VARCHAR(255),
    id_usuario INTEGER REFERENCES USUARIO(id_usuario) ON DELETE SET NULL
);

CREATE TABLE AUDITORIA (
    id_auditoria SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    accion VARCHAR(255) NOT NULL,
    tipo_accion VARCHAR(20) CHECK (tipo_accion IN ('INSERT', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'CONSULTA')),
    detalles TEXT,
    tabla_afectada VARCHAR(50),
    registro_id INTEGER,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    ip_origen VARCHAR(45)
);

-- ============================================================
-- ÍNDICES ESTRATÉGICOS PARA REPORTES Y RENDIMIENTO
-- ============================================================

-- Índice compuesto para consultas rápidas de evaluaciones por estudiante/clase/fecha
CREATE INDEX idx_evaluacion_usuario_clase_fecha ON EVALUACION (id_usuarioE, id_clase, fecha_inicio);

-- Índice para buscar intentos por evaluación y unidad temática
CREATE INDEX idx_intento_evaluacion_unidad ON INTENTO (id_evaluacion, id_unidad_tem);

-- Índice para respuestas por intento (reportes detallados)
CREATE INDEX idx_respuesta_intento ON RESPUESTA (id_intento);

-- Índice para contar estudiantes por clase (dashboard docente)
CREATE INDEX idx_pertenece_clase ON PERTENECE (id_clase);

-- Índices adicionales para optimizar búsquedas comunes
CREATE INDEX idx_usuario_email ON USUARIO (email);
CREATE INDEX idx_usuario_username ON USUARIO (username);
CREATE INDEX idx_clase_maestro ON CLASE (id_maestro);
CREATE INDEX idx_clase_ue ON CLASE (id_ue);
CREATE INDEX idx_intento_fecha ON INTENTO (fecha_intento);
CREATE INDEX idx_auditoria_fecha ON AUDITORIA (fecha);

-- ============================================================
-- DATOS DE PRUEBA (OPCIONAL)
-- ============================================================

-- Insertar un usuario administrador por defecto
INSERT INTO USUARIO (username, nombre, apellido1, email, contraseña, estado) 
VALUES ('Jim', 'Jhimy', 'Humerez', 'establecercontacto1@gmail.com', 'jhl5742131', 'ACTIVO');

-- Insertar el administrador en su tabla de rol
INSERT INTO ADMINISTRADOR (id_usuarioA, teléfono) VALUES (1, '67312113');

-- Insertar una configuración por defecto
INSERT INTO CONFIGURACION (
    nombre_plataforma, 
    logo_url, 
    visión, 
    misión, 
    leyenda_de_pagina, 
    color_primario, 
    color_secundario, 
    id_usuario
) VALUES (
    'Sistema de Seguimiento y Rendimiento Académico en Matemáticas',
    '/img/logo_default.png',
    'Ser referente nacional en medición educativa.',
    'Contribuir a la mejora del rendimiento académico en matemáticas.',
    '© 2026 - Todos los derechos reservados.',
    '#1a73e8',
    '#ffffff',
    1
);