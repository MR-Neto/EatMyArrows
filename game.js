'use strict';

function Game(canvas, gameEndedHandler) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.archers = [new Archer(canvas, 0.825 * this.canvas.width, 0.53 * this.canvas.height, 0.05 * this.canvas.width, 0.05 * this.canvas.width, 0)];
    this.enemies = [new Enemy(canvas, canvas.height * 0.8, 1)];
    this.deadEnemies = [];
    this.arrows = [];
    this.castle = new Castle(canvas, 5);
    this.animation;
    this.gameEndedHandler = gameEndedHandler;
    this.enemiesKilled = 0;
    this.level = 1;
    this.coins = 0;
    this.arrowsLevel =1;
    this.backgroundAudio =new Audio("./music/gangMusic.mp3");
    this.backgroundAudio.loop = true;

    this._updateGame = function () {

        if (this.enemiesKilled >= 10) {
            this.enemiesKilled = 0;
            this.level++;
        }

        switch (this.level) {
            case 1:
                var probabilyEnemies = 0.004;
                break;

            case 2:
                var probabilyEnemies = 0.008;
                break;

            case 3:
                var probabilyEnemies = 0.012;
                break;

            default:
                var probabilyEnemies = 0.0004;
        }

        if (Math.random() < probabilyEnemies) {
            this.enemies.push(new Enemy(this.canvas, (Math.random() * 0.35 + 0.575) * this.canvas.height, 1))
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
                    this.coins = this.coins + Math.round(Math.hypot((this.castle.x - enemy.x), (enemy.y - this.castle.y)) / 10) * 10;
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
                enemy.attackingInterval = setInterval((function () { this.castle.loseLife() }).bind(this), 2000);
            }
        }).bind(this));
    }

    this._drawCanvas = function () {

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.castle.draw(this.canvas);

        this.archers.forEach(function (archer) {
            archer.draw();
        });

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
        this.ctx.fillText(`Coins ${this.coins}`, 0.05 * this.canvas.width, 165, 0.25 * this.canvas.width);
        //this.ctx.fillText(`Ballistas ${this.coins}/1`, 0.75 * this.canvas.width, 150, 0.25 * this.canvas.width);


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
    this.backgroundAudio.pause();
    window.cancelAnimationFrame(this.animation);

    if (this.castle.isCastleLost()) {
        return true;
    } else {
        return false;
    }
}

Game.prototype.keyUp = function () {

    this.archers.forEach(function (archer) {
        archer.aimUp();
    });
}

Game.prototype.keyDown = function () {

    this.archers.forEach(function (archer) {
        archer.aimDown();
    });
}

Game.prototype.keyEnter = function () {
    this.archers.forEach(function (archer) {
        if (archer.readyToShoot) {
            this.arrows.push(archer.shootArrow());
        }
    }.bind(this));
}

Game.prototype.improveShootPace = function () {
    console.log("1");
    if (this.coins > 2500 && this.arrowsLevel<3) {  
        this.arrowsLevel ++;
        this.coins = this.coins - 2500;

        this.archers.forEach(function (archer) {
            if (archer.shootingPace > 500) {
                archer.shootingPace = archer.shootingPace - 750;
            }
        });

        var div =document.querySelector(".arrows-button-div");
        div.innerHTML =`
            Improve Arrows: ${this.arrowsLevel}/3<br>
            Cost: 2500 coins
       `;
    }
}

Game.prototype.addNewArcher = function () {
    console.log("2");

    if (this.coins > 5000 && this.archers.length < 3) {
        this.coins = this.coins - 5000;
        if (this.archers.length === 2) {
            this.archers.push(new Archer(this.canvas, 0.875 * this.canvas.width, 0.3 * this.canvas.height, 0.04 * this.canvas.width, 0.04 * this.canvas.width, 0));
            this.archers.forEach(function(archer){
                archer.direction = 0;
            });
        }
        if (this.archers.length === 1) {
            this.archers.push(new Archer(this.canvas, 0.8 * this.canvas.width, 0.4 * this.canvas.height, 0.045 * this.canvas.width, 0.045 * this.canvas.width, 0));
            this.archers.forEach(function(archer){
                archer.direction = 0;
            });
        }

        var div =document.querySelector(".archer-button-div");
        div.innerHTML =`
               Buy Archer: ${this.archers.length}/3<br>
               Cost: 5000 coins
       `;
    }
}

Game.prototype.buyLife = function () {
    console.log("3");

    if (this.coins > 7500 && this.castle.lives < 6) {
        this.coins = this.coins - 7500;
        this.castle.lives++;
    }
}

Game.prototype.buyGangMode = function () {
    this.backgroundAudio.play();

    if (this.coins > 10000) {
        this.coins = this.coins - 10000;
        this.backgroundAudio.play();
    }
}


