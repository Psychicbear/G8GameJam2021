//this is the one you'll write your code in make sure to change the script tag in index.html to use main.js instead of test.js
let enemies, expPoints;
let gameState = 0
function preload(){
    //temp images for testing
    redXP = loadImage('redXP.png');
    fullHeart = loadImage('heartImages/fullHeart.png');
    halfHeart = loadImage('heartImages/halfHeart.png');
    threeQuartHeart = loadImage('heartImages/34Heart.png');
    oneQuartHeart = loadImage('heartImages/14Heart.png');

    loadSprites = loadImage('doux.png')
    animJSON = loadJSON('playerAnimations.json', (data) =>{
        walkAnimation = animationFromSpriteSheet(loadSprites, animJSON['walk'])
        runAnimation = animationFromSpriteSheet(loadSprites, animJSON['run'])
    })
}


function setup(){
    createCanvas(1280, 720)
    textAlign(CENTER)
    rectMode(CENTER)
    frameRate(60)
    enemies = new Group();
    expPoints = new Group();
    terrainGroup = new Group();
    player = new Player(320,320, 24, 24)
    player.s.addAnimation('walk', walkAnimation)
    player.s.setCollider('circle', 0,0,6)
    player.s.scale = 4
    player.s.debug = true
    floorSprite = createSprite(640,700,1280,20)
    enemy = new Enemy('red', 200, 200, 30, 30);
    button = new UI_Button(1280/2, 720/2, 100, 100, {'r': 255, 'g': 100, 'b': 0}, 'Play', ()=>{console.log('Button is pressed!!!'); gameState = 1})
    fps = new FrameRateCounter()
}

function draw(){
    background(0);
    fps.draw()
    switch(gameState){
        case 0:
            text()
            button.draw();
            break;
        case 1:
            player.s.collide(floorSprite, ()=>{
                player.airborne = 0    
            })
            player.keyInputs()
            enemy.collisionCheck();
            playerHearts = new Hearts();
            playerHearts.checkHP(player.curHP);
            playerHearts.drawHearts();
            drawSprites();
            break;
        case 2:
            //Enter Debug menu draw here 
            break;
        

    }
}


//Takes a spritesheet image, and an array of frames, and produces as animation which can be attached to sprites
function animationFromSpriteSheet(img, frames){
    console.log(frames)
    spriteSheet = loadSpriteSheet(img, frames)
    animation = loadAnimation(spriteSheet)
    return animation
}
