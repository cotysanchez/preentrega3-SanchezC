const cursos = document.getElementById('cursos');
//Creamos el Array de Objetos para los Servicios
const servicios = [
  { id: 1, nombre: 'Desarrollo Web', precio: 580 },
  { id: 2, nombre: 'Diseño Web', precio: 520 },
  { id: 3, nombre: 'Marketing Digital', precio: 490 },
];

//guardamos el arreglo en el stoage y le damos formato JSON
localStorage.setItem('servicios', JSON.stringify(servicios));
//obtenemos el arreglo de servicios del Storage
let carrito = [];

//guardamos el carrito en el Storage
localStorage.setItem('carrito', JSON.stringify('carrito'));
//obtenemos el carrito del Storage

//funcion para agregar servicios al carrito
const agregar = (id) => {
  let servicio = servicios.find((servicio) => servicio.id === id);
  let seleccion = {
    id: servicio.id,
    nombre: servicio.nombre,
    precio: servicio.precio,
  };
  carrito.push(seleccion);
  console.log(seleccion);
  localStorage.setItem('carrito', carrito);
  // console.log("Servicio agregado al Carrito:", servicio);
  mostrarCarrito();
  calcularTotal();
};

//funcion para eliminar servicios del carrito
const eliminarDelCarrito = (id) => {
  let index = carrito.findIndex((servicio) => servicio.id === id);
  if (index !== -1) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify('carrito'));
  }
};

//recorremos los servicios
servicios.forEach((servicio) => {
  let div = document.createElement('div');
  div.innerHTML = `
  <p>Id: ${servicio.id}</p>
  <h3>Nombre: ${servicio.nombre}</h3>
  <b>$${servicio.precio}</b>
  <button id="boton${servicio.id}">Agregar al Carrito</button>
  `;

  let botonEliminar = document.createElement('button');
  botonEliminar.addEventListener('click', () =>
    eliminarDelCarrito(servicio.id)
  );
  console.log(eliminarDelCarrito);

  div.className = 'gris';

  //agregamos el docuemeto al body en un div
  cursos.append(div);

  //damos un evento  click al boton, pidiendole que agregue el id del servicio
  let boton = document.getElementById(`boton${servicio.id}`);
  boton.addEventListener('click', () => agregar(servicio.id));
});

const contenedorCursos = document.getElementById('contenedorCursos');
const precioTotal = document.getElementById('precioTotal');

//funcion para mostrar el carrito con los servicios seleccionados
function mostrarCarrito() {
  contenedorCursos.innerHTML = '';

  let servicioInfo = document.createElement('div');
  let carritoContainer = document.createElement('div');
  carritoContainer.innerHTML = '';
  servicioInfo.innerHTML = '';
  carritoContainer.innerHTML = `<h2> Carrito de Compras</h2>`;

  carrito.forEach((servicio) => {
    servicioInfo.innerHTML += `
    <p>Nombre:${servicio.nombre}</p>
    <p>Precio:$${servicio.precio}</p>
    <button id="id${servicio.id}">Eliminar</button>
    `;

    carritoContainer.appendChild(servicioInfo);
    contenedorCursos.appendChild(carritoContainer);
  });
}

function calcularTotal() {
  precioTotal.innerHTML = '';
  let total = 0;
  carrito.forEach((prod) => {
    total += prod.precio;
  });
  let totalElement = document.createElement('div');
  totalElement.innerHTML = ` <h3> Total: $${total}</h3>`;

  precioTotal.appendChild(totalElement);
}

// mostrarCarrito();
// calcularTotal()
