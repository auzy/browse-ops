define(["jquery"], function($) {
  return {
    // top10bar: function(divName, data) {

    //   for (var i = 0, ie = data.length; i < ie; ++i) {
    //     var url = data[i][0];
    //     var visits = data[i][1];
    //     var iden = '#chart ' + '.n' + i;
    //     var ww = $(iden).width();
    //     var len = parseInt(ww, 10) * parseInt(visits, 10) / 100;
    //     $(iden).prop('title', visits)
    //     $(iden).children('.url').html(visits + '');
    //     $(iden).children('.bar').animate({'width' : len + 'px' }, 1500);
    //     $(iden).children('.abc').text(url);
    //   } },

    trackedurls: function(data) {

      var classnum = 0;

      for (var key in data) {
        var name = key;
        var iden = '#n' + classnum;
        // $('<li id = ' + iden + '><li>').appendTo('#wrapper');
        // $('<ul id="chart"><ul>').appendTo('<li id = ' + iden + '><li>');
        var idata = data[name];

        var max = Math.max.apply(Math, idata);
        console.log(max);
        // var total = idata.reduce(function(a, b) { return a + b; });
        // console.log(total);
        $(iden + ' .abc').text(name);
        classnum ++;

        for (var i = 0, ie = 5; i < ie; ++i) {
          // $(iden + ".chart").append("<span class= 'bar' id = '" + i + "'></span>");
          // $(iden + ".chart").append("<span class= 'nov' id = 'nov" + i + "'></span>");

          var visits = data[name][i];

          var barid = ' #' + i;

            var ww = $(iden).width();

            var len = parseInt(ww, 10) * parseInt(visits, 10) / max;

            $(iden + ' #nov' + i).html(visits + '');

            $(iden + barid).animate({'width' : len + 'px' }, 1500);
          } 
        }
      
      },

    buildPieChart: function(data) {

      var totalvisits = 0;

      for (var j = 0; j < data.length; j ++) {
        totalvisits += data[j][1];
      }

      var datastart = 0;
      var datavalue = 0;
      var bigactivation;
      var bigtitle;
      var bigdata;

      for (var i = 0; i < data.length; i ++) {
        //This creates the id name
        
        //manipulation of the visits number to data start and data value deg
        //***this does not omit the first one.
        console.log(data[i][1]);
        datastart += datavalue;
        datavalue = Math.ceil((data[i][1]/totalvisits)*360);
        
        //This creates a new <div> element inside #mainpiechartdiv

        if (datavalue > 180) {
          bigactivation = true;
          bigtitle = data[i][0];
          bigvalue = data[i][1];
          jQuery('<div/>', {
              id: 'pie' + i,
              class:'pie big',
              'data-title': bigtitle,
              "data-value": bigvalue,
          }).appendTo('#mainpiechartdiv');
        } else {  
          jQuery('<div/>', {
              id: 'pie' + i,
              class:'pie',
              'data-title': data[i][0],
              "data-value": data[i][1],
            }).appendTo('#mainpiechartdiv');
        }

        var id = '#pie' + i;
        var datastartinput = 'rotate(' + datastart + 'deg)';
        var datavalueinput = 'rotate(' + datavalue + 'deg)';

        if (i !== 0) {
          //transforms to rotate according to data-start
          jQuery(id).css('-webkit-transform', datastartinput);
        }
        
        //transforms to rotate BEFORE according to the data-value
        $('<style>' + id + ':before{ -webkit-transform: ' + datavalueinput + '}</style>').appendTo('head');

      }

      if (bigactivation) {
          jQuery('<div/>', {
                id: 'pie' + 10,
                class:'pie',
                'data-title': bigtitle,
                "data-value": bigvalue,
              }).appendTo('#mainpiechartdiv');

          $('<style>#pie10:before{ -webkit-transform: rotate(180deg)}</style>').appendTo('head');
        }

        $(function () {
          $('#pie0').on({
            mouseover: function () {
              $("p").remove();
              var title = $('#pie0').data("title");
              var value = $('#pie0').data("value");
              console.log(title);
              console.log(value);
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + title + '</p>').appendTo('#content');
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + value + '</p>').appendTo('#content');
            },
            mouseleave: function () {
              $("p").remove();
            }
          });
        });
        $(function () {
          $('#pie1').on({
            mouseover: function () {
              $("p").remove();
              var title = $('#pie1').data("title");
              var value = $('#pie1').data("value");
              console.log(title);
              console.log(value);
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + title + '</p>').appendTo('#content');
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + value + '</p>').appendTo('#content');
            },
            mouseleave: function () {
              $("p").remove();
            }
          });
        });
        $(function () {
          $('#pie2').on({
            mouseover: function () {
              $("p").remove();
              var title = $('#pie2').data("title");
              var value = $('#pie2').data("value");
              console.log(title);
              console.log(value);
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + title + '</p>').appendTo('#content');
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + value + '</p>').appendTo('#content');
            },
            mouseleave: function () {
              $("p").remove();
            }
          });
        });
        $(function () {
          $('#pie3').on({
            mouseover: function () {
              $("p").remove();
              var title = $('#pie3').data("title");
              var value = $('#pie3').data("value");
              console.log(title);
              console.log(value);
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + title + '</p>').appendTo('#content');
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + value + '</p>').appendTo('#content');
            },
            mouseleave: function () {
              $("p").remove();
            }
          });
        });
        $(function () {
          $('#pie4').on({
            mouseover: function () {
              $("p").remove();
              var title = $('#pie4').data("title");
              var value = $('#pie4').data("value");
              console.log(title);
              console.log(value);
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + title + '</p>').appendTo('#content');
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + value + '</p>').appendTo('#content');
            },
            mouseleave: function () {
              $("p").remove();
            }
          });
        });
        $(function () {
          $('#pie5').on({
            mouseover: function () {
              $("p").remove();
              var title = $('#pie5').data("title");
              var value = $('#pie5').data("value");
              console.log(title);
              console.log(value);
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + title + '</p>').appendTo('#content');
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + value + '</p>').appendTo('#content');
            },
            mouseleave: function () {
              $("p").remove();
            }
          });
        });
        $(function () {
          $('#pie6').on({
            mouseover: function () {
              $("p").remove();
              var title = $('#pie6').data("title");
              var value = $('#pie6').data("value");
              console.log(title);
              console.log(value);
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + title + '</p>').appendTo('#content');
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + value + '</p>').appendTo('#content');
            },
            mouseleave: function () {
              $("p").remove();
            }
          });
        });
        $(function () {
          $('#pie7').on({
            mouseover: function () {
              $("p").remove();
              var title = $('#pie7').data("title");
              var value = $('#pie7').data("value");
              console.log(title);
              console.log(value);
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + title + '</p>').appendTo('#content');
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + value + '</p>').appendTo('#content');
            },
            mouseleave: function () {
              $("p").remove();
            }
          });
        });
        $(function () {
          $('#pie8').on({
            mouseover: function () {
              $("p").remove();
              var title = $('#pie8').data("title");
              var value = $('#pie8').data("value");
              console.log(title);
              console.log(value);
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + title + '</p>').appendTo('#content');
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + value + '</p>').appendTo('#content');
            },
            mouseleave: function () {
              $("p").remove();
            }
          });
        });
        $(function () {
          $('#pie9').on({
            mouseover: function () {
              $("p").remove();
              var title = $('#pie9').data("title");
              var value = $('#pie9').data("value");
              console.log(title);
              console.log(value);
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + title + '</p>').appendTo('#content');
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + value + '</p>').appendTo('#content');
            },
            mouseleave: function () {
              $("p").remove();
            }
          });
        });
        if (bigactivation) {
        $(function () {
          $('#pie10').on({
            mouseover: function () {
              $("p").remove();
              var title = $('#pie10').data("title");
              var value = $('#pie10').data("value");
              console.log(title);
              console.log(value);
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + title + '</p>').appendTo('#content');
              $('<p>&nbsp;</p>').appendTo('#content');
              $('<p class = display>' + value + '</p>').appendTo('#content');
            },
            mouseleave: function () {
              $("p").remove();
            }
          });
        });}

      },
  
    
  };
});