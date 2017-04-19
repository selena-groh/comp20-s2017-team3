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

var rowLen = board.length;
var colLen = board[0].length;

Game = {

	map_grid: {
		width: rowLen,
		height: colLen,
		tile: {
			width: $("#gamespace").width() / rowLen,
			height: $("#gamespace").height() / colLen
		}
	},

	width: function() { return $("#gamespace").width(); },
	height: function() { return $("#gamespace").height(); },

	start: function() {
		Crafty.init(Game.width(), Game.height(), document.getElementById('gamespace'));
		Crafty.background('rgb(0, 52, 102)');

		Crafty.e('p1').at(0, Game.map_grid.height-1);
		Crafty.e('p2').at(0,Game.map_grid.height-2);
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

Crafty.c('p1', {
  init: function() {
    this.requires('2D, Canvas, Grid, Color');
    this.color('rgb(157, 51, 0)');
  },
});

Crafty.c('p2', {
  init: function() {
    this.requires('2D, Canvas, Grid, Color');
    this.color('rgb(157, 120, 0)');
  },
});


function updateGraphics() {
  
}

window.addEventListener('load', Game.start);