'use strict';

function Arrow(canvas, x, y, direction) {
    this.x = x;
    this.y = y;
    this.width;
    this.height;
    this.direction = direction;
    this.speed = -1 * direction + 3;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.imgSrc = './images/arrow0.png';
    this.img = new Image();
    this.img.src = this.imgSrc;
}


Arrow.prototype.update = function () {

    if (this.direction < 0.5) {
        this.imgSrc = './images/arrow0.png';
    } else if (this.direction <= 1) {
        this.imgSrc = './images/arrow18.png';
    } else if (this.direction <= 1.5) {
        this.imgSrc = './images/arrow36.png';
    } else if (this.direction <= 2) {
        this.imgSrc = './images/arrow54.png';
    } else if (this.direction <= 2.5) {
        this.imgSrc = './images/arrow72.png';
    } else if (this.direction <= 100) {
        this.imgSrc = './images/arrow90.png';
    } else {
        this.imgSrc = './images/arrow0.png';
    }
    this.img.src = this.imgSrc;
    this.x -= this.speed;
    this.y = this.y + this.direction;
}

Arrow.prototype.shootedTarget = function (enemy) {
    var yCheck = enemy.y < this.y && enemy.y + enemy.height > this.y;
    var xCheck = enemy.x < this.x && enemy.x + enemy.width > this.x;
    return yCheck && xCheck;
}

Arrow.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y, 30, 20);
    this.width = this.img.width;
    this.height = this.img.height;
}

Arrow.prototype.isInScreen = function () {
    return this.x >= 0 && this.y >= 0 && this.x <= this.canvas.width && this.y <= this.canvas.height;
}