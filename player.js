class Player{
    constructor(x,y,w,h){
        this.s = createSprite(x,y,w,h)
        this.s.maxSpeed = 10
        this.maxHP = 12
        this.curHP = 12
        this.airborne = 0
        this.airTime = 30
        this.attackDmg = 1
        this.attackSpd = 8
        this.attack = 0
        this.hurtTime = 90
        this.hurt = 0

        this.lookUp = false;
        this.bullets = [];
        this.bulletTimer = 300;
        this.bulletCap = 25;
    }

    keyInputs(){
        // camera.position.y = player.s.position.y - height *0.35
        //Move left or right
        if(keyIsDown(RIGHT_ARROW) && keyIsDown(LEFT_ARROW)){
            this.s.addSpeed(0,0)
        } 
        
        else if(keyIsDown(RIGHT_ARROW)){
            // console.log('Move Right')
            this.s.addSpeed(10,0)
            camera.position.x = player.s.position.x
        } 
        
        else if(keyIsDown(LEFT_ARROW)){
            this.s.addSpeed(10,180)
            camera.position.x = player.s.position.x
        } 
        
        else {
            this.s.velocity.lerp(createVector(0 , this.s.velocity.y), 0.1)
        }

        if(keyIsDown(32) && this.airborne < this.airTime){//If jump button held and this.airborne timer less than this.airTime
            this.jump()
        } else if(keyWentUp(32) && this.airborne){//If jump button released and this.airborne == true (not 0)
            this.airborne = this.airTime//Disallow player to press jump again until this.airborne set to 0
            this.s.addSpeed(10, 90)
        } else{this.s.addSpeed(10,90)}

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
            if(this.bullets[i - 1].status == 'removed'){
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

    jump(){
        this.s.addSpeed(30,-90)
        this.airborne++
    }

    loopInDraw(){
        this.s.collide(worldTiles, ()=> { player.airborne = 0 });
        this.s.collide(floorSprite, ()=>{ player.airborne = 0 });
        this.keyInputs();
        this.rangeAttack();
        if(this.bullets.length > 0){
            this.bulletsRemove();
        }
        this.bulletTimer++;
    }
}
function onGround(){
    jump = false;
}

//needs collisionCheck() function: bullets, floor, enemies, boxes, buttons, walls etc.