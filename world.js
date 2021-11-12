
let gridItem = [];
let gridSize = 50;
let gridOffset = gridSize / 2;

let timerThing = 0
let timerthing2 = 0


class worldPlatform {
    constructor() {
        this.worldSprite;
    }

    setup(x, y, w, h) {
        this.worldSprite = createSprite(x, y, w, h);
        //this.worldSprite.rotation = Math.random() * 360
        //console.log(this.worldSprite.rotation)
        if(selectedTexture == ''){

            this.worldSprite.addImage(tex_springGrass);
        }
        else{
            this.worldSprite.addImage(selectedTexture);
        }
        
    }

    draw(){
        let x = snap(camera.mouseX);
        let y = snap(camera.mouseY);

        // Draws a square on the grid to indicate where a block will be placed
        fill(255,255,255, 20);
        noStroke()
        rect(x, y, gridSize, gridSize);

        if (mouseWentDown(LEFT) && mouseIsOverButton == false){
            if(editorAddWorldObject(x,y)){
                this.setup(x, y, 50, 50);
                worldTiles.add(this.worldSprite); // Add to Group()
                gridItem.push([x, y])
            }

            //editorAddWorldObject(x, y); // Adds grid tile placement parameters to an array for later saving

        }

        if(mouseDown(RIGHT)){
        }

        // L Key
        if(keyIsDown(76) && timerThing == 0) { timerThing = 1; LoadMapJSON(); 
        } 
        // M Key
        if(keyIsDown(77)) { editorSaveJSON(x, y); } 

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



// 2D array selection example
// gridItem[4][0]  // forth array, firstData
/*
      col[0], col[1]
row[0]  [250, 75],
row[1]  [250, 95],
row[2]  [300, 75]
*/

let gridItemIteration = 0; // Used to reference the rows of data
function editorAddWorldObject(x, y) {
    let temp;
    let available = true;
    // FEEL FREE TO DO CHANGE EVERYTHING ABOUT THIS IS YOU HAVE TOO

    // add data to the array, 
    // compare the new data to the arrayData, 
    // if the same as an existing location, remove it from the array.
    // else: confirm placement
    if(gridItem.length > 0){
        temp = [x, y];
        
        for(let i = 0; i < gridItem.length; i++) { 
            if(gridItem[i][0] == temp[0] && gridItem[i][1] == temp[1]){
                console.log('location taken');
                available = false
            } 
            
        }
        
    } 
    if(available){
        console.log('location free, adding location')
        //gridItem.push([x, y])
    } 
    return available


    //gridItem.push([x,  y]); // Add x and y to a new array row
    // for(let i = gridItem.length; i > 0; i--) { // Row Number
    //     if(gridItem[i - 1] == temp){
    //         console.log('location taken');
    //         gridItem.splice(i - 1, 1);
    //     } else {
    //         gridItem.push([x, y]);
    //         console.log('location free')
    //     }
        
    //     // for(let j = 0; j < gridItem[i].length; j++) { // Column Number


    //     //     if( gridItem.slice(-1)[0][0] === gridItem[i][0] ) { // only checking the x value right now
   
    //     //         // gridItem.splice(-1, 1)    // Remove the item
    //     //         // gridItemIteration - 1;   // Roll back the iteration number 

    //     //         // console.log(gridItem[i][j])
    //     //         //console.log('Location Taken')

    //     //     }

    //     //     else{
    //     //         //console.log('Location Free, Tile Placed');

    //     //     }


    //     // }
    // }



} // addGridPosition


function editorSaveJSON(){
    // gridItem[ [x], [y] ]
    // e.g. gridItem[[32, 44], [56, 123]]

    let json = {};
    // json.itemType = JSON.stringify(selectedTexture);
    json.location = gridItem
    saveJSON(json, "things.json");
    
}


function LoadMapJSON() {
    
    for(let i = 0; i < loadedMap.location.length; i++) {
        type = loadedMap.itemType
        xpos = loadedMap.location[i][0]
        ypos = loadedMap.location[i][1]


        worldSprite = createSprite(xpos, ypos, 50, 50);

        if(type == "spring_grass") {
            worldSprite.addImage(tex_springGrass);
            worldTiles.add(worldSprite); // Add to Group()
        }

    }
    console.log("Map Loaded");
}