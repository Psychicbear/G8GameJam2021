
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
        this.img = img
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
        this.sprite.remove(); //above might not work, since it has to be constantly checked until animation is done, and can't with this current structure
        this.dropXP();
   
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

    }

    collisionCheck(){
        //collide with floor and walls
        //collide with other enemies?
  

    }
    pickup(){ //should add to player class instead, rename pickupXP
        this.remove();
     
        //add to player colour
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