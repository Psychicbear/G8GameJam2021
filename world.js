
let timerThing = 0
let tex;

class worldPlatform {
    constructor() {
        this.worldSprite;
    }

    setup(x, y, w, h) {
        this.worldSprite = createSprite(x, y, w, h);
        this.worldSprite.debug = true;

        // Determines the texture to be used by default
        if(selectedTexture == ""){
            selectedTexture = "Grass"
            this.worldSprite.addImage(tex_springGrass);
        }
        else{ // calls the textureLogic method to get the correct texture to paint
            tex = textureLogic(selectedTexture)
            this.worldSprite.addImage(tex);
        }
    }

    draw(){
        let x = snap(camera.mouseX);
        let y = snap(camera.mouseY);

        textSize(10)
        textAlign(RIGHT)
        text("x: "+ x + "\n y:" + y, x- 30, y)

        // Draws a square on the grid to indicate where a block will be placed
        fill(255,255,255, 20);
        noStroke()
        rect(x, y, gridSize, gridSize);

        if (mouseWentDown(LEFT) && mouseIsOverButton == false){
            if(editorAddWorldObject(selectedTexture, x,y)){ // Checks with the method that the tile is free

                this.setup(x, y, gridSize, gridSize);

                

                // Custom Colliders for blocks
                if(selectedTexture == "Grass Hill Right"){
                    this.worldSprite.setCollider("circle", -20, 20, 40, );
                    gridItem.push([selectedTexture, x, y])
                    worldTiles.add(this.worldSprite); // Add to Group()
                }
                else if(selectedTexture == "Grass Hill Left"){
                    this.worldSprite.setCollider("circle", 20, 20, 40, );
                    gridItem.push([selectedTexture, x, y])
                    worldTiles.add(this.worldSprite); // Add to Group()
                }
                else if(selectedTexture == "JumpPad"){
                    this.worldSprite.setCollider("rectangle", 0, 25, gridSize, 4);
                    gridItem.push([selectedTexture, x, y])
                    worldTiles.add(this.worldSprite); // Add to Group()
                }
                else if(selectedTexture == "Spikes"){
                    this.worldSprite.setCollider("rectangle", 0, 10, gridSize, 30);
                    this.worldSprite.addToGroup(this.spikesGrp);
                    gridItem.push([selectedTexture, x, y])
                }
                else{
                    this.worldSprite.setCollider("rectangle", 0, 0, gridSize, gridSize);
                    gridItem.push([selectedTexture, x, y])
                    worldTiles.add(this.worldSprite); // Add to Group()
                    
                }

            }
        }

        if(mouseWentDown(RIGHT)){

            if(!editorAddWorldObject(selectedTexture, x,y)){ // Checks with the method that the tile is taken
                console.log("remove")              

                // console.log(gridItem.splice(this.worldSprite, 1))

                //gridItem.splice(this.worldSprite)
                // worldTiles.remove(this.worldSprite)
            }
        }

        // L Key
        if(keyIsDown(76) && timerThing == 0) { timerThing = 1; LoadMapJSON(); } 
        // M Key
        if(keyIsDown(77) && timerThing == 0) { timerThing = 1; editorSaveJSON(x, y); } 

    }// draw()

} // class worldPlatform

/* ============================================================================== */
// World Grid System
//
// Creates a grid and snaps the current XY position to
// the closest grid tile to the mouse pointer
/* ============================================================================== */
let gridItem = [];
let gridSize = 50;
let gridOffset = gridSize / 2;
function snap(op) {

    let tile = Math.round((op - gridOffset) / gridSize);

    return tile * gridSize + gridOffset;
} // snap()


/* ============================================================================== */
// Add World Objects to Array
//
// Only allows placement if a tile does not exist in the XY position of the grid
/* ============================================================================== */
function editorAddWorldObject(selectedTexture, x, y) {
    let temp;
    let available = true;

    if(gridItem.length > 0){
        temp = [selectedTexture, x, y];
        
        for(let i = 0; i < gridItem.length; i++) { 
            if( gridItem[i][1] == temp[1] && gridItem[i][2] == temp[2] ){
                // console.log('location taken');
                available = false
            } 
        }
        
    } 
    if(available){
        // console.log('location free, adding location')
    } 
    return available

} // addGridPosition

/* ============================================================================== */
// Map Saving
//
// Takes the contents of the gridItem array and writes it to a json (user is prompted)
// e.g. gridItem[["Grass"], [32, 44], [56, 123]]
/* ============================================================================== */
function editorSaveJSON(){
    
    let json = {};
    json.location = gridItem
    saveJSON(json, "things.json");
}

/* ============================================================================== */
// Map Loading
//
// Reads a json file that has the texture name and the coordinates of a tile.
// Assigns an image based on the texture name tag (item).
/* ============================================================================== */
function LoadMapJSON(map) {

    if(gameState == 0){
        map = loadedMap
    }
    else if(gameState == 2){
        map = loadedMap
    }
    
    for(let i = 0; i < map.location.length; i++) {
        
        item = loadedMap.location[i][0]
        xpos = loadedMap.location[i][1]
        ypos = loadedMap.location[i][2]

        if(item != "DoorH2"){
            worldSprite = createSprite(xpos, ypos, 48, 48);
        }
        
        

        if(item == "Grass") { worldSprite.addImage(tex_springGrass); worldTiles.add(worldSprite); }
        if(item == "Dirt") { worldSprite.addImage(tex_dirt); worldTiles.add(worldSprite); }
        if(item == "Player") { worldSprite.addImage(tex_player); }
        if(item == "Grass Hill Left") { worldSprite.addImage(tex_springGrassHillLeft); worldTiles.add(worldSprite); this.worldSprite.setCollider("circle", 20, 20, 40, );}
        if(item == "Grass Hill Right") { worldSprite.addImage(tex_springGrassHillRight); worldTiles.add(worldSprite); this.worldSprite.setCollider("circle", -20, 20, 40, );}
        if(item == "Grass Hill Left2") { worldSprite.addImage(tex_springGrassHillLeft2); worldTiles.add(worldSprite); }
        if(item == "Grass Hill Right2") { worldSprite.addImage(tex_springGrassHillRight2); worldTiles.add(worldSprite); }
        if(item == "Spikes") { worldSprite.addImage(tex_spikes); new Spikes(xpos, ypos, 320,320)}
        if(item == "Blank") { worldSprite.addImage(tex_blank); worldSprite.addToGroup(airTiles);}
        if(item == "JumpPad") { worldSprite.addImage(tex_jumpPad); }
        if(item == "DoorH2") { door = new Door(xpos, ypos - 25, loadedMap.location[i + 1][1], loadedMap.location[i + 1][2]); }
        
     
       // Add to Group()


    }
    console.log("Map Loaded");
}

/* ============================================================================== */
// Char to texture return. Used in map painting.
//
// Takes a string, if that string matches, then return that texture name.add
/* ============================================================================== */
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

