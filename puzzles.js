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
        boxes.collide(floorSprite); //remove later
        console.log(this.s.position.y - this.s.height/2)
        console.log(player.s.position.y)
    }

    loopInDraw(){
        this.s.setSpeed(10, 90); //gravity
        this.collisionCheck();
    }
}
