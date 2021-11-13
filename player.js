let freeCamera = false

class Player{
    constructor(x,y,w,h){
        this.s = createSprite(x,y,w,h)
        //this.s.maxSpeed = 10
        this.maxHP = 12
        this.curHP = 12
        this.airborne = 0
        this.airTime = 30
        this.attackDmg = 1
        this.attackSpd = 8
        this.attack = 0
        this.hurtTime = 90
        this.hurt = 0
        this.s.XP = 0;

        this.lookUp = false;
        this.bullets = [];
        this.bulletTimer = 300;
        this.bulletCap = 25;

        //checkpoint
    }
    createCheckpoint(x, y){
        this.c = createSprite(x, y, 50, 50);
        this.c.immovable = true;
        this.c.addToGroup(checkpoints);
    }
    respawnPlayer(){
        this.curHP = this.maxHP; //reset health
        this.XP = this.c.XP;
        this.s.position.x = this.c.position.x;
        this.s.position.y = this.c.position.y;
        
    }

    keyInputs(){
        // camera.position.y = player.s.position.y - height *0.35
        //Move left or right
        if(keyIsDown(RIGHT_ARROW) && keyIsDown(LEFT_ARROW)){
            this.s.velocity.x = 0;
        } 
        
        else if(keyIsDown(RIGHT_ARROW)){
            this.s.velocity.x = lerp(this.s.velocity.x, 8,0.1)
        } 
        
        else if(keyIsDown(LEFT_ARROW)){
            this.s.velocity.x = lerp(this.s.velocity.x, -8,0.1)
        } 
        
        else {
            this.s.velocity.x = 0
        }


        camera.position.x = lerp(camera.position.x, player.s.position.x, 0.1)
        camera.position.y = player.s.position.y - 50

        // F Key
        // if(keyWentDown(70) && timerThing == 0) { 
        //     if(freeCamera == true){
        //         timerThing = 1; 
        //         freeCamera = true
        //         // camera.position.x = camera.position.x  
        //         console.log(freeCamera)
        //     }

        //     else{
        //         timerThing = 1;
        //         freeCamera = false
        //         camera.position.x = lerp(camera.position.x, player.s.position.x, 0.1)
        //         console.log(freeCamera)
        //     }

        // }

        if(keyIsDown(32) && this.airborne < this.airTime){//If jump button held and this.airborne timer less than this.airTime
            this.s.velocity.y = lerp(this.s.velocity.y, -8, 0.5)
            this.airborne++
        } else if(keyWentUp(32) && this.airborne){//If jump button released and this.airborne == true (not 0)
            this.airborne = this.airTime//Disallow player to press jump again until this.airborne set to 0
            this.s.velocity.y = lerp(this.s.velocity.y, 10, 0.08)
        } else{
            this.s.velocity.y = lerp(this.s.velocity.y, 10, 0.08)
            this.airborne = this.airTime
        }

        if(keyIsDown(UP_ARROW)){ // up arrow used for player looking up to shoot
            this.lookUp = true;
        } else {
            this.lookUp = false;
        }
        //change mirroring of animation based on direction
        if(this.s.velocity.x > 0.0001){ //if x velocity is positive (right) make animation face right
            this.s.mirrorX(1);
        } else if(this.s.velocity.x < -0.0001){ //if x velocity is negative (left) make animation face right
            this.s.mirrorX(-1);
        } 

        let cameraMoveRate = 25;
        // W
        if(keyIsDown(87)) {
            camera.position.y -= cameraMoveRate
        }
        // S
        if(keyIsDown(83)) {
            camera.position.y += cameraMoveRate
        }
        // A
        if(keyIsDown(65)) {
            camera.position.x -= cameraMoveRate
        }
        // D
        if(keyIsDown(68)) {
            camera.position.x += cameraMoveRate
        }
       
    }

    rangeAttack(){
        //shooting
        if(keyIsDown(88) && this.bulletTimer > this.bulletCap && this.bullets.length < 10){ //if X key is down. limit of 10 bullets on screen
            this.makeBullet(); //create new bullet
            this.bulletTimer = 0;
        } 

        //placeholder
    }

    makeBullet(){
        let tempSprite = createSprite(this.s.position.x, this.s.position.y, 5, 5); //bullet currently default sprite square
        tempSprite.status = 'active';
        //tempSprite.setCollider("circle", 0, 0, this.width);
        if(this.lookUp){
            tempSprite.addSpeed(this.attackSpd, 270);
        } else if(this.s.mirrorX() == 1){ //facing right
            tempSprite.addSpeed(this.attackSpd, 0);
        } else if (this.s.mirrorX() == -1){ //facing left
            tempSprite.addSpeed(this.attackSpd, 180);
        }
        tempSprite.addToGroup(bulletsGrp);
        this.bullets.push(tempSprite);
    }
    
    bulletsRemove(){
        for (let i = this.bullets.length; i > 0; i--){ //done weirdly just in case need to make it a p5 shape. otherwise player.bullets can be p5 group, simplify all this
            if(this.bullets[i - 1].status == 'removed' || !this.bullets[i - 1].visible){
                this.bullets[i - 1].remove();
                this.bullets.splice(i - 1, 1); 
            } else if (this.bullets[i - 1].status == 'active'){
                bulletsGrp.collide(worldTiles, (spriteA) => spriteA.status = 'removed');
            } else {
                console.log("error with bullet removal");
            }
        }
    }

    move(direction){
        //placeholder
        variable = direction
    }

    loopInDraw(){
        this.s.collide(worldTiles, (playerSprite, tileSprite)=> {
            if(playerSprite.position.x > tileSprite.position.x - ((gridSize/2) + 1) || playerSprite.position.x < tileSprite.position.x + ((gridSize/2) + 1)){
                if(playerSprite.position.y < tileSprite.position.y - ((gridSize/2) + 1)){
                    player.airborne = 0
                } else{
                    player.airborne = player.airTime
                    player.s.velocity.x = 0
                }
            } 
                 
        });
        this.s.collide(floorSprite, ()=>{ player.airborne = 0 });
        checkpoints.collide(this.s, hitCheckpoint);
        this.keyInputs();
        this.rangeAttack();
        if(this.bullets.length > 0){
            this.bulletsRemove();
        }
        this.bulletTimer++;
    }

    hurtPlayer(dmg, hurtTime){

    }
}

function lerpVelocity(x,y, magnitude){
    
    newVelX = lerp(this.player.s.velocity.x, x, magnitude)
    originY = this.player.s.velocity.y
    this.s.setVelocity(lerp)
}

function hitCheckpoint(playerSprite, checkpointSprite){
    checkpointSprite.XP = playerSprite.XP;
    //need a way to set the current checkpoint??

    
    /*
    for(let i = enemyDead.length; i > 0; i--){ //confirm enemy deaths
        enemyDead[i - 1].sprite.setCollider('rectangle', 0, 0, 50, 50);
        enemyDead[i - 1].sprite.visible = true;
        enemyDead[i - 1].splice(i - 1, 1);
    }
    */
}

//needs collisionCheck() function: bullets, floor, enemies, boxes, buttons, walls etc.