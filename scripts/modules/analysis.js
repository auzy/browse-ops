define(['./trackingurls'], function(trackingurls) {
  return {
    httpslicer: function (url) {
        if (url.includes('http://')) {
            return 7;
        }
        if (url.includes('https://')) {
            return 8;
        }
    },
    sorttrackingurls: function (url) {
        var data = trackingurls.data;
        for (var j = 0; j < data.length; j ++) {
            if (url.includes(data[j])) {
                return data[j];
            }
        }
        return false;
    },

    getdates: function() {
        var day = new Date();
        day.setHours(day.getHours() + 24);
        day.setHours(0,0,0);

        var dateArray = [];
        var datems = day.getTime();
        dateArray[0] = datems;

        for (var j = 1; j < 6; j++) {
          day.setHours(day.getHours() - 24);
          dateArray[j] = day.getTime();
        }

        return dateArray; 
    }
    };
});

// [["facebook", 123143], ["youtube.com", 139199], ["google.com", 234004]];