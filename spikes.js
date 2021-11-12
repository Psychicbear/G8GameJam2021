class Spikes {
    //static spikesGrp = new Group();
    constructor(x, y){
        this.s = createSprite(625, 525, 30, 30);
        this.s.addImage(tex_spikes);
        this.s.debug = true;
        
        this.s.setCollider('rectangle', 0, 10, tex_spikes.width, tex_spikes.height - 20);
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