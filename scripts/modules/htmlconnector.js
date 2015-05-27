define(["./chartingtest"], function(chartingtest) {
  return {
    buildPopupDom: function(divName, data) {
      
      var popupDiv = document.getElementById(divName);
      //creates the list
      var ul = document.createElement('ul');
      popupDiv.appendChild(ul);
      
      for (var i = 0, ie = data.length; i < ie; ++i) {
        
        var h = document.createElement('h');
        h.appendChild(document.createTextNode(data[i]));
    
        var li = document.createElement('li');
        li.appendChild(h);
    
        ul.appendChild(li);
        }
      
    }
  };
});

//"chart", "./graphs"
//Chart, graphs