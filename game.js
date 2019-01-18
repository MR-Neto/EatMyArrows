'use strict';

function Game(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.archer = new Archer(canvas);
    this.arrows = [];
    this.castle = new Castle(canvas, 5);
    this.animation;

    this._updateGame = function () {

        this.arrows.forEach(function (arrow) {
            arrow.update();
        });

        this.arrows = this.arrows.filter(function (arrow) {
            return arrow.isInScreen();
        });

        if (this.castle.isCastleLost()) {
            game.stop();
        }
    }

    this._drawCanvas = function () {
        this.castle.draw();

        this.archer.draw();


        this.arrows.forEach(function (arrow) {
            arrow.draw();
        });
    }

    this._clearCanvas = function () {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

Game.prototype.start = function () {

    function loop() {
        //update variables
        this._updateGame();
        //clear
        this._clearCanvas();
        //print
        this._drawCanvas();

        this.animation = window.requestAnimationFrame(loop.bind(this));
    }

    this.animation = window.requestAnimationFrame(loop.bind(this));
}

Game.prototype.stop = function () {
    window.cancelAnimationFrame(this.animation);
}

Game.prototype.keyUp = function () {
    this.archer.aimUp();
}

Game.prototype.keyDown = function () {
    this.archer.aimDown();
}

Game.prototype.keyUp = function () {
    this.archer.aimUp();
}

Game.prototype.keyEnter = function () {
    this.arrows.push(this.archer.shootArrow());
}