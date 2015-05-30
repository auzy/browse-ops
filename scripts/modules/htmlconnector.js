define(["jquery"], function($) {
  return {
    buildPopupDom: function(divName, data) {
      
      // //COMMENTED OUT - ORGINAL**
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
        
      
      // document.body.style.backgroundColor = "grey";
      
      // var arrayOfBars = function() {
      //   var arrayofbars = [];
      //     for (var j = 0; j < 10; j++) {
      //       arrayofbars[j] = "bar" + j;
      //   }
      // return arrayofbars;
      // };
      
      // for (var k = 0; k < 10; k++) {
      //   var barName = "bar" + k;
      //   var bar = document.getElementById(barName);
      //   bar.style.height= data[k][1]+"px";
      // }

      //for (var i = 0, ie = data.length; i < ie; ++i) {
        var url = data[i][0];
        var visits = data[i][1];
        var iden = '#chart ' + '.n' + i;
        var ww = $(iden).width();
        var len = parseInt(ww, 10) * parseInt(visits, 10) / 100;
        $(iden).prop('title', visits)
        $(iden).children('.url').html(visits + '');
        $(iden).children('.bar').animate({'width' : len + 'px' }, 1500);
        $(iden).children('.bar').text(url);
      }

      //$('#chart .n0').prop('title', 'Jesus');
      //var title1 = $('#chart .n0').prop('title');
      //console.log(title1);
      
      // $('#chart li').each(function() {

    		// var pc = $(this).attr('title');
    		// pc = pc > 100 ? 100: pc;
    		// $(this).children('.visits').html(pc+'%');
    		// var ww = $(this).width();
    		// var len = parseInt(ww, 10) * parseInt(pc, 10) / 100;
    		// $(this).children('.bar').animate({ 'width' : len + 'px'}, 1500);
      // });
      
      
    }
  
    
  };
});