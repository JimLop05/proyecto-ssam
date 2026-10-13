// Ruta: src/hooks/useIsMobile.js
// ============================================================
// Hook: detecta si el viewport está en tamaño móvil.
// Se sincroniza con la media query de CSS (900px).
// Reacciona a: resize, rotación de pantalla, cambios de zoom.
// ============================================================

import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = '(max-width: 900px)';

export function useIsMobile() {
    // Estado inicial: leemos el valor actual al montar
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia(MOBILE_BREAKPOINT).matches;
    });

    useEffect(() => {
        const mql = window.matchMedia(MOBILE_BREAKPOINT);

        // Handler que se dispara cada vez que cambia el match
        const handler = (event) => setIsMobile(event.matches);

        // Compatibilidad moderna
        mql.addEventListener('change', handler);

        // Sincronización inicial por si cambió entre render y efecto
        setIsMobile(mql.matches);

        return () => mql.removeEventListener('change', handler);
    }, []);

    return isMobile;
}