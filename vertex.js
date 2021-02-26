class Vertex {

    constructor(x, y, txt, strength){
      this.pos = createVector(x, y);
      this.disp = createVector(0, 0);
      this.txt = txt;
      this.strength = strength;
      this.touched = false;
      this.color = this.getColor();      
    }

    getColor(){
        var ret;
        noStroke();
        
        if(this.touched) {
            //stroke(0);
            ret = color(200, 10, 10, 150);
        }else{            
            ret = color(10, 200, 10, 150);
        }
        return ret;
    }

    reset(){
      this.disp = createVector(0, 0);  
    }
    
    repel(){
      this.disp = createVector(0, 0);
      for (let u of vertices){
        if (this !== u){
          let d = p5.Vector.sub(u.pos, this.pos);
          if (d.mag() === 0){
            d = p5.Vector.random2D();
            d.setMag(0.01);
          }
          let m = rC * pow(k, 2) / d.mag();
          
          if (!isFinite(m)){
            m = 0.01;
          }
          
          d.setMag(m);
          this.disp.sub(d);     
        }  
      }    
    }
    
    update(){
      this.disp.limit(min(width, height) / 4);
      this.pos.add(this.disp);
      
      this.pos.x = constrain(this.pos.x, margin, width - margin);
      this.pos.y = constrain(this.pos.y, margin, height - margin);
    }
    
    show(){
      push();
        fill(this.getColor());

        if(this.touched){
            translate(mouseX, mouseY);
        }else{
            translate(this.pos.x, this.pos.y);
        }
        
        circle(0, 0, this.strength/2);
        fill(0);
        textSize(map(this.strength, 0, 100, 14, 20));
        text(this.txt, 0, 0);
        // //render vector force line
        // push();
        //     stroke(255, 0, 0);
        //     line(0, 0, this.disp.x, this.disp.y);
        // pop();
      pop();
    }
  
  }