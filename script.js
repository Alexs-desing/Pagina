// ============================================================
// EDITA SOLO ESTE OBJETO. Los datos son de ejemplo (inventados).
// Cada sección se muestra únicamente al hacer clic en su título.
// ============================================================
const datos = {
  nombre: "Beczabe Hernandez",
  titulo: "Desarrolladora de software full stack",
  estado: "disponible",
  correo: "beczabe.hernandez@gmail.com",

  izquierda: [
    { titulo: "Acerca de mí", tipo: "texto",
      contenido: "Desarrolladora de software organizada y responsable, con buenas relaciones interpersonales. Disfruto convertir ideas en aplicaciones web claras, rápidas y fáciles de usar, y aprender tecnologías nuevas cada semana." },
    { titulo: "Contacto", tipo: "enlaces",
      contenido: [
        { texto: "Correo: beczabe.hernandez@gmail.com", url: "mailto:beczabe.hernandez@ejemplo.com" },
        { texto: "Teléfono: 961 000 0000", url: "tel:9610000000" },
        { texto: "GitHub: github.com/beczabe", url: "https://github.com/beczabe" },
        { texto: "LinkedIn: linkedin.com/in/beczabe", url: "https://linkedin.com/in/beczabe" }
      ] },
    { titulo: "Educación", tipo: "detalle",
      contenido: [
        { t: "Ingeniería en Desarrollo de Software", d: "Tecnologico superior de Cintalapa, 2020 - 2024" },
        { t: "Curso de JavaScript moderno", d: "Plataforma en línea, 2023" },
        { t: "Certificación en bases de datos SQL", d: "2024" }
      ] },
    { titulo: "Experiencia laboral", tipo: "detalle",
      contenido: [
        { t: "Desarrolladora web junior", d: "Empresa de ejemplo, 2024 - actualidad. Mantenimiento de sitios y creación de módulos nuevos." },
        { t: "Prácticas profesionales", d: "Estudio digital, 2023. Maquetación responsiva y consumo de APIs." }
      ] }
  ],

  derecha: [
    { titulo: "Información personal", tipo: "lista",
      contenido: ["Localidad: México", "Modalidad: remota o presencial", "Idiomas: español nativo, inglés intermedio", "Disponibilidad: inmediata"] },
    { titulo: "Objetivo profesional", tipo: "texto",
      contenido: "Unirme a un equipo donde pueda aportar mi experiencia en desarrollo web, seguir creciendo profesionalmente y cumplir con responsabilidad las tareas asignadas." },
    { titulo: "Habilidades técnicas", tipo: "niveles",
      contenido: [
        { n: "HTML y CSS", v: 90 }, { n: "JavaScript", v: 85 }, { n: "React", v: 75 },
        { n: "Node.js", v: 70 }, { n: "SQL y MySQL", v: 75 }, { n: "Git y GitHub", v: 80 }
      ] },
    { titulo: "Habilidades personales", tipo: "lista",
      contenido: ["Trabajo en equipo", "Puntualidad", "Comunicación clara", "Resolución de problemas", "Trato amable y educado"] },
    { titulo: "Proyectos", tipo: "proyectos",
      contenido: [
        { t: "Tienda en línea", d: "Catálogo, carrito y pago simulado con React y Node.js.", url: "https://github.com/beczabe/tienda" },
        { t: "Gestor de tareas", d: "App con JavaScript puro, guardado local y filtros.", url: "https://github.com/beczabe/tareas" },
        { t: "Portafolio personal", d: "Sitio responsivo con HTML, CSS y JavaScript.", url: "https://github.com/beczabe/portafolio" }
      ] }
  ]
};

// ---------- Utilidades ----------
const $ = (id) => document.getElementById(id);
const el = (tag, props = {}, ...hijos) => {
  const n = Object.assign(document.createElement(tag), props);
  n.append(...hijos);
  return n;
};

function cuerpo(s) {
  switch (s.tipo) {
    case "texto": return el("p", { textContent: s.contenido });
    case "lista": return el("ul", {}, ...s.contenido.map((t) => el("li", { textContent: t })));
    case "enlaces":
      return el("ul", {}, ...s.contenido.map((c) =>
        el("li", {}, el("a", { href: c.url, textContent: c.texto, target: c.url.startsWith("http") ? "_blank" : "_self", rel: "noopener" }))));
    case "detalle":
      return el("ul", {}, ...s.contenido.map((i) =>
        el("li", {}, el("strong", { textContent: i.t }), el("small", { textContent: i.d }))));
    case "niveles":
      return el("ul", { className: "nivel" }, ...s.contenido.map((h) => {
        const barra = el("div", { className: "barra" }, el("i"));
        barra.firstChild.style.setProperty("--n", h.v + "%");
        return el("li", {}, el("div", { className: "fila" }, el("span", { textContent: h.n }), el("span", { textContent: h.v + "%" })), barra);
      }));
    case "proyectos":
      return el("div", {}, ...s.contenido.map((p) =>
        el("div", { className: "proy" },
          el("strong", { textContent: p.t }),
          el("p", { textContent: p.d }),
          el("a", { href: p.url, textContent: "Ver proyecto", target: "_blank", rel: "noopener" }))));
  }
}

let contador = 0;
function crearBloque(s) {
  const id = "sec" + contador++;
  const boton = el("button", { className: "pill", type: "button" }, el("span", { textContent: s.titulo }), el("span", { className: "flecha" }));
  boton.setAttribute("aria-expanded", "false");
  boton.setAttribute("aria-controls", id);
  const panel = el("div", { className: "panel", id }, el("div", {}, el("div", { className: "cuerpo" }, cuerpo(s))));
  boton.addEventListener("click", () => alternar(boton, panel));
  return el("section", { className: "bloque", "data-titulo": s.titulo }, boton, panel);
}

function alternar(boton, panel, forzar) {
  const abrir = forzar ?? boton.getAttribute("aria-expanded") === "false";
  boton.setAttribute("aria-expanded", String(abrir));
  panel.classList.toggle("abierto", abrir);
}

// ---------- Render ----------
document.title = `${datos.nombre} | Desarrolladora de software`;
$("nombre").textContent = datos.nombre;
$("titulo").textContent = datos.titulo;
$("estado").textContent = datos.estado;
datos.izquierda.forEach((s) => $("col-izq").appendChild(crearBloque(s)));
datos.derecha.forEach((s) => $("col-der").appendChild(crearBloque(s)));

// Abrir / cerrar todo
const botonAlternar = $("alternar");
botonAlternar.addEventListener("click", () => {
  const abrir = botonAlternar.getAttribute("aria-pressed") === "false";
  document.querySelectorAll(".bloque").forEach((b) => alternar(b.querySelector(".pill"), b.querySelector(".panel"), abrir));
  botonAlternar.setAttribute("aria-pressed", String(abrir));
  botonAlternar.textContent = abrir ? "Cerrar todo" : "Abrir todo";
});

// Botón "Contrátame": abre Contacto y lo lleva a la vista
$("contratar").addEventListener("click", () => {
  const b = document.querySelector('.bloque[data-titulo="Contacto"]');
  alternar(b.querySelector(".pill"), b.querySelector(".panel"), true);
  b.scrollIntoView({ behavior: "smooth", block: "center" });
});
