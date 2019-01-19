'use strict';

function buildDom(html) {
    var target = document.querySelector(".container");
    target.innerHTML = html;

    return target;
}

function destroyDom(target) {
    target.innerHTML = "";
}

function showSplashScreen() {
    var target = document.querySelector(".container");
    destroyDom(target);
    var splashScreen = buildDom(`
        <h1>Kill Them All</h1>
        <a href="#" class="button">Fight!</a>
    `);

    splashScreen.querySelector(".button").addEventListener("click", startGame);
}

function buildGameScreen() {
    var target = document.querySelector(".container");
    destroyDom(target);
    var gameScreen = buildDom(`
        <canvas id="canvas"></canvas>
    `);
}

function showEndScreen() {
    var target = document.querySelector(".container");
    destroyDom(target);
    var endScreen = buildDom(`
        <h1>Game Over</h1>
        <a href="#" class="button">Restart Battle</a>
    `);

    endScreen.querySelector(".button").addEventListener("click", startGame);
}

function showEndScreen(message) {
    var target = document.querySelector(".container");
    destroyDom(target);
    var endScreen = buildDom(`
        <h1>${message}</h1>
        <a href="#" class="button">Restart Battle</a>
    `);

    endScreen.querySelector(".button").addEventListener("click", startGame);
}

window.addEventListener('load', showSplashScreen);

var game;

function startGame() {
    buildGameScreen();

    var canvas = document.getElementById('canvas'); 

    var gameEnded = function () {

        if (game.stop()) {
            //Castle is lost
            showEndScreen('Game Over');
        } else{
            //Castle is safe
            showEndScreen('Victory');
        }
    }
    
    game = new Game(canvas,gameEnded);

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
            default:
                break;
        }
    };

    document.addEventListener('keydown', onKeyDown);

    game.start();
}