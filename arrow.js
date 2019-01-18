'use strict';

function Arrow(canvas, x, y, direction, speed) {
    this.x = x;
    this.width = 5;
    this.height =2;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
}


Arrow.prototype.update = function () {
    this.x -= this.speed;
    this.y = this.y + this.speed + this.direction;
}

Arrow.prototype.checkColide = function () {
    //Returns Boolean
}

Arrow.prototype.draw = function () {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
}

Arrow.prototype.isInScreen = function () {
    return this.x >= 0 && this.y >= 0 && this.x <= this.canvas.width && this.y <= this.canvas.height;
}