import Chessboard from "./Chessboard.js";
import { CELLS, PIECE_TYPE } from "./constants/chessConstants.js";

class TestCaseContainer {
  passed = 0;
  failed = 0;
  testCases = [];
  chessboard = new Chessboard();

  testCase1() {
    const description = "Checking Pawn moves for A1 position";
    const expected = [CELLS.A2];
    const actual = this.chessboard.getPossibleMoves(PIECE_TYPE.PAWN, CELLS.A1);
    this.testMoves(description, expected, actual);
  }

  testCase2() {
    const description = "Checking Pawn moves for A8 position";
    const expected = [];
    const actual = this.chessboard.getPossibleMoves(PIECE_TYPE.PAWN, CELLS.A8);
    this.testMoves(description, expected, actual);
  }

  testCase3() {
    const description = "Checking Pawn moves for H8 position";
    const expected = [];
    const actual = this.chessboard.getPossibleMoves(PIECE_TYPE.PAWN, CELLS.H8);
    this.testMoves(description, expected, actual);
  }

  testCase4() {
    const description = "Checking King moves for A1 position";
    const expected = [CELLS.A2, CELLS.B1, CELLS.B2];
    const actual = this.chessboard.getPossibleMoves(PIECE_TYPE.KING, CELLS.A1);
    this.testMoves(description, expected, actual);
  }

  testCase5() {
    const description = "Checking King moves for A8 position";
    const expected = [CELLS.A7, CELLS.B7, CELLS.B8];
    const actual = this.chessboard.getPossibleMoves(PIECE_TYPE.KING, CELLS.A8);
    this.testMoves(description, expected, actual);
  }

  testCase6() {
    const description = "Checking King moves for H8 position";
    const expected = [CELLS.H7, CELLS.G7, CELLS.G8];
    const actual = this.chessboard.getPossibleMoves(PIECE_TYPE.KING, CELLS.H8);
    this.testMoves(description, expected, actual);
  }

  testCase7() {
    const description = "Checking King moves for D5 position";
    const expected = [
      CELLS.C4,
      CELLS.D4,
      CELLS.E4,
      CELLS.C5,
      CELLS.E5,
      CELLS.C6,
      CELLS.D6,
      CELLS.E6,
    ];
    const actual = this.chessboard.getPossibleMoves(PIECE_TYPE.KING, CELLS.D5);
    this.testMoves(description, expected, actual);
  }

  testCase8() {
    const description = "Checking Queen moves for A1 position";
    const expected = [
      CELLS.B2,
      CELLS.C3,
      CELLS.D4,
      CELLS.E5,
      CELLS.F6,
      CELLS.G7,
      CELLS.H8,
      CELLS.B1,
      CELLS.C1,
      CELLS.D1,
      CELLS.E1,
      CELLS.F1,
      CELLS.G1,
      CELLS.H1,
      CELLS.A2,
      CELLS.A3,
      CELLS.A4,
      CELLS.A5,
      CELLS.A6,
      CELLS.A7,
      CELLS.A8,
    ];
    const actual = this.chessboard.getPossibleMoves(PIECE_TYPE.QUEEN, CELLS.A1);
    this.testMoves(description, expected, actual);
  }

  testCase9() {
    const description = "Checking Queen moves for C3 position";
    const expected = [
      CELLS.B2,
      CELLS.A1,
      CELLS.D4,
      CELLS.E5,
      CELLS.F6,
      CELLS.G7,
      CELLS.H8,
      CELLS.A3,
      CELLS.B3,
      CELLS.D3,
      CELLS.E3,
      CELLS.F3,
      CELLS.G3,
      CELLS.H3,
      CELLS.C1,
      CELLS.C2,
      CELLS.C4,
      CELLS.C5,
      CELLS.C6,
      CELLS.C7,
      CELLS.C8,
      CELLS.B4,
      CELLS.A5,
      CELLS.D2,
      CELLS.E1,
    ];
    const actual = this.chessboard.getPossibleMoves(PIECE_TYPE.QUEEN, CELLS.C3);
    this.testMoves(description, expected, actual);
  }

  testCase10() {
    const description =
      "Should throw error if invalid current position is provided";
    try {
      const position = "L9";
      const possibleMoves = this.chessboard.getPossibleMoves(
        PIECE_TYPE.PAWN,
        position
      );
      if (possibleMoves) {
        this.failed++;
        console.error(
          `${description} - FAILED - Should not calculate moves for invalid position - ${position} \n`
        );
      }
    } catch (err) {
      if (err) {
        this.passed++;
      }
    }
  }

  testMoves(description, expected, actual) {
    if (actual === null) {
      return;
    }
    if (expected.length === 0 && actual.length === 0) {
      this.passed++;
    } else {
      if (expected.length === actual.length) {
        const missedMove = expected.find((move) => {
          return !actual.includes(move);
        });
        if (missedMove) {
          console.error(
            `${description} - FAILED - Missed Move = ${missedMove}\n`
          );
          this.failed++;
        } else {
          this.passed++;
        }
      } else {
        const missedMove = expected.find((move) => {
          return !actual.includes(move);
        });
        console.error(
          `${description} - FAILED - Actual length not equals expected length (Missed Move = ${missedMove})\n`
        );
        this.failed++;
      }
    }
  }

  runTestCases() {
    console.log(
      "*************** Runnig Test Cases **************************\n\n"
    );
    this.testCase1();
    this.testCase2();
    this.testCase3();
    this.testCase4();
    this.testCase5();
    this.testCase6();
    this.testCase7();
    this.testCase8();
    this.testCase9();
    this.testCase10();
    console.log("*************** Summary **************************\n");
    console.log(`Total Test cases : ${this.testCases.length}`);
    console.log(`Passed Test cases : ${this.passed}`);
    console.log(`failed Test cases : ${this.failed}`);
    console.log("\n\n*************** End **************************\n");
  }
}

const testCaseContainer = new TestCaseContainer();
testCaseContainer.runTestCases();
