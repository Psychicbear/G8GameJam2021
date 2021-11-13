
let loadedMap = [];

//this is the one you'll write your code in make sure to change the script tag in index.html to use main.js instead of test.js
let enemies, expPoints, bulletsGrp;
let gameState = 2
const MAIN_MENU = 0; const PLAY = 1; const DEBUG = 2;
function preload(){
    loadedMap = loadJSON("things.json"); // Temporary : this is where the loaded map is stored

    
    tex_player = loadImage("img/player.png");
    tex_dirt = loadImage("img/Dirt.png");
    tex_springGrass = loadImage("img/Grass.png");
    tex_springGrassHillLeft = loadImage("img/grassHillLeft.png");
    tex_springGrassHillRight = loadImage("img/GrassHillRight.png");
    tex_springGrassHillLeftBit = loadImage("img/grassHillLeft2.png");
    tex_springGrassHillRightBit = loadImage("img/GrassHillRight2.png");
    tex_spikes = loadImage("img/spikes.png");


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
    tex_springGrassHillLeftBit.resize(gridSize, gridSize);
    tex_springGrassHillRightBit.resize(gridSize, gridSize);
    tex_dirt.resize(gridSize, gridSize);
    tex_player.resize(gridSize, gridSize);

    fps = new FrameRateCounter()
    
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
            //enemy.loopInDraw();
            camera.off()
            playerHearts.loopInDraw(player.curHP);
            camera.on()
            // Default Camera Zoom (Play Mode)
            camera.zoom = 1;

            //editor - Janky button creation..
            editorButtonLocation = {x: -55, y: 35, spacing: 70}
            let xLoc = editorButtonLocation.x + camera.position.x
            let yLoc = editorButtonLocation.y
            editorButton1 = new Editor_Button(xLoc,  yLoc, 50, 50,                                   tex_springGrass, '',             ()=>{ selectedTexture = tex_springGrass, console.log("Spring Grass");})
            editorButton2 = new Editor_Button(xLoc + editorButtonLocation.spacing,     yLoc, 50, 50, tex_dirt, '',                    ()=>{ selectedTexture = tex_dirt, console.log("Dirt");})
            editorButton3 = new Editor_Button(xLoc + editorButtonLocation.spacing * 2, yLoc, 50, 50, tex_springGrassHillLeft, '',     ()=>{ selectedTexture = tex_springGrassHillLeft, console.log("Spring Grass Hill Left");})
            editorButton4 = new Editor_Button(xLoc + editorButtonLocation.spacing * 3, yLoc, 50, 50, tex_springGrassHillRight, '',    ()=>{ selectedTexture = tex_springGrassHillRight, console.log("Spring Grass Hill Right");})
            editorButton5 = new Editor_Button(xLoc + editorButtonLocation.spacing * 4, yLoc, 50, 50, tex_springGrassHillLeftBit, '',  ()=>{ selectedTexture = tex_springGrassHillLeftBit, console.log("Spring Grass Hill Lef2t");})
            editorButton6 = new Editor_Button(xLoc + editorButtonLocation.spacing * 5, yLoc, 50, 50, tex_springGrassHillRightBit, '', ()=>{ selectedTexture = tex_springGrassHillRightBit, console.log("Spring Grass Hill Right2");})
            editorButton7 = new Editor_Button(xLoc + editorButtonLocation.spacing * 6, yLoc, 50, 50, tex_spikes, '',                  ()=>{ selectedTexture = tex_spikes, console.log("Spikes");})



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