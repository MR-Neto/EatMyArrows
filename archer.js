'use strict';

function Archer(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = 0.825 * this.canvas.width;
    this.y = 0.53 * this.canvas.height;
    this.width = 0.05 * this.canvas.width;
    this.height = 0.05 * this.canvas.width;
    this.direction = 1;
    this.img = new Image();
    this.isShooting =false;
    this.tickCount =0;
    this.imgOrder =1;

    this.imgSrcPointer = './images/arrowDirection.png';
    this.imgPointer = new Image();
    this.imgPointer.src = this.imgSrcPointer;


}

Archer.prototype.shootArrow = function () {
    this.isShooting=true;
    var speed = 2;
    var arrow = new Arrow(this.canvas,this.x, this.y+this.height/2, this.direction, speed);
    return arrow;
}

Archer.prototype.aimUp = function () {
    this.direction -= 0.5;
}

Archer.prototype.aimDown = function () {
    this.direction += 0.5;
}

Archer.prototype.draw = function (canvas) {

    this.x = 0.825 * this.canvas.width;
    this.y = 0.53 * this.canvas.height;
    this.width = 0.05 * this.canvas.width;
    this.height = 0.05 * this.canvas.width;

    if (this.isShooting) {

        if (this.tickCount<7) {
            this.tickCount++;
        } else{            
            this.tickCount=0;
            this.imgOrder = this.imgOrder + 1;
            console.log(`./images/archer${this.imgOrder}.png`);
            this.img.src = `./images/archer${this.imgOrder}.png`;
            if(this.imgOrder>4){
                this.isShooting=false;
                this.img.src = `./images/archer1.png`;
            }
        }
    } else {
        this.tickCount=0;
        this.imgOrder=0;
        this.img.src = `./images/archer1.png`;
    }

    this.ctx.drawImage(this.img, this.x, this.y,this.width,this.height);
   
    this.ctx.save();
    // translate context to center of canvas
    this.ctx.translate(this.x, this.y+this.height/2);

    // rotate canvas 20 degrees per direction point
    this.ctx.rotate(Math.PI /180*25*(this.direction*(-1)));

    // draw the image
    // since the this.ctx is rotated, the image will be rotated also
    this.ctx.drawImage(this.imgPointer, -40, -10,40,20);

    // we’re done with the rotating so restore the unrotated this.ctx
    this.ctx.restore(); 
}