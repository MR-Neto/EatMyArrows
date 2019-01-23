'use strict';

function Game(canvas, gameEndedHandler) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.archer = new Archer(canvas);
    this.enemies = [new Enemy(canvas, canvas.height * 0.8, 3)];
    this.deadEnemies = [];
    this.arrows = [];
    this.castle = new Castle(canvas, 5);
    this.animation;
    this.gameEndedHandler = gameEndedHandler;
    this.enemiesKilled = 0;
    this.level = 1;

    this._updateGame = function () {

        if (this.enemiesKilled>=5) {
            this.enemiesKilled=0;
            this.level++;
        }

        switch (this.level){
            case 1:
             var probabilyEnemies=0.004;
             break;

             case 2:
             var probabilyEnemies=0.008;
             break;
             
             case 3:
             var probabilyEnemies=0.012;
             break;
             
             default:
             var probabilyEnemies=0.0004;
          }

        if (Math.random() < probabilyEnemies) {
            this.enemies.push(new Enemy(this.canvas, (Math.random() * 0.35 + 0.575) * this.canvas.height, 3))
        };

        this.enemies = this.enemies.filter(function (enemy) {
            return enemy.isInGame(this.canvas);
        }.bind(this));

        this.enemies.forEach(function (enemy) {
            enemy.update(this.canvas);
        }.bind(this));

        this.arrows = this.arrows.filter(function (arrow) {
            return arrow.isInScreen();
        });

        var arrowsToClean = [];

        this.arrows.forEach((function (arrow) {
            arrow.update();

            this.enemies = this.enemies.filter((function (enemy) {
                if (arrow.shootedTarget(enemy)) {
                    if (enemy.attackingInterval) {
                        clearInterval(enemy.attackingInterval);
                    }

                    enemy.isDead = true;
                    this.deadEnemies.push(enemy);
                    setTimeout((function () { this.deadEnemies.shift() }).bind(this), 2000);
                    this.enemiesKilled++;
                    arrowsToClean.push(arrow);
                }
                return !arrow.shootedTarget(enemy);
            }).bind(this));

        }).bind(this));

        this.arrows = this.arrows.filter(function (arrow) {
            return !arrowsToClean.includes(arrow);
        });

        this.enemies.forEach((function (enemy) {
            if (enemy.isAttacking && !enemy.attackingInterval) {
                this.castle.loseLife();
                enemy.attackingInterval=setInterval((function () { this.castle.loseLife() }).bind(this), 2000);    
            }
        }).bind(this));
    }

    this._drawCanvas = function () {

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.castle.draw(this.canvas);

        this.archer.draw(this.canvas);

        this.deadEnemies.forEach(function (enemy) {
            enemy.draw();
        });

        this.enemies.forEach(function (enemy) {
            enemy.draw();
        });

        this.arrows.forEach(function (arrow) {
            arrow.draw();
        });

        this.ctx.font = "40px MedievalSharp";
        this.ctx.fillText(`Enemy Wave ${this.level}/3`, 0.35 * this.canvas.width, 75, 0.25 * this.canvas.width);
        this.ctx.fillText(`Enemies Killed ${this.enemiesKilled}/10`, 0.7 * this.canvas.width, 75, 0.25 * this.canvas.width);
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


        if (this.castle.isCastleLost() || this.level > 3) {
            this.gameEndedHandler();
        }
    }

    //first time calling the loop with game as this
    loop.call(this)
}

Game.prototype.stop = function () {
    window.cancelAnimationFrame(this.animation);

    if (this.castle.isCastleLost()) {
        return true;
    } else {
        return false;
    }
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
    if (this.archer.readyToShoot) {
        this.arrows.push(this.archer.shootArrow());
    }
}




