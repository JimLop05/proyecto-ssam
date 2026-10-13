// src/components/sections/ModuleTiles.jsx
// ============================================================
// Grid de tarjetas (módulos) — estilo "tiles" tipo Educar Futuro
// Cada tile: gradiente + icono grande + título + descripción
// ============================================================

import {
    BarChart3,
    Target,
    BookOpen,
    ClipboardList,
    Users,
    TrendingUp,
    Bell,
    GraduationCap,
} from 'lucide-react';
import './ModuleTiles.css';

const MODULES = [
    {
        icon: BarChart3,
        title: 'Métricas en tiempo real',
        desc: 'Visualiza el rendimiento académico con reportes claros y accionables.',
        variant: 'primary',
    },
    {
        icon: Target,
        title: 'Seguimiento personalizado',
        desc: 'Cada estudiante tiene su propio panel de progreso por unidad y clase.',
        variant: 'accent',
    },
    {
        icon: BookOpen,
        title: 'Planificación docente',
        desc: 'Crea, organiza y evalúa tus clases con herramientas diseñadas para docentes.',
        variant: 'primary',
    },
    {
        icon: ClipboardList,
        title: 'Evaluaciones en línea',
        desc: 'Aplica pruebas por unidad y obtén resultados al instante.',
        variant: 'accent',
    },
    {
        icon: Users,
        title: 'Gestión de usuarios',
        desc: 'Administra estudiantes, docentes y directivos desde un solo lugar.',
        variant: 'accent',
    },
    {
        icon: TrendingUp,
        title: 'Reportes de rendimiento',
        desc: 'Estadísticas institucionales por curso, grado y materia.',
        variant: 'primary',
    },
    {
        icon: Bell,
        title: 'Alertas y notificaciones',
        desc: 'Recibe avisos cuando un estudiante necesite apoyo adicional.',
        variant: 'primary',
    },
    {
        icon: GraduationCap,
        title: 'Registro de estudiantes',
        desc: 'Inscribe nuevos alumnos y asígnalos a su curso en minutos.',
        variant: 'accent',
    },
];

function ModuleTiles({ onModuleClick }) {
    return (
        <section id="modulos" className="tiles">
            <div className="tiles__head">
                <span className="tiles__badge">Módulos</span>
                <h2>Todo lo que necesitas en un solo lugar</h2>
                <p>
                    Diseñado para estudiantes, docentes y directivos de
                    instituciones educativas.
                </p>
            </div>

            <div className="tiles__grid">
                {MODULES.map(({ icon: Icon, title, desc, variant }) => (
                    <article
                        key={title}
                        className={`tile tile--${variant}`}
                        onClick={() => onModuleClick?.()}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="tile__icon">
                            <Icon size={36} strokeWidth={1.8} />
                        </div>
                        <h3 className="tile__title">{title}</h3>
                        <p className="tile__desc">{desc}</p>
                        <span className="tile__arrow">→</span>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default ModuleTiles;