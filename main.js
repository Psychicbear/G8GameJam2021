
let loadedMap = [];



//this is the one you'll write your code in make sure to change the script tag in index.html to use main.js instead of test.js
let enemies, expPoints;
let gameState = 0
function preload(){
    loadedMap = loadJSON("things.json"); // Temporary : this is where the loaded map is stored

    
    tex_player = loadImage("img/player.png");
    tex_dirt = loadImage("img/Dirt.png");
    tex_springGrass = loadImage("img/Grass.png");
    tex_springGrassHillLeft = loadImage("img/grassHillLeft.png");
    tex_springGrassHillRight = loadImage("img/GrassHillRight.png");
    tex_springGrassHillLeftBit = loadImage("img/grassHillLeft2.png");
    tex_springGrassHillRightBit = loadImage("img/GrassHillRight2.png");


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
    floorSprite = createSprite(width / 2 , height - 30, 1280, 40)
    floorSprite.shapeColor = color(166,124,82);
    // enemy = new Enemy('red', 200, 200, 30, 30);
    playButton = new UI_Button(width/2, height*0.4, 100, 100, {'r': 255, 'g': 100, 'b': 0}, 'Play', ()=>{console.log('Button is pressed!!!'); gameState = 1})
    debugButton = new UI_Button(width/2, height*0.6, 100, 100, {'r': 255, 'g': 100, 'b': 0}, 'Map Editor', ()=>{console.log('Button is pressed!!!'); gameState = 2})

    tex_springGrass.resize(gridSize, gridSize);
    tex_springGrassHillLeft.resize(gridSize, gridSize);
    tex_springGrassHillRight.resize(gridSize, gridSize);
    tex_springGrassHillLeftBit.resize(gridSize, gridSize);
    tex_springGrassHillRightBit.resize(gridSize, gridSize);
    tex_dirt.resize(gridSize, gridSize);
    tex_player.resize(gridSize, gridSize);

    fps = new FrameRateCounter()

    //editor 
    editorButtonLocation = {x: 50, y: 50, spacing: 70}
    editorButton1= new Editor_Button(editorButtonLocation.x, editorButtonLocation.y, 50, 50,                                    tex_springGrass, '',             ()=>{ selectedTexture = tex_springGrass, console.log("Spring Grass");})
    editorButton2= new Editor_Button(editorButtonLocation.x + editorButtonLocation.spacing, editorButtonLocation.y, 50, 50,     tex_dirt, '',                    ()=>{ selectedTexture = tex_dirt, console.log("Dirt");})
    editorButton3= new Editor_Button(editorButtonLocation.x + editorButtonLocation.spacing * 2, editorButtonLocation.y, 50, 50, tex_springGrassHillLeft, '',     ()=>{ selectedTexture = tex_springGrassHillLeft, console.log("Spring Grass Hill Left");})
    editorButton4= new Editor_Button(editorButtonLocation.x + editorButtonLocation.spacing * 3, editorButtonLocation.y, 50, 50, tex_springGrassHillRight, '',    ()=>{ selectedTexture = tex_springGrassHillRight, console.log("Spring Grass Hill Right");})
    editorButton5= new Editor_Button(editorButtonLocation.x + editorButtonLocation.spacing * 4, editorButtonLocation.y, 50, 50, tex_springGrassHillLeftBit, '',  ()=>{ selectedTexture = tex_springGrassHillLeftBit, console.log("Spring Grass Hill Lef2t");})
    editorButton6= new Editor_Button(editorButtonLocation.x + editorButtonLocation.spacing * 5, editorButtonLocation.y, 50, 50, tex_springGrassHillRightBit, '', ()=>{ selectedTexture = tex_springGrassHillRightBit, console.log("Spring Grass Hill Right2");})

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
            // enemy.collisionCheck();
            playerHearts = new Hearts();
            playerHearts.checkHP(player.curHP);
            playerHearts.drawHearts();
            break;

        case 2:
            //Enter Debug menu draw here 
            color(0,255,100)
            textSize(20)
            background(40);
            worldSprite = new worldPlatform();
            worldSprite.draw();

            player.s.collide(worldTiles, ()=> { player.airborne = 0 });
            player.s.collide(floorSprite, ()=>{ player.airborne = 0 });
            player.keyInputs()

            // Default Camera Zoom (Play Mode)
            camera.zoom = 1;

            editorButton1.draw(); editorButton2.draw(); editorButton3.draw(); editorButton4.draw(); editorButton5.draw(); editorButton6.draw(); 

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
