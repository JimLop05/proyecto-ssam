// src/components/sections/Contact.jsx
// ============================================================
// Sección de contacto — Solo datos institucionales (sin formulario)
// Reemplaza los placeholders por los datos reales cuando los tengas
// ============================================================

import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import './Contact.css';

const CONTACT_DATA = [
    {
        icon: Mail,
        title: 'Correo electrónico',
        lines: [
            { text: 'contacto@ssra.edu', href: 'mailto:contacto@ssra.edu' },
            { text: 'soporte@ssra.edu', href: 'mailto:soporte@ssra.edu' },
        ],
    },
    {
        icon: Phone,
        title: 'Teléfono',
        lines: [
            { text: '+591 000 0000', href: 'tel:+5910000000' },
            { text: '+591 000 00000', href: 'tel:+59100000000' },
        ],
    },
    {
        icon: MapPin,
        title: 'Dirección',
        lines: [
            { text: 'Av. Ejemplo #000, Zona Centro' },
            { text: 'La Paz, Bolivia' },
        ],
    },
    {
        icon: Clock,
        title: 'Horario de atención',
        lines: [
            { text: 'Lunes a Viernes' },
            { text: '08:00 – 16:00' },
        ],
    },
];

function Contact() {
    return (
        <section id="contacto" className="contact">
            <div className="contact__inner">

                <div className="contact__head">
                    <span className="contact__badge">Contacto</span>
                    <h2>¿Necesitas ayuda o más información?</h2>
                    <p>
                        Estamos disponibles para resolver tus dudas sobre la
                        plataforma SSRA y acompañarte en su implementación.
                    </p>
                </div>

                <div className="contact__grid">
                    {CONTACT_DATA.map(({ icon: Icon, title, lines }) => (
                        <article key={title} className="contact__card">
                            <div className="contact__card-icon">
                                <Icon size={24} strokeWidth={2} />
                            </div>
                            <h3>{title}</h3>
                            <div className="contact__card-lines">
                                {lines.map(({ text, href }) =>
                                    href ? (
                                        <a key={text} href={href}>{text}</a>
                                    ) : (
                                        <span key={text}>{text}</span>
                                    )
                                )}
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Contact;