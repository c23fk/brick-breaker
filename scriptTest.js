var paddle;
var balls = [];
var walls = [];
var bricks = [];


function setup(){
    frameRate(30)
    angleMode(DEGREES);
    rectMode(CENTER);
    createCanvas(windowWidth,windowHeight);
    paddle = new slider()
    start();
}

function draw(){
    background(0);
    noStroke();
    paddle.run();
    runBalls();
    drawLines();
    drawBricks();
    balls.push(new ball(width/2,height/2,90))
}

function drawLines(){
    for(let wall of getAllWalls()){
        wall.draw();
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
    createBricks();
    balls[0] = new ball(width/2,height/2,80);
}

function drawBricks(){
    for(let i of bricks){
        i.draw()
    }
}

function createBricks(){
    bricks[0] = new brick(width/2,613,100,100, 500, color(255,0,0,50));
}
