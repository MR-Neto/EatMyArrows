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
        <h1>Kill Them All</h1>
        <a href="#" class="button">Fight!</a>
    </div>
       
    `);

    splashScreen.querySelector(".button").addEventListener("click", startGame);
}

function buildGameScreen() {
    var target = document.querySelector(".max-container");
    destroyDom(target);

    var gameScreen = buildDom(`
         <canvas id="canvas"></canvas>
    `);


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
    buildGameScreen();


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
            case 49: //1 pressed
                game.addNewArcher()
            break;
            case 50: //2 pressed
                game.improveShootPace()
            break;
            case 51: //3 pressed
                game.buyLife()
            break;
            case 71: //G pressed
                game.buyGangMode()
            break;
            default:
                break;
        }
    };

    document.addEventListener('keydown', onKeyDown);

    game.start();
}


window.addEventListener('load', showSplashScreen);



