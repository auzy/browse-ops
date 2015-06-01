define(["./trackingurls", "./htmlconnector"], function(trackingurls, htmlconnector) {
  return {
    retrieveHistory: function(divName, process) {
      
      //Creates a new Date object with the current date
      //var today = new Date();
      //Set the time to starting at 00:00
      //today.setHours(0,0,0);

      //Creates a date array to retrieve the respective ms for each of the past seven days
      //Current date is at index 0, and date - 6 days is at index 6
      var getDates = function() {
        var day = new Date();
        day.setHours(0,0,0);

        var dateArray = [];
        var datems = day.getTime();
        dateArray[0] = datems;

        for (var j = 1; j < 7; j++) {
          day.setHours(day.getHours() - 24);
          dateArray[j] = day.getTime();
        }

        return dateArray; }

      var dates = getDates();

      // Track the number of callbacks from chrome.history.getVisits()
      // that we expect to get.  When it reaches zero, we have all results.
      var numRequestsOutstanding = 0;
      var maxResults = 100000;
    
      chrome.history.search({
          'text': '',
          'maxResults': maxResults, // Return every history item....
          'startTime': dates[0]  // that was accessed less than one week ago.
        },
        function(historyItems) {
          
          for (var i = 0; i < historyItems.length; ++i) {
            
            var url = historyItems[i].url;
            
            var processVisitsWithUrl = function(url, process) {
              return function(visitItems) {
                processVisits[process](url, visitItems);
              };
            };
            chrome.history.getVisits({url: url}, processVisitsWithUrl(url, process));
            numRequestsOutstanding++;
          }
          if (!numRequestsOutstanding) {
            onAllVisitsProcessed();
          }
        });
    
      // urlToCount is an helper object to create a local variable in order to have
      // access to the object here
      var urlToCount = {};
      
      //Processes visit objects by using different analysis techniques
      //to extracting information from VisitItems objects
      var processVisits = {
        socialmedia: function(url, visitItems) {
          
          var httpslice = function(url) {
              if (url.includes('http://')) {
                return 7;
              }
              if (url.includes('https://')) {
                return 8;
              }
            };
          var sortSM = function(link, data) {
            for (var j = 0; j < data.length; j++) {
                if (link.includes(data[j])) {
                  return data[j];
                }
            }
            return "other";
          };
          var sd = trackingurls.data;
          if (!urlToCount[sortSM(url, sd)]) {
              urlToCount[sortSM(url, sd)] = 0;
            }
          urlToCount[sortSM(url, sd)]++;
            
          if (!--numRequestsOutstanding) {
            onAllVisitsProcessed();
          }},
        uniquevisits: function(url, visitItems) {
          var httpslice = function(url) {
              if (url.includes('http://')) {
                return 7;
              }
              if (url.includes('https://')) {
                return 8;
              }
            };
          var shortUrl = url.substring(httpslice(url), url.indexOf("/", 9));
            
            if (shortUrl.includes('.')) {
            
              var helper = shortUrl.substring(shortUrl.indexOf('.') + 1);
              var newUrl;
              if (helper.includes('.')) {
                newUrl = helper;
              } else {
                newUrl = shortUrl;
              }
              
              if (!urlToCount[newUrl]) {
                  urlToCount[newUrl] = 0;
                }
          
              urlToCount[newUrl]++;
          }
          
          if (!--numRequestsOutstanding) {
            onAllVisitsProcessed();
          }
        }
      };
      
      // This function is called when we have the final list of URls to display.
      var onAllVisitsProcessed = function() {
        
        var sortable = [];
        for (var url in urlToCount) {
          sortable.push([url, urlToCount[url]]);
          sortable.sort(function(a, b) { return b[1] - a[1]; });
        }
        
        //Changing Urlarray ***
        // var urlArray = [];
        // for (var i = 0; i < sortable.length; i++) {
        //   var urlname = sortable[i][0];
        //   var urlnum = sortable[i][1];
        //   urlArray.push(urlname + ": " + urlnum);
        // }
      
        htmlconnector.buildPopupDom(divName, sortable.slice(0, 10));
        
      };
    },
    
    hello: function() {
      return "hello";
    }
  };
});