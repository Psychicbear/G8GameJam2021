
let loadedMap = [];
let menuMap = [];

//Object.keys(textures.grass).length

//this is the one you'll write your code in make sure to change the script tag in index.html to use main.js instead of test.js
let enemies, expPoints, bulletsGrp, spikesGrp, boxes, buttonGrp, doors;
let gameState = 2
const MAIN_MENU = 0; const PLAY = 1; const DEBUG = 2;

function preload(){
    loadedMap = loadJSON("things.json"); // Temporary : this is where the loaded map is stored
    menuMap = loadJSON("menuMap.json");

    tex_player =                loadImage("img/player.png");
    tex_dirt =                  loadImage("img/Dirt.png");
    tex_springGrass =           loadImage("img/Grass.png");
    tex_springGrassHillLeft =   loadImage("img/GrassHillLeft.png");
    tex_springGrassHillRight =  loadImage("img/GrassHillRight.png");
    tex_springGrassHillLeft2 =  loadImage("img/GrassHillLeft2.png");
    tex_springGrassHillRight2 = loadImage("img/GrassHillRight2.png");
    tex_spikes =                loadImage("img/spikes.png");
    tex_blank =                 loadImage("img/blank.png");
    tex_jumpPad =               loadImage("img/jumpPad.png");
    tex_doorH2 =                loadImage("img/doorH2.png");

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
    // createCanvas(windowWidth,windowHeight*0.92)
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
    playButton = new UI_Button(width/2, height*0.4, 100, 100, {'r': 255, 'g': 100, 'b': 0}, 'Play', ()=>{console.log('Button is pressed!!!'); gameState = 1})
    debugButton = new UI_Button(width/2, height*0.6, 100, 100, {'r': 255, 'g': 100, 'b': 0}, 'Map Editor', ()=>{console.log('Button is pressed!!!'); gameState = 2})

    /* ============================================================================== */
    // Texture Resizing
    /* ============================================================================== */
    tex_spikes.resize(gridSize, gridSize);
    tex_springGrass.resize(gridSize, gridSize);
    tex_springGrassHillLeft.resize(gridSize, gridSize);
    tex_springGrassHillRight.resize(gridSize, gridSize);
    tex_springGrassHillLeft2.resize(gridSize, gridSize);
    tex_springGrassHillRight2.resize(gridSize, gridSize);
    tex_dirt.resize(gridSize, gridSize);
    tex_player.resize(gridSize, gridSize);
    tex_blank.resize(gridSize, gridSize);
    tex_jumpPad.resize(gridSize, gridSize);
    tex_doorH2.resize(gridSize, gridSize * 2);

    fps = new FrameRateCounter()

    //testing
    testSpike = new Spikes(625, 525, 300, 300);
    testBox = new Box(550, 475);
    door = new Door(400, 500, 500, 548);
    door2 = new Door(300, 500, 200, 548);

}


