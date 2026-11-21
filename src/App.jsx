import { useState } from "react";
import TituloSeccion from "./components/TituloSeccion";
import TarjetaProyecto from "./components/TarjetaProyecto";
import VentanaModal from "./components/VentanaModal";
import { proyectos, programas, redes } from "./proyectos";

const ilustraciones = Object.values(
  import.meta.glob("./assets/ilustraciones/*.{png,jpg,jpeg,webp,gif}", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

const videosVerticales = Object.values(
  import.meta.glob("./assets/videos/verticales/*.{mp4,webm,mov}", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

const videosHorizontales = Object.values(
  import.meta.glob("./assets/videos/horizontales/*.{mp4,webm,mov}", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

const portadasVideos = Object.values(
  import.meta.glob("./assets/videos/portada/*.{png,jpg,jpeg,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

const imagenesDesarrollo = Object.values(
  import.meta.glob("./assets/proyectos/desarrollo/*.{png,jpg,jpeg,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

const imagenesDiseno = Object.values(
  import.meta.glob("./assets/proyectos/diseno/*.{png,jpg,jpeg,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

const imagenesMascotaPomopet = Object.values(
  import.meta.glob("./assets/proyectos/pomopet/Conejito.png", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

const logosProgramas = import.meta.glob("./assets/programas/*.{png,svg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const iconosRedes = import.meta.glob("./assets/redes/*.{png,svg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const enlacePomopet = "https://drive.google.com/file/d/14PM6VIolU67bseKtoUx7eATyVLag2kuF/view?usp=drive_link";

function PomopetDestacado({ alAbrir }) {
  return (
    <article className="pomopet-destacado">
      <div className="pomopet-texto">
        <span className="etiqueta-pomopet">PROYECTO DESTACADO</span>
        <h3>pomopet</h3>
        <p>Para la mejora de la concentración!</p>
        <button
          className="boton-pomopet"
          type="button"
          onClick={alAbrir}
        >
          Conocer Pomopet <span>↗</span>
        </button>
      </div>
      <div className="pomopet-mascota">
        {imagenesMascotaPomopet[0] ? (
          <img src={imagenesMascotaPomopet[0]} alt="Mascota del proyecto Pomopet" />
        ) : (
          <div className="pomopet-placeholder">
            <span aria-hidden="true">🐾</span>
            <small>Imagen de la mascota</small>
          </div>
        )}
      </div>
      <div className="pomopet-decoracion" aria-hidden="true">
        <span>✿</span><span>♡</span><span>✳</span>
      </div>
    </article>
  );
}

function GaleriaImagenes({ imagenes, textoAlternativo }) {
  if (!imagenes.length) {
    return (
      <div className="galeria-vacia">
        <span>✳</span>
      </div>
    );
  }

  return (
    <div className="galeria-arte">
      {imagenes.map((imagen, indice) => (
        <figure className="obra-arte" key={imagen}>
          <img src={imagen} alt={`${textoAlternativo} ${indice + 1}`} />
        </figure>
      ))}
    </div>
  );
}

function GaleriaVideos({ videos, formato }) {
  if (!videos.length) {
    return (
      <div className="galeria-vacia">
        <span>▶</span>
      </div>
    );
  }

  return (
    <div className={`galeria-videos galeria-${formato}`}>
      {videos.map((video) => (
        <div className="video-tarjeta" key={video}>
          <video controls preload="metadata" playsInline>
            <source src={video} />
            Tu navegador no puede reproducir este video
          </video>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [modalActivo, setModalActivo] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [estadoFormulario, setEstadoFormulario] = useState("");
  const [enviando, setEnviando] = useState(false);

  function abrirProyecto(proyecto) {
    setCategoriaActiva("Todos");
    setModalActivo(proyecto);
  }

  function cerrarModal() {
    setModalActivo(null);
  }

  async function enviarFormulario(event) {
    event.preventDefault();
    const formulario = event.currentTarget;
    const datosFormulario = new FormData(formulario);
    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

    if (!apiUrl) {
      setEstadoFormulario("No se ha configurado la dirección del servidor. Inténtalo más tarde.");
      return;
    }

    // Los nombres coinciden con los que valida y guarda el backend.
    const datos = {
      name: datosFormulario.get("nombre"),
      email: datosFormulario.get("correo"),
      message: datosFormulario.get("mensaje"),
    };

    try {
      setEnviando(true);
      setEstadoFormulario("");

      const respuesta = await fetch(`${apiUrl}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json().catch(() => ({}));

      if (!respuesta.ok) {
        throw new Error(resultado.message || "No se pudo enviar el mensaje.");
      }

      setEstadoFormulario("¡Tu mensaje se envió correctamente!");
      formulario.reset();
    } catch (error) {
      setEstadoFormulario(error.message || "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.");
    } finally {
      setEnviando(false);
    }
  }

  function imagenDeProyecto(id) {
    if (id === "desarrollo") return imagenesDesarrollo[0];
    if (id === "diseno") return imagenesDiseno[0];
    if (id === "video") return portadasVideos[0];
    return ilustraciones[0];
  }

  return (
    <main>
      <header className="portada" id="inicio">
        <nav className="navegacion">
          <a className="marca" href="#inicio">SM<span>✳</span></a>
          <div className="enlaces-nav">
            <a href="#sobre-mi">Sobre mí</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#contacto">Contacto</a>
          </div>
        </nav>

        <div className="portada-contenido">
          <div className="portada-texto">
            
            <h1>DESARROLLADORA CREATIVA <span>&</span><br />ARTISTA VISUAL</h1>
            <p>Ilustración · Código · Diseño</p>
            <a href="#proyectos" className="boton-principal">Mi universo creativo <span>↘</span></a>
          </div>
          <div className="marco-foto-portada">
            <img className="imagen-portada" src="/images/hero.png" alt="Composición visual de portada" />
            
          </div>
          <span className="estrella-portada estrella-uno">✳</span>
          <span className="estrella-portada estrella-dos">✧</span>
        </div>
        <div className="pie-portada"><span>ILUSTRACIÓN · CÓDIGO · DISEÑO</span><span>PORTAFOLIO CREATIVO</span></div>
      </header>

      <section className="seccion-sobre" id="sobre-mi">
        <TituloSeccion>UN POCO SOBRE MÍ</TituloSeccion>
        <div className="sobre-contenido">
          <div className="foto-perfil-marco">
            <img className="imagen-perfil" src="/images/profile.png" alt="Retrato de Sofía" />
          </div>
          <div className="sobre-texto">
            <p className="texto-intro">Soy Sofía Martínez, una desarrolladora creativa y artista visual apasionada por la ilustración, el código y el diseño.</p>
            <button className="boton-principal" onClick={() => setModalActivo({ tipo: "sobre" })}>
              Más sobre mí <span>↗</span>
            </button>
          </div>
        </div>

        <div className="programas-area">
          <div className="programas-encabezado">
            <h3>PROGRAMAS CON LOS QUE TENGO EXPERIENCIA</h3>
            
          </div>
          <div className="programas-lista">
            {programas.map((programa, indice) => {
              const archivoLogo = Object.entries(logosProgramas).find(
                ([ruta]) => ruta.toLowerCase().endsWith(programa.archivo)
              );
              const logo = archivoLogo ? archivoLogo[1] : null;

              return (
                <div className="programa-elemento" key={programa.nombre} style={{ "--retraso": `${indice * 0.12}s` }}>
                  <div className="programa-cuadro" title={programa.nombre}>
                    {logo ? <img src={logo} alt="" /> : <span>{programa.iniciales}</span>}
                  </div>
                  <small>{programa.nombre}</small>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="seccion-proyectos" id="proyectos">
        <TituloSeccion>MI UNIVERSO CREATIVO</TituloSeccion>
        

        <PomopetDestacado
          alAbrir={() => setModalActivo({ tipo: "pomopet" })}
        />

        <div className="proyectos-cuadricula">
          {proyectos.slice(0, 2).map((proyecto) => (
            <TarjetaProyecto key={proyecto.id} proyecto={proyecto} alAbrir={abrirProyecto} imagen={imagenDeProyecto(proyecto.id)} />
          ))}
          {proyectos.slice(2, 4).map((proyecto) => (
            <TarjetaProyecto key={proyecto.id} proyecto={proyecto} alAbrir={abrirProyecto} imagen={imagenDeProyecto(proyecto.id)} />
          ))}
        </div>
      </section>

      <section className="seccion-contacto" id="contacto">
        <TituloSeccion>CONTACTO</TituloSeccion>
        <div className="contacto-intro">
          <h3>TIENES UN PROYECTO EN MENTE?</h3>
          <p>Podemos hacerlo realidad!</p>
        </div>

        <div className="contacto-contenido">
          <form className="formulario-contacto" onSubmit={enviarFormulario}>
            <div className="campo-formulario">
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" type="text" name="nombre" placeholder="Tu nombre" required />
            </div>
            <div className="campo-formulario">
              <label htmlFor="correo">Correo electrónico</label>
              <input id="correo" type="email" name="correo" placeholder="tu@correo.com" required />
            </div>
            <div className="campo-formulario campo-mensaje">
              <label htmlFor="mensaje">Cuéntame sobre tu idea</label>
              <textarea id="mensaje" name="mensaje" placeholder="Cuéntame sobre tu idea" rows="5" required />
            </div>
            <button type="submit" className="boton-enviar" disabled={enviando}>
              {enviando ? "Enviando..." : "ENVIAR ↗"}
            </button>
            {estadoFormulario ? (
              <p className="estado-formulario" role="status">
                {estadoFormulario}
              </p>
            ) : null}
          </form>
          <div className="contacto-imagen">
            <img className="imagen-contacto" src="/images/apuntando (2).png" alt="Ilustración decorativa" />
          </div>
        </div>
      </section>

      <footer className="pie-pagina">
        <div className="pie-superior">
          <a className="marca marca-pie" href="#inicio">SM<span>✳</span></a>
          <a href="#inicio">VOLVER ARRIBA ↑</a>
        </div>
        <div className="pie-inferior">
          <span>SOFÍA MARTÍNEZ · PORTAFOLIO</span>
          <span>© 2026 · TODOS LOS DERECHOS RESERVADOS</span>
        </div>
      </footer>

      {modalActivo ? (
        <VentanaModal
          titulo={
            modalActivo.tipo === "sobre"
              ? "SOBRE MÍ"
              : modalActivo.tipo === "pomopet"
                ? "POMOPET"
                : modalActivo.tituloModal
          }
          alCerrar={cerrarModal}
        >
          {modalActivo.tipo === "pomopet" ? (
            <div className="contenido-modal-pomopet">
              <div className="pomopet-modal-imagen">
                {imagenesMascotaPomopet[0] ? (
                  <img
                    src={imagenesMascotaPomopet[0]}
                    alt="Mascota de Pomopet"
                  />
                ) : (
                  <span aria-hidden="true">🐾</span>
                )}
              </div>
              <div className="pomopet-modal-texto">
                <p>
                  Pomopet es una aplicación de Android para ayudar con la
                  concentración de los estudiantes utilizando la técnica
                  Pomodoro. Puedes crear tareas, planear tu semana en el
                  calendario, hacer pomodoros y desbloquear mascotas
                </p>
                <a
                  className="boton-pomopet"
                  href={enlacePomopet}
                  target="_blank"
                  rel="noreferrer"
                >
                  ¡Pruébala ahora! <span>↗</span>
                </a>
              </div>
            </div>
          ) : modalActivo.tipo === "sobre" ? (
            <div className="contenido-modal-sobre">
              <div className="historia-perfil">
                <img src="/images/profile.png" alt="Sofía Martínez" />
                <p>Nacida en Santa Marta, Colombia</p>
              </div>
              <div className="detalles-perfil">
                <p><strong>Sofía Martínez</strong></p>
                <p>25/08/2005</p>
                <p>Estudiante de Ingeniería Multimedia</p>
                <h3>REDES SOCIALES</h3>
                <div className="redes-lista">
                  {redes.map((red) => {
                    const archivoIcono = Object.entries(iconosRedes).find(
                      ([ruta]) => ruta.toLowerCase().endsWith(red.archivo.toLowerCase())
                    );
                    const icono = archivoIcono ? archivoIcono[1] : null;

                    return (
                      <a href="#contacto" className="red-social" key={red.nombre}>
                        <span className="red-icono">
                          {icono ? <img src={icono} alt="" /> : red.nombre.charAt(0)}
                        </span>
                        <span><strong>{red.nombre}</strong><small>{red.usuario}</small></span>
                        <span className="red-flecha">↗</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : modalActivo.id === "ilustracion" ? (
            <GaleriaImagenes imagenes={ilustraciones} textoAlternativo="Ilustración" />
          ) : modalActivo.id === "video" ? (
            <div className="contenido-videos">
              <div>
                <h3>VIDEOS VERTICALES</h3>
                <GaleriaVideos videos={videosVerticales} formato="vertical" />
              </div>
              <div>
                <h3>VIDEOS HORIZONTALES</h3>
                <GaleriaVideos videos={videosHorizontales} formato="horizontal" />
              </div>
            </div>
          ) : (
            <GaleriaImagenes
              imagenes={modalActivo.id === "desarrollo" ? imagenesDesarrollo : imagenesDiseno}
              textoAlternativo={modalActivo.titulo}
            />
          )}
        </VentanaModal>
      ) : null}
    </main>
  );
}

export default App;
