import Chessboard from "./Chessboard.js";
import { PIECE_TYPE } from "./constants/chessConstants.js";
import readline from "readline";

// Initialize the readline interface instance
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Creating new Chessboard Instance
const chessBoard = new Chessboard();

let pieceType = null;
let currentPosition = null;

// Taking user input for Type of Piece
rl.question(
  `Please select Piece from Below Pieces (Enter 1,2 Or 3) :
  1. ${PIECE_TYPE.PAWN}
  2. ${PIECE_TYPE.KING}
  3. ${PIECE_TYPE.QUEEN}
  Your Input : `,
  function (selectedPieceType) {
    pieceType = {
      1: PIECE_TYPE.PAWN,
      2: PIECE_TYPE.KING,
      3: PIECE_TYPE.QUEEN,
    }[selectedPieceType];
    // Taking User input for current position of the piece
    rl.question(
      `\nSelect current position of the PIECE (Between A1 to H8) :  `,
      function (selectedPosition) {
        currentPosition = String(selectedPosition).toUpperCase();
        console.log(
          "\n********************************************************************\n"
        );
        console.log(
          `Selected Piece = ${pieceType}, Selected Current Position = ${currentPosition}`
        );
        console.log(
          "\n********************************************************************\n"
        );
        rl.close();
      }
    );
  }
);

// When inputs are taken below method will be called
rl.on("close", function () {
  // Possible Moves will be calculated
  const possibleMoves = chessBoard.getPossibleMoves(pieceType, currentPosition);

  console.log(
    `Possible Moves for ${pieceType} from position ${currentPosition} are : \n${possibleMoves}`
  );
  console.log(
    "\n********************************************************************\n"
  );
  process.exit(0);
});
