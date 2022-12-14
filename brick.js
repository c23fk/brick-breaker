class brick {
    constructor(x,y,width,height,hits,color){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.hits = hits
        this.lastBounce = null;
        this.edges = [
            new wall(x - width/2, y - height/2, x + width/2, y - height/2, this.color, this),
            new wall(x - width/2, y - height/2, x - width/2, y + height/2, this.color, this),
            new wall(x - width/2, y + height/2, x + width/2, y + height/2, this.color, this),
            new wall(x + width/2, y - height/2, x + width/2, y + height/2, this.color, this)
        ]
    }
    draw(){
        noStroke()
        fill(this.color)
        rect(this.x,this.y,this.width,this.height)
        textAlign(CENTER,CENTER)
        fill("black")
        text(this.hits,this.x,this.y)
    }
    hit(ball){
        if(ball.bounces == this.lastBounce) return;
        this.hits = this.hits-1;
        if(this.hits <= 0){
            let ind = bricks.indexOf(this);
            if (ind == -1) {
                print("AHHHHHHH")
                return
            };
            bricks.splice(ind,1);
            if(bricks.length == 0){
                win()
            }
        }
        this.lastBounce = ball.bounces;
    }
    
}