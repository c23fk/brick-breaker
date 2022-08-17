var paddle;
var balls = [];
var walls = [];
var bricks = [];


function setup(){
    angleMode(DEGREES);
    rectMode(CENTER);
    createCanvas(windowWidth,windowHeight);
    paddle = new slider()
    start();
}

function draw(){
    background(0);
    noStroke();
    for(let i = 0; i < 15; i++){
    paddle.run();
    }
    runBalls();
    drawLines();
    drawBricks();
}

function drawLines(){
    for(let i = 0; i< getAllWalls().length; i++){
        getAllWalls()[i].draw()
    }
}

function runBalls(){
    for(var i = 0; i < balls.length; i++){
        let bouncables = getAllWalls();
        balls[i].move(bouncables);
        balls[i].draw();
    }
}

function getAllWalls(){
    let output = walls;
    output = output.concat(paddle.edges)
    for(let i of bricks){
        output = output.concat(i.edges)
    }
    return output;
}

function gameOver(){
    console.log("game over")
}

function win(){
    console.log("you win")
}

function generateBorder(){
    let border_color = "red"
    walls = [
        new wall(0,0,0,height,border_color),
        new wall(0,0,width,0,border_color),
        new wall(width,0,width,height,border_color),
        new wall(0,height,width,height,border_color, {
            hit(){
                gameOver();
            }
        })
    ]
}

function start(){
    generateBorder();
    createBricks(5);
    balls[0] = new ball(width/2,height/2);
}

function drawBricks(){
    for(let i of bricks){
        i.draw()
    }
}

function createBricks(n){
    for(let i = 0; i<n; i++){
        for(let j = 0; j<10; j++){
            bricks.push(new brick(j*width/10 + width/20 , (i+0.5)*(height/12),width/15,height/12, n - i ,color(random(255),random(255),random(255))))
        }
    }
}
