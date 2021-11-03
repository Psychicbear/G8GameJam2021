//this is the one you'll write your code in make sure to change the script tag in index.html to use main.js instead of test.js

let enemies, expPoints;
function preload(){
    redXP = loadImage('redXP.png');

}

function setup(){
    createCanvas(1280, 720)

    enemies = new Group();
    expPoints = new Group();

    enemy = new Enemy('red', 200, 200, 30, 30);

    


}

function draw(){
    background(0);

    enemy.collisionCheck();


    drawSprites();
}


