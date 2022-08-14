class slider{
    constructor(){
    this.x = width/2,
    this.y = height * (1 - 0.1),
    this.height = height/20,
    this.length = width/7.5,
    this.edges = []
    this.speed = 0
    }

    input(){
        if(keyIsDown(LEFT_ARROW)){
            this.speed -=  this.speed>1?0.35: 0.25;
        }
        if(keyIsDown(RIGHT_ARROW)){
            this.speed +=  this.speed<-1?0.35: 0.25;
        }
        if(this.speed > 10){
            this.speed = 10
        }
        if(this.speed < -10){
            this.speed = -10
        }
        //console.log(this.speed)
    }
    move(){
        this.x += this.speed
        if(this.x < this.length/2){
            this.x = this.length/2;
            this.speed = 0
        }
        if(this.x > width - this.length/2){
            this.x = width - this.length/2;
            this.speed = 0
        }
    }
    draw(){
        fill(0,0,255,100);
        quad(this.x-this.length/4, this.y-this.height/2, this.x+this.length/4, this.y-this.height/2, this.x+this.length/2, this.y+this.height/2, this.x-this.length/2, this.y+this.height/2)
    }

    updateEdges(){
        let slider_edge_color = "blue";
        this.edges = [
            new wall(this.x - this.length/4, this.y - this.height/2, this.x + this.length/4, this.y - this.height/2, slider_edge_color, this),
            new wall(this.x - this.length/2, this.y + this.height/2 , this.x - this.length/4, this.y - this.height/2, slider_edge_color, this),
            new wall(this.x + this.length/2, this.y + this.height/2, this.x + this.length/4, this.y - this.height/2, slider_edge_color, this),
        ]
    }

    run(){
        this.input()
        this.move()
        this.updateEdges()
        this.draw()
    }
    
    hit(){
        //this.speed =0
    }
}