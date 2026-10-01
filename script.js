// ============================================================
// EDITA SOLO ESTE OBJETO con tus datos reales.
// El resto del archivo dibuja el currículum automáticamente.
// ============================================================
const datos = {
  nombre: "Tu Nombre Apellido",
  titulo: "Desarrolladora de software",
  acerca:
    "Desarrolladora de software organizada y responsable, con buenas relaciones interpersonales. " +
    "Me gusta aprender tecnologías nuevas y construir soluciones claras y útiles.",
  contacto: [
    { texto: "Teléfono: 000 000 0000", enlace: "tel:0000000000" },
    { texto: "Correo: tucorreo@ejemplo.com", enlace: "mailto:tucorreo@ejemplo.com" },
    { texto: "GitHub: github.com/tuusuario", enlace: "https://github.com/tuusuario" },
    { texto: "LinkedIn: linkedin.com/in/tuusuario", enlace: "https://linkedin.com/in/tuusuario" }
  ],
  educacion: [
    { titulo: "Ingeniería / Licenciatura en ...", detalle: "Tu universidad, años" },
    { titulo: "Cursos y certificaciones", detalle: "Plataforma o institución" }
  ],
  experiencia: [
    { titulo: "Desarrolladora de software", detalle: "Empresa o proyecto, años" }
  ],
  personal: [
    "Localidad: Tu ciudad, Estado",
    "Edad: 00 años",
    "Disponibilidad: Inmediata"
  ],
  objetivo:
    "Crecer profesionalmente en el desarrollo de software, aportando mis conocimientos " +
    "y cumpliendo con responsabilidad las tareas asignadas.",
  tecnicas: ["HTML", "CSS", "JavaScript", "Git", "SQL"],
  blandas: [
    "Trabajo en equipo",
    "Puntualidad",
    "Comunicación clara",
    "Capacidad para resolver problemas"
  ],
  proyectos: [
    { titulo: "Nombre del proyecto", detalle: "Breve descripción y tecnologías usadas" }
  ]
};

// ---------- Utilidades ----------
const $ = (id) => document.getElementById(id);

function llenarLista(id, items, crear) {
  const ul = $(id);
  ul.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    crear(li, item);
    ul.appendChild(li);
  });
}

const simple = (li, texto) => { li.textContent = texto; };
const conDetalle = (li, { titulo, detalle }) => {
  const fuerte = document.createElement("strong");
  fuerte.textContent = titulo;
  const small = document.createElement("small");
  small.textContent = detalle;
  li.append(fuerte, small);
};

// ---------- Render ----------
function render(d) {
  document.title = `Currículum | ${d.nombre}`;
  $("nombre").textContent = d.nombre;
  $("titulo").textContent = d.titulo;
  $("acerca").textContent = d.acerca;
  $("objetivo").textContent = d.objetivo;

  llenarLista("contacto", d.contacto, (li, c) => {
    const a = document.createElement("a");
    a.href = c.enlace;
    a.textContent = c.texto;
    if (c.enlace.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
    li.appendChild(a);
  });
  llenarLista("educacion", d.educacion, conDetalle);
  llenarLista("experiencia", d.experiencia, conDetalle);
  llenarLista("personal", d.personal, simple);
  llenarLista("tecnicas", d.tecnicas, simple);
  llenarLista("blandas", d.blandas, simple);
  llenarLista("proyectos", d.proyectos, conDetalle);
}

render(datos);

// Botón para guardar como PDF (usa el diálogo de impresión del navegador)
$("imprimir").addEventListener("click", () => window.print());
