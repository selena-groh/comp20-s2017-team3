const COLUMNS = 7, ROWS = 6;
const minColInput = 49, maxColInput = 49 + COLUMNS;
const EMPTY = 0, PLAYER_1 = 1, PLAYER_2 = 2, TIE = 0;

var gravity,
    gameWon,
    board,
    currPlayer,
    p1Score = 0,
    p2Score = 0,
    playerColors = [ "#ffffff", "#ea3347", "#20a3d8" ],
    emptyBoard = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ];
 
var playerTurn = document.getElementById("turn");
var score = document.getElementById("score");

//$(window).resize(sizeGamespace);

// initialize new game
function start() {
  sizeGamespace();  
  initVariables();  
  return;
}

// restart game
function restart() {
  initVariables();  
  updateGraphics();
  return;
}

function sizeGamespace() {
  $("#gamespace").width($("#gamespace").height() / 6 * 7);
  $("#column-labels").width($("#gamespace").width());
}

function initVariables() {
  board = JSON.parse(JSON.stringify(emptyBoard));
  
  currPlayer = PLAYER_1;
  updateCurrPlayerMessage();
  
  updateScore();
  
  gravity = true;
  gameWon = false;
}

function isColumnCode(keyCode) {
  return (keyCode >= minColInput && keyCode <= maxColInput);
}

function isCommandCode(keyCode) {
  return (keyCode === 70 || keyCode === 78 || keyCode === 82);
}

// keyboard controls
window.addEventListener('keyup', function(event) {
  if (event.keyCode === 82) { // key r: restart
    gameWon = false;
  }
  if (gameWon || !(isColumnCode(event.keyCode) || isCommandCode(event.keyCode))) {
    return;
  }
  
  var columnChosen = -1;
  if (isColumnCode(event.keyCode)) {
    columnChosen = event.keyCode % 49;
    // check if valid move  
    if(addToCol(currPlayer, columnChosen)) {
        updateGraphics(columnChosen);
    }
    else{
        playerTurn.innerHTML = "invalid move, try again"
        return;
    }
  } else {
    switch(event.keyCode) {
      case 70: // key f: flip
        flipGravity();
        updateGraphics();
        break;
      case 78: // key n: new game (clears scores)
        p1Score = 0;
        p2Score = 0;
        restart();
        return;
      case 82: // key r: restart
        restart();
        return;
    } 
  }
  
  checkWin();
  if (!gameWon) {
    updateCurrPlayer();
  }
}, false);

// add a piece belonging to player to column c
function addToCol(player, c) {
  if (gravity) {
    for (r = 0; r < board[c].length; r += 1) {
      if (board[c][r] === EMPTY) {
        board[c][r] = player;
        return true;
      }
    }
  } else {
    for (r = board[c].length - 1; r >= 0; r -= 1) {
      if (board[c][r] === EMPTY) {
        board[c][r] = player;
        return true;
      }
    }
  }
  return false;
}

// flip gravity and recalculate pieces on the board
function flipGravity() {
  for (c = 0; c < board.length; c += 1) {
    colLength = board[c].length;
    shift = 0;

    if (gravity) { // gravity normal

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

function checkWin() {
  var player1Won = checkPlayerWin(PLAYER_1);
  var player2Won = checkPlayerWin(PLAYER_2);
  
  if (player1Won && player2Won) {
    updateWinMessage(TIE);
    p1Score += 1;
    p2Score += 1;
    gameWon = true;    
  } else if (player1Won) {
    updateWinMessage(PLAYER_1);
    p1Score += 1;
    gameWon = true;
  } else if (player2Won) {
    updateWinMessage(PLAYER_2);
    p2Score += 1;
    gameWon = true;
  } else {
    gameWon = false;
  }
  
  updateScore();
  
  return gameWon;
}

function checkPlayerWin(player) {
  // horizontal check
  for (var j = 0; j < ROWS-3 ; j++ ){
    for (var i = 0; i < COLUMNS; i++){
      if (board[i][j] == player && board[i][j+1] == player 
          && board[i][j+2] == player && board[i][j+3] == player) {
        return true;
      }           
    }
  }
  // verticalCheck
  for (var i = 0; i < COLUMNS-3 ; i++ ){
    for (var j = 0; j < ROWS; j++){
      if (board[i][j] == player && board[i+1][j] == player 
          && board[i+2][j] == player && board[i+3][j] == player) {
        return true;
      }           
    }
  }
  // ascendingDiagonalCheck 
  for (var i = 3; i < COLUMNS; i++){
    for (var j = 0; j < ROWS-3; j++){
      if (board[i][j] == player && board[i-1][j+1] == player 
          && board[i-2][j+2] == player && board[i-3][j+3] == player) {
        return true;
      }
    }
  }
  // descendingDiagonalCheck
  for (var i = 3; i < COLUMNS; i++){
    for (var j = 3; j < ROWS; j++){
      if (board[i][j] == player && board[i-1][j-1] == player 
          && board[i-2][j-2] == player && board[i-3][j-3] == player) {
        return true;
      }
    }
  }
  return false;
}

function updateScore() {
  score.innerHTML = "Player 1: " + p1Score + "&nbsp; &nbsp; Player 2: " + p2Score;
}

function updateWinMessage(winner) {
  if (winner === TIE) {
    playerTurn.innerHTML = "It's a tie! Press 'r' to restart.";
  } else {
    playerTurn.innerHTML = "Player " + winner + " Won! Press 'r' to restart."; 
  }
  playerTurn.style.color = playerColors[winner];
}

function updateCurrPlayer() {
  currPlayer = (currPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
  updateCurrPlayerMessage();
}

function updateCurrPlayerMessage() {
  playerTurn.innerHTML = "Player " + currPlayer + "'s Turn";
  playerTurn.style.color = playerColors[currPlayer];
}