class Spikes {
    constructor(x, y, resX, resY){
        this.s = createSprite(x, y, 30, 30);
        this.s.addImage(tex_spikes);
        this.s.debug = true;
        this.s.immovable = true;
        this.s.setCollider('rectangle', 0, 10, tex_spikes.width, tex_spikes.height - 20);
        this.s.dmg = 1;
        this.s.addToGroup(spikesGrp);
        spikesGrp2.push(this);
        this.s.respawnPoint = {
            x: resX,
            y: resY
        };
    }

    collisionCheck(){
        player.s.collide(spikesGrp, spikeCollision)
    }
}

function spikeCollision(spriteA, spriteB){
    //respawn at designated respawn point
    player.s.position.x = spriteB.respawnPoint.x;
    player.s.position.y = spriteB.respawnPoint.y;
    player.curHP -= spriteB.dmg;
}