function draw(){
    background(40);
    fps.draw()
    switch(gameState){
        case MAIN_MENU:
            // LoadMapJSON(menuMap)
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

            fill(255,255,255);
            textSize(12);
            textAlign(CENTER);
            text("Sprites in World: " + allSprites.length,  + camera.position.x,camera.position.y - 260)

            /* ============================================================================== */
            // Editor Buttons
            //
            // I'm just, so, so sorry - Bridget
            /* ============================================================================== */
            //editor - Janky button creation...
            fill(255,255,255,10)
            noStroke()
            editorButtonLocation = {x: width * (-0.38), y: -200, spacing: 70}
            let xLoc = editorButtonLocation.x + camera.position.x
            let yLoc = editorButtonLocation.y + camera.position.y
            editorButton1 = new Editor_Button(xLoc,  yLoc, 50, 50,                                   tex_springGrass, '',             ()=>{ selectedTexture = "Grass", console.log("Spring Grass");})
            editorButton2 = new Editor_Button(xLoc + editorButtonLocation.spacing,     yLoc, 50, 50, tex_dirt, '',                    ()=>{ selectedTexture = "Dirt", console.log("Dirt");})
            editorButton3 = new Editor_Button(xLoc + editorButtonLocation.spacing * 2, yLoc, 50, 50, tex_springGrassHillLeft, '',     ()=>{ selectedTexture = "Grass Hill Left", console.log("Spring Grass Hill Left");})
            editorButton4 = new Editor_Button(xLoc + editorButtonLocation.spacing * 3, yLoc, 50, 50, tex_springGrassHillRight, '',    ()=>{ selectedTexture = "Grass Hill Right", console.log("Spring Grass Hill Right");})
            editorButton5 = new Editor_Button(xLoc + editorButtonLocation.spacing * 4, yLoc, 50, 50, tex_springGrassHillLeft2, '',    ()=>{ selectedTexture = "Grass Hill Left2", console.log("Spring Grass Hill Left2");})
            editorButton6 = new Editor_Button(xLoc + editorButtonLocation.spacing * 5, yLoc, 50, 50, tex_springGrassHillRight2, '',   ()=>{ selectedTexture = "Grass Hill Right2", console.log("Spring Grass Hill Right2");})
            editorButton7 = new Editor_Button(xLoc + editorButtonLocation.spacing * 6, yLoc, 50, 50, tex_spikes, '',                  ()=>{ selectedTexture = "Spikes", console.log("Spikes");})
            editorButton8 = new Editor_Button(xLoc + editorButtonLocation.spacing * 7, yLoc, 50, 50, tex_blank, '',                   ()=>{ selectedTexture = "Blank", console.log("Blank");})
            editorButton9 = new Editor_Button(xLoc + editorButtonLocation.spacing * 8, yLoc, 50, 50, tex_jumpPad, '',                 ()=>{ selectedTexture = "JumpPad", console.log("JumpPad");})
            editorButton10 = new Editor_Button(xLoc + editorButtonLocation.spacing * 9, yLoc, 50, 100, tex_doorH2, '',                ()=>{ selectedTexture = "DoorH2", console.log("DoorH2");})
            editorButtonNoClickMask = new Editor_Button(xLoc,  yLoc, 4000, 100);
            editorButton1.draw(); editorButton2.draw(); editorButton3.draw(); editorButton4.draw(); editorButton5.draw(); editorButton6.draw(); 
            editorButton7.draw(); editorButton8.draw(); editorButton9.draw(); editorButton10.draw();
            editorButtonNoClickMask.mouseIsOver(); // Prevents placing tiles while within the mask area. Mask must be the last button item.

            drawSprites();
           
            break;
    }
} 

//Takes a spritesheet image, and an array of frames, and produces as animation which can be attached to sprites
function animationFromSpriteSheet(img, frames){
    // console.log(frames)
    spriteSheet = loadSpriteSheet(img, frames)
    animation = loadAnimation(spriteSheet)
    return animation
}

function createGreyImg(img){
    img.loadPixels()
    img.originalPixels = img.pixels.map((x) => x)
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (x + y * width)*4;
            var r = img.pixels[index+0];
            var g = img.pixels[index+1];
            var b = img.pixels[index+2];
            var a = img.pixels[index+3];     
            
            var luma = r*0.299 + g*0.587 + b*0.0114;
            img.pixels[index+0] = luma;
            img.pixels[index+1] = luma;
            img.pixels[index+2] = luma;
    }
  }
  img.updatePixels();
}

async function lerpImageColour(img, lerpval){  
    await new Promise((resolve,reject) => {
        img.loadPixels()
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var index = (x + y * width)*4;
                var r = img.pixels[index+0];
                var originR = img.originalPixels[index+0];
                var g = img.pixels[index+1];
                var originG = img.originalPixels[index+1];
                var b = img.pixels[index+2];
                var originB = img.originalPixels[index+2];
                img.pixels[index+0] = lerp(r, originR, lerpval);
                img.pixels[index+1] = lerp(g, originG, lerpval);
                img.pixels[index+2] = lerp(b, originB, lerpval);
        }
      }
      img.updatePixels();
      resolve()
    })

}
