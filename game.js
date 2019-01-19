'use strict';

function Game(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.archer = new Archer(canvas);
    this.enemies = [new Enemy(canvas, canvas.height * 0.80, 1)];
    this.arrows = [];
    this.castle = new Castle(canvas, 5);
    this.animation;

    this._updateGame = function () {

        if (Math.random() < 0.01) {
            this.enemies.push(new Enemy(this.canvas, (Math.random() * 0.3 + 0.5) * this.canvas.height, 1))
        };

        this.enemies = this.enemies.filter(function (enemy) {
            return enemy.isInGame();
        });

        this.enemies.forEach(function (enemy) {
            enemy.update();
        });

        this.arrows = this.arrows.filter(function (arrow) {
            return arrow.isInScreen();
        });

        var arrowsToClean =[];

        this.arrows.forEach((function (arrow) {
            arrow.update();

            this.enemies = this.enemies.filter((function (enemy) {
                if (arrow.shootedTarget(enemy)) {
                 arrowsToClean.push(arrow);   
                }
                return !arrow.shootedTarget(enemy);
            }).bind(this));

        }).bind(this));

        this.arrows = this.arrows.filter(function (arrow) {
            return !arrowsToClean.includes(arrow);
        });

        this.enemies.forEach((function (enemy) {
            if (enemy.isCastleInvaded()) {
                this.castle.loseLife();
            }
        }).bind(this));

        if (this.castle.isCastleLost()) {
            game.stop();
        }
    }

    this._drawCanvas = function () {

        this.castle.draw();

        this.archer.draw();

        this.enemies.forEach(function (enemy) {
            enemy.draw();
        });

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

    //first time calling the loop with game as this
    loop.call(this)
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