'use strict';

function Castle(canvas, lives) {
    this.x = 0.65*canvas.width;
    this.y = 0.05*canvas.height;    
    this.width= 0.35*canvas.width;
    this.height= 0.95*canvas.height;
    this.lives = lives || 5;
    this.canvas= canvas;
    this.ctx=canvas.getContext('2d');
    this.img='./images/castle1.png';
}

Castle.prototype.isCastleLost = function () {
    return this.lives<=0;
}

Castle.prototype.setCastleStatus = function () {
    if(this.lives<=3){
        this.img='./images/castle2.png';
    }
    if(this.lives<=2){
        this.img='./images/castle3.png';
    }
}

Castle.prototype.draw = function () {
    var img = new Image();
    this.setCastleStatus();
    img.src = this.img;
    this.ctx.drawImage(img,0,0,684,1128,this.x,this.y,this.width,this.height);
}









