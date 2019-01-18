'use strict';

function Archer(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = 0.68 * this.canvas.width;
    this.y = 0.37 * this.canvas.height;
    this.width = 34;
    this.height = 34;
    this.direction = 1;
    this.imgSrc = './images/archer.png';
    this.img = new Image();
    this.img.src = this.imgSrc;
}

Archer.prototype.shootArrow = function () {
    var speed = 2;
    var arrow = new Arrow(this.canvas,this.x, this.y+this.height/2, this.direction, speed);
    return arrow;
}

Archer.prototype.aimUp = function () {
    this.direction -= 0.1;
}

Archer.prototype.aimDown = function () {
    this.direction += 0.1;
}

Archer.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y);
}