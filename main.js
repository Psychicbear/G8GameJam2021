
let loadedMap = [];

//Object.keys(textures.grass).length

//this is the one you'll write your code in make sure to change the script tag in index.html to use main.js instead of test.js
let enemies, expPoints, bulletsGrp, spikesGrp, boxes, buttonGrp, doors;
let gameState = 2
const MAIN_MENU = 0; const PLAY = 1; const DEBUG = 2;
function preload(){
    loadedMap = loadJSON("things.json"); // Temporary : this is where the loaded map is stored

    tex_player =                loadImage("img/player.png");
    tex_dirt =                  loadImage("img/Dirt.png");
    tex_springGrass =           loadImage("img/Grass.png");
    tex_springGrassHillLeft =   loadImage("img/GrassHillLeft.png");
    tex_springGrassHillRight =  loadImage("img/GrassHillRight.png");
    tex_springGrassHillLeft2 =  loadImage("img/GrassHillLeft2.png");
    tex_springGrassHillRight2 = loadImage("img/GrassHillRight2.png");
    tex_spikes =                loadImage("img/spikes.png");
    //temp images for testing
    redXP = loadImage('redXP.png');
    fullHeart = loadImage('heartImages/fullHeart.png');
    halfHeart = loadImage('heartImages/halfHeart.png');
    threeQuartHeart = loadImage('heartImages/34Heart.png');
    oneQuartHeart = loadImage('heartImages/14Heart.png');

    loadSprites = loadImage('doux.png');
    animJSON = loadJSON('playerAnimations.json', (data) =>{
        walkAnimation = animationFromSpriteSheet(loadSprites, animJSON['walk'])
        runAnimation = animationFromSpriteSheet(loadSprites, animJSON['run'])
    });
}


function setup(){
    createCanvas(800, 600)
    noSmooth();
    textAlign(CENTER)
    rectMode(CENTER)
    frameRate(60)
    angleMode(DEGREES);

    enemies = new Group();
    expPoints = new Group();
    worldTiles = new Group();
    bulletsGrp = new Group();
    spikesGrp = new Group();
    boxes = new Group();
    buttonGrp = new Group();
    doors = new Group();

    player = new Player(320,320, 24, 24)
    player.s.addAnimation('walk', walkAnimation)
    player.s.setCollider('circle', 0,0,6)
    player.s.scale = 4
    player.s.debug = false
    playerHearts = new Hearts();
    floorSprite = createSprite(width / 2 , height - 30, 1280, 40)
    floorSprite.shapeColor = color(166,124,82);
    // enemy = new Enemy('red', 200, 200, 30, 30);
    playButton = new UI_Button(width/2, height*0.4, 100, 100, {'r': 255, 'g': 100, 'b': 0}, 'Play', ()=>{console.log('Button is pressed!!!'); gameState = 1})
    debugButton = new UI_Button(width/2, height*0.6, 100, 100, {'r': 255, 'g': 100, 'b': 0}, 'Map Editor', ()=>{console.log('Button is pressed!!!'); gameState = 2})
    tex_spikes.resize(gridSize, gridSize);
    tex_springGrass.resize(gridSize, gridSize);
    tex_springGrassHillLeft.resize(gridSize, gridSize);
    tex_springGrassHillRight.resize(gridSize, gridSize);
    tex_springGrassHillLeft2.resize(gridSize, gridSize);
    tex_springGrassHillRight2.resize(gridSize, gridSize);
    tex_dirt.resize(gridSize, gridSize);
    tex_player.resize(gridSize, gridSize);

    fps = new FrameRateCounter()

    //testing
    testSpike = new Spikes(625, 525, 300, 300);
    testBox = new Box(550, 475);
    door = new Door(400, 500, 500, 548);
    door2 = new Door(300, 500, 200, 548);

}


function draw(){
    background(0);
    fps.draw()
    switch(gameState){
        case MAIN_MENU:
            text()
            playButton.draw();
            debugButton.draw()
            break;

        case PLAY:
            player.s.collide(floorSprite, ()=>{
                player.airborne = 0    
            })
            player.keyInputs()
            // enemy.collisionCheck();
            playerHearts = new Hearts();
            playerHearts.loopInDraw(); //loops all needed methods for hearts
            break;

        case DEBUG:
            //Enter Debug menu draw here 
            color(0,255,100)
            textSize(20)
            background(40);
            worldSprite = new worldPlatform();
            worldSprite.draw();
          
            player.loopInDraw();


            //test objects
            //testSpike.collisionCheck();
            //enemy.loopInDraw();
            testBox.loopInDraw();
            door.loopInDraw();
            door2.loopInDraw();


            player.s.debug = true;
            
            camera.off()
            playerHearts.loopInDraw(player.curHP);
            camera.on()
            // Default Camera Zoom (Play Mode)
            camera.zoom = 1;

            //editor - Janky button creation..
            editorButtonLocation = {x: -55, y: 35, spacing: 70}
            let xLoc = editorButtonLocation.x + camera.position.x
            let yLoc = editorButtonLocation.y
            editorButton1 = new Editor_Button(xLoc,  yLoc, 50, 50,                                   tex_springGrass, '',             ()=>{ selectedTexture = "Grass", console.log("Spring Grass");})
            editorButton2 = new Editor_Button(xLoc + editorButtonLocation.spacing,     yLoc, 50, 50, tex_dirt, '',                    ()=>{ selectedTexture = "Dirt", console.log("Dirt");})
            editorButton3 = new Editor_Button(xLoc + editorButtonLocation.spacing * 2, yLoc, 50, 50, tex_springGrassHillLeft, '',     ()=>{ selectedTexture = "Grass Hill Left", console.log("Spring Grass Hill Left");})
            editorButton4 = new Editor_Button(xLoc + editorButtonLocation.spacing * 3, yLoc, 50, 50, tex_springGrassHillRight, '',    ()=>{ selectedTexture = "Grass Hill Right", console.log("Spring Grass Hill Right");})
            editorButton5 = new Editor_Button(xLoc + editorButtonLocation.spacing * 4, yLoc, 50, 50, tex_springGrassHillLeft2, '',    ()=>{ selectedTexture = "Grass Hill Left2", console.log("Spring Grass Hill Left2");})
            editorButton6 = new Editor_Button(xLoc + editorButtonLocation.spacing * 5, yLoc, 50, 50, tex_springGrassHillRight2, '',   ()=>{ selectedTexture = "Grass Hill Right2", console.log("Spring Grass Hill Right2");})
            editorButton7 = new Editor_Button(xLoc + editorButtonLocation.spacing * 6, yLoc, 50, 50, tex_spikes, '',                  ()=>{ selectedTexture = "Spikes", console.log("Spikes");})



            editorButton1.draw(); editorButton2.draw(); editorButton3.draw(); editorButton4.draw(); editorButton5.draw(); editorButton6.draw(); editorButton7.draw();
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

