define(["./socialdatabase", "./htmlconnector", "./chartingtest"], function(socialdatabase, htmlconnector, chartingtest) {
  return {
    //change buildTypedUrlList 
    //buildTypedUrlList: function(divName) {**
    //new
    buildTypedUrlList: function(divName, process) {
      // To look for history items visited in the last week,
      // subtract a week of microseconds from the current time.
      var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
      var oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;
    
      // Track the number of callbacks from chrome.history.getVisits()
      // that we expect to get.  When it reaches zero, we have all results.
      var numRequestsOutstanding = 0;
    
      chrome.history.search({
          'text': '',
          'maxResults': 1000, // Return every history item....
          'startTime': oneWeekAgo  // that was accessed less than one week ago.
        },
        function(historyItems) {
          // For each history item, get details on all visits.
          for (var i = 0; i < historyItems.length; ++i) {
            var url = historyItems[i].url;
            
            var processVisitsWithUrl = function(url, process) {
              // We need the url of the visited item to process the visit.
              // Use a closure to bind the  url into the callback's args.
              return function(visitItems) {
                //changing processVisits function - original
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
          var sd = socialdatabase.data;
          if (!urlToCount[sortSM(url, sd)]) {
              urlToCount[sortSM(url, sd)] = 0;
            }
          urlToCount[sortSM(url, sd)]++;
            
          if (!--numRequestsOutstanding) {
            onAllVisitsProcessed();
          }
          
        },
        duration: function(url, visitItems) {
          //determines what index number to use depending on whether the url is
          //http or https
          var httpslice = function(url) {
              if (url.includes('http://')) {
                return 7;
              }
              if (url.includes('https://')) {
                return 8;
              }
            };
          for (var i = 0; i < visitItems.length; i ++) {
            
            var shortUrl = url.substring(httpslice(url), url.indexOf("/", 9));
            
            if (!urlToCount[shortUrl]) {
                urlToCount[shortUrl] = 0;
              }
        
            urlToCount[shortUrl] += visitItems[i].visitTime;
          }
          
          if (!--numRequestsOutstanding) {
            onAllVisitsProcessed();
          }
        },
        uniquevisits: function(url, visitItems) {
          var httpslice = function(url) {
              if (url.includes('http://')) {
                return 7;
              }
              if (url.includes('https://')) {
                return 8;
              }
            };
          for (var i = 0; i < visitItems.length; i ++) {
            var shortUrl = url.substring(httpslice(url), url.indexOf("/", 9));
            if (!shortUrl.includes('.')) { continue; }
            
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
        
        //Replacing urlArray
        var urlArray = [];
        for (var i = 0; i < sortable.length; i++) {
          var urlname = sortable[i][0];
          var urlnum = sortable[i][1];
          urlArray.push(urlname + ": " + urlnum);
        }
      
        htmlconnector.buildPopupDom(divName, urlArray.slice(0, 25));
        
      };
    },
    
    hello: function() {
      return "hello";
    }
  };
});
//DO NOT TOUCH