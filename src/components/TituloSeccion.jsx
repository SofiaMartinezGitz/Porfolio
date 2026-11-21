export default function TituloSeccion({ children, id }) {
  return (
    <div className="titulo-seccion" id={id}>
      <span className="titulo-detalle">✳</span>
      <h2>{children}</h2>
    </div>
  );
}
