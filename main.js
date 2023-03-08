import Chessboard from "./Chessboard.js";
import { PIECE_TYPE, CELLS } from "./constants/chessConstants.js";

const chessBoard = new Chessboard();

// Set below values
const pieceType = PIECE_TYPE.BISHOP;
const currentPosition = CELLS.G3;

// Possible Moves will be calculated
const possibleMoves = chessBoard.getPossibleMoves(pieceType, currentPosition);

console.log(
  `Possible Moves for ${pieceType} from position ${currentPosition} are : \n${possibleMoves}`
);
