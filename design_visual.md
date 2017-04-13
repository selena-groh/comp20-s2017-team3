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
       - Places piece or flips gravity
                - Send to server along with played id

        - Check if someone has won?
                 - End game: "Player (??) Has Won!"
        
-------------------------------------------------------------------------------
SERVER SIDE:
         - Was it a valid move?
        - NO: 
                - Not their turn or invalid move.
                - Return to player: "Not a valid move/not their turn"
        - YES: 
                - piece placed
                        - Calculate new position of piece (coordinate) and also 
                          whose piece it is (Player1 vs Player2).
                - gravity fliped
                        - Change location of pieces, update board in database
                
        

        - Stores the current state of the game board
        - Returns updated state of board
        
