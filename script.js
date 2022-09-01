var paddle;
var balls = [];
var walls = [];
var bricks = [];
var started = false;
var won = false

document.addEventListener("keydown", function(){
    started = true;
    loop()
},
{
    once:true
})

function setup(){
    textSize(32)
    angleMode(DEGREES);
    rectMode(CENTER);
    createCanvas(windowWidth,windowHeight);
    paddle = new slider()
    start();
    noLoop()
}

function draw(){
    background(0);
    noStroke();
    if(paddle){
        for(let i = 0; i < 15; i++){
        paddle.run();
        }
    }
    runBalls();
    drawLines();
    drawBricks();
    if(!started){
        fill("LightPurple")
        text("Press any key to start", width/2,height/2)
        paddle.draw()
    }
    if(won){
        noStroke()
        fill("lightgreen")
        text("Congratulations!!!\nReload to play again\nClick to change shapes", width/2,height/2)
    }
}

function drawLines(){
    for(let i = 0; i< getAllWalls().length; i++){
        getAllWalls()[i].draw()
    }
}

function runBalls(){
    let bouncables = getAllWalls();
    for(let i of balls){
        i.move(bouncables);
        i.draw();
    }
}

function getAllWalls(){
    let output = walls;
    if(paddle !=null){
    output = output.concat(paddle.edges)
    }
    for(let i of bricks){
        output = output.concat(i.edges)
    }
    return output;
}

function base(colBall){
    if(paddle == null) return;
    balls.splice(colBall,1)
    if(balls.length == 0){
        if(--paddle.lives <= 0){
            gameOver()
            return;
        }
        balls.push(new ball(width/2,height/2, atan2( paddle.y - height/2,paddle.x -  width/2)))
    }
}

function gameOver(){
    noLoop()
    fill("red")
    text("GAME OVER!!!\nReload to try again", width/2,height/2)
}

function win(){
    console.log("you win")
    paddle = null;
    won = true
    balls = []
    bricks = []
    let rad = min(width, height)/20
    for(let i = 3; i < 6; i++){
        for(let j = 0; j<10; j++){
            let newx = random(rad,width-rad)
            let newy = random(rad,height-rad)
            bricks.push(new shape(newx,newy,rad,i,"", color(random(0,255),random(0,255),random(0,255))))
        }
    }
    for(let i = 0; i < 2; i++){balls.push(new ball(width/2, height/2,random(0,360)))}
}

function generateBorder(){
    let border_color = "red"
    walls = [
        new wall(0,0,0,height,border_color),
        new wall(0,0,width,0,border_color),
        new wall(width,0,width,height,border_color),
        new wall(0,height,width,height,border_color, {
            hit(ball){
                base(ball);
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
    let row = 5
    for(let i = 0; i<n; i++){
        for(let j = 0; j<row; j++){
            bricks.push(new brick(j*width/row + width/(2*row) , (i+0.5)*(height/12),width/(1.5*row),height/12, floor((1+n - i)/2) ,color(0, 255/(n+1) * (i+1),0)))
        }
    }
}

function mouseReleased(){
    if(won){
        win()
    }
}