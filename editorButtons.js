let selectedTexture = "";

class Editor_Button{
    constructor(x, y, w, h, colour, text, callback){
        this.pos = {'x': x, 'y': y}
        this.size = {'w': w, 'h': h}
        this.colour = colour;
        this.button = rect(this.pos.x, this.pos.y, this.size.w, this.size.h)
        this.text = text
        this.callback = callback
    }

    draw(){
        if(!this.mouseIsOver()){
            noFill()
            noStroke()
            
            rect(this.pos.x, this.pos.y, this.size.w, this.size.h)
            image(this.colour, this.pos.x - 25, this.pos.y - 25);
            
        } 
        else { // On Hover

            // TODO: disallow texture painting when selecting a new texture

            if(mouseWentUp(LEFT)){this.callback()}

            // fill(255,255,255,40);
            stroke(255,255,255,40);
            strokeWeight(20);
            rect(this.pos.x, this.pos.y, this.size.w, this.size.h)
            image(this.colour, this.pos.x - 25, this.pos.y - 25);
        }
        
    }// draw()

    mouseIsOver(){
        let bool = false
        cursor(ARROW)
        if(mouseX > this.pos.x - this.size.w / 2 && mouseX < this.pos.x + this.size.w / 2){
            if(mouseY > this.pos.y - this.size.h / 2 && mouseY < this.pos.y + this.size.h / 2){
                bool = true
                cursor(HAND)
            }
        }
        return bool
    }


} //class EditorButton