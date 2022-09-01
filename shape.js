class shape {
    constructor(x,y,radius,sides,hits,color){
        this.x = x
        this.y = y
        this.color = color
        this.hits = hits
        this.edges = []
        let i,j
        for(i = 0, j = 0; i < sides; i++, j += 360/sides){
            this.edges.push(new wall(
                x+radius*sin(j),
                y-radius*cos(j),
                x+radius*sin(j+360/sides),
                y-radius*cos(j+360/sides),
                this.color,
                this 
            ))            
        }
    }
    draw(){
        noStroke()
        fill(this.color)

        beginShape();
        for(let i of this.edges){
            vertex(i.x1,i.y1);
        }
        endShape(CLOSE);

        textAlign(CENTER,CENTER)
        fill("black")
        text(this.hits,this.x,this.y)
    }
    hit(ball){
        return
    }
    
}