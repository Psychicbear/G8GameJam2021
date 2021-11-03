//this is the one you'll write your code in make sure to change the script tag in index.html to use main.js instead of test.js
let runframes = [
    {'name':'run1', 'frame':{'x':408, 'y': 0, 'width': 24, 'height': 24}},
    {'name':'run2', 'frame':{'x':432, 'y': 0, 'width': 24, 'height': 24}},
    {'name':'run3', 'frame':{'x':456, 'y': 0, 'width': 24, 'height': 24}},
    {'name':'run4', 'frame':{'x':480, 'y': 0, 'width': 24, 'height': 24}},
    {'name':'run5', 'frame':{'x':504, 'y': 0, 'width': 24, 'height': 24}}
]

let walkframes = [
    {'name':'walk1', 'frame':{'x':72, 'y': 0, 'width': 24, 'height': 24}},
    {'name':'walk2', 'frame':{'x':96, 'y': 0, 'width': 24, 'height': 24}},
    {'name':'walk3', 'frame':{'x':120, 'y': 0, 'width': 24, 'height': 24}},
    {'name':'walk4', 'frame':{'x':144, 'y': 0, 'width': 24, 'height': 24}},
    {'name':'walk5', 'frame':{'x':168, 'y': 0, 'width': 24, 'height': 24}}
]
let enemies, expPoints;
function preload(){
    redXP = loadImage('GameJam G9.png');
    loadSprites = loadImage('doux.png')
    walkAnimation = animationFromSpriteSheet(loadSprites, walkframes)
    runAnimation = animationFromSpriteSheet(loadSprites, runframes)
}

function setup(){
    createCanvas(1280, 720)
    enemies = new Group();
    expPoints = new Group();
    enemy = new Enemy();
    enemy.setup('red', 200, 200, 30, 30);
    dino = createSprite(320,320, 24, 24)
    dino.addAnimation('run', runAnimation)
    dino.addAnimation('walk', walkAnimation)
    dino.setCollider('rectangle',0,0,24,24)
    dino.debug = true
    dino.scale = 4
    


}

function draw(){
    background(0);
    enemy.collisionCheck();

    animationHandling()
    drawSprites();
}


function animationHandling(){
    dino.mouseUpdate()
    if(dino.mouseIsOver){
       dino.changeAnimation('run')
       console.log('Ruuuuuuun!!!') 
    } else {
        dino.changeAnimation('walk')
    }
}

//Takes a spritesheet image, and an array of frames, and produces as animation which can be attached to sprites
function animationFromSpriteSheet(img, frames){
    spriteSheet = loadSpriteSheet(img, frames)
    return loadAnimation(spriteSheet)
}