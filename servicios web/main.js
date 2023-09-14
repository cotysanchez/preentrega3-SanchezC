const cursos = document.getElementById('cursos');

//Creamos el Array de Objetos para los Servicios
const servicios = [
  {
    id: 1,
    nombre: 'Desarrollo Web',
    precio: 580,
    img: './imagenes/Consultoria-1.jpg',
    descripcion:
      'Curso de Desarrollo Web Aprende a crear tu propio sitio web desde Cero',
  },
  {
    id: 2,
    nombre: 'Diseño Web',
    precio: 520,
    img: './imagenes/academia-digital1.jpg',
    descripcion: 'Curso de Diseño Web con Wordpress y herramientas Drag & Drop',
  },
  {
    id: 3,
    nombre: 'Marketing Digital',
    precio: 490,
    img: './imagenes/talleres-online1.jpg',
    descripcion:
      'Curso de Marketing Digital Aprende a posicionar tu negocio a nivel global',
  },
  
];

let boton = '';
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener(
  'DOMContentLoaded',() => {
    // Llama a la función para cargar los datos cuando el DOM se ha cargado
    cargarDatos();
    // Llama a la función para mostrar el contenido del carrito
    mostrarCarrito(carrito);
  });

// Creamos función asincrónica para cargar los datos desde data.json
async function cargarDatos() {
  try {
    // Realizamos una solicitud GET al archivo data.json
    const response = await fetch('./servicios web/data.json');
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON.');
    }
    // Convertimos la respuesta en formato JSON
    const data = await response.json();

    // Iteramos sobre los datos y mostrar los servicios
    data.servicios.forEach((servicio) => {
      mostrarServicios(servicio);
    });
  } catch (error) {
    console.error('Se produjo un error:', error);
  }
}

//creamos la funcion para mostrar los servicios
function mostrarServicios(servicio) {
  const serviciosDivContainer = document.createElement('DIV');
  serviciosDivContainer.innerHTML = `
  <div class="col">
    <div class="card">
       <img src="${servicio.img}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${servicio.nombre}</h5>
        <p class="card-text">${servicio.descripcion} </p>
        <p>Id:${servicio.id}</p>
        <b> U$D ${servicio.precio}</b>
        <button type="button" data-servicioId="${servicio.id}" id="boton${servicio.id}">Agregar al Carrito</button> 
      </div>
    </div>
  `;

  cursos.appendChild(serviciosDivContainer); // Agrega el servicio a la página

  boton = document.getElementById(`boton${servicio.id}`);
  boton.addEventListener('click', agregar); // Agrega un evento de clic para agregar el servicio al carrito
}

//Funcion agregar Servicios al Carrito
function agregar(e) {
  const servicioSeleccionado = servicios.find(
    (servicio) =>
      servicio.id === parseInt(e.target.attributes['data-servicioId'].value)
  );

  if (!servicioSeleccionado) {
    return;
  }

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

  localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualiza el carrito en el almacenamiento local

  mostrarCarrito(carrito); // Actualiza la visualización del carrito en la página
}

//funcion para mostrar el carrito con los servicios seleccionados
function mostrarCarrito(carritoActualizado) {
  const carritoContainerDiv = document.querySelector('.carrito-container');
  const carritoList = document.querySelector('.carrito-list');

  carritoList.innerHTML = ''; // Limpia el contenido actual del carrito en la página

  carritoActualizado.forEach((servicio) => {
    const carritoItemList = document.createElement('LI');
    carritoItemList.innerHTML += `
    <p>Nombre: ${servicio.nombre}</p>
    <p>Precio: U$D ${servicio.precio * servicio.cantidad}</p>
    <p>Cantidad: ${servicio.cantidad}</p>
    <button type="button" class="eliminar-btn" data-servicioId="${
      servicio.id
    }" id="btn-eliminar${servicio.id}">Eliminar</button>
    
    `;
    carritoItemList.classList.add('li-carrito'); // Agrega una clase CSS para estilos

    carritoList.appendChild(carritoItemList); // Agrega el servicio al carrito en la página
    carritoContainerDiv.appendChild(carritoList);

    //Se crea el evento click cada vez que se crea el boton eliminar, se le pasa el evento por parametro para poder tener en tiempo real a lo que se le dio click
    carritoItemList.addEventListener('click', eliminarDelCarrito);
  });

  calcularTotal(carritoActualizado); // Calcula el total del carrito
}


//Funcion Eliminar Servicio del Carrito
const eliminarDelCarrito = (e) => {
  if (e.target.classList.contains('eliminar-btn')) {
    const carritoActualizado = carrito.filter(
      (item) =>
        item.id !== parseInt(e.target.attributes['data-servicioId'].value)
    );
    carrito = [...carritoActualizado];

    localStorage.setItem('carrito', JSON.stringify([...carrito])); // Actualiza el carrito en el almacenamiento local

    mostrarCarrito(carrito); // Actualiza la visualización del carrito en la página
  }

  calcularTotal(carrito); // Calcula el total del carrito
};


//Funcion Calcular Total
function calcularTotal(carrito) {
	precioTotal.innerHTML = "";
	let total = 0;
	carrito.forEach((servicio) => {
		total += servicio.precio * servicio.cantidad;
	});
	//Carrito Vacío
	let totalElement = document.createElement("div");
	if (total !== 0) {
		// Agrega el botón "Comprar" al final del Carrito de Compras
		const comprarBtn = document.createElement("button");
		comprarBtn.textContent = "Comprar";
		comprarBtn.className = "btn btn-primary";
		precioTotal.appendChild(comprarBtn);
		comprarBtn.addEventListener("click", () => {
			// Mostrar la ventana modal de éxito
			const exitoModal = new bootstrap.Modal(document.getElementById("exitoModal"));
			exitoModal.show();
		});
	}
	totalElement.innerHTML = total === 0 ? `<h4 class="text-center">No hay productos en el carrito</h4>` : `<h4> Total: U$D ${total}</h4>`;

	precioTotal.appendChild(totalElement);
}



