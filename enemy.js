'use strict';

function Enemy(canvas, y, speed) {
    this.x = 1;
    this.y = y;
    this.height = y * 0.09;
    this.width = this.height;
    this.speed = speed;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.img = new Image();
    this.imgOrder = 1;
    this.tickCount = 0;
    this.isDead = false;
    this.isAttacking = false;
    this.attackingInterval;
}


Enemy.prototype.update = function (canvas) {
    if (this.x<canvas.width*0.79) {
        this.x += this.speed;
    }
    if (this.x>=canvas.width*0.79) {
        this.isAttacking = true;
    }
}

Enemy.prototype.isInGame = function (canvas) {
    return this.x >= 0 && this.y >= 0 && this.x <= 0.80 * canvas.width && this.y <= canvas.height;
}

Enemy.prototype.draw = function () {
    if (this.tickCount < 7) {
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
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

}

Enemy.prototype.die = function () {
    this.x = -100;
}