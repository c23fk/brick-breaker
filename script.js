var slider;
var balls = [];
var walls = [];
var blocks = [];

class ball {

    constructor(x,y){
        this.x = x;
        this.y = y;
        this.radius = width/200;
        this.velocity = {
            speed: 2.5,
            angle: random(0,180)
        }
    }

    move(){
        for(let i = 0; i<2; i++){
            this.x += this.velocity.speed * cos(this.velocity.angle);
            this.y += this.velocity.speed * sin(this.velocity.angle);
            this.checkWalls();
            this.draw();
        }
    }

    draw(){
        fill(255);
        circle(this.x,this.y,this.radius*2);
    }
    wallCollision(other){
        let hyp = new wall(this.x,this.y,other.x1,other.y1);
        let angle = hyp.getAngle() - other.getAngle();
        let di = sin(angle) * hyp.getLength();
        let left = Math.min(other.x1, other.x2) - this.radius;
        let right = Math.max(other.x1, other.x2) + this.radius;
        let bottom = Math.min(other.y1, other.y2) - this.radius;
        let top = Math.max(other.y1, other.y2) + this.radius;
        if(left <= this.x && this.x <= right && bottom <= this.y && this.y <= top){
            return Math.abs(di) <= this.radius;
        }
        return false;
    }

    bounce(other){
        this.velocity.angle = angleify((180 + (2 * other.getAngle())-this.velocity.angle)-180);

    }

    checkWalls(){
        let lines = getAllWalls();
        for(let i of lines ){
            if(this.wallCollision(i)){
                this.bounce(i);
                console.log("bounce")
             }
        }
    }
}

class wall {
    constructor(x1,y1,x2,y2,color){
        if(y1 > y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        } else {
        this.x1 = x2;
        this.y1 = y2;
        this.x2 = x1;
        this.y2 = y1;
        }
        if(color == undefined){
            this.color = "white"
        }else{
            this.color = color;
        }
    }

    draw(){
        stroke(this.color);
        line(this.x1,this.y1,this.x2,this.y2);
    }

    getAngle(){
        return formAngle(this.x1-this.x2,this.y1-this.y2);
    }

    getLength(){
        return dist(this.x1,this.y1,this.x2,this.y2);
    }


}

function setup(){
    angleMode(DEGREES);
    createCanvas(windowWidth,windowHeight);
    slider = {
        x: width/2,
        y: height * (1 - 0.1),
        height: height/100,
        length: width/20,
        edges: []
    }
    walls[0] = new wall(0,0,0,height);
    walls[1] = new wall(0,0,width,0);
    walls[2] = new wall(width,0,width,height);
    walls[3] = new wall(0,height,width,height);

    balls[0] = new ball(width/2,height/2);
    
}

function draw(){
    background(0);
    runSlider();
    runBalls();
    drawLines();
    // balls[0].velocity.speed = 0;
    // balls[0].x = mouseX;
    // balls[0].y = mouseY;
    // balls[0].checkWalls();
}

function drawLines(){
    for(let wall of walls){
        wall.draw();
    }
}

function runBalls(){
    for(var i = 0; i < balls.length; i++){
        balls[i].move();
        balls[i].draw();
    }
}

function runSlider(){
    moveSlider();
    fill(255);
    rectMode(CENTER);
    rect(slider.x,slider.y,slider.length,slider.height);
    updateEdges()
}

function updateEdges(){
    slider.edges = [
        new wall(slider.x - slider.length/2,slider.y - slider.height/2, slider.x + slider.length/2, slider.y - slider.height/2),
        new wall(slider.x - slider.length/2,slider.y - slider.height/2, slider.x - slider.length/2, slider.y + slider.height/2),
        new wall(slider.x - slider.length/2,slider.y + slider.height/2, slider.x + slider.length/2, slider.y + slider.height/2),
        new wall(slider.x + slider.length/2,slider.y - slider.height/2, slider.x + slider.length/2, slider.y + slider.height/2),
    ]
}

function moveSlider(){
    if(keyIsDown(LEFT_ARROW)){
        slider.x -= 7.5;
    }
    if(keyIsDown(RIGHT_ARROW)){
        slider.x += 7.5;
    }
    if(slider.x < slider.length/2){
        slider.x = slider.length/2;
    }
    if(slider.x > width - slider.length/2){
        slider.x = width - slider.length/2;
    }
}

function formAngle(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}

function angleify(angle){
    return angle % 360;
}

function getAllWalls(){
    let output = walls;
    output = output.concat(slider.edges)
    for(let i of blocks){
        output = output.concat(i.edges)
    }
    return output;
}