class ball {

    constructor(x,y, angle){
        this.x = x;
        this.y = y;
        this.bounces = 0;
        this.radius = 7.5;
        this.velocity = {
            speed: 7.5,
            angle: angle == null?random(30,150):angle
        }
    }

    move(bouncables){
        let moves_per_call = 5 * this.velocity.speed;
        for(let i = 0; i<moves_per_call; i++){
            this.x += this.velocity.speed/moves_per_call * cos(this.velocity.angle);
            this.y += this.velocity.speed/moves_per_call * sin(this.velocity.angle);
            this.checkWalls(bouncables);
            this.draw();
        }
    }

    draw(){
        fill("lightgreen");
        circle(this.x,this.y,this.radius*2);
    }
    wallCollision(other){
       return LineCircleCollision(other.x1,other.y1,other.x2,other.y2,this.x,this.y,this.radius);
    }

    bounce(other){
        this.nudge(other);
        this.velocity.angle = angleify((180 + (2 * other.getAngle())-this.velocity.angle)-180);
    }

    nudge(other){
        let len = dist(other.x1,other.y1,other.x2,other.y2);
        let dot = (((this.x-other.x1) * (other.x2-other.x1)) + ((this.y-other.y1) * (other.y2-other.y1)))/(len*len);
        let projX = other.x1 + (dot * (other.x2-other.x1));
        let projY = other.y1 + (dot * (other.y2-other.y1));
        let perpAngle = other.getAngle() + 90
        let possx1 = projX + cos(perpAngle)*(this.radius + 0.1);
        let possx2 = projX - cos(perpAngle)*(this.radius + 0.1);
        let possy1 = projY + sin(perpAngle)*(this.radius + 0.1);
        let possy2 = projY - sin(perpAngle)*(this.radius + 0.1);
        if(dist(possx1,possy1,this.x,this.y)<dist(possx2,possy2,this.x,this.y)){
            this.x = possx1
            this.y = possy1
        }else{
            this.x = possx2
            this.y = possy2
        }
    }

    checkWalls(bouncables){
        for(let i of bouncables){
            if(this.wallCollision(i)){
                this.bounce(i)
                i.hit(this);
            }
        }
        this.bounces++;
    }

    checkSlider(slider){
        for(let i of slider.edges.concat(walls)){
            if(this.wallCollision(i)){
                this.bounce(i)
                i.hit(this);
            }
        }
    }

}

function avg(array){
    for (var i = 0, sum = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum / array.length;
}

function angleify(angle){
    return angle % 360;
}

function LineCircleCollision(x1,y1,x2,y2,cx,cy,r){
    if(dist(x1,y1,cx,cy)<r || dist(x2,y2,cx,cy)<r){ return true; }
    let len = dist(x1,y1,x2,y2);
    if(dist(x1,y1,cx,cy)>len+r || dist(x2,y2,cx,cy)>len+r){return false}
    let dot = (((cx-x1) * (x2-x1)) + ((cy-y1) * (y2-y1)))/(len*len);
    let nearestX = x1 + (dot * (x2-x1));
    let nearestY = y1 + (dot * (y2-y1));
    if(!linePoint(x1,y1,x2,y2,nearestX,nearestY)){ return false; }
    let distance = dist(cx,cy,nearestX,nearestY);
    return distance <= r;
}

function linePoint(x1, y1, x2, y2, px, py) {
    let d1 = dist(px,py, x1,y1);
    let d2 = dist(px,py, x2,y2);
    let lineLen = dist(x1,y1, x2,y2);
    let buffer = 0.01;
    return d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer;
}
