require(["modules/chromesearchtest", "modules/chartingtest", "jquery"], 
        function (chromesearchtest, chartingtest, $) {
          
  
  chromesearchtest.buildTypedUrlList("header", "uniquevisits");
  //chartingtest().link('chart_div', 'BarChart');
  
});

