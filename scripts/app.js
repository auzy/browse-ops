require(["modules/chromesearchtest", 'modules/analysis', "jquery", 'modules/htmlconnector3'], 
        function (chromesearchtest, analysis, $, htmlconnector3) {
  
  var dates = analysis.getdates();
  chromesearchtest.retrieveHistory("header", "top10", dates[1], dates[0]);
  chromesearchtest.trackedWebsites();

});
        
//   htmlconnector3.buildPieChart([["facebook", 30], ["youtube.com", 30], ["google.com", 40], ["asnfa", 50], ['ajfakjfs', 10],
//   	["facebook", 25], ["youtube.com", 15], ["google.com", 100], ["asnfa", 5], ['ajfakjfs', 55]]);
// });

