##Float Four##

###Team Members ###

* Selena Groh, Jillian Howarth, Ben Machlin, Caroline Sheng, Craig Vitirinyu

###Problem statement###

* Connect Four is a classic game which delights thousands. While there have been some variations, the game has been relatively static. 

###Solution###

* We will spice up this classic game by adding an “anti-gravity” themed component that allows users to reverse the direction of gravity so that the discs float to the top, changing their relationships to each other and adding a whole new dimension of strategy to this classic game.

###Use Scenario###

* When 2 users begin playing, they are playing Float Four the way they would play Connect Four, by sliding colored discs into the game board from the top. However, they have the added ability to reverse the direction of gravity, shifting the game pieces.
* When the gravity is reversed, pieces are added at the bottom and they float up to rest against the top pieces. On each user’s turn, they can either place a disc in the board or reverse gravity, disrupting the carefully laid plans of their opponent.
* The game ends when one user obtains 4 same-colored discs in a row. 

###Features (Pick Three)###

* Front-end framework including Bootstrap, React, Backbone.js, AngularJS)
 * We will use Bootstrap for the interface design.
* Server-side data persistence (e.g., with PostgreSQL, MongoDB, MySQL)
 * We will use a server to store the game data as it is being played between two users on two computers.
* Use of a JavaScript framework for games (e.g. phaser.io, Panda.js, JS Gamepad API)
 * We will use the JavaScript framework to create and animate our game.

###Data###

* The positions of the discs
* The direction of gravity
* Whose turn it is
* Names of players
* Color of each player
* Game matchups (which client is playing which other client)

###Algorithms###

* An algorithm to change the location of the discs when a user reverses the direction of gravity 
* An algorithm to check if a player has won the game (by placing four same-colored discs in a row)

###Mock-Ups###
![Home page](docs/mockups/Home.png)
![Game instructions page](docs/mockups/Gravity.png)
![Game page](docs/mockups/Anti-Gravity.png)