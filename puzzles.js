class Box {
    constructor(x, y){
        this.s = createSprite(x, y, tex_springGrass.width, tex_springGrass.height);
        this.s.debug = true;
        this.s.addToGroup(boxes);
    }
    collisionCheck(){
        if(player.s.position.y < this.s.position.y - this.s.height/2){
            player.s.collide(boxes);
        } else {
            player.s.displace(boxes);
        }
        boxes.collide(worldTiles);
        boxes.collide(floorSprite); //remove later when floor removed
    }

    loopInDraw(){
        this.s.setSpeed(10, 90); //gravity
        this.collisionCheck();
    }
}

class Door {
    constructor(x, y, bx, by){
        this.s = createSprite(x, y, 50, 100);
        this.s.addToGroup(doors);
        this.s.closePos = y;
        this.s.openPos = this.s.position.y - this.s.height

        //button
        this.b = createSprite(bx, by, 40, 5);
        this.b.immovable = true;
        this.b.addToGroup(buttonGrp);
        this.s.amt = 0;
        this.s.amt2 = 0;
    }

    loopInDraw(){
        let openCheck = false;
        
        player.s.collide(doors);
        this.b.collide(player.s, () => openCheck = true)
        this.b.collide(boxes, () => openCheck = true)
        if(openCheck){
            this.s.position.y = lerp(this.s.position.y, this.s.openPos, this.s.amt); //open door

        } else {
            this.s.position.y = lerp(this.s.position.y, this.s.closePos, this.s.amt2); //close door
        }
        if(openCheck){
            this.s.amt2 = 0
            if(this.s.amt < 1){
                this.s.amt+= 0.01;
            } 
        } else {
            this.s.amt = 0
            if(this.s.amt2 < 1){
                this.s.amt2 += 0.01
            }
        }
    }
}
