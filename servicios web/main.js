const cursos = document.getElementById('cursos');

//Creamos el Array de Objetos para los Servicios
const servicios = [
  { id: 1, nombre: 'Desarrollo Web', precio: 580 },
  { id: 2, nombre: 'Diseño Web', precio: 520 },
  { id: 3, nombre: 'Marketing Digital', precio: 490 },
];

let boton = '';
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener(
  'DOMContentLoaded',
  () => {
    servicios.forEach((servicio) => {
      mostrarServicios(servicio);
    });
  },
  false
);

function mostrarServicios(servicio) {
  const serviciosDivContainer = document.createElement('DIV');
  serviciosDivContainer.innerHTML = `
  <p>Id: ${servicio.id}</p>
  <h3>Nombre: ${servicio.nombre}</h3>
  <b>$${servicio.precio}</b>
  <button type="button" data-servicioId="${servicio.id}" id="boton${servicio.id}">Agregar al Carrito</button>
  `;
  serviciosDivContainer.classList.add('gris');

  cursos.appendChild(serviciosDivContainer);

  boton = document.getElementById(`boton${servicio.id}`);
  boton.addEventListener('click', agregar);
}

function agregar(e) {
  const servicioSeleccionado = servicios.filter(
    (servicio) =>
      servicio.id === parseInt(e.target.attributes['data-servicioId'].value)
  )[0];
  //console.(servicioSeleccionado);
  //Verificar si el Servicio ya esta en el carrito
  const servicioEnCarrito = carrito.find(
    (item) => item.id === servicioSeleccionado.id
  );

  if (servicioEnCarrito) {
    //Si ya esta en el carrito, incrementa la cantidad en 1
    servicioEnCarrito.cantidad++;
  } else {
    //Si no está en el Carrito, lo agrega con una cantidad inicial de 1
    servicioSeleccionado.cantidad = 1;
    carrito.push(servicioSeleccionado);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));

  mostrarCarrito(true, carrito);
  calcularTotal();
}

//funcion para mostrar el carrito con los servicios seleccionados
function mostrarCarrito(refresh = false, carritoActualizado) {
  const carritoContainerDiv = document.querySelector('.carrito-container');
  const carritoList = document.querySelector('.carrito-list');

  if (refresh) {
    console.log(carritoList.lastChild);
    let elementAEliminar = carritoList.lastChild;
    while (elementAEliminar) {
      carritoList.removeChild(elementAEliminar);
      elementAEliminar = carritoList.lastChild;
    }
    carritoContainerDiv.classList.remove('carrito-container-active');
  }

  carritoActualizado.forEach((servicio) => {
    const carritoItemList = document.createElement('LI');
    carritoItemList.innerHTML += `
    <p>Nombre:${servicio.nombre}</p>
    <p>Precio:$${servicio.precio * servicio.cantidad}</p>
    <p>Cantidad: ${servicio.cantidad}</p>
    <button type="button" class="eliminar-btn" data-servicioId="${
      servicio.id
    }" id="btn-eliminar${servicio.id}">Eliminar</button>
    
    `;

    carritoContainerDiv.classList.add('carrito-container-active');
    carritoList.appendChild(carritoItemList);
    carritoContainerDiv.appendChild(carritoList);
    document.body.appendChild(carritoContainerDiv);
    console.log(carrito.length);

    if (carrito.length === 0) {
      carritoContainerDiv.classList.remove('carrito-container-active');
      document.body.removeChild(carritoContainerDiv);
      return;
    }
    carritoItemList.addEventListener('click', eliminarDelCarrito); //Aca se crea el evento click cada vez que se crea el boton eliminar, se le pasa el evento por parametro para poder tener en tiempo real a lo que se le dio click
  });
}

//Funcion Eliminar
const eliminarDelCarrito = (e) => {
  if (e.target.classList.contains('eliminar-btn')) {
    const carritoActualizado = carrito.filter(
      (item) =>
        item.id !== parseInt(e.target.attributes['data-servicioId'].value)
    );
    carrito = [...carritoActualizado];

    localStorage.setItem('carrito', JSON.stringify([...carrito]));
  }

  mostrarCarrito(true, carrito);
  calcularTotal();
};

//Funcion Calcular Total
function calcularTotal() {
  precioTotal.innerHTML = '';
  let total = 0;
  carrito.forEach((servicio) => {
    total += servicio.precio * servicio.cantidad;
  });
  let totalElement = document.createElement('div');
  totalElement.innerHTML = ` <h4> Total: $${total}</h4>`;

  precioTotal.appendChild(totalElement);
}

mostrarCarrito(true, carrito);
