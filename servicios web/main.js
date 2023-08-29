//Creamos el Array de Objetos para los Servicios
const servicios = [
  { id: 1, nombre: 'Desarrollo Web', precio: 580 },
  { id: 2, nombre: 'Diseño Web', precio: 520 },
  { id: 3, nombre: 'Marketing Digital', precio: 490 },
];

//guardamos el arreglo en el stoage y le damos formato JSON
localStorage.setItem('servicios', JSON.stringify(servicios));

/////

const agregar = (id) => {
let servicio = servicios.find((servicio) => servicio.id === id);
 console.log(servicio); 
 }

servicios.forEach((servicio) => {
  let div = document.createElement('div');
  div.innerHTML = `
  <p>Id: ${servicio.id}</p>
  <h3>Nombre: ${servicio.nombre}</h3>
  <b>$${servicio.precio}</b>
  <button id="boton${servicio.id}">Agregar al Carrito</button>
  `;
  div.className = 'gris';

  document.body.append(div);

  let boton = document.getElementById(`boton${servicio.id}`);
  boton.addEventListener("click", () => agregar(servicio.id));

 });

