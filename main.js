
let loadedMap = [];

let textures = {
    player: "img/player.png",
    spring_flatGrass: "img/grass.png"
}

//this is the one you'll write your code in make sure to change the script tag in index.html to use main.js instead of test.js
let enemies, expPoints;
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
    createCanvas(720, 720)
    frameRate(60)
    angleMode(DEGREES);
    enemies = new Group();
    expPoints = new Group();
    terrainGroup = new Group();

    player = new Player(320,320, 24, 24)
    player.s.addAnimation('walk', walkAnimation)
    player.s.setCollider('circle', 0,0,6)
    player.s.scale = 4
    player.s.debug = true

    floorSprite = createSprite(640,700,1280,40)
    floorSprite.shapeColor = color(166,124,82);
    enemy = new Enemy('red', 200, 200, 30, 30);
    flyingen = new Flying('blue', 300, 300, 30, 20, redXP, 'flying', 30);
    console.log(flyingen);
    
    //dino = createSprite(320,320, 24, 24)
    //dino.setCollider('rectangle',0,0,24,24)
    //dino.debug = true
    //dino.scale = 4

    tex_grass.resize(gridSize, gridSize);
    tex_player.resize(gridSize, gridSize);
    worldTiles = new Group();
    // Default Camera Zoom (Play Mode)
    camera.zoom = 1;

    drawWorld();
} // setup()

function draw(){
    framerate = getFrameRate()
    //console.log(framerate)
    color(0,255,100)
    textSize(20)
    //text('FPS:' + framerate, 50,50)
    background(40);
    worldSprite.draw();

    player.s.collide(worldTiles, ()=> {
        player.airborne = 0    
    });

    player.s.collide(floorSprite, ()=>{
        player.airborne = 0    
    })
    
    player.keyInputs()
    enemy.loopedFunction(); //contains all methods that need to be looped in draw
    
    playerHearts = new Hearts();
    playerHearts.checkHP(player.curHP);
    playerHearts.drawHearts();


    //animationHandling()
    drawSprites();
}


//Takes a spritesheet image, and an array of frames, and produces as animation which can be attached to sprites
function animationFromSpriteSheet(img, frames){
    console.log(frames)
    spriteSheet = loadSpriteSheet(img, frames)
    animation = loadAnimation(spriteSheet)
    return animation
}
