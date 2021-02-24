let input, button, greeting;

let ideaArray = [];
let itemSelected = 0;

let canvasZoom = 1.0;
var zMin = 0.5;
var zMax = 2.00;
var zSensitivity = 0.001;

let mX, mY;

function setup() {
  // create canvas
  createCanvas(windowWidth, windowHeight);

  input = createInput();
  input.position(width/2, 65);
  input.changed(CreateIdea);

  button = createButton('test');
  button.position(input.x + input.width, 65);
  button.mousePressed(CreateTestcase);

  greeting = createElement('h2', 'Start brainstorming');
  greeting.position(width/2, 5);

  textAlign(CENTER);
  textSize(50);

}

function draw() {

  translate(width/2,height/2);
  scale(canvasZoom);

  mX = (mouseX-width/2)/canvasZoom;
  mY = (mouseY-height/2)/canvasZoom;

  background(255);

  for (let i = 0; i < ideaArray.length; i++) {
    //ideaArray[i].move();
    ideaArray[i].display();    
  }


  if(ideaArray.length > 0 && ideaArray[itemSelected].touched && ideaArray[itemSelected].dragable){
    fill(ideaArray[itemSelected].unselectedColor);
    rectMode(CENTER);
    stroke(0);
    strokeWeight(4);
    rect(mX, mY, ideaArray[itemSelected].width, ideaArray[itemSelected].height, 20);       
    fill(0);
    noStroke();
    textAlign(CENTER);
    textSize(ideaArray[itemSelected].textSize);
    text(ideaArray[itemSelected].name, mX, mY+ideaArray[itemSelected].textSize/4);

  }
  

}

function CreateIdea(){
 
  var bufIdea = new IdeaClass(String(input.value()), ideaArray.length);
  ideaArray.push(bufIdea);
  input.value("");

}

function CreateTestcase(){
  
  var numItems = 5;
  ideaArray = [];

  for(var i = 0; i < numItems; i ++){
    var bufIdea = new IdeaClass(GenerateRandomName());
    ideaArray.push(bufIdea);
  }

  input.value("");
}

function GenerateRandomName(){
	var name1 = ["abandoned","able","absolute","adorable","adventurous","academic","acceptable","acclaimed","accomplished","accurate","aching","acidic","acrobatic","active","actual","adept","admirable","admired","adolescent","adorable","adored","advanced","afraid","affectionate","aged","aggravating","aggressive","agile","agitated","agonizing","agreeable","ajar","alarmed","alarming","alert","worthy","wrathful","wretched","writhing","wrong","wry","yawning","yearly","yellow","yellowish","young","youthful","yummy","zany","zealous","zesty","zigzag","rocky"];
	var name2 = ["people","history","way","art","world","information","map","family","government","health","system","computer","meat","year","thanks","music","person","reading","method","data","food","understanding","theory","law","bird","inevitable","invite","kiss","neat","pop","punch","quit","reply","representative","resist","rip","rub","silly","smile","spell","stretch","stupid","tear","temporary","tomorrow","wake","wrap","yesterday","Thomas","Tom","Lieuwe"];
	var name = capFirst(name1[getRandomInt(0, name1.length + 1)]);// + ' ' + capFirst(name2[getRandomInt(0, name2.length + 1)]);
	return name;
}
function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



function mousePressed() {

  for (let i = 0; i < ideaArray.length; i++) {
    if(dist(ideaArray[i].x, ideaArray[i].y, mX, mY) < ideaArray[i].width/2){

      itemSelected = i;       
      ideaArray[itemSelected].touched = true;
       break;
    }
  }
}

function mouseDragged() {
  if(ideaArray.length > itemSelected){
    if(ideaArray[itemSelected].touched && ideaArray[itemSelected].dragable){
      //ideaArray[itemSelected].x = mouseX;
      //ideaArray[itemSelected].y = mouseY; 
    }
  }
}

function mouseReleased(){  

    if(ideaArray[itemSelected].touched){
        ideaArray[itemSelected].touched = false;
        ideaArray[itemSelected].x = mX;
        ideaArray[itemSelected].y = mY;           
    }
  
  //if released under other node, join it
  for (let i = 0; i < ideaArray.length; i++) {
    if(i != itemSelected && 
      collideRectRect(ideaArray[itemSelected].x, ideaArray[itemSelected].y, ideaArray[itemSelected].width, ideaArray[itemSelected].height, 
        ideaArray[i].x, ideaArray[i].y, ideaArray[i].width, ideaArray[i].height )      
      ){          
      ideaArray[itemSelected].joinParent(i);
      break;
    }
  }

  itemSelected = 0;
}

function mouseWheel(event) {
  canvasZoom += zSensitivity * event.delta;
  canvasZoom = constrain(canvasZoom, zMin, zMax);
  //uncomment to block page scrolling
  return false;
}