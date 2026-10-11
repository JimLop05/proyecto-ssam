// frontend_ssam/src/utils/rubrica.js
// ============================================================
// RÚBRICA INSTITUCIONAL SSAM
// Fuente única de verdad para colores de rendimiento.
// Usada por: MiRendimiento (estudiante), EstadisticasClase (maestro)
// ============================================================

export const RUBRICA = [
    { min: 90, max: 100, nivel: 'Óptimo',        color: '#2e7d32', clase: 'optimo' },
    { min: 75, max: 89,  nivel: 'Bueno',         color: '#66bb6a', clase: 'bueno' },
    { min: 51, max: 74,  nivel: 'Aceptable',     color: '#f9a825', clase: 'aceptable' },
    { min: 0,  max: 50,  nivel: 'En Desarrollo', color: '#c62828', clase: 'en-desarrollo' },
];

export const COLOR_SIN_EVALUAR = '#94a3b8';

// Devuelve el objeto de rúbrica según una nota (0-100)
export const getRubrica = (nota) => {
    if (nota === null || nota === undefined || isNaN(nota)) {
        return {
            nivel: 'Sin evaluar',
            color: COLOR_SIN_EVALUAR,
            clase: 'sin-evaluar',
        };
    }
    return (
        RUBRICA.find((r) => nota >= r.min && nota <= r.max) || RUBRICA[3]
    );
};

// Helper: formatea número a 1 decimal seguro
export const fmt = (n) =>
    n === null || n === undefined || isNaN(n) ? '—' : `${Number(n).toFixed(1)}%`;