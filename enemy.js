'use strict';

function Enemy(canvas, y, speed) {
    this.x = 1;
    this.y = y;
    this.width;
    this.height;
    this.speed = speed;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.img = new Image();
    this.imgOrder = 1;
    this.tickCount = 0;
    this.isDead =false;
}


Enemy.prototype.update = function () {
    this.x += this.speed;
}


Enemy.prototype.isInGame = function () {
    return this.x >= 0 && this.y >= 0 && this.x <= 0.70 * this.canvas.width && this.y <= this.canvas.height;
}

Enemy.prototype.isCastleInvaded = function () {
    return this.x === 0.70 * this.canvas.width && this.y >= 0 && this.y <= this.canvas.height;
}

Enemy.prototype.draw = function () {
    if (this.tickCount < 15) {
        this.tickCount++;
    } else {
        this.tickCount = 0;
        if (this.imgOrder >= 5) {
            this.imgOrder = 1;
        } else {
            this.imgOrder = this.imgOrder + 1;
        }
    }    

    this.img.src = `./images/enemy${this.imgOrder}.png`;

    if (this.isDead) {
        this.img.src = `./images/enemyDead.png`;
    }
    this.ctx.drawImage(this.img, this.x, this.y);
    this.width = this.img.width;
    this.height = this.img.height;
}

Enemy.prototype.die = function () {
    this.x = -100;
}