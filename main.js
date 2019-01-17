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
    splashScreen = buildDom(`
        <h1>Kill Them All</h1>
        <a href="#" class="button">Fight!</a>
    `);

    splashScreen.querySelector(".button").addEventListener("click", startGame);
}

function buildGameScreen() {
    var target = document.querySelector(".container");
    destroyDom(target);
    gameScreen = buildDom(`
        <canvas id="canvas"></canvas>
    `);
}

function showEndScreen() {
    var target = document.querySelector(".container");
    destroyDom(target);
    splashScreen = buildDom(`
        <h1>Victory</h1>
        <a href="#" class="button">Restart Battle</a>
    `);

    splashScreen.querySelector(".button").addEventListener("click", startGame);
}

window.addEventListener('load', showSplashScreen);


function startGame() {
    buildGameScreen();
    

}