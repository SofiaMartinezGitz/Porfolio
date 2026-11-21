export default function TarjetaProyecto({ proyecto, alAbrir, imagen }) {
  return (
    <article className={`tarjeta-proyecto tarjeta-${proyecto.id}`}>
      <button
        className="vista-proyecto"
        onClick={() => alAbrir(proyecto)}
        aria-label={`Abrir ${proyecto.titulo}`}
      >
        {imagen ? (
          <img src={imagen} alt={proyecto.titulo} loading="lazy" />
        ) : (
          <span className="imagen-pendiente">✳</span>
        )}
        <span className="ver-proyecto">Ver proyecto ↗</span>
      </button>

      <button className="info-proyecto" onClick={() => alAbrir(proyecto)}>
        <span>
          <strong>{proyecto.titulo}</strong>
          <small>{proyecto.descripcion}</small>
        </span>
        <span className="flecha-proyecto" aria-hidden="true">↗</span>
      </button>
    </article>
  );
}
