// script.ts
function agregarNuevaCasillaVotar() {
    var divCasillasVotar1 = document.getElementById("divCasillasVotar1");
    var divCasillasVotar2 = document.getElementById("divCasillasVotar2");
    var numDeCasillas = document.getElementById("inputnumCasillas");

    divCasillasVotar1.innerHTML = "";
    divCasillasVotar2.innerHTML = "";


    for (let i = 0; i < numDeCasillas.value; i++) {
        // Crea un nuevo elemento input
        var nuevaCasillaVotar = document.createElement("input");
        nuevaCasillaVotar.type = "number";
        nuevaCasillaVotar.id = "inputCasilla1";
        nuevaCasillaVotar.className = "inputCasilla";
        nuevaCasillaVotar.onchange = sumarCasillas;
        nuevaCasillaVotar.addEventListener("input", sumarCasillas);
    
        // Agrega el nuevo input al final del contenido actual de miDiv
        divCasillasVotar1.appendChild(nuevaCasillaVotar);
    }

    for (let i = 0; i < numDeCasillas.value; i++) {
        // Crea un nuevo elemento input
        var nuevaCasillaVotar = document.createElement("input");
        nuevaCasillaVotar.type = "number";
        nuevaCasillaVotar.id = "inputCasilla2";
        nuevaCasillaVotar.className = "inputCasilla";
        nuevaCasillaVotar.onchange = sumarCasillas;
        nuevaCasillaVotar.addEventListener("input", sumarCasillas);
    
        // Agrega el nuevo input al final del contenido actual de miDiv
        divCasillasVotar2.appendChild(nuevaCasillaVotar);
    }
}

function cambiarNombres(){
    var name1 = document.getElementById("inputNombres1");
    var name2 = document.getElementById("inputNombres2");
    var labelMC1 = document.getElementById("labelMC1");
    var labelMC2 = document.getElementById("labelMC2");

    labelMC1.textContent = name1.value;
    labelMC2.textContent = name2.value;
}

function sumarCasillas(){
    // Obtener todos los elementos de entrada (input) con el id "inputCasilla"
    var elementos1 = document.querySelectorAll('input[id="inputCasilla1"]');
    var elementos2 = document.querySelectorAll('input[id="inputCasilla2"]');
    var ResultadosCas1 = document.getElementById("ResultadoCasilla1");
    var ResultadosCas2 = document.getElementById("ResultadoCasilla2");

    // Variable para almacenar la suma de los valores
    var suma1 = 0;

    // Iterar sobre los elementos y sumar sus valores
    elementos1.forEach(function(elemento) {
        // Asegurarse de que el elemento sea de tipo input
        if (elemento.tagName.toLowerCase() === 'input') {
            // Obtener el valor del input y sumarlo a la variable suma
            suma1 += parseFloat(elemento.value) || 0; // ParseFloat convierte el valor a número, si es posible
        }
    });
    ResultadosCas1.value = suma1;

    // Variable para almacenar la suma de los valores
    var suma2 = 0;

    // Iterar sobre los elementos y sumar sus valores
    elementos2.forEach(function(elemento) {
        // Asegurarse de que el elemento sea de tipo input
        if (elemento.tagName.toLowerCase() === 'input') {
            // Obtener el valor del input y sumarlo a la variable suma
            suma2 += parseFloat(elemento.value) || 0; // ParseFloat convierte el valor a número, si es posible
        }
    });
    ResultadosCas2.value = suma2;
}

function darResultados(){
    var ResultadosCas1 = parseFloat(document.getElementById("ResultadoCasilla1").value);
    var ResultadosCas2 = parseFloat(document.getElementById("ResultadoCasilla2").value);
    var nombre1 = document.getElementById("labelMC1").textContent;
    var nombre2 = document.getElementById("labelMC2").textContent;
    var resultado = document.getElementById("resultados");

    if (ResultadosCas1 == ResultadosCas2){
        resultado.textContent = "Empate";
    } else {
        if (ResultadosCas1 > ResultadosCas2){
            resultado.textContent = "Gana " + nombre1 + " con diferencia de " + (ResultadosCas1 - ResultadosCas2);
        } else {
            resultado.textContent = "Gana " + nombre2 + " con diferencia de " + (ResultadosCas2 - ResultadosCas1);
        }
    }
}



