function IdeaClass(name){

    this.name = name;
    this.x = width/3 - random(width*2/3);
    this.y = height/3 - random(height*2/3);    
    this.textSize = 24;
    this.width = this.textSize*this.name.length;
    this.height = this.textSize*1.5;
    this.touched = false;
    this.stroked = false;
    this.dragable = true;
    this.parentNode = null;
    this.selectedColor = color(200, 200, 200);
    this.unselectedColor = color(119, 221, 119);
    this.color = this.unselectedColor;
    this.speed = 1;

    this.move = function() {
        this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);
    };

    this.joinParent = function(parentId){
        console.log("Joining node "+ideaArray.indexOf(this.name)+" with parent "+parentId);
        this.parentNode = parentId;
        angle = random(360);
        radius = 250;
        this.x = Math.round(ideaArray[this.parentNode].x + radius * Math.cos(angle));
        this.y = Math.round(ideaArray[this.parentNode].y + radius * Math.sin(angle));
    }

    this.display = function(){


        if(this.parentNode!=null){
            stroke(0);
            strokeWeight(3);
            line(this.x, this.y, ideaArray[this.parentNode].x, ideaArray[this.parentNode].y);    
        }
        noStroke();

        if(this.touched){
            this.color = this.selectedColor;   
        }else{      
            this.color = this.unselectedColor;      
        }
                
        fill(this.color);
        
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height, 20);
      
        fill(0);
        noStroke();
        textAlign(CENTER);
        textSize(this.textSize);
        text(this.name+" "+ideaArray.indexOf(name)+" "+this.parentNode, this.x, this.y+this.textSize/4);

    };
}
