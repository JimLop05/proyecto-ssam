import { InlineMath, BlockMath } from 'react-katex';

// Divide un texto con $...$ o $$...$$ en partes y las renderiza con KaTeX
function MathText({ children, className = '' }) {
    if (!children) return null;

    const texto = String(children);

    // Regex: captura $$...$$ (bloque) y $...$ (inline)
    const partes = [];
    const regex = /(\$\$[^$]+\$\$|\$[^$]+\$)/g;
    let ultimoIndex = 0;
    let match;

    while ((match = regex.exec(texto)) !== null) {
        // Texto plano antes de la fórmula
        if (match.index > ultimoIndex) {
            partes.push({
                tipo: 'texto',
                contenido: texto.substring(ultimoIndex, match.index),
            });
        }

        const formula = match[0];
        if (formula.startsWith('$$')) {
            partes.push({
                tipo: 'bloque',
                contenido: formula.slice(2, -2).trim(),
            });
        } else {
            partes.push({
                tipo: 'inline',
                contenido: formula.slice(1, -1).trim(),
            });
        }

        ultimoIndex = match.index + formula.length;
    }

    // Texto restante después de la última fórmula
    if (ultimoIndex < texto.length) {
        partes.push({
            tipo: 'texto',
            contenido: texto.substring(ultimoIndex),
        });
    }

    return (
        <span className={className}>
            {partes.map((parte, i) => {
                if (parte.tipo === 'texto') {
                    return <span key={i}>{parte.contenido}</span>;
                }
                if (parte.tipo === 'bloque') {
                    return <BlockMath key={i} math={parte.contenido} />;
                }
                return <InlineMath key={i} math={parte.contenido} />;
            })}
        </span>
    );
}

export default MathText;