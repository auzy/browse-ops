define(["jquery"], function($) {
	var container = {};
  return {
    test: function(data) {
      for (var key in data) {
  		  console.log(data[key]);
  		}
    },
    real: function(data) {

    	var classnum = 0;
    	for (var key in data) {
  		  console.log(data[key]);
  		}

    	for (var key in data) {
	    	var name = key;
	    	var iden = '#n' + classnum;
	    	var idata = data[name];
	    	var max = Math.max.apply(Math, idata);
			console.log(max);
	    	// var total = idata.reduce(function(a, b) { return a + b; });
	    	// console.log(total);
  			$(iden + ' .abc').text(name);
  			classnum ++;

	    	for (var i = 0, ie = 5; i < ie; ++i) {
	    		var visits = data[name][i];

	    		var barid = ' #' + i;

	        	var ww = $(iden).width();

	        	var len = parseInt(ww, 10) * parseInt(visits, 10) / max;

	        	$(iden + ' #nov' + i).html(visits + '');

	        	$(iden + barid).animate({'width' : len + 'px' }, 1500);
	      	} 
	    }
    }
  };
});
