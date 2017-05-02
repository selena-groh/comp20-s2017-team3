const COLUMNS = 7, ROWS = 6;
const minColInput = 49, maxColInput = 49 + COLUMNS;
const EMPTY = 0, PLAYER_1 = 1, PLAYER_2 = 2, TIE = 0;
const FULLBOARD = 6*7;

var gravity,
    gameOver,
    board,
    currPlayer,
    p1Score = 0,
    p2Score = 0,
    piecesPlaced = 0,
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
  $("#gamespace").width($("#gamespace").height() / 6*7);
  $("#column-labels").width($("#gamespace").width());
}

function initVariables() {
  board = JSON.parse(JSON.stringify(emptyBoard));
  
  currPlayer = PLAYER_1;
  updateCurrPlayerMessage();
  
  updateScore();
  
  gravity = true;
  gameOver = false;
  piecesPlaced = 0;

  document.getElementById('game-full').style.backgroundImage="url(../res/Background-full-wide-down.png)";
}

function isColumnCode(keyCode) {
  return (keyCode >= minColInput && keyCode <= maxColInput);
}

function isCommandCode(keyCode) {
  return (keyCode === 70 || keyCode === 78 || keyCode === 82);
}

// keyboard controls
// main game "loop"
function processKey(keyCode) {
  if (keyCode === 78 || keyCode === 82) { // restart or new game
    gameOver = false;
  }
  
  if (gameOver || !(isColumnCode(keyCode) || isCommandCode(keyCode))) {
    return;
  }
  
  var columnChosen = -1;
  if (isColumnCode(keyCode)) {
    columnChosen = keyCode % 49;
    // if valid move  
    if(addToCol(currPlayer, columnChosen)) {
        updateGraphics(columnChosen);
    }
    else{
        playerTurn.innerHTML = "Invalid Move"
        return;
    }
  } else {
    switch(keyCode) {
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
  if (!gameOver) {
    updateCurrPlayer();
  }
}

function addToCol(player, c) {
  if (gravity) {
    for (r = 0; r < board[c].length; r += 1) {
      if (board[c][r] === EMPTY) {
        board[c][r] = player;
        piecesPlaced += 1;
        return true;
      }
    }
  } else {
    for (r = board[c].length - 1; r >= 0; r -= 1) {
      if (board[c][r] === EMPTY) {
        board[c][r] = player;
        piecesPlaced += 1;
        return true;
      }
    }
  }
  return false;
}

// flip gravity of board
function flipGravity() {
  //change background gravity direction
  if(gravity)
      document.getElementById('game-full').style.backgroundImage="url(../res/Background-full-wide-up.png)";
  else
      document.getElementById('game-full').style.backgroundImage="url(../res/Background-full-wide-down.png)";
  
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
      for (r = 0; r < colLength; r += 1) {
        if(board[c][r] == 0)
          shift++;
        else
          break;
      }

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
    submitWin(PLAYER_1);
    submitWin(PLAYER_2);
    gameOver = true;    
  } else if (player1Won) {
    updateWinMessage(PLAYER_1);
    p1Score += 1;
    submitWin(PLAYER_1);
    gameOver = true;
  } else if (player2Won) {
    updateWinMessage(PLAYER_2);
    p2Score += 1;
    submitWin(PLAYER_2);
    gameOver = true;
  } else if(piecesPlaced == FULLBOARD){
    updateWinMessage(FULLBOARD);
    gameOver = true;
  }else {
    gameOver = false;
  }
  
  updateScore();
  
  return gameOver;
}

function submitWin(winner) {
  "use strict";
  var request = new XMLHttpRequest(),
    parameters = "";

  request.open("POST", "https://float-four.herokuapp.com/submitWin", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  parameters = "winner=" + winner;
  request.send(parameters);
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

//-----------------------------------------------------------------------------
// Manipulate HTML
//-----------------------------------------------------------------------------
function updateScore() {
  score.innerHTML = "Player 1: " + p1Score + "&nbsp; &nbsp; Player 2: " + p2Score;
}

function updateWinMessage(winner) {
  if (winner === TIE) {
    playerTurn.innerHTML = "It's a tie! Press 'r' to restart.";
  } else if(winner === FULLBOARD){
    playerTurn.innerHTML = "Board is full! Press 'r' to restart.";
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

//Mobile display
if ($(window).width() < 480 || $(window).height() < 480) {
  BootstrapDialog.show({
    title: '<h1> Oh no! </h1>',
    message: "<p> This game does not work on mobile. Please use a desktop computer to play.</p> <img src='../res/Albert_Sad.png'>",
    buttons: [{
      label: "Take me home",
        action: function(dialog) {
          dialog.close();
          window.location = 'http://float-four.herokuapp.com/';
        }
    }]
  });  
}

//Instructions pop up box
else {
  BootstrapDialog.show({
    title: '<h1> Instructions </h1>',
      message: "<p> Use your number keys (1 through 7) </br> to place your pieces in the corresponding columns.</p> <p>Get four in a row horizontally, vertically, or diagonally to win!</p> <p> Press &#39;f&#39; to flip the direction of gravity! </p> <p>  Press &#39;r&#39; to restart the current game. </p> <p> Press &#39;n&#39; to start a new game, which resets the player win count. </p> <img src='../res/instructions.gif'>",
      buttons: [{
        label: 'Play!',
          action: function(dialog) {
            dialog.close();
          }
      }]
  });
}