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

// flip gravity and recalculate pieces on the board
function flipGravity() {
  
  for (c = 0; c < board.length; c += 1) {

    colLen = board[c].length;
    shift = 0;

    if(gravity) { // gravity normal

      // calculate number of slots to shift pieces
      for (r = colLen - 1; r >= 0; r -= 1) {
        if(board[c][r] == 0)
          shift++;
        else
          break;
      }

      // swap pieces with empty slots
      if(shift < colLen && shift > 0) {
        pieceSlice = board[c].slice(0, colLen - shift);
        emptySlice = board[c].slice(colLen - shift, colLen);
        board[c] = emptySlice.concat(pieceSlice);
      }

    } else { // gravity upside down

      // calculate number of slots to shift pieces
      for (r = 0; r < colLen; r += 1) {
        if(board[c][r] == 0)
          shift++;
        else
          break;
      }

      // swap pieces with empty slots
      if(shift < colLen && shift > 0) {
        pieceSlice = board[c].slice(shift, colLen);
        emptySlice = board[c].slice(0, shift);
        board[c] = pieceSlice.concat(emptySlice);
      }

    }

  }

  gravity = !gravity;
}

// add a piece belonging to player to column c
function addToCol(player, c) {
  for (r = 0; r < board[c].length; r += 1) {
    if (board[c][r] === EMPTY) {
      board[c][r] = player;
      return;
    }
  }
}