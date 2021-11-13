class Hearts {
    constructor(){ 
        this.size = 50; //size of heart images
        this.spacing = 60; //spacing between heart images' x locations
        this.yVal = 10; //spacing of hearts from top of screen
        this.xSp = 10; //spacing of hearts from left side of screen
        this.curVal = 0;
        this.checkHP(); //to update curVal
        this.heartFull = 0;
        this.heartPart = 0;
    }

    drawHearts(){ //draws hearts on screen. run in draw for constant redrawing
        if(this.heartFull > 0){
            for(let i = 0; i < this.heartFull; i++){
                image(fullHeart, (50) + this.spacing*i + this.xSp, this.yVal, this.size, this.size);
                if(this.heartPart > 0 && i == this.heartFull - 1){ //if there are parts and it is the last loop
                    this.drawParts(i + 1);
                }
            }
        } else { 
            if(this.heartPart > 0){
                this.drawParts();
            } else { //no full hearts and no part hearts, hp is 0
                console.log("player is dead");
                player.respawnPlayer();
            }
        }
    } //end drawHearts()

    drawParts(i = 0){ //i determines which position to draw the part
        if(this.heartPart == 1){
            image(oneQuartHeart, (50) + this.spacing*(i) + this.xSp, this.yVal, this.size, this.size);
        } else if(this.heartPart == 2){
            image(halfHeart,(50) + this.spacing*(i) + this.xSp, this.yVal, this.size, this.size);
        } else if(this.heartPart == 3){
            image(threeQuartHeart, (50) +this.spacing*(i) + this.xSp, this.yVal, this.size, this.size);
        } 
    }

    checkHP(playerHP){ //checks whether hearts needs to be updated. Run from draw for constant checking
        if(this.curVal != playerHP){ 
            this.curVal = playerHP;
            this.calculateHearts();
        }
    } //end checkHP()

    calculateHearts(){ //updates heartPart and heartFull. Only called by checkHP()
        this.heartFull = 0;
        this.heartPart = 0;
        for(let i = 0; i < this.curVal; i++){
            if((i + 1) % 4 == 0){
                this.heartFull++;
            } 
        }
        this.heartPart = this.curVal - this.heartFull*4;
    } //end calculateHearts()

    loopInDraw(playerHearts){
        this.checkHP(playerHearts);
        this.drawHearts();
    }
}