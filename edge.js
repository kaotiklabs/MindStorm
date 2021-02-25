class Edge{

    constructor(u, v, force){
     this.u = u;
     this.v = v;
     this.force = force;
    }
    
    attract(){
      let d = p5.Vector.sub(this.u.pos, this.v.pos);
      
      if (d.mag() === 0){
        d = p5.Vector.random2D();
        d.setMag(0.01);
      }
      
      let m = aC * pow(d.mag(), 2) / k;
      
      if (!isFinite(m)){
        m = 0.01;
      }
      
      d.setMag(m);
      
      this.u.disp.sub(d);
      this.v.disp.add(d);
    }
    
    show(){
      strokeWeight(this.force/10);
      stroke(0);
      line(this.u.pos.x, this.u.pos.y, 
           this.v.pos.x, this.v.pos.y);
    }
  }