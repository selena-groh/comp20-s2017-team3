// Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(getStats);

      function getStats() {
      	"use strict";
			  var request = new XMLHttpRequest();

			  request.open("GET", "https://float-four.herokuapp.com/stats.json", true);
			  request.onreadystatechange = function () {
			    var stats;
			    
			    if (request.readyState === 4 && request.status === 200) {
			      stats = JSON.parse(request.responseText);
			      drawChart(stats);
			    } else if (request.readyState === 4 && request.status !== 200) {
			      console.log("Error: XML request went wrong.");
			    }
			  };
			  request.send();
      }


      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart(stats) {
        // Create the data table.
        console.log(stats);

        var blue = 10;
        var red = 25;

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Color');
        data.addColumn('number', 'Wins');
        data.addRows([
          ['Player 1', blue],
          ['Player 2', red],
        ]);

        // Set chart options
        var options = {backgroundColor: 'transparent',
                        colors: ['#20a3d8', '#ea3347'],
                        chartArea: { left: '10%', top: '0%', width: "100%", height: "100%" },
                        legend: {textStyle: {color: 'white', fontSize: 16}},
                     };

        //options.legend = {position: 'top', textStyle: {color: 'white', fontSize: 16}},
        //options.chartArea = { left: '10%', top: '10%', width: "100%", height: "100%" };



        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }