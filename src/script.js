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

    colLength = board[c].length;
    shift = 0;

    if(gravity) { // gravity normal

      // calculate number of slots to shift pieces
      for (r = colLength - 1; r >= 0; r -= 1) {
        if(board[c][r] == 0)
          shift++;
        else
          break;
      }

      // swap pieces with empty slots
      if(shift < colLength && shift > 0) {
        pieceSlice = board[c].slice(0, colLength - shift);
        emptySlice = board[c].slice(colLength - shift, colLength);
        board[c] = emptySlice.concat(pieceSlice);
      }

    } else { // gravity upside down

      // calculate number of slots to shift pieces
      for (r = 0; r < colLength; r += 1) {
        if(board[c][r] == 0)
          shift++;
        else
          break;
      }

      // swap pieces with empty slots
      if(shift < colLength && shift > 0) {
        pieceSlice = board[c].slice(shift, colLength);
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

// run checkWin at the end of each player's turn (so after they make a potentially
// winning move)
function checkWin(player) {
  // horizontal check
  for (var j = 0; j < 6-3 ; j++ ){
        for (var i = 0; i < 7; i++){
            if (board[i][j] == player && board[i][j+1] == player && board[i][j+2] == player && board[i][j+3] == player){
                return true;
            }           
        }
    }
  // verticalCheck
  for (var i = 0; i < 7-3 ; i++ ){
      for (var j = 0; j < 6; j++){
          if (board[i][j] == player && board[i+1][j] == player && board[i+2][j] == player && board[i+3][j] == player){
              return true;
          }           
      }
  }
  // ascendingDiagonalCheck 
  for (var i = 3; i < 7; i++){
      for (var j = 0; j < 6-3; j++){
          if (board[i][j] == player && board[i-1][j+1] == player && board[i-2][j+2] == player && board[i-3][j+3] == player)
              return true;
      }
  }
  // descendingDiagonalCheck
  for (var i = 3; i < 7; i++){
      for (var j = 3; j < 6; j++){
          if (board[i][j] == player && board[i-1][j-1] == player && board[i-2][j-2] == player && board[i-3][j-3] == player)
              return true;
      }
  }
  return false;
}




