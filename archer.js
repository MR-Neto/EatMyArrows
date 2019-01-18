'use strict';

function Archer(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = 0.65 * this.canvas.width;
    this.y = 0.25 * this.canvas.height;
    this.width = 94;
    this.height = 104;
    this.direction = 1;
    this.imgSrc = './images/archer.png';
    this.img = new Image();
    this.img.src = this.imgSrc;
}

Archer.prototype.shootArrow = function () {
    var speedRandom = Math.random() * 1 + 2;
    var arrow = new Arrow(this.canvas,this.x, this.y, this.direction, speedRandom);
    return arrow;
}

Archer.prototype.aimUp = function () {
    this.direction--;
}

Archer.prototype.aimDown = function () {
    this.direction++;
}

Archer.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}