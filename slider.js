class slider{
    constructor(){
    this.x = width/2,
    this.y = height * (1 - 0.1),
    this.height = 50,
    this.length = width/7.5,
    this.edges = []
    this.color = "orange"
    }

    input(){
        let move = 1;
        if(keyIsDown(SHIFT)){
            move = 0.5;
        }
        if(keyIsDown(LEFT_ARROW)){
            this.x -=  move;
        }
        if(keyIsDown(RIGHT_ARROW)){
            this.x += move;
        }
        if(this.x < this.length/2){
            this.x = this.length/2;
        }
        if(this.x > width - this.length/2){
            this.x = width - this.length/2;
        }
    }

    updateEdges(){
        this.edges = [
            new wall(this.x - this.length/8, this.y - this.height/2, this.x + this.length/8, this.y - this.height/2, this.color, this),//top     0
            new wall(this.x + this.length/8, this.y - this.height/2, this.x + 3*this.length/8, this.y,  this.color, this),//diagonal right       1
            new wall(this.x + 3*this.length/8, this.y, this.x + this.length/2, this.y,  this.color, this),//right flat                           2
            new wall(this.x + this.length/2, this.y, this.x + this.length/2, this.y + this.height/2, this.color, this),//right                   3
            new wall(this.x + this.length/2, this.y + this.height/2, this.x - this.length/2, this.y + this.height/2, this.color, this),//bottom  4
            new wall(this.x - this.length/2, this.y + this.height/2, this.x - this.length/2, this.y,  this.color, this), //left                  5
            new wall(this.x - this.length/2, this.y, this.x - 3*this.length/8, this.y, this.color, this),//left flat                             6
            new wall(this.x - 3*this.length/8, this.y, this.x - this.length/8, this.y - this.height/2, this.color, this),//diagonal left         7
        ]
        for(let i of balls){
            if(i.y>this.y+this.height/2 + i.radius){ continue;}
            i.checkSlider(this)
        }
    }

    draw(){
        fill(this.color);
        beginShape();
            for(let i of this.edges){
                vertex(i.x1,i.y1);
            }
        endShape(CLOSE);
        
    }

    

    run(){
        this.input()
        this.updateEdges()
        this.draw()
    }
    
    hit(ball){

    }
}