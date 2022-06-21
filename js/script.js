// Clicker game

// configuracion
let game = { // configuracion del juego
    score: 0,
    clickPower: 1,
    scorePorseg: 0
}
let mejoras = [ // configuracion de las mejoras
    {
        name: "Pizza",
        price: 10,
        baseprice: 10,
        description: "+1 al score por click",
        cantidad: 0,
        img: "assets/pizza.webp",
        mejora: 1,
        mejoraPorSeg: 0
    },
    {
        name: "Pancho",
        price: 100,
        baseprice: 100,
        description: "+5 al score por click",
        cantidad: 0,
        img: "assets/pancho.webp",
        mejora: 5,
        mejoraPorSeg: 1
    },
    {
        name: "hamburguesa",
        price: 500,
        baseprice: 500,
        description: "+10 al score por click",
        cantidad: 0,
        img: "assets/hamburguesa.webp",
        mejora: 20,
        mejoraPorSeg: 5
    },
    {
        name: "Galleta",
        price: 2000,
        baseprice: 2000,
        description: "+50 al score por click",
        cantidad: 0,
        img: "assets/galleta.jpg",
        mejora: 50,
        mejoraPorSeg: 20
    },
    {
        name: "Galleta",
        price: 1000000,
        baseprice: 1000000,
        description: "es imposible",
        cantidad: 0,
        img: "assets/galleta.jpg",
        mejora: 5000,
        mejoraPorSeg: 5000
    }
]

// funciones del juego
function comprar(index) {  // maneja el sistema de comprar mejoras
    if (game.score >= mejoras[index].price) {
        game.score -= mejoras[index].price;
        mejoras[index].cantidad++;
        mejoras[index].price = Math.round(mejoras[index].price * 1.15);
        game.clickPower += mejoras[index].mejora;
        game.scorePorseg += mejoras[index].mejoraPorSeg;
        display.actualizarcompras(index);
        display.actualizar();
    }
}

let display = {  // actualiza el display del juego
    actualizar: function() {
        document.getElementById("score").innerHTML = game.score;
        document.getElementById("clickPower").innerHTML = "+" + game.clickPower;
        document.getElementById("scorePorseg").innerHTML = "+" + game.scorePorseg;
},
    actualizarcompras(index) {
    document.getElementById("mejora" + index).innerHTML = "<img src=" + mejoras[index].img + "><div><span class = 'titulo'>" + mejoras[index].name + "</span><span>vale " + mejoras[index].price + "</span><span>" + mejoras[index].description + "</span><span>tienes " + mejoras[index].cantidad + "</span></div>";
},
    actualizartienda()  {
        for (let i = 0; i < mejoras.length; i++) {
            document.getElementById("mejora" + i).innerHTML = "<img src=" + mejoras[i].img + "><div><span class = 'titulo'>" + mejoras[i].name + "</span><span>vale " + mejoras[i].price + "</span><span>" + mejoras[i].description + "</span><span>tienes " + mejoras[i].cantidad + "</span></div>";
        }
}
}

function reiniciar() { // reinicia el juego
    game.score = 0;
    game.clickPower = 1;
    game.scorePorseg = 0;
    for (let i = 0; i < mejoras.length; i++) {
        mejoras[i].cantidad = 0;
        mejoras[i].price = mejoras[i].baseprice;
    }
    display.actualizar();
    display.actualizartienda();
}

function guardarpartida(){ // guarda la partida
    var guardar = {
        score: game.score,
        clickPower: game.clickPower,
        scorePorseg: game.scorePorseg,
        mejoras: mejoras
    }
    localStorage.setItem("partida", JSON.stringify(guardar));
}

function cargarpartida(){ // carga la partida
    var cargar = JSON.parse(localStorage.getItem("partida"));
    if(cargar != null){
        if (typeof cargar.score != "undefined") game.score = cargar.score;
        if (typeof cargar.clickPower != "undefined") game.clickPower = cargar.clickPower;
        if (typeof cargar.scorePorseg != "undefined") game.scorePorseg = cargar.scorePorseg;
        if (typeof cargar.mejoras != "undefined"){
            for(let i = 0; i < mejoras.length; i++){
                if(typeof cargar.mejoras[i].cantidad != "undefined") mejoras[i].cantidad = cargar.mejoras[i].cantidad;
                if(typeof cargar.mejoras[i].price != "undefined") mejoras[i].price = cargar.mejoras[i].price;
    }}}
}
setInterval(function() { // suma los puntos por segundo a la puntuacion
    game.score += game.scorePorseg;
    display.actualizar();
}, 1000);

setInterval(function() { // guarda la partida cada 30
    guardarpartida()
}, 30000);

window.onload = function() { // carga la partida
    cargarpartida();
    display.actualizar();
    display.actualizartienda();
}
// interfaz del juego
let boton = document.getElementById("click"); // boton para sumar puntos
boton.addEventListener("click", function() {
    game.score += game.clickPower;
    display.actualizar();
}
);

let menu = document.getElementById("menu"); // menu de mejoras
for (item in mejoras) {
    let nuevoitem = document.createElement('div');
    document.createAttribute("id")
    document.createAttribute("onclick");
    nuevoitem.setAttribute("id", "mejora" + item);
    nuevoitem.setAttribute("onclick", "comprar(" + item + ")");
    nuevoitem.innerHTML = "<img src=" + mejoras[item].img + "><div><span class = 'titulo'>" + mejoras[item].name + "</span><span>vale " + mejoras[item].price + "</span><span>" + mejoras[item].description + "</span><span>tienes " + mejoras[item].cantidad + "</span></div>";
    menu.appendChild(nuevoitem);
}

let guardar = document.getElementById("partida"); // boton para guardar la partida
guardar.addEventListener("click", function() {
    guardarpartida();
}
);

let reinicio = document.getElementById("reiniciar"); // boton para reiniciar el juego
reinicio.addEventListener("click", function() {
    reiniciar();
}
);