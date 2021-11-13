
let gridItem = [];
let gridSize = 50;
let gridOffset = gridSize / 2;

let timerThing = 0
let tex;

class worldPlatform {
    constructor() {
        this.worldSprite;
    }

    setup(x, y, w, h) {
        this.worldSprite = createSprite(x, y, w, h);
        if(selectedTexture == ""){
            selectedTexture = "Grass"
            this.worldSprite.addImage(tex_springGrass);
        }
        else{
            tex = textureLogic(selectedTexture)
            this.worldSprite.addImage(tex);
        }
    }

    draw(){
        let x = snap(camera.mouseX);
        let y = snap(camera.mouseY);

        // Draws a square on the grid to indicate where a block will be placed
        fill(255,255,255, 20);
        noStroke()
        rect(x, y, gridSize, gridSize);

        if (mouseDown(LEFT) && mouseIsOverButton == false){
            if(editorAddWorldObject(selectedTexture, x,y)){
                this.setup(x, y, 50, 50);
                worldTiles.add(this.worldSprite); // Add to Group()
                gridItem.push([selectedTexture, x, y])
            }
        }

        if(mouseDown(RIGHT)){}

        // L Key
        if(keyIsDown(76) && timerThing == 0) { timerThing = 1; LoadMapJSON(); 
        } 
        // M Key
        if(keyIsDown(77) && timerThing == 0) { timerThing = 1; editorSaveJSON(x, y); } 

    }// draw()

} // class worldPlatform

function snap(op) {
    // subtract offset (to center lines)
    // divide by gridSize to get row/column
    // round to snap to the closest one
    let cell = Math.round((op - gridOffset) / gridSize);
    // multiply back to gridSize scale
    // add offset to center
    return cell * gridSize + gridOffset;
} // snap()



function editorAddWorldObject(selectedTexture, x, y) {
    let temp;
    let available = true;

    if(gridItem.length > 0){
        temp = [selectedTexture, x, y];
        
        for(let i = 0; i < gridItem.length; i++) { 
            if( gridItem[i][1] == temp[1] && gridItem[i][2] == temp[2] ){
                console.log('location taken');
                available = false
            } 
        }
        
    } 
    if(available){
        console.log('location free, adding location')
    } 
    return available

} // addGridPosition


function editorSaveJSON(){
    // e.g. gridItem[["Grass"], [32, 44], [56, 123]]

    let json = {};l
    json.location = gridItem
    saveJSON(json, "things.json");
    
}


function LoadMapJSON(map) {

    if(gameState == 0){
        map = menuMap
    }
    else if(gameState == 2){
        map = loadedMap
    }
    
    for(let i = 0; i < map.location.length; i++) {
        
        item = loadedMap.location[i][0]
        xpos = loadedMap.location[i][1]
        ypos = loadedMap.location[i][2]

        worldSprite = createSprite(xpos, ypos, 48, 48);

        if(item == "Grass") { worldSprite.addImage(tex_springGrass); }
        if(item == "Dirt") { worldSprite.addImage(tex_dirt); }
        if(item == "Player") { worldSprite.addImage(tex_player); }
        if(item == "Grass Hill Left") { worldSprite.addImage(tex_springGrassHillLeft); }
        if(item == "Grass Hill Right") { worldSprite.addImage(tex_springGrassHillRight); }
        if(item == "Grass Hill Left2") { worldSprite.addImage(tex_springGrassHillLeft2); }
        if(item == "Grass Hill Right2") { worldSprite.addImage(tex_springGrassHillRight2); }
        if(item == "Spikes") { worldSprite.addImage(tex_spikes); }
        if(item == "Blank") { worldSprite.addImage(tex_blank); }
        if(item == "JumpPad") { worldSprite.addImage(tex_jumpPad); }
        if(item == "DoorH2") { worldSprite.addImage(tex_doorH2); }
        
        
        worldTiles.add(worldSprite); // Add to Group()


    }
    console.log("Map Loaded");
}


function textureLogic(textureName) {
    if(textureName == "Grass") { return tex_springGrass }
    if(textureName == "Dirt") { return tex_dirt }
    if(textureName == "Player") { return tex_player }
    if(textureName == "Grass Hill Left") { return tex_springGrassHillLeft }
    if(textureName == "Grass Hill Right") { return tex_springGrassHillRight }
    if(textureName == "Grass Hill Left2") { return tex_springGrassHillLeft2 }
    if(textureName == "Grass Hill Right2") { return tex_springGrassHillRight2 }
    if(textureName == "Spikes") { return tex_spikes }
    if(textureName == "Blank") { return tex_blank }
    if(textureName == "JumpPad") { return tex_jumpPad }
    if(textureName == "DoorH2") { return tex_doorH2 }

}

