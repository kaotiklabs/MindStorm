class Edge{

    constructor(u, v, force){
     this.u = u;
     this.v = v;
     this.force = force;
     
     //el pes de l'enllaç depen de la força dels nodes
     this.weight = parseInt((this.u.strength+this.v.strength)/200 * this.force);
    }
    
    attract(){
      let d = p5.Vector.sub(this.u.pos, this.v.pos);
      
      if (d.mag() === 0){
        d = p5.Vector.random2D();
        d.setMag(0.01);
      }
      
      //!mal calculat??
      var f = aC *this.weight/10;      
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
      stroke(0, map(this.weight, 0, 100, 10, 255));
      
      strokeWeight(1);
      textSize(20);
      //text(this.weight, (this.u.pos.x+this.v.pos.x)/2, (this.u.pos.y+this.v.pos.y)/2);
      
      strokeWeight(map(this.weight, 0, 100, 1, 8));
      line(this.u.pos.x, this.u.pos.y, this.v.pos.x, this.v.pos.y);
    }
    
  }