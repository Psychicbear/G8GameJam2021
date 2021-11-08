class Player{
    constructor(x,y,w,h){
        this.s = createSprite(x,y,w,h)
        this.s.maxSpeed = 10
        this.maxHP = 12
        this.curHP = 12
        this.airborne = 0
        this.airTime = 30
        this.attackDmg = 1
        this.attackSpd = 70
        this.attack = 0
        this.hurtTime = 90
        this.hurt = 0
    }

    keyInputs(){
        // camera.position.y = player.s.position.y - height *0.35
        //Move left or right
        if(keyIsDown(RIGHT_ARROW) && keyIsDown(LEFT_ARROW)){
            this.s.addSpeed(0,0)
        } 
        
        else if(keyIsDown(RIGHT_ARROW)){
            console.log('Move Right')
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
    }

    attack(){
        //placeholder
    }

    move(direction){
        //placeholder
        variable = direction
    }

    jump(){
        this.s.addSpeed(30,-90)
        this.airborne++
    }

}

function onGround(){
    jump = false;
}