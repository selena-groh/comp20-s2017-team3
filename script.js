const EMPTY = 0; PLAYER_1 = 1, PLAYER_2 = 2;

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

function start() {
  printBoard();
  addToCol(PLAYER_1, 4);
  printBoard();
  addToCol(PLAYER_2, 4);
  printBoard();
}

function printBoard() {
  var game = document.getElementById("game");
  var game_text = "";
  var c, r;
  
  for (r = board[0].length - 1; r > -1; r -= 1) {
    game_text += "<p>";
    for (c = 0; c < board.length; c += 1) {
      game_text += board[c][r];
      if (c !== board.length - 1) {
        game_text += " &nbsp; &nbsp; &nbsp; ";
      }
    }
    game_text += "</p>";
  }
  
  game.innerHTML = game_text;
}

function flipGravity() {
  var tempBoard = JSON.parse(JSON.stringify(board));
  
  for (c = 0; c < board.length; c += 1) {
    for (r = 0; r < board[c].length; r += 1) {
      board[c][board[0].length - 1 - r] = tempBoard[c][r];
    }
  }
}

function addToCol(player, c) {
  for (r = 0; r < board[c].length; r += 1) {
    if (board[c][r] === EMPTY) {
      board[c][r] = player;
      return;
    }
  }
}