var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("nombre") || !params.has('sala')){
  window.location = "index.html";
  throw new Error("El nombre es requerido");
}

var usuario = {
  nombre: params.get("nombre"),
  sala: params.get('sala')
};

socket.on("connect", function () {
  console.log("Conectado al servidor");

  socket.emit("entrarChat", usuario, (resp) => {
    console.log("usuarios conectados", resp);
  });
});




// escuchar
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});


// Enviar información
// socket.emit("crearMensaje",
//   {
//     nombre: "Fernando",
//     mensaje: "Hola Mundo",
//   },
//   (resp) => {
//     console.log("respuesta server: ", resp);
//   }
// );

// Escuchar información
socket.on("crearMensaje", function (mensaje) {
  console.log("Servidor:", mensaje);
});


//Esuchar cuando alguien entra o sale
socket.on("listaPersonas", function (personas) {
    console.log(personas);
});

//Mesajes Privados
socket.on('mensajePrivado', function(mensaje){
    console.log(mensaje)
})

