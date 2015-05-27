define(['jquery', './analysis'],function ($, analysis) {
    return function () {
        return {
            link: function (div, charttype) {
                function drawChart() {
                    var newdata = google.visualization.arrayToDataTable(analysis.thedata);

                    var options = {
                        title: 'Company Performance',
                        vAxis: {title: 'Year',  titleTextStyle: {color: 'red'}}
                    };
                    
                    var chart = new google.visualization[charttype](document.getElementById(div));
                    chart.draw(newdata, options);
                }
                function LoadGoogle() {
                  if (typeof google != 'undefined' && google && google.load) {
                      google.load("visualization", "1", {packages:["corechart"], callback: drawChart});
                  } else {
                      setTimeout(LoadGoogle, 30);
                  }
                }
                LoadGoogle();
                
            }
        };
    };
});