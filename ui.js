class UI_Button{
    constructor(x, y, w, h, colour, text, callback){
        this.pos = {'x': x, 'y': y}
        this.size = {'w': w, 'h': h}
        this.colour = colour
        this.button = rect(this.pos.x, this.pos.y, this.size.w, this.size.h)
        this.text = text
        this.callback = callback
    }

    draw(){
        if(!this.mouseIsOver()){
            fill(this.colour.r , this.colour.g, this.colour.b, 255 )
            rect(this.pos.x, this.pos.y, this.size.w, this.size.h)
            fill(0)
            text(this.text, this.pos.x, this.pos.y)
        } else {
            if(mouseWentUp(LEFT)){this.callback()}
            fill(this.colour.r , this.colour.g, this.colour.b, 100 )
            rect(this.pos.x, this.pos.y, this.size.w, this.size.h)
            fill(255)
            text(this.text, this.pos.x, this.pos.y)
        }
    }

    mouseIsOver(){
        let bool = false
        cursor(POINTER)
        if(mouseX > this.pos.x - this.size.w/2 && mouseX < this.pos.x + this.size.w/2){
            if(mouseY > this.pos.y - this.size.h/2 && mouseY < this.pos.y + this.size.h/2){
                bool = true
                cursor(HAND)
            }
        }
        return bool
    }
}

class FrameRateCounter{
    constructor(){
        this.fps = parseInt(getFrameRate())
    }

    draw(){
        frameRate(60)
        fill(255)
        text(this.fps, 1200, 100)
        this.fps = parseInt(getFrameRate())
    }
}