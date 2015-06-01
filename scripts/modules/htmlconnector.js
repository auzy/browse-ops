define(["jquery"], function($) {
  return {
    buildPopupDom: function(divName, data) {
      
      // // //COMMENTED OUT - ORGINAL**
      // var popupDiv = document.getElementById(divName);
      // //creates the list
      // var ul = document.createElement('ul');
      // popupDiv.appendChild(ul);
      
      // for (var i = 0, ie = data.length; i < ie; ++i) {
        
      //   var h = document.createElement('h');
      //   h.appendChild(document.createTextNode(data[i]));
    
      //   var li = document.createElement('li');
      //   li.appendChild(h);
    
      //   ul.appendChild(li);

      for (var i = 0, ie = data.length; i < ie; ++i) {
        var url = data[i][0];
        var visits = data[i][1];
        var iden = '#chart ' + '.n' + i;
        var ww = $(iden).width();
        var len = parseInt(ww, 10) * parseInt(visits, 10) / 100;
        $(iden).prop('title', visits)
        $(iden).children('.url').html(visits + '');
        $(iden).children('.bar').animate({'width' : len + 'px' }, 1500);
        $(iden).children('.abc').text(url);
      } 
      
    }
  
    
  };
});