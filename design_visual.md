Rough Visualization of Project (client -->server)

-------------------------------------------------------------------------------
DATA STRUCTURES:

Game board = 2D array (7 columns, 6 rows)

Each slot in game board has:
        - Coordinate
        - State (stored as ints)
                1. EMPTY = 0
                2. Player1 = 1
                3. Player2 = 2

At beginning of game, every slot's state is initialized to 0.

-------------------------------------------------------------------------------
CLIENT SIDE:

1. Player --> Click! (Makes a move/Flips the board)

        |
        |        
        |
        V

2. Javascript:
NOTE: On their turn, player can either flip gravity or make a move.



Player
        - Was it a valid move?
        - NO: 
                - Not their turn or invalid move.
                - Return to player: "Not a valid move/not their turn"
        - YES: 
                - Calculate new position of piece (coordinate) and
                also whose piece it is (Player1 vs Player2).
                - Send to server

        - Or do we need to flip gravity?
                - Change location of pieces, send
                updated board to server
        - Check if someone has won?
                 - End game: "Player (??) Has Won!"
        
-------------------------------------------------------------------------------
SERVER SIDE:

        - Stores the current state of the game board
        - Returns updated state of board
        