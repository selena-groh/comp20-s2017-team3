const PLAYER_1 = 1, PLAYER_2 = 2;

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


      function drawChart(stats) {

        var p1wins, p2wins;

        if (stats[0]["player"] == PLAYER_1) {
        	p1wins = stats[0]["wins"];
        	p2wins = stats[1]["wins"];
        } else {
        	p1wins = stats[1]["wins"];
        	p2wins = stats[0]["wins"];        	
        }

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Color');
        data.addColumn('number', 'Wins');
        data.addRows([
          ['Player 1', p1wins],
          ['Player 2', p2wins],
        ]);

        // Set chart options
        var options = {backgroundColor: 'transparent',
                        colors: ['#ea3347', '#20a3d8'],
                        chartArea: { left: '10%', top: '0%', width: "100%", height: "100%" },
                        legend: {textStyle: {color: 'white', fontSize: 16}},
                     };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }