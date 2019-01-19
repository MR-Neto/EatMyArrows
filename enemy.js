'use strict';

function Enemy(canvas, y, speed) {
    this.x=1;
    this.y=y;
    this.width;
    this.height;
    this.speed = speed;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.imgSrc = './images/enemy.png';
    this.img = new Image();
    this.img.src = this.imgSrc;
}


Enemy.prototype.update = function () {
    this.x += this.speed;
}


Enemy.prototype.isInGame = function () {
    return this.x >= 0 && this.y >= 0 && this.x <= 0.70*this.canvas.width && this.y <= this.canvas.height;
}

Enemy.prototype.isCastleInvaded = function () {
    return this.x === 0.70*this.canvas.width && this.y >= 0 && this.y <= this.canvas.height;
}

Enemy.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y);
    this.width=this.img.width;
    this.height=this.img.height;
}

Enemy.prototype.die = function () {
    this.x = -100;
}