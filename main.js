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
        <h1>Victory</h1>
        <a href="#" class="button">Restart Battle</a>
    `);

    endScreen.querySelector(".button").addEventListener("click", startGame);
}

window.addEventListener('load', showSplashScreen);

var game;

function startGame() {
    buildGameScreen();

    var canvas = document.getElementById('canvas');
    
    game = new Game(canvas);
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