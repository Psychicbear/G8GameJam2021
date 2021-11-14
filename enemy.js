let enemyDead = [];
class Enemy {
    constructor(x, y, w, h, img, type = 'melee', hp = 1, attackDmg = 1, XP = 5, speed = 5){
        this.s = createSprite(x, y, w, h);

        this.type = type;
        this.hp = hp;
        this.attackDmg = attackDmg;
        this.XPAmt = XP;
        this.speed = speed;
        this.anim = img;
        this.s.debug = true
        this.s.setCollider('circle', 0, -2, 20)
        this.s.direction = -2;
        
        this.s.addAnimation('walk', this.anim);
        enemies.add(this.s);
        enemies2.push(this);
       
        
    }

    takeDmg(amt){
        this.hp -= amt;
        //play animation
        //play sound
        if(this.hp - amt <= 0){
            this.defeated(); //have defeat inside take dmg, so every time take damage, checks if it should be dead?
            
        }
    }

    defeated(){
        //defeat animation
        //defeat sound
        //when animation reach last frame:
        //if(this.animation.getFrame() == this.animation.getLastFrame() && this.animation.getAnimationLabel() == 'defeat'){
        this.dropXP();
        this.s.setCollider('rectangle', 0, 0, 0, 0);
        this.s.visible = false;
        enemyDead.push(this);
        this.s.remove(); //above might not work, since it has to be constantly checked until animation is done, and can't with this current structure
        
        //add sprite to
   
        //}
    }

    dropXP(){
        //creates instance of xp class
        for(let i = 0; i < this.XPAmt; i++){
            let f = new XP(this.s.position.x, this.s.position.y, redXP);
            f.sprite.addToGroup(expPoints);

        }

    }

    move(){
       this.s.velocity.x = this.s.direction
    }

    collisionCheck(){
        //stop collision happening lots. invincibility frames......too late to do?
        enemies.collide(player.s, () => 
        {
            player.curHP -= this.attackDmg;
            player.s.velocity.x *= -1;
            player.s.velocity.y *= -1;
        })
        enemies.collide(bulletsGrp, () => this.defeated())
        enemies.collide(worldTiles)
        enemies.collide(floorSprite)
        //enemies.collide(airTiles, changeDirection)
        console.log(frameCount)
        if(frameCount%100===0){
            console.log("sadf")
            this.changeDirection()
        }
        //bullets collide with enemy _______________________________________________________
  

    }
 

    loopInDraw(){ //function called in draw that holds all other functions that need to be looped
        
        
        if(this.s.velocity.x > 0.0001){ //if x velocity is positive (right) make animation face right
            this.s.mirrorX(1);
        } else if(this.s.velocity.x < -0.0001){ //if x velocity is negative (left) make animation face right
            this.s.mirrorX(-1);
        } 
        //this.s.velocity.y = 10; //gravity
       
        this.collisionCheck();
        this.move();

        console.log("enemy x velocity: " + this.s.velocity.x)
    }
    changeDirection(){
        console.log(this)
        if(this.s.direction == 2){
            this.s.direction = -2;
        } else {
            this.s.direction = 2;
        }
    
    }

}

class XP {
    constructor(x, y,img){ //currently have to input img. change to a function that does it automatically?
        this.sprite = createSprite(x + random(-20, 20), y + random(-20, 20)); //x and y are the locations of the enemy
        img.resize(10, 0); //have different images are different sizes later, plus colours
        this.sprite.addImage(img);
    }


}

class Flying extends Enemy {
    constructor(colour, x, y, w, h, img, type, hp = 200, attackDmg, XP, speed){ //add defaults to each different class?
        super(colour, x, y, w, h, img, type, hp, attackDmg, XP, speed); //have defaults, but defaults can be changed if need to
    }

    move(){
        //movement logic. Air tiles?
    }

    //must rewrite over enemy move() - polymorphism?
    //have another method that is just all the other methods that need to be called inn draw?
}

class Range extends Enemy {
    //must add to enemy move () - inefficient to rewrite, so how to add? Completely new function?
    //melee move and range movement?
    
}

//boss class? Surely we need at least a final boss. making it jump on platforms would be difficult unless  it was coded specifically to the room
// maybe it should be a flying boss? then the boss class could be a sublass of flying. Can you do sub sublclasses?


//does super basically refer to the parent class? used like this.?

/*
move() {
    super.move(); //adds movement from parent class
    //extra movement
}
*/

//spawner, pass coordinates to the right subclass

//air blocks to stop enemy moving

//wrapped draw stuff
//do we have to call movement for all enemies? how do?