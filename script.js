// Misterios por día
const misteriosPorDia = {
  0: 'Gloriosos',   // Domingo
  1: 'Gozosos',     // Lunes
  2: 'Dolorosos',   // Martes
  3: 'Gloriosos',   // Miércoles
  4: 'Luminosos',   // Jueves
  5: 'Dolorosos',   // Viernes
  6: 'Gozosos'      // Sábado
};

// Misterios y títulos
const misterios = {
  Gozosos: [
    "La Anunciación del Ángel a María",
    "La Visitación de María a su prima Isabel",
    "El Nacimiento de Jesús",
    "La Presentación de Jesús en el templo",
    "El Niño perdido y hallado en el templo"
  ],
  Dolorosos: [
    "La oración de Jesús en el huerto",
    "La flagelación de nuestro Señor Jesucristo",
    "La coronación de espinas",
    "Jesús con la cruz a cuestas",
    "La crucifixión y muerte de nuestro Señor"
  ],
  Gloriosos: [
    "La Resurrección del Señor",
    "La Ascensión del Señor al cielo",
    "La venida del Espíritu Santo",
    "La Asunción de la Virgen María",
    "La Coronación de María como Reina"
  ],
  Luminosos: [
    "El Bautismo de Jesús en el Jordán",
    "La autorrevelación en las bodas de Caná",
    "El anuncio del Reino de Dios",
    "La Transfiguración",
    "La Institución de la Eucaristía"
  ]
};

// Oración común
const oraciones = `
Padre Nuestro...

Ave María (x10)...

Gloria al Padre, al Hijo y al Espíritu Santo,
como era en el principio, ahora y siempre,
por los siglos de los siglos. Amén.

María madre de gracia y madre de misericordia,
en la vida y en la muerte ampáranos gran Señora.

Sagrado Corazón de Jesús, en vos confío.
`;

// Obtener el día actual
const hoy = new Date().getDay();
const tipo = misteriosPorDia[hoy];
const lista = misterios[tipo];

// Mostrar el título del día
document.getElementById('titulo-dia').textContent = `Hoy se rezan los Misterios ${tipo}`;

// Contenedor de los posts
const contenedor = document.getElementById('contenedor-posts');

// Generar los posts
lista.forEach((titulo, index) => {
  const post = document.createElement('div');
  post.className = 'post';
  post.innerHTML = `
    <div class="perfil">
      <img src="images/guadalupe.png" alt="Virgen de Guadalupe">
      <span class="misterio">${ordinal(index + 1)} Misterio ${tipo}</span>
    </div>
    <div class="contenido">
      <p class="titulo">${titulo}</p>
      <p class="oracion">${oraciones}</p>
    </div>
  `;
  contenedor.appendChild(post);
});

// Convertir número a ordinal
function ordinal(n) {
  const nombres = ["Primer", "Segundo", "Tercer", "Cuarto", "Quinto"];
  return nombres[n - 1] || `${n}°`;
}
