/*
const EMPTY = 0; PLAYER_1 = 1, PLAYER_2 = 2;
var gravity = true;

var emptyBoard = [
  [0, 1, 2, 3, 4, 5],
  [1, 0, 0, 0, 0, 0],
  [2, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 0],
  [4, 0, 0, 0, 0, 0],
  [5, 0, 0, 0, 0, 0],
  [6, 0, 0, 0, 0, 0]
];

var board = JSON.parse(JSON.stringify(emptyBoard));
*/


var entities = new Array(ROWS);

Game = {

	map_grid: {
		width: COLUMNS,
		height: ROWS,
		tile: {
			width: $("#gamespace").width() / ROWS,
			height: $("#gamespace").height() / COLUMNS
		}
	},

	width: function() { return $("#gamespace").width(); },
	height: function() { return $("#gamespace").height(); },

	start: function() {
		Crafty.init(Game.width(), Game.height(), document.getElementById('gamespace'));
		Crafty.background('rgb(0, 52, 102)');
    initGraphics();

		Crafty.e('piece').at(0, Game.map_grid.height-1);
    Crafty.e('piece').at(0, Game.map_grid.height-2);
    Crafty.e('piece').at(0, Game.map_grid.height-3);
    Crafty.e('piece').at(0, Game.map_grid.height-4);
    Crafty.e('piece').at(0, Game.map_grid.height-5);
		Crafty.e('piece').at(0, Game.map_grid.height-6);
	}
}

// src: http://buildnewgames.com/introduction-to-crafty/
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

Crafty.c('piece', {
  init: function() {
    this.requires('2D, Canvas, Grid, Color');
    this.color('rgb(0, 52, 102)');
  },
});

function updateGraphics() {

}

function initGraphics() {
  for(var a = 0; a < ROWS; a++) {
    entities[a] = new Array(COLUMNS);
  }
  for(var i = 0; i < COLUMNS; i++) {
    for(var j = 0; j < ROWS; j++) {
      console.log(i, j);
      entities[i][j] = Crafty.e('piece');
      entities[i][j].at(i, COLUMNS-j);
    }
  }
}

window.addEventListener('load', Game.start);