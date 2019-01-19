'use strict';

function Arrow(canvas, x, y, direction, speed) {
    this.x = x;
    this.y = y;
    this.width;
    this.height;
    this.direction = direction;
    this.speed = speed;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.imgSrc = './images/arrowHorizontal.png';
    this.img = new Image();
    this.img.src = this.imgSrc;
}


Arrow.prototype.update = function () {
    this.x -= this.speed;
    this.y = this.y + this.direction;

    if (this.direction >= 1.5) {
        this.imgSrc = './images/arrowDown.png';
        this.img = new Image();
        this.img.src = this.imgSrc;

    } else if (this.direction <= -1.5) {
        this.imgSrc = './images/arrowUp.png';
        this.img = new Image();
        this.img.src = this.imgSrc;
    } else {
        this.imgSrc = './images/arrowHorizontal.png';
        this.img = new Image();
        this.img.src = this.imgSrc;
    }
}

Arrow.prototype.shootedTarget = function (enemy) {
    var yCheck = enemy.y < this.y < enemy.y && enemy.y + enemy.height > this.y;
    var xCheck = enemy.x < this.x && enemy.x + enemy.width > this.x;
    return yCheck && xCheck;
}

Arrow.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y);
    this.width = this.img.width;
    this.height = this.img.height;
}

Arrow.prototype.isInScreen = function () {
    return this.x >= 0 && this.y >= 0 && this.x <= this.canvas.width && this.y <= this.canvas.height;
}