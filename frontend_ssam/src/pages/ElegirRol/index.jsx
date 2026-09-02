// ============================================================
// PÁGINA DE ELECCIÓN DE ROL
// El usuario elige si registrarse como Estudiante o Maestro
// ============================================================

import { useNavigate } from 'react-router-dom';

function ElegirRol() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>📝 Registro</h1>
            <p style={styles.subtitle}>¿Cómo deseas registrarte?</p>

            <div style={styles.cardContainer}>
                {/* Opción Estudiante */}
                <div 
                    style={styles.card}
                    onClick={() => navigate('/registro/estudiante')}
                >
                    <div style={styles.icon}>🧑‍🎓</div>
                    <h2>Estudiante</h2>
                    <p>Acceso a evaluaciones, seguimiento de rendimiento y clases.</p>
                    <button style={styles.btnEstudiante}>Registrarme como Estudiante</button>
                </div>

                {/* Opción Maestro */}
                <div 
                    style={styles.card}
                    onClick={() => navigate('/registro/maestro')}
                >
                    <div style={styles.icon}>👨‍🏫</div>
                    <h2>Maestro</h2>
                    <p>Gestión de clases, evaluaciones y seguimiento de estudiantes.</p>
                    <button style={styles.btnMaestro}>Registrarme como Maestro</button>
                </div>
            </div>

            <p style={styles.footer}>
                ¿Ya tienes cuenta? <span onClick={() => navigate('/login')} style={styles.link}>Inicia Sesión</span>
            </p>
        </div>
    );
}

// ==================== ESTILOS ========================
const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f6f8',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    title: {
        fontSize: '32px',
        color: '#1A5276',
        marginBottom: '10px'
    },
    subtitle: {
        fontSize: '18px',
        color: '#555',
        marginBottom: '40px'
    },
    cardContainer: {
        display: 'flex',
        gap: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '30px',
        width: '280px',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        border: '2px solid transparent'
    },
    icon: {
        fontSize: '60px',
        marginBottom: '15px'
    },
    btnEstudiante: {
        backgroundColor: '#1A5276',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '15px',
        width: '100%'
    },
    btnMaestro: {
        backgroundColor: '#F39C12',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '15px',
        width: '100%'
    },
    footer: {
        marginTop: '40px',
        color: '#555'
    },
    link: {
        color: '#1A5276',
        cursor: 'pointer',
        fontWeight: 'bold',
        textDecoration: 'underline'
    }
};

// Efecto hover (se puede poner en CSS)
// Agrega esto en un archivo .css o con styled-components
const cardHover = {
    transform: 'scale(1.02)',
    borderColor: '#1A5276'
};

export default ElegirRol;