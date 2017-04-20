const COLUMNS = 7;
const ROWS = 6;
const EMPTY = 0, PLAYER_1 = 1, PLAYER_2 = 2;
var gravity;
var gameWon;

var emptyBoard = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
];

var playerColors = [ "#ffffff", "#ea3347", "#20a3d8" ];

var board; 
var playerTurn = document.getElementById("turn");

function start() {
  board = JSON.parse(JSON.stringify(emptyBoard));
  gameWon = false;
  turn = PLAYER_1;
  playerTurn.innerHTML = "Player 1's Turn";
  playerTurn.style.color = playerColors[1];
  gravity = true;
  updateGraphics();
  return;
}

/*
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
} */

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
  if(gravity) {
    for (r = 0; r < board[c].length; r += 1) {
      if (board[c][r] === EMPTY) {
        board[c][r] = player;
        return;
      }
    }
  } else {
    for (r = board[c].length-1; r >= 0; r -= 1) {
      if (board[c][r] === EMPTY) {
        board[c][r] = player;
        return;
      }
    }
  }
}

// run checkWin at the end of each player's turn (so after they make a potentially
// winning move)
function checkWin(player) {
  // horizontal check
  for (var j = 0; j < ROWS-3 ; j++ ){
        for (var i = 0; i < COLUMNS; i++){
            if (board[i][j] == player && board[i][j+1] == player 
              && board[i][j+2] == player && board[i][j+3] == player){
                return true;
            }           
        }
    }
  // verticalCheck
  for (var i = 0; i < COLUMNS-3 ; i++ ){
      for (var j = 0; j < ROWS; j++){
          if (board[i][j] == player && board[i+1][j] == player 
            && board[i+2][j] == player && board[i+3][j] == player){
              return true;
          }           
      }
  }
  // ascendingDiagonalCheck 
  for (var i = 3; i < COLUMNS; i++){
      for (var j = 0; j < ROWS-3; j++){
          if (board[i][j] == player && board[i-1][j+1] == player 
            && board[i-2][j+2] == player && board[i-3][j+3] == player)
              return true;
      }
  }
  // descendingDiagonalCheck
  for (var i = 3; i < COLUMNS; i++){
      for (var j = 3; j < ROWS; j++){
          if (board[i][j] == player && board[i-1][j-1] == player 
            && board[i-2][j-2] == player && board[i-3][j-3] == player)
              return true;
      }
  }
  return false;
}

function keyValid (keyCode) {
  if (keyCode > 48 && keyCode < 55) {
    return true;
  } else if (keyCode === 70 || keyCode ===82) {
    return true;
  } else {
    return false;
  }
}

window.addEventListener('keyup', function(event) {
  if (event.keyCode === 82) { // key r: restart
    gameWon = false;
  }
  if (gameWon || !keyValid(event.keyCode)) { return; }
  
  var columnChosen = -1;
  switch(event.keyCode) {
    case 49: // key 1
      columnChosen = 0;
      addToCol(turn, 0);
      break;
    case 50: // key 2
      columnChosen = 1;
      addToCol(turn, 1);
      break;
    case 51: // key 3
      columnChosen = 2;
      addToCol(turn, 2);
      break;
    case 52: // key 4
      columnChosen = 3;
      addToCol(turn, 3);
      break;
    case 53: // key 5
      columnChosen = 4;
      addToCol(turn, 4);
      break;
    case 54: // key 6
      columnChosen = 5;
      addToCol(turn, 5);
      break;
    case 55: // key 7
      columnChosen = 6;
      addToCol(turn, 6);
      break;
    case 70: // key f: flip
      columnChosen = 10;
      flipGravity();
      break;
    case 82: // key r: restart
      start();
      return;
  }
  
  if(columnChosen == 10) {
    updateGraphics();
  } else if(columnChosen >= 0) {
    updateGraphics(columnChosen);
  }
  //printBoard();
  if (checkWin(turn)) {
      playerTurn.innerHTML = "Player " + turn + " Won! Press 'r' to restart.";
      playerTurn.style.color = playerColors[turn];
      gameWon = true;121
  } else {
    turn = (turn === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    playerTurn.innerHTML = "Player " + turn + "'s Turn";
    playerTurn.style.color = playerColors[turn];
/*    if (turn === PLAYER_1) {
      turn = PLAYER_2;
      playerTurn.innerHTML = "Player 2's Turn";
      playerTurn.style.color = playerColors[2];
    } else {
      turn = PLAYER_1;
      playerTurn.innerHTML = "Player 1's Turn";
      playerTurn.style.color = playerColors[1];
    } */
  }
}, false);

/*Mousetrap.bind('1', function addToCol(turn, 0), 'keyup');
Mousetrap.bind('2', function addToCol(turn, 1), 'keyup');
Mousetrap.bind('3', function addToCol(turn, 2), 'keyup');
Mousetrap.bind('4', function addToCol(turn, 3), 'keyup');
Mousetrap.bind('5', function addToCol(turn, 4), 'keyup');
Mousetrap.bind('6', function addToCol(turn, 5), 'keyup');
Mousetrap.bind('7', function addToCol(turn, 6), 'keyup');
Mousetrap.bind('f', function flipGravity(), 'keyup');*/