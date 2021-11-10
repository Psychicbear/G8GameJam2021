
let loadedMap = [];

let textures = {
    player: "img/player.png",
    spring_flatGrass: "img/grass.png"
}

//this is the one you'll write your code in make sure to change the script tag in index.html to use main.js instead of test.js
let enemies, expPoints;
let gameState = 0
function preload(){
    loadedMap = loadJSON("things.json"); // Temporary : this is where the loaded map is stored
    tex_grass = loadImage(textures.spring_flatGrass);
    tex_player = loadImage(textures.player);
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
    angleMode(DEGREES);
    enemies = new Group();
    expPoints = new Group();
    worldTiles = new Group();
    player = new Player(320,320, 24, 24)
    player.s.addAnimation('walk', walkAnimation)
    player.s.setCollider('circle', 0,0,6)
    player.s.scale = 4
    player.s.debug = true
    playerHearts = new Hearts();
    floorSprite = createSprite(640,700,1280,40)
    floorSprite.shapeColor = color(166,124,82);
    enemy = new Enemy('red', 200, 200, 30, 30);
    playButton = new UI_Button(1280/2, 720/2, 100, 100, {'r': 255, 'g': 100, 'b': 0}, 'Play', ()=>{console.log('Button is pressed!!!'); gameState = 1})
    debugButton = new UI_Button(1280/2, 480, 100, 100, {'r': 255, 'g': 100, 'b': 0}, 'Levels', ()=>{console.log('Button is pressed!!!'); gameState = 2})
    tex_grass.resize(gridSize, gridSize);
    tex_player.resize(gridSize, gridSize);
    fps = new FrameRateCounter()
}

function draw(){
    background(0);
    fps.draw()
    switch(gameState){
        case 0:
            text()
            playButton.draw();
            debugButton.draw()
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
            break;
        case 2:
            //Enter Debug menu draw here 
            color(0,255,100)
            textSize(20)
            background(40);
            drawWorld();
            worldSprite.draw();
            player.s.collide(worldTiles, ()=> {
                player.airborne = 0    
            });
        
            player.s.collide(floorSprite, ()=>{
                player.airborne = 0    
            })
            
            player.keyInputs()
            enemy.collisionCheck();
            camera.off()
            playerHearts.checkHP(player.curHP);
            playerHearts.drawHearts();
            camera.on()
            // Default Camera Zoom (Play Mode)
            camera.zoom = 1;
            drawSprites();
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
