import { useEffect } from "react";

export default function VentanaModal({ titulo, alCerrar, children }) {
  useEffect(() => {
    function cerrarConEscape(event) {
      if (event.key === "Escape") alCerrar();
    }

    document.addEventListener("keydown", cerrarConEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", cerrarConEscape);
      document.body.style.overflow = "";
    };
  }, [alCerrar]);

  return (
    <div className="fondo-modal" onMouseDown={alCerrar}>
      <section
        className="ventana-modal"
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="encabezado-modal">
          <h2>{titulo}</h2>
          <button className="boton-cerrar" onClick={alCerrar} aria-label="Cerrar ventana">
            ×
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
