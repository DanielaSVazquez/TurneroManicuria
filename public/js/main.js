//Modal

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})



    // Abrir o crear la base de datos
var request = indexedDB.open('miBaseDeDatos', 1);

// Evento que se ejecuta cuando se crea o se actualiza la base de datos
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // Crea las tablas y los índices aquí (el código que ya tienes)
};

// Evento que se ejecuta cuando la base de datos se abre correctamente
request.onsuccess = function(event) {
  var db = event.target.result;

  // Aquí puedes realizar operaciones CRUD con IndexedDB, por ejemplo:
  // Agregar un cliente
  var cliente = {
    nombre: 'laura',
    telefono: '123456789',
    email: 'laura@example.com'
  };
  var transaction = db.transaction(['clientes'], 'readwrite');
  var clientesStore = transaction.objectStore('clientes');
  var addRequest = clientesStore.add(cliente);

  addRequest.onsuccess = function() {
    console.log('Cliente agregado con éxito.');
  };

  addRequest.onerror = function() {
    console.error('Error al agregar el cliente.');
  };

  // Leer todos los clientes y mostrarlos en la tabla
  var transaction2 = db.transaction(['clientes'], 'readonly');
  var clientesStore2 = transaction2.objectStore('clientes');
  var getAllRequest = clientesStore2.getAll();

  getAllRequest.onsuccess = function() {
    var clientes = getAllRequest.result;
    console.log('Clientes almacenados en la tabla "clientes":', clientes);

    // Obtener el cuerpo de la tabla donde se agregarán los datos
    var clientesBody = document.getElementById('clientes-body');

    // Limpiar el cuerpo de la tabla antes de agregar los datos
    clientesBody.innerHTML = '';

    // Agregar cada cliente como una fila en la tabla
    clientes.forEach(function(cliente) {
      var tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${cliente.nombre}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefono}</td>
        <td>${cliente.fecha}</td>
        <td>${cliente.hora}</td>
        <td>${cliente.servicio}</td>
      `;
      clientesBody.appendChild(tr);
    });
  };

  getAllRequest.onerror = function() {
    console.error('Error al obtener los clientes.');
  };
};

// Evento que se ejecuta cuando hay un error al abrir la base de datos
request.onerror = function(event) {
  console.error('Error al abrir la base de datos:', event.target.error);
};
