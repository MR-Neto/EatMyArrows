'use strict';

function Balista(canvas,x,y,width,height,direction) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.direction = direction;
    this.img = new Image();
    this.isShooting =false;
    this.tickCount =0;
    this.imgOrder =1;

    this.imgSrcPointer = './images/balista/balistaShoot.png';
    this.imgPointer = new Image();
    this.imgPointer.src = this.imgSrcPointer;

    this.readyToShoot =true;
    this.shootingPace =3000;


}

Balista.prototype.shootArrow = function () {
    if(this.readyToShoot){
        this.readyToShoot=false;
        setTimeout((function () { this.readyToShoot=true}).bind(this), this.shootingPace);
        this.isShooting=true;
        var arrow = new Arrow(this.canvas,this.x, this.y, this.direction,true);
        return arrow;
    }
}

Balista.prototype.aimUp = function () {
    this.direction -= 0.2;
}

Balista.prototype.aimDown = function () {
    this.direction += 0.2;
}

Balista.prototype.draw = function (canvas) {

    if (this.isShooting) {

        if (this.tickCount<10) {
            this.tickCount++;
        } else{            
            this.tickCount=0;
            this.imgOrder = this.imgOrder + 1;
            this.img.src = `./images/balista/balista${this.imgOrder}.png`;
            if(this.imgOrder>5){
                this.isShooting=false;
                this.img.src = './images/balista/balista1.png';
            }
        }
    } else {
        this.tickCount=0;
        this.imgOrder=0;
        this.img.src = './images/balista/balista1.png';
    }

    this.ctx.drawImage(this.img, this.x, this.y,this.width,this.height);
   
    this.ctx.save();
    // translate context to center of canvas
    this.ctx.translate(this.x, this.y);

    // rotate canvas 20 degrees per direction point
    this.ctx.rotate(Math.PI /180*25*(this.direction*(-1)));

    // draw the image
    // since the this.ctx is rotated, the image will be rotated also
    this.ctx.drawImage(this.imgPointer, -40, 0,40,20);

    // we’re done with the rotating so restore the unrotated this.ctx
    this.ctx.restore(); 
}