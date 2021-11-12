class Spikes {
    //static spikesGrp = new Group();
    constructor(x, y){
        this.s = createSprite(300, 300, 30, 30);
        this.s.addToGroup(Spikes.spikesGrp);

    }

    collisionCheck(){
        Spikes.spikesGrp.collide(player.s, spikeCollision(spriteA, spriteB))

    }

   
}

function spikeCollision(spriteA, spriteB){
    spriteB.velocity.x *= -1;
    spriteB.velocity.y *= -1;


}