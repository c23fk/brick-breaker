class slider{
    constructor(){
    this.x = width/2,
    this.y = height * (1 - 0.1),
    this.height = height/20,
    this.length = width/7.5,
    this.edges = []
    this.color = "orange"
    }

    input(){
        if(keyIsDown(LEFT_ARROW)){
            this.x -=  .75
        }
        if(keyIsDown(RIGHT_ARROW)){
            this.x += .75;
        }
        if(this.x < this.length/2){
            this.x = this.length/2;
        }
        if(this.x > width - this.length/2){
            this.x = width - this.length/2;
        }
    }
    draw(){
        fill(this.color);
        quad(this.x-this.length/4, this.y-this.height/2, this.x+this.length/4, this.y-this.height/2, this.x+this.length/2, this.y+this.height/2, this.x-this.length/2, this.y+this.height/2)
    }

    updateEdges(){
        this.edges = [
            new wall(this.x - this.length/4, this.y - this.height/2, this.x + this.length/4, this.y - this.height/2, this.color, this),
            new wall(this.x - this.length/2, this.y + this.height/2 , this.x - this.length/4, this.y - this.height/2, this.color, this),
            new wall(this.x + this.length/2, this.y + this.height/2, this.x + this.length/4, this.y - this.height/2, this.color, this),
            new wall(this.x + this.length/2, this.y + this.height/2, this.x - this.length/2, this.y + this.height/2 , this.color, this),
        ]
    }

    run(){
        this.input()
        this.updateEdges()
        this.draw()
    }
    
    hit(ball){

    }
}