'use strict';

function Castle(canvas, lives) {
    this.x = 0.80 * canvas.width;
    this.y = 0.15 * canvas.height;
    this.width = 0.20 * canvas.width;
    this.height = 0.85 * canvas.height;
    this.lives = lives || 5;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.imgCastleSrc = './images/castle1.png';
    this.lifeImage = new Image();
    this.lifeImage.src = './images/heart.svg';
}

Castle.prototype.isCastleLost = function () {
    return this.lives <= 0;
}

Castle.prototype.loseLife = function () {
    this.lives--;
}

Castle.prototype.setCastleStatus = function () {
    if (this.lives <= 3) {
        this.imgCastleSrc = './images/castle2.png';
    }
    
}

Castle.prototype.draw = function (canvas) {

    this.x = 0.80 * canvas.width;
    this.y = 0.15 * canvas.height;
    this.width = 0.20 * canvas.width;
    this.height = 0.85 * canvas.height;

    var imgCastle = new Image();
    this.setCastleStatus();
    imgCastle.src = this.imgCastleSrc;

    for (let index = 1; index <= this.lives; index++) {
        this.ctx.drawImage(this.lifeImage, 50*index, 30,40,40);
    }

    
    this.ctx.drawImage(imgCastle, 0, 0, 684, 1128, this.x, this.y, this.width, this.height); 

}