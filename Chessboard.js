import { PIECE_TYPE, COLUMN_MAP } from "./constants/chessConstants.js";

export default class Chessboard {
  #chessboard = this.#initChessboard();

  #initChessboard() {
    const board = [];
    for (let i = 1; i <= 8; i++) {
      const row = [];
      Object.keys(COLUMN_MAP).forEach((_) => {
        row.push(`${_}${i}`);
      });
      board.push(row);
    }
    return board;
  }

  #getPawnMoves = (currentPosition) => {
    const rowIndex = Number(currentPosition[1]) - 1;
    const nextRow = this.#chessboard[rowIndex + 1];
    if (nextRow) {
      return [nextRow[COLUMN_MAP[currentPosition[0]]]];
    }
    return [];
  };

  #getKingMoves = (currentPosition) => {
    const possibleMoves = [];
    const rowIndex = Number(currentPosition[1]) - 1;
    const nextRow = this.#chessboard[rowIndex + 1];
    const prevRow = this.#chessboard[rowIndex - 1];
    const columnIndex = COLUMN_MAP[currentPosition[0]];
    if (prevRow) {
      prevRow.forEach((cell, i) => {
        if (
          i === columnIndex - 1 ||
          i === columnIndex + 1 ||
          i === columnIndex
        ) {
          possibleMoves.push(cell);
        }
      });
    }

    this.#chessboard[rowIndex].forEach((cell, i) => {
      if (i === columnIndex - 1 || i === columnIndex + 1) {
        possibleMoves.push(cell);
      }
    });

    if (nextRow) {
      nextRow.forEach((cell, i) => {
        if (
          i === columnIndex - 1 ||
          i === columnIndex + 1 ||
          i === columnIndex
        ) {
          possibleMoves.push(cell);
        }
      });
    }
    return possibleMoves;
  };

  #getQueenMoves = (currentPosition) => {
    const possibleMoves = [];
    const rowIndex = Number(currentPosition[1]) - 1;
    const columnIndex = COLUMN_MAP[currentPosition[0]];
    //   Left Lower Diagonal Moves
    for (
      let i = rowIndex - 1, j = columnIndex - 1;
      i >= 0 && j >= 0;
      i--, j--
    ) {
      possibleMoves.push(this.#chessboard[i][j]);
    }
    //   Right Lower Diagonal Moves
    for (
      let i = rowIndex - 1, j = columnIndex + 1;
      i >= 0 && j <= 7;
      i--, j++
    ) {
      possibleMoves.push(this.#chessboard[i][j]);
    }
    //   Left Upper Diagonal Moves
    for (
      let i = rowIndex + 1, j = columnIndex - 1;
      i <= 7 && j >= 0;
      i++, j--
    ) {
      possibleMoves.push(this.#chessboard[i][j]);
    }
    //   Right Upper Diagonal Moves
    for (
      let i = rowIndex + 1, j = columnIndex + 1;
      i <= 7 && j <= 7;
      i++, j++
    ) {
      possibleMoves.push(this.#chessboard[i][j]);
    }
    // horizontal moves
    for (let i = 0; i <= 7; i++) {
      if (i !== columnIndex) {
        possibleMoves.push(this.#chessboard[rowIndex][i]);
      }
    }
    // Vertival moves
    for (let i = 0; i <= 7; i++) {
      if (i !== rowIndex) {
        possibleMoves.push(this.#chessboard[i][columnIndex]);
      }
    }
    return possibleMoves;
  };

  #isInvalidPosition = (currentPosition) => {
    if (Number(currentPosition[1]) < 0 || Number(currentPosition[1]) > 8) {
      return null;
    }
    return false;
  };

  getPossibleMoves = (piece, currentPosition) => {
    if (this.#isInvalidPosition(currentPosition)) {
      console.error("Invalid Position Provided!!!");
      return [];
    }
    switch (piece) {
      case PIECE_TYPE.PAWN:
        return this.#getPawnMoves(currentPosition);

      case PIECE_TYPE.KING:
        return this.#getKingMoves(currentPosition);

      case PIECE_TYPE.QUEEN:
        return this.#getQueenMoves(currentPosition);

      default:
        console.error(
          `Currently available only for ${PIECE_TYPE.PAWN}, ${PIECE_TYPE.KING}, and ${PIECE_TYPE.QUEEN}`
        );
        return null;
    }
  };
}
