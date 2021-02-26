class Edge{

    constructor(u, v, force){
     this.u = u;
     this.v = v;
     this.force = force;

     u.strength += force/5;
     v.strength += force/5;
    }
    
    attract(){
      let d = p5.Vector.sub(this.u.pos, this.v.pos);
      
      if (d.mag() === 0){
        d = p5.Vector.random2D();
        d.setMag(0.01);
      }
      
      //!intent de modificar segons força
      var f = this.force/500;
      let m = f * pow(d.mag(), 2) / k;
      //let m = aC * pow(d.mag(), 2) / k;
      
      if (!isFinite(m)){
        m = 0.01;
      }
      
      d.setMag(m);

      this.u.disp.sub(d);
      this.v.disp.add(d);

      //console.log("edge mag: "+m);      
    }
    
    show(){      
      stroke(0);
      
      strokeWeight(1);
      textSize(20);
      text(this.force, (this.u.pos.x+this.v.pos.x)/2, (this.u.pos.y+this.v.pos.y)/2);
      
      strokeWeight(this.force/10);
      line(this.u.pos.x, this.u.pos.y, this.v.pos.x, this.v.pos.y);
    }
    
  }