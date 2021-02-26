let input, button, greeting;

let vertices = [];
let edges = [];
let area;
let k;
let rC = 0.001; // repulsió dels nodes
let aC = 0.01;  // atracció dels enllaços
let margin = 100;

let nodesCSV, edgesCSV;

function preload() {
  nodesCSV = loadTable('sample/nodes.csv', 'csv', 'header');
  edgesCSV = loadTable('sample/edges.csv', 'csv', 'header');
}

function setup() {
  // create canvas
  createCanvas(windowWidth, windowHeight);

  area = width * height;
  textAlign(CENTER, CENTER);
  
  input = createInput();
  input.position(width/2, 65);
  input.changed(CreateIdea);

  button = createButton('samples');
  button.position(input.x + input.width, 65);
  button.mousePressed(CreateTestcase);

  greeting = createElement('h2', 'Start brainstorming');
  greeting.position(width/2, 5);

  textAlign(CENTER);
  textSize(50);

  //addVertexAt(width / 2, height / 2);
  loadSample();

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
  addVertexAt(width / 2, height / 2, txt, 100);
  input.value("");
}

function addVertexAt(x, y, txt, strength){
  if(txt == null) txt = "Root";
  
  // Create the new vertex at the new position.    
  let v = new Vertex(x, y, txt, strength);
  // Finally, add the vertex to the list of vertices.
  vertices.push(v);

  // Recalculate k because the number of vertices has changed
  k = sqrt(area / vertices.length);
}

function addEdgeAt(child, parent, force){
  // Create a new edge connecting the two vertices.
  edges.push(new Edge(child, parent, force));
  //console.log("Edges: "+edges.length);
}

function mousePressed() {
  for (let i = 0; i < vertices.length; i++) {
    if(dist(vertices[i].pos.x, vertices[i].pos.y, mouseX, mouseY) < vertices[i].strength/2){     
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
    //console.log("Touched: "+itemTouched);
    //release the touched
    if(vertices[itemTouched].touched){
      vertices[itemTouched].touched = false;
      vertices[itemTouched].pos.x = mouseX;
      vertices[itemTouched].pos.y = mouseY;           
    }
  
    //if released under other node, join it
    for (let i = 0; i < vertices.length; i++) {
      if(i != itemTouched && dist(vertices[itemTouched].pos.x, vertices[itemTouched].pos.y, vertices[i].pos.x, vertices[i].pos.y) < vertices[itemTouched].strength/2)
      {          
        addEdgeAt(vertices[itemTouched], vertices[i], 100);
        console.log("Join => Child: "+itemTouched+" Parent: "+i+" Force: "+100);
        break;
      }
    }
  }
}
