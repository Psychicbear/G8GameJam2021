
let gridSize = 50;
let gridOffset = gridSize / 2;


function drawWorld(){

    // ground = createSprite(width / 2, height - 25, width, 50);
    // ground.shapeColor = color(166,124,82);

    worldSprite = new worldPlatform();
    
    
} // drawWorld()


class worldPlatform {
    constructor() {
        this.worldSprite;
    }

    setup(x, y, w, h) {
        this.worldSprite = createSprite(x, y, w, h);
        this.worldSprite.addImage(tex_grass);
    }

    draw(){
        let x = snap(mouseX);
        let y = snap(mouseY);

        if (mouseIsPressed) {
                
            if (mouseButton === LEFT) {
                this.setup(x, y, 50, 50);
                worldTiles.add(this.worldSprite); // Add to Group()
                editorAddWorldObject(x, y);           
            }

            if (mouseButton === RIGHT) {
                console.log(gridItem)
            }

        }

        if(keyIsDown(76)) { // L key
            LoadMapJSON()
        }

        if(keyIsDown(77)){ // M key
            editorSaveJSON(x, y);
        }

    }


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


let gridItem = [];
let iteration = 0;


// 2D array selection example
// gridItem[4][0]  // forth array, firstData
// gridItem[0][1]  // first array, secondData
function editorAddWorldObject(x, y) {



    gridItem[iteration++] = [x, y];  // currently just spams locations into the array

    // console.log(gridItem)
    // // allowAppend = false;
    // gridItem.forEach((item) => {
    //     console.log("HELP")
    //     console.log(x)
    //     console.log(y)
    //     console.log(item)
        
    //     if(x != item.x && y != item.y){
    //         // allowAppend = true
    //         // gridItem[itteration++] = {x, y}; 
    //         console.log("boop");
            
    //     }
    // });




} // addGridPosition


function editorSaveJSON(){
    // gridItem[ [x], [y] ]
    // e.g. gridItem[[32, 44], [56, 123]]

    let json = {};
    json.itemType = "spring_grass";
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
            worldSprite.addImage(tex_grass);
            worldTiles.add(worldSprite); // Add to Group()
        }

    }
    console.log("Map Loaded");
}