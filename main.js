import Chessboard from "./Chessboard.js";
import { PIECE_TYPE, CELLS } from "./constants/chessConstants.js";

const chessBoard = new Chessboard();

console.log(chessBoard.getPossibleMoves(PIECE_TYPE.QUEEN, CELLS.G3));
