'use strict';

function Arrow(canvas, x, y, direction,isBalistaShoot) {
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
    this.isBalistaShoot = isBalistaShoot;
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

    if (this.isBalistaShoot) {
        this.imgSrc = './images/balista/balistaShoot.png';
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

    if(this.isBalistaShoot){
        this.speed = 5;
        this.ctx.drawImage(this.img, this.x, this.y, 90, 30);
    }
    else{
        this.ctx.drawImage(this.img, this.x, this.y, 30, 20);
    }
}

Arrow.prototype.isInScreen = function () {
    return this.x >= 0 && this.y >= 0 && this.x <= this.canvas.width && this.y <= this.canvas.height;
}