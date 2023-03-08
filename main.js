import Chessboard from "./Chessboard.js";
import { PIECE_TYPE } from "./constants/chessConstants.js";
import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const chessBoard = new Chessboard();

let pieceType = null;
let currentPosition = null;
rl.question(
  `Please select Piece from Below Pieces (Enter 1,2 Or 3) :
  1. ${PIECE_TYPE.PAWN}
  2. ${PIECE_TYPE.KING}
  3. ${PIECE_TYPE.QUEEN}
  Your Input :
  `,
  function (selectedPieceType) {
    pieceType = {
      1: PIECE_TYPE.PAWN,
      2: PIECE_TYPE.KING,
      3: PIECE_TYPE.QUEEN,
    }[selectedPieceType];
    rl.question(
      `Select current position of the PIECE (Between A1 to H8) :  `,
      function (selectedPosition) {
        currentPosition = String(selectedPosition).toUpperCase();
        console.log(
          `Selected Piece = ${pieceType}, Selected Current Position = ${currentPosition}`
        );
        rl.close();
      }
    );
  }
);

rl.on("close", function () {
  // Possible Moves will be calculated
  const possibleMoves = chessBoard.getPossibleMoves(pieceType, currentPosition);

  console.log(
    `Possible Moves for ${pieceType} from position ${currentPosition} are : \n${possibleMoves}`
  );
  process.exit(0);
});
