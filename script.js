
//Declaración de constantes.
const MAX_INTENTOS = 10;
const MAX_COMBI_COLORES = 4;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const WHITE = "white";
const BLACK = "black";


//Declaración de variables globales.
const master = [];
const userCombi = [];
var numIntentosUsuari = 0; //numero de intentos que quiere el usuario
var intento = 1;
var aciertos = 0;
var numRealIntentos = 0
var partidasGanadas = 0;
var iteradorCeldas = 0;
var iteradorCirculos = 0;
var numFila = 0; 


function init() {
    //1. Genera el código random del master
    numIntentosUsuari = parseInt(prompt("Introduce la cantidad de intentos que quiere:"));

    
    //cada que se reinicie se limpiara el inputBox 
    const inputBox = document.getElementById("combiText");
    inputBox.value = ""

    generarCombiGanadora()

    //2. Crea todas las filas según el número de intentos.

    const filas = document.getElementById("Result")

    for (let x = 0; x < numIntentosUsuari; x++) {

        filas.innerHTML += ROW_RESULT;
    }

}


/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha
introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function Comprobar() {
    numFila++
    let circulos = document.getElementsByClassName("cercleResult");
    const inputBox = document.getElementById("combiText");
    const apartadoInfo = document.getElementById("info");



    if (numRealIntentos < numIntentosUsuari && inputBox.value != "") {
        

        for (let x = 0; x < MAX_COMBI_COLORES; x++) {


            iteradorCirculos++

            if (userCombi[x] == master[x]) {


                console.log("Match correcto")

                circulos[iteradorCirculos - 1].style.backgroundColor = BLACK
                aciertos++


            } else if (master.includes(userCombi[x])) {

                console.log("match incorrecto")
                intento++
                circulos[iteradorCirculos - 1].style.backgroundColor = WHITE//pongo el color

                //reestablesco a 0 para que en la siguiente ronda sea 0 también
                aciertos = 0

            } else {
                intento++
                //reestablesco a 0 para que en la siguiente ronda sea 0 también
                aciertos = 0
                circulos[iteradorCirculos - 1].style.backgroundColor = GREY
            }

        }

        if (intento > 1) {//quiere decir que el usuario ha fallado con algún color

            numRealIntentos++
            apartadoInfo.textContent = `Intento número ${numRealIntentos}`;
        }

        //pongo la combinación ganadora
        if (aciertos == MAX_COMBI_COLORES) {

            partidasGanadas++

            apartadoInfo.textContent = `Has acertado, enhorabuena. Partidas ganadas:${partidasGanadas}`;

            mostrarCombiGanadora()

            //funcion para mostrar conffeti
            confetti({
                particleCount: 500,
                spread: 70,
                origin: { y: 0.6 },
            });

            
            setTimeout(continuarJugando, 3000)//después de 3 segundos se ejcutara está función

        }


        //después de comprobar reinicio, limpio el inputBox 
        inputBox.value = ""
        userCombi.length = 0

        if (numFila == numIntentosUsuari) { //si se ha agotado todas las filas pero aun le quedan intentos al usuario genero otra
            generarMasFilas(numIntentosUsuari - numRealIntentos);
        }

    } else if (numRealIntentos === numIntentosUsuari) {
        //despues de agotar los intentos muestro este mensaje en el apartado de info y muestro la combinación ganadora
        apartadoInfo.textContent = "Ya no te quedan más intentos";
        mostrarCombiGanadora()

    }

}



/** Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores permitidos en la combinación. */
function añadeColor(color) {


    const inputBox = document.getElementById("combiText")
    const celdaColorUsuari = document.getElementsByClassName('celUserCombi');
    const apartadoInfo = document.getElementById("info");


    if (numRealIntentos < numIntentosUsuari) {


        if (userCombi.length < MAX_COMBI_COLORES) {

            if (userCombi.includes(color)) {

                alert("No se puede repetir color")

            } else {

                iteradorCeldas++

                
                userCombi.push(color)//agrego los colores que elige el usuario al array
                inputBox.value = userCombi.join('-'); // al attribute value dentro de la etiqueta input agrego el contenido del array
                /*otra forma de poner valor al attributo value 
                inputBOx.setAttribute('value',userCombi);
                */

                
                //cojo la variable iteradorCeldas para que vaya bajando a todas las filas
                celdaColorUsuari[iteradorCeldas - 1].style.backgroundColor = color;//pongo colores a las celdas 
            }
        }
    } else {

        apartadoInfo.textContent = "Ya no te quedan más intentos";
        mostrarCombiGanadora()

    }
}

//funcion que genera la combinación ganadora
function generarCombiGanadora() {

    let colorPresent = false

    for (let i = 0; i < MAX_COMBI_COLORES; i++) {

        //si el indexOf devuelve otro número que no sea -1 colorPresnte=true y se repite de nuevo
        do {

            let colorIndice = Math.floor(Math.random() * COLORS.length);

            if (master.indexOf(COLORS[colorIndice]) == -1) { //con el indexOf busco el color que me da COLOR[colorIndice] en el master y sino esta devuelve -1

                colorPresent = false
                master.push(COLORS[colorIndice])
                console.log(master[i])

            } else {
                colorPresent = true
            }

        } while (colorPresent);
    }
}


//función que muestra en el master la combinación ganadora
function mostrarCombiGanadora() {

    let celCombinacioGanadora = document.getElementsByClassName("cel");

    for (let pos = 0; pos < MAX_COMBI_COLORES; pos++) {

        celCombinacioGanadora[pos].style.backgroundColor = master[pos]
    }

}


function continuarJugando() {
    console.log("hola")
    const apartadoInfo = document.getElementById("info");

    if (numRealIntentos < numIntentosUsuari) {
        aciertos = 0

        let seguirJugando = confirm("¿Quieres seguir jugando?");
        if (seguirJugando) {

            master.length = 0
            generarCombiGanadora();

            let celCombinacioGanadora = document.getElementsByClassName("cel");

            //reestablesco a gris el color de las celdas del master
            for (let pos = 0; pos < MAX_COMBI_COLORES; pos++) {

                celCombinacioGanadora[pos].style.backgroundColor = GREY;
            }
            apartadoInfo.textContent = `Intento número ${numRealIntentos}`;

            alert("Se ha generado una nueva combinación");

        } else {
            alert("El juego ha terminado");
        }
    }

}

//funcion para generar más fila dpendiendp cuantos intentos le que al usuario
function generarMasFilas(intentosRestantes) {

    const filas = document.getElementById("Result")

    for (let x = 0; x < intentosRestantes; x++) {

        filas.innerHTML += ROW_RESULT;
    }

}


/** Template con el código HTML que corresponde a cada fila de juego/intento. */
const ROW_RESULT = `<div class="rowResult w100 flex wrap">
    <div class="rowUserCombi w75 flex wrap">
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
    </div>
    <div class="rowCercleResult w25 flex wrap center">
       <div class="w40 h40">
            <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
    <div>
</div>`;