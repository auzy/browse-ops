define(["jquery"], function($) {
  return {
    buildPieChart: function(data) {

    	var totalvisits = 0;

    	for (var j = 0; j < data.length; j ++) {
    		totalvisits += data[j][1];
    	}

        var datastart = 0;
    	var datavalue = 0;

    	for (var i = 0; i < data.length; i ++) {
    		//This creates the id name
    		
    		//manipulation of the visits number to data start and data value deg
            //***this does not omit the first one.
            datastart += datavalue;
    		datavalue = Math.round((data[i][1]/totalvisits)*360);
    		
    		//This creates a new <div> element inside #mainpiechartdiv

            if (datavalue < 180) {
        		jQuery('<div/>', {
        			id: 'pie' + i,
        			class:'pie',
        			title: data[i][0],
        		}).appendTo('#mainpiechartdiv');
            } else {
                jQuery('<div/>', {
                    id: 'pie' + i,
                    class:'pie big',
                    title: data[i][0],
                }).appendTo('#mainpiechartdiv');
            }

            var id = '#pie' + i;
            var datastartinput = 'rotate(' + datastart + 'deg)';
            var datavalueinput = 'rotate(' + (datavalue+1) + 'deg)';

            if (i !== 0) {
    		  //transforms to rotate according to data-start
    		  jQuery(id).css('-webkit-transform', datastartinput);
            }
    		//transforms to rotate BEFORE according to the data-value
            $('<style>' + id + ':before{ -webkit-transform: ' + datavalueinput + '}</style>').appendTo('head');

    	}

        // $('.pie').hover(
        //   function() {
        //     $(this).css('background-color','yellow');
        //   });

        //$('.pie middle').text("hello");

    }
  };
});