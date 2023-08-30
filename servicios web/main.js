
//Creamos el Array de Objetos para los Servicios
const servicios = [
  { id: 1, nombre: 'Desarrollo Web', precio: 580 },
  { id: 2, nombre: 'Diseño Web', precio: 520 },
  { id: 3, nombre: 'Marketing Digital', precio: 490 },
];

//guardamos el arreglo en el stoage y le damos formato JSON
localStorage.setItem('servicios', JSON.stringify(servicios));
//obtenemos el arreglo de servicios del Storage
let carrito= JSON.parse(localStorage.getItem("servicios")) || [];

//guardamos el carrito en el Storage
localStorage.setItem("carrito", JSON.stringify("carrito"));
//obtenemos el carrito del Storage

//funcion para agregar servicios al carrito
const agregar = (id) => {
  let servicio = servicios.find((servicio) => servicio.id === id);
  carrito.push(servicio);
  localStorage.setItem('carrito', JSON.stringify('carrito'));
  console.log("Servicio agregado al Carrito:", servicio);
}

//funcion para eliminar servicios del carrito
const eliminarDelCarrito = (id) =>{
  let index = carrito.findIndex((servicio) => servicio.id === id);
  if (index !== -1){
    carrito.splice(index, 1);
    localStorage.setItem("carrito",JSON.stringify("carrito"));
  }
}

//recorremos los servicios
servicios.forEach((servicio) => {
  let div = document.createElement('div');
  div.innerHTML = `
  <p>Id: ${servicio.id}</p>
  <h3>Nombre: ${servicio.nombre}</h3>
  <b>$${servicio.precio}</b>
  <button id="boton${servicio.id}">Agregar al Carrito</button>
  `;
  div.className = 'gris';

  //agregamos el docuemeto al body en un div
  document.body.append(div);

  //damos un evento  click al boton, pidiendole que agregue el id del servicio
  let boton = document.getElementById(`boton${servicio.id}`);
  boton.addEventListener('click', () => agregar(servicio.id));
  
  
/*
  //EL BOTON ELIMINAR NO CUMPLE LA FUNCION :O
  let botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'Eliminar del Carrito';
  botonEliminar.addEventListener('click', () => eliminarDelCarrito(servicio.id));

  div.appendChild(botonEliminar);
  
});
*/
/*
 //funcion para mostrar el carrito con los servicios seleccionados
 const mostrarCarrito =() => {
  let carritoContainer = document.createElement("div");
  carritoContainer.innerHTML = `<h2> Carrito de Compras</h2>`;

  let total = 0;

  carrito.forEach((servicio) =>{
    let servicioInfo = document.createElement('div');
    servicioInfo.innerHTML = `
    <p>Nombre:${servicio.nombre}</p>
    <p>Precio:$${servicio.precio}</p>
    `;

    carritoContainer.appendChild(servicioInfo);

    total += servicio.precio;

  });

  let totalElement = document.createElement("div");
  totalElement.innerHTML = ` <h3> Total: $${total}</h3>`;

  carritoContainer.appendChild(totalElement);

  document.body.appendChild(carritoContainer);


 };

 
 mostrarCarrito();

*/