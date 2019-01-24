'use strict';

var game;

function buildDom(html) {
    var target = document.querySelector(".max-container");
    target.innerHTML = html;

    return target;
}

function destroyDom(target) {
    target.innerHTML = "";
}

function showSplashScreen() {

    var target = document.querySelector(".max-container");
    destroyDom(target);
    var splashScreen = buildDom(`

    <div class="container">
        <h1>Eat My Arrow</h1>
        <a href="#" class="button">Fight</a>
        <a href="#" class="button-instructions">How to Fight</a>
    </div>
       
    `);

    splashScreen.querySelector(".button").addEventListener("click", startGame);
    splashScreen.querySelector(".button-instructions").addEventListener("click", showInstructionsScreen);

}

function showInstructionsScreen() {

    var target = document.querySelector(".max-container");
    destroyDom(target);
    var splashScreen = buildDom(`

    <div class="container">
        <h1>Instructions</h1>
        <p>Defend the castle from 3 waves of enemies.</p>
        <p>Kill 10 enemies to clear each enemy wave.</p>
        <img src="./images/enemy1.png" alt="enemy" width="70px" height="70px">
        <p>Point with up and down keys. Shoot arrow with spacebar.</p>
        <img src="./images/archer1.png" alt="archer" width="70px" height="70px">
        <p>Use coins to improve your defense.</p>
        <div class="container-improvements">
            <img src="./images/bow.svg" alt="enemy" width="70px">
            <img src="./images/archer.svg" alt="enemy" width="70px">
            <img src="./images/castle.svg" alt="enemy" width="70px">
            <img src="./images/catapult.svg" alt="enemy" width="70px">
        </div>
        <a href="#" class="button">Back</a>
    </div>
       
    `);

    splashScreen.querySelector(".button").addEventListener("click", showSplashScreen);
}



function buildGameScreen() {
    var target = document.querySelector(".max-container");
    destroyDom(target);

    var gameScreen = buildDom(`
         <canvas id="canvas"></canvas>
         <a href="#" class="arrows-button" alt="Improve Arrows">
            <div class="arrows-button-div">
                Improve Arrows: 1/3<br>
                Cost: 2500 coins
            </div>
         </a>
      
         <a href="#" class="archer-button" alt="Buy Archer">
            <div class="archer-button-div">
                Buy Archer: 1/3<br>
                Cost: 5000 coins
            </div>
         </a>
         <a href="#" class="castle-button" alt="Repair Castle">
            <div class="castle-button-div">
                Repair Castle<br>
                Cost: 7500 coins
            </div>
         </a>
         <a href="#" class="balista-button" alt="Buy Balista">
            <div class="balista-button-div">
                Buy Balista<br>
                Cost: 10000 coins
            </div>
         </a>
         `);

    return gameScreen;
}

function showEndScreen() {
    var target = document.querySelector(".max-container");
    destroyDom(target);
    var endScreen = buildDom(`
    <div class="container">
        <h1>Game Over</h1>
        <a href="#" class="button">Restart Battle</a>
    </div>   
    `);

    endScreen.querySelector(".button").addEventListener("click", startGame);
}

function showEndScreen(message) {
    var target = document.querySelector(".max-container");
    destroyDom(target);
    var endScreen = buildDom(`
    <div class="container">
        <h1>${message}</h1>
        <a href="#" class="button">Restart Battle</a>
    </div>   
    `);

    endScreen.querySelector(".button").addEventListener("click", startGame);
}


function startGame() {

    var gameScreen = buildGameScreen();

    var canvas = document.getElementById('canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var gameEnded = function () {

        if (game.stop()) {
            //Castle is lost
            showEndScreen('Game Over');
        } else {
            //Castle is safe
            showEndScreen('Victory');
        }
    }

    game = new Game(canvas, gameEnded);

    var onKeyDown = function (event) {
        switch (event.keyCode) {
            case 38: //arrow up
                game.keyUp();
                break;
            case 40: //arrow down
                game.keyDown();
                break;
            case 32: //space bar pressed
                game.keyEnter()
                break;
            case 71: //G pressed
                game.buyGangMode()
                break;
            default:
                break;
        }
    };

    var improveArrows = function () {
        game.improveShootPace();
    };

    var buyArcher = function () {
        game.addNewArcher();
    };

    var buyLife = function () {
        game.buyLife();
    };

    var buyBalista = function () {
        game.buyBalista();
    };


    document.addEventListener('keydown', onKeyDown);
    gameScreen.querySelector(".arrows-button").addEventListener("click", improveArrows);
    gameScreen.querySelector(".archer-button").addEventListener("click", buyArcher);
    gameScreen.querySelector(".castle-button").addEventListener("click", buyLife);
    gameScreen.querySelector(".balista-button").addEventListener("click", buyBalista);

    game.start();
}


window.addEventListener('load', showSplashScreen);



