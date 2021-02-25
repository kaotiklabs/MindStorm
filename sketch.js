let input, button, greeting;
let ideaArray = [];
let itemSelected = 0;

let vertices = [];
let edges = [];
let area;
let k;
let rC = 0.01;
let aC = 0.1;//0.01;
let margin = 100;

function setup() {
  // create canvas
  createCanvas(windowWidth, windowHeight);

  area = width * height;
  textAlign(CENTER, CENTER);
  addVertexAt(width / 2, height / 2);

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
  background(240);

  for (let v of vertices){
    v.update();
    v.reset();
  }

  for (let v of vertices) {
    v.repel();
  }

  for (let e of edges){
    e.attract();
  }
    
  // Show the vertices and edges
  for (let e of edges) {
     e.show();
  }
  
  for (let v of vertices) {
    v.show();
  }
  
}

function CreateIdea(){
  var txt = String(input.value());    
  addVertexAt(width / 2, height / 2, txt);
  input.value("");
}

function addVertexAt(x, y, txt){

  if(txt == null) txt = "Root";
  // Create the new vertex at the new position.    
  let v = new Vertex(x, y, vertices.length+ " " + txt);

  // Before adding the vertex, check if there are any other
  // vertices we should connect it to with an edge.
  if (vertices.length > 0) {
    // Randomly pick a number of existing vertices to connect to
    let numToConnect = 1 + int(random(vertices.length / 3));
  }
  // Finally, add the vertex to the list of vertices.
  vertices.push(v);
  
  // Recalculate k because the number of vertices has changed
  k = sqrt(area / vertices.length);
}

function addEdgeAt(child, parent, force){

  // Create a new edge connecting the two vertices.
  edges.push(new Edge(child, parent, force));
  child.strength += force;
  parent.strength += force;
  console.log("Edges: "+edges.length);
}

function mousePressed() {
  for (let i = 0; i < vertices.length; i++) {
    if(dist(vertices[i].pos.x, vertices[i].pos.y, mouseX, mouseY) < vertices[i].getRadius()/2){     
      vertices[i].touched = !vertices[i].touched;
       break;
    }
  }
}

// find the touched element in the array
const isTouched = (element) => element.touched == true;

function mouseReleased(){  
  var itemTouched = vertices.findIndex(isTouched);

  if(itemTouched != -1){
    console.log("Touched: "+itemTouched);
    //release the touched
    if(vertices[itemTouched].touched){
      vertices[itemTouched].touched = false;
      vertices[itemTouched].pos.x = mouseX;
      vertices[itemTouched].pos.y = mouseY;           
    }
  
    //if released under other node, join it
    for (let i = 0; i < vertices.length; i++) {
      if(i != itemTouched && dist(vertices[itemTouched].pos.x, vertices[itemTouched].pos.y, vertices[i].pos.x, vertices[i].pos.y) < vertices[itemTouched].getRadius()/2)
      {          
        var force = random(10, 100);
        addEdgeAt(vertices[itemTouched], vertices[i], force);
        console.log("Join => Child: "+itemTouched+" Parent: "+i+" Force: "+force);
        break;
      }
    }
  }
}
