// frontend_ssam/src/components/ui/ConfirmModal.jsx
// ============================================================
// Modal de confirmación reutilizable
// Uso: <ConfirmModal open={} onClose={} onConfirm={} ... />
// ============================================================

import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './ConfirmModal.css';

export default function ConfirmModal({
    open = false,
    title = '¿Estás seguro?',
    message = '',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    variant = 'danger', // 'danger' | 'warning' | 'primary'
    onConfirm,
    onClose,
}) {
    // Cerrar con Escape
    useEffect(() => {
        if (!open) return;

        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose?.();
        };

        document.addEventListener('keydown', handleEscape);

        // Bloquear scroll del body
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = originalOverflow;
        };
    }, [open, onClose]);

    if (!open) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose?.();
    };

    return (
        <div
            className="cm-backdrop"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cm-title"
        >
            <div className={`cm-modal cm-modal--${variant}`}>
                <button
                    className="cm-modal__close"
                    onClick={onClose}
                    type="button"
                    aria-label="Cerrar"
                >
                    <X size={18} />
                </button>

                <div className="cm-modal__icon">
                    <AlertTriangle size={24} />
                </div>

                <h3 id="cm-title" className="cm-modal__title">
                    {title}
                </h3>

                {message && <p className="cm-modal__message">{message}</p>}

                <div className="cm-modal__actions">
                    <button
                        type="button"
                        className="cm-btn cm-btn--ghost"
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        className={`cm-btn cm-btn--${variant}`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}