function SubirVotacion() {
    var ResultadosCas1 = document.getElementById("ResultadoCasilla1");
    var ResultadosCas2 = document.getElementById("ResultadoCasilla2");
    var nombre1 = document.getElementById("labelMC1");
    var nombre2 = document.getElementById("labelMC2");
    var SalaResultados = document.getElementById("salaresultados");

    if(SalaResultados.value == ""){
        alert("Debes seleccionar una sala");
        return;
    }
    // Obtén una referencia al nodo en tu base de datos
    var ref = firebase.database().ref(SalaResultados.value);

    // Obtiene los datos existentes
    ref.once('value', function(snapshot) {
        var datosExistente = snapshot.val();
    
        // Verifica si hay datos existentes
        if (datosExistente) {
            // Suma las puntuaciones existentes con las nuevas
            var nuevaPuntuacion1 = parseFloat(datosExistente.puntuaciones[0]) + parseFloat(ResultadosCas1.value);
            var nuevaPuntuacion2 = parseFloat(datosExistente.puntuaciones[1]) + parseFloat(ResultadosCas2.value);
            
            // Verifica que las nuevas puntuaciones no sean NaN (Not a Number)
            if (!isNaN(nuevaPuntuacion1) && !isNaN(nuevaPuntuacion2)) {
                // Actualiza los datos con las nuevas puntuaciones
                ref.update({
                    puntuaciones: [nuevaPuntuacion1, nuevaPuntuacion2]
                });
            } else {
                // Alerta si alguna de las nuevas puntuaciones es NaN
                alert("Debe ingresar puntuaciones válidas antes de continuar.");
            }
        } else {
            // Si no hay datos existentes, crea los nuevos datos
            var datos = {
                nombres: [nombre1.textContent, nombre2.textContent],
                puntuaciones: [parseFloat(ResultadosCas1.value), parseFloat(ResultadosCas2.value)],
                fechaCreacion: new Date().getTime()
            };
            
            // Verifica que las puntuaciones no sean NaN (Not a Number)
            if (!isNaN(datos.puntuaciones[0]) && !isNaN(datos.puntuaciones[1])) {
                ref.set(datos);
            } else {
                // Alerta si alguna de las puntuaciones es NaN
                alert("Debe ingresar puntuaciones válidas antes de continuar.");
            }
        }
    });
    
}

function obtenerYMostrarPuntuaciones() {
    var SalaResultados = document.getElementById("salaresultados");
    var result1 = document.getElementById("ResOnline1");
    var result2 = document.getElementById("ResOnline2");
    var result3 = document.getElementById("ResOnline3");

    if(SalaResultados.value == ""){
        alert("Debes seleccionar una sala");
        return;
    }

    // Obtén una referencia al nodo en tu base de datos
    var ref = firebase.database().ref(SalaResultados.value);

    // Obtiene los datos una vez
    ref.on('value', function(snapshot) {
        var datos = snapshot.val();
        if (datos) {
            var nombre1 = datos.nombres[0];
            var nombre2 = datos.nombres[1];
            var puntuacion1 = datos.puntuaciones[0];
            var puntuacion2 = datos.puntuaciones[1];

            result1.textContent = nombre1 + ": " + puntuacion1;
            result2.textContent = nombre2 + ": " + puntuacion2;

            if (puntuacion1 < puntuacion2){
                result3.textContent = "Gana " + nombre2 + " con diferencia de " + (puntuacion2 - puntuacion1);
            }
            if (puntuacion1 > puntuacion2){
                result3.textContent = "Gana " + nombre1 + " con diferencia de " + (puntuacion1 - puntuacion2);
            }
            if (puntuacion1 == puntuacion2){
                result3.textContent = "Empate";
            }

        } else {
            console.log("No hay datos disponibles para esta sala.");
        }
    });
}

function borrarBaseDeDatos1Dia() {
    console.log("ejecutada");
    var SalaResultados = document.getElementById("salaresultados");
    const unDiaEnMilisegundos = 24 * 60 * 60 * 1000; // 1 día en milisegundos
    const fechaActual = new Date().getTime();
    
    // Obtener una referencia a la base de datos de Firebase
    var salaRef = firebase.database().ref();

    salaRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            console.log("Nombre de la sala:", childSnapshot.key);
            const sala = childSnapshot.val();
            const fechaCreacionSala = sala.fechaCreacion; // Supongamos que la fecha de creación se almacena en "fechaCreacion" dentro de cada subnodo
            console.log("Fecha de creación de la sala hace ", (fechaActual-fechaCreacionSala)/unDiaEnMilisegundos, " días");
            if (fechaActual - fechaCreacionSala >= unDiaEnMilisegundos) {
                // Si ha pasado más de 1 día, borra la sala
                childSnapshot.ref.remove()
                    .then(() => {
                        console.log("Sala", childSnapshot.key, "eliminada correctamente.");
                    })
                    .catch((error) => {
                        console.error("Error al eliminar la sala:", error);
                    });
            }
        });
    });
}

function obtenerNombresNodos() {
    var ref = firebase.database().ref();
    var nombres = [];

    ref.on('value', function(snapshot){
            nombres = [];
            snapshot.forEach(childSnapshot => {
                nombres.push(childSnapshot.key);
            });
            // Llama al callback con el array de nombres
            document.getElementById("salasDisponiblesAlIniciar").textContent = "Estas son las salas disponibles: " + nombres.join(", ");
        });
}
function BorrarBaseDatos(){
    var database = firebase.database();
    database.ref().remove();
}
