// Clicker game
// configuracion
let start
var DateTime = luxon.DateTime;
let game = { // configuracion del juego
    score: 0,
    clickPower: 1,
    scorePerSecond: 0
}
// funciones del juego

let display = {  // actualiza el display del juego
    update() {
        document.getElementById("score").innerHTML = game.score;
        document.getElementById("clickPower").innerHTML = "+" + game.clickPower;
        document.getElementById("scorePerSecond").innerHTML = "+" + game.scorePerSecond;
},
    updateBuys(index) {
    document.getElementById("upgrade" + index).innerHTML = "<img src=" + upgrades[index].img + "><div><span class = 'titulo'>" + upgrades[index].name + "</span><span>vale " + upgrades[index].price + "</span><span>" + upgrades[index].description + "</span><span>tienes " + upgrades[index].quantity + "</span></div>";
},
    updateShop()  {
        for (let i = 0; i < upgrades.length; i++) {
            document.getElementById("upgrade" + i).innerHTML = "<img src=" + upgrades[i].img + "><div><span class = 'titulo'>" + upgrades[i].name + "</span><span>vale " + upgrades[i].price + "</span><span>" + upgrades[i].description + "</span><span>tienes " + upgrades[i].quantity + "</span></div>";
        }
}
}
async function requestUpgrades(){
    const response = await fetch("js/module/upgrades.json");
    const data = await response.json();
    upgrades = data;
    createUpgrades();
}requestUpgrades();

function createUpgrades(){ // crea los upgrades
    for (item in upgrades) {
        let newItem = document.createElement('div');
        document.createAttribute("id")
        document.createAttribute("onclick");
        newItem.setAttribute("id", "upgrade" + item);
        newItem.setAttribute("onclick", "buy(" + item + ")");
        newItem.innerHTML = "<img src=" + upgrades[item].img + "><div><span class = 'titulo'>" + upgrades[item].name + "</span><span>vale " + upgrades[item].price + "</span><span>" + upgrades[item].description + "</span><span>tienes " + upgrades[item].quantity + "</span></div>";
        menu.appendChild(newItem);
    }
}

function buy(index) {  // maneja el sistema de buy upgrades
    if (game.score >= upgrades[index].price) {
        game.score -= upgrades[index].price;
        upgrades[index].quantity++;
        upgrades[index].price = Math.round(upgrades[index].price * 1.15);
        game.clickPower += upgrades[index].upgrade;
        game.scorePerSecond += upgrades[index].upgradePerSecond;
        display.updateBuys(index);
        display.update();
    }
}

function offlineTime() {
    let end = DateTime.now();
    start = DateTime.fromISO(start);
    var diffInSeconds = end.diff(start, 'seconds');
    diffInSeconds.toObject();
    difference = diffInSeconds.seconds
    if (difference <= 120){
        points = difference * game.scorePerSecond
        Math.round(points / 2)
        if (points >= 1){
            notification(Math.round(points / 2))
            game.score += Math.round(points / 2)
        }
    }
    
}

function notification(points) {
    Toastify({
        text: "ganaste " + points + " puntos mientras no estabas",
        style: {
          background: "linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(9,9,121,1) 68%, rgba(2,0,36,1) 99%)",
        }
      }).showToast();
      display.update();
}

function restart() { // reinicia el juego
    game.score = 0;
    game.clickPower = 1;
    game.scorePerSecond = 0;
    for (let i = 0; i < upgrades.length; i++) {
        upgrades[i].quantity = 0;
        upgrades[i].price = upgrades[i].baseprice;
    }
    display.update();
    display.updateShop();
}

function saveGame(){ // guarda la partida
    var now = DateTime.now();
    var save = {
        score: game.score,
        clickPower: game.clickPower,
        scorePerSecond: game.scorePerSecond,
        upgrades: upgrades,
        tiempo: now
    }
    localStorage.setItem("game", JSON.stringify(save));
}

function loadGame(){ // carga la partida
    var load = JSON.parse(localStorage.getItem("game"));
    if(load != null){
        if (typeof load.score != "undefined") game.score = load.score;
        if (typeof load.clickPower != "undefined") game.clickPower = load.clickPower;
        if (typeof load.scorePerSecond != "undefined") game.scorePerSecond = load.scorePerSecond;
        if (typeof load.tiempo != "undefined") start = load.tiempo;
        if (typeof load.upgrades != "undefined"){
            for(let i = 0; i < upgrades.length; i++){
                if(typeof load.upgrades[i].quantity != "undefined") upgrades[i].quantity = load.upgrades[i].quantity;
                if(typeof load.upgrades[i].price != "undefined") upgrades[i].price = load.upgrades[i].price;
    }}}
    offlineTime()
}
setInterval(function() { // suma los puntos por segundo a la puntuacion
    game.score += game.scorePerSecond;
    display.update();
}, 1000);

setInterval(function() { // guarda la partida cada 30
    saveGame()
}, 30000);

window.onload = function() { // carga la partida
    loadGame();
    display.update();
    display.updateShop();
}
// interfaz del juego
let button = document.getElementById("click"); // button para sumar puntos
button.addEventListener("click", function() {
    game.score += game.clickPower;
    display.update();
}
);

let menu = document.getElementById("menu"); // menu de upgrades


let saveButton = document.getElementById("game"); // button para saveButton la partida
saveButton.addEventListener("click", function() {
    saveGame();
}
);

let restartButton = document.getElementById("restart"); // button para restart el juego
restartButton.addEventListener("click", function() {
    restart();
}
);

