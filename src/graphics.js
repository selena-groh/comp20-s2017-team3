var entities = new Array(COLUMNS);
const boardColor = "#003466";
const p1Color = "#ea3347";
const p2Color = "#20a3d8";

Game = {

	map_grid: {
		width: ROWS,
		height: COLUMNS,
		tile: {
			width: $("#gamespace").width() / COLUMNS,
			height: $("#gamespace").height() / ROWS
		}
	},

	width: function() { return $("#gamespace").width(); },
	height: function() { return $("#gamespace").height(); },

	start: function() {
		Crafty.init(Game.width(), Game.height(), document.getElementById('gamespace'));
		Crafty.background(boardColor);
    initGraphics();
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
    this.color(boardColor);
  },
});

function updateGraphics() {
  for(var i = 0; i < COLUMNS; i++) {
    for(var j = 0; j < ROWS; j++) {
      setPieceColor(i, j);
    }
  }
}

function updateGraphicsCol(col) {
  for(var j = 0; j < ROWS; j++) {
    setPieceColor(col, j);
  }
}

function initGraphics() {
  for(var i = 0; i < COLUMNS; i++) {
    entities[i] = new Array(ROWS);
    for(var j = 0; j < ROWS; j++) {
      entities[i][j] = Crafty.e('piece');
      entities[i][j].at(i, j);
      entities[i][j].color(boardColor);
      entities[i][j].attr({type: EMPTY});
      // setPieceColor(i, j + ROWS);
    }
  }
}

function setPieceColor(c, r) {
  if(board[c][r] == PLAYER_1) {
    entities[c][ROWS-r-1].color(p1Color);
    entities[c][ROWS-r-1].attr({type: PLAYER_1});
  } else if(board[c][r] == PLAYER_2) {
    entities[c][ROWS-r-1].color(p2Color);
    entities[c][ROWS-r-1].attr({type: PLAYER_2});
  } else {
    entities[c][ROWS-r-1].color(boardColor);
  }
}

window.addEventListener('load', Game.start);