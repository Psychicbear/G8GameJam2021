let enemyDead = [];
class Enemy {
    constructor(colour, x, y, w, h, img, type = 'melee', hp = 1, attackDmg = 1, XP = 5, speed = 5){
        this.sprite = createSprite(x, y, w, h);
        enemies.add(this.sprite);
        this.type = type;
        this.hp = hp;
        this.attackDmg = attackDmg;
        this.colour = colour;
        this.XPAmt = XP;
        this.speed = speed;
        this.img = img;
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
        this.sprite.setCollider('rectangle', 0, 0, 0, 0);
        this.sprite.visible = false;
        enemyDead.push(this);
        this.sprite.remove(); //above might not work, since it has to be constantly checked until animation is done, and can't with this current structure
        this.dropXP();
        //add sprite to
   
        //}
    }

    dropXP(){
        //creates instance of xp class
        for(let i = 0; i < this.XPAmt; i++){
            let f = new XP(this.sprite.position.x, this.sprite.position.y, this.colour, redXP);
            f.sprite.addToGroup(expPoints);

        }

    }

    move(){
//air tiles
    }

    collisionCheck(){
        //collide with floor and walls
        //collide with other enemies?
  

    }
    pickup(){ //should add to player class instead, rename pickupXP
        this.remove();
     
        //add to player colour
    }

    loopInDraw(){ //function called in draw that holds all other functions that need to be looped
        this.collisionCheck();
        this.move();
    }

}

class XP {
    constructor(x, y, colour, img){ //currently have to input img. change to a function that does it automatically?
        this.sprite = createSprite(x + random(-20, 20), y + random(-20, 20)); //x and y are the locations of the enemy
        img.resize(random(5, 15), 0); //have different images are different sizes later, plus colours
        this.sprite.addImage(colour, img);
        this.sprite.colour = colour;
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