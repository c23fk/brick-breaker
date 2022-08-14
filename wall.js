class wall {
    constructor(x1,y1,x2,y2,color, parent){
        if(y1 < y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        } else {
            if(x1 < x2){
                this.x1 = x1;
                this.y1 = y1;
                this.x2 = x2;
                this.y2 = y2;
            }else{
                this.x1 = x2;
                this.y1 = y2;
                this.x2 = x1;
                this.y2 = y1;
            }
        }
        this.color = color;
        this.parent = parent;
    }

    draw(){
        stroke(this.color);
        line(this.x1,this.y1,this.x2,this.y2);
    }

    getAngle(){
        return formAngle(this.x2-this.x1,this.y2-this.y1);
    }

    getLength(){
        return dist(this.x1,this.y1,this.x2,this.y2);
    }

    hit(ball){
        if(this.parent == null) return;
        this.parent.hit(ball);
    }


}

function formAngle(x, y) {
    return atan2(y,x)
}
