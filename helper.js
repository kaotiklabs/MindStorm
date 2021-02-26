
function CreateTestcase(){
    var numItems = 5;
    ideaArray = [];
  
    for(var i = 0; i < numItems; i ++){
      addVertexAt(random(width / 2), random(height / 2), GenerateRandomName(), 50);
    }
    input.value("");
  }
  
  function GenerateRandomName(){	
      var name1 = ["people","history","way","art","world","information","map","family","government","health","system","computer","meat","year","thanks","music","person","reading","method","data","food","understanding","theory","law","bird","inevitable","invite","kiss","neat","pop","punch","quit","reply","representative","resist","rip","rub","silly","smile","spell","stretch","stupid","tear","temporary","tomorrow","wake","wrap","yesterday","Thomas","Tom","Lieuwe"];
      var name = capFirst(name1[getRandomInt(0, name1.length + 1)]);
      return name;
  }
  function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function findIndex(name){
    var ret = -1;
  
    for(let i=0; i<vertices.length; i++){ 
      if(vertices[i].txt == name){
        ret = i;
        break;
      }
    }
  
    return ret;
  }

  function loadSample(){
    
    for (let r = 0; r < nodesCSV.getRowCount(); r++){
      var name = nodesCSV.getString(r,0);    
      var strength = parseInt(nodesCSV.getString(r,1));    
      
      if (findIndex(name) < 0) {
        addVertexAt(width / 2, height / 2, name, strength);
      }
    }
  
    for (let r = 0; r < edgesCSV.getRowCount(); r++){
      var name = edgesCSV.getString(r,0);
      var partner = edgesCSV.getString(r,1);
      var force = edgesCSV.getString(r,2);
  
      if(force > 50){
        addEdgeAt(vertices[findIndex(name)], vertices[findIndex(partner)], force);
      }            
    }
  }
  