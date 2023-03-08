import { PIECE_TYPE, COLUMN_MAP } from "./constants/chessConstants.js";

export default class Chessboard {
  #chessboard = this.#initChessboard();

  /**
   * @description Used to create a Chessboard grid of size 8 * 8.
   * @returns {[string[]]} returns a 2d array containing chessboard rows
   */
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

  /**
   * @description Calculates all possible moves of PAWN from given position
   * @param {string} currentPosition The cell from which possible moves will be calculated
   * @returns {string[]} An array of strings of possible moves
   */
  #getPawnMoves = (currentPosition) => {
    const rowIndex = Number(currentPosition[1]) - 1;
    const nextRow = this.#chessboard[rowIndex + 1];
    if (nextRow) {
      return [nextRow[COLUMN_MAP[currentPosition[0]]]];
    }
    return [];
  };

  /**
   * @description Calculates all possible moves of KING from given position
   * @param {string} currentPosition The cell from which possible moves will be calculated
   * @returns {string[]} An array of strings of possible moves
   */
  #getKingMoves = (currentPosition) => {
    const possibleMoves = [];
    const rowIndex = Number(currentPosition[1]) - 1;
    const nextRow = this.#chessboard[rowIndex + 1];
    const prevRow = this.#chessboard[rowIndex - 1];
    const columnIndex = COLUMN_MAP[currentPosition[0]];

    // Checking moves in previous row
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

    // Checking moves in current row
    this.#chessboard[rowIndex].forEach((cell, i) => {
      if (i === columnIndex - 1 || i === columnIndex + 1) {
        possibleMoves.push(cell);
      }
    });

    // Checking moves in next row
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

  /**
   * @description Calculates all possible moves of QUEEN from given position
   * @param {string} currentPosition The cell from which possible moves will be calculated
   * @returns {string[]} An array of strings of possible moves
   */
  #getQueenMoves = (currentPosition) => {
    const possibleMoves = [];
    const rowIndex = Number(currentPosition[1]) - 1;
    const columnIndex = COLUMN_MAP[currentPosition[0]];
    //   Left Lower Diagonal Moves (from current Position)
    for (
      let i = rowIndex - 1, j = columnIndex - 1;
      i >= 0 && j >= 0;
      i--, j--
    ) {
      possibleMoves.push(this.#chessboard[i][j]);
    }
    //   Right Lower Diagonal Moves (from current Position)
    for (
      let i = rowIndex - 1, j = columnIndex + 1;
      i >= 0 && j <= 7;
      i--, j++
    ) {
      possibleMoves.push(this.#chessboard[i][j]);
    }
    //   Left Upper Diagonal Moves (from current Position)
    for (
      let i = rowIndex + 1, j = columnIndex - 1;
      i <= 7 && j >= 0;
      i++, j--
    ) {
      possibleMoves.push(this.#chessboard[i][j]);
    }
    //   Right Upper Diagonal Moves (from current Position)
    for (
      let i = rowIndex + 1, j = columnIndex + 1;
      i <= 7 && j <= 7;
      i++, j++
    ) {
      possibleMoves.push(this.#chessboard[i][j]);
    }
    // horizontal moves (from current Position)
    for (let i = 0; i <= 7; i++) {
      if (i !== columnIndex) {
        possibleMoves.push(this.#chessboard[rowIndex][i]);
      }
    }
    // Vertival moves (from current Position)
    for (let i = 0; i <= 7; i++) {
      if (i !== rowIndex) {
        possibleMoves.push(this.#chessboard[i][columnIndex]);
      }
    }
    return possibleMoves;
  };

  /**
   *@description Checks if user provided input for current position is within chessboard grid or not
   * @param {string} currentPosition The cell from which possible moves will be calculated
   * @returns {boolean} true for invalid and false for valid current position
   */
  #isInvalidPosition = (currentPosition) => {
    if (!currentPosition) {
      return true;
    } else if (currentPosition.length !== 2) {
      return true;
    } else if (
      Number(currentPosition[1]) < 0 ||
      Number(currentPosition[1]) > 8
    ) {
      return true;
    } else if (
      currentPosition[0].charCodeAt() < 64 ||
      currentPosition[0].charCodeAt() > 73
    ) {
      return true;
    }
    return false;
  };

  /**
   * @description calculates all the possible moves for provided chess piece from current position
   * @param {PIECE_TYPE} piece Chess piece of type Pawn, King, Queen, Bishop, Rook, Horse
   * @param {String} currentPosition Current position from which moves needs to calculated
   * @returns {string[]} array of possible moves
   */
  getPossibleMoves = (piece, currentPosition) => {
    // If provided position is not inside grid then program will throw error
    if (this.#isInvalidPosition(currentPosition)) {
      throw new Error("Invalid Position Provided!!!");
    }
    switch (piece) {
      case PIECE_TYPE.PAWN:
        return this.#getPawnMoves(currentPosition);

      case PIECE_TYPE.KING:
        return this.#getKingMoves(currentPosition);

      case PIECE_TYPE.QUEEN:
        return this.#getQueenMoves(currentPosition);

      default:
        throw new Error(
          `Currently available only for ${PIECE_TYPE.PAWN}, ${PIECE_TYPE.KING}, and ${PIECE_TYPE.QUEEN}`
        );
    }
  };
}
