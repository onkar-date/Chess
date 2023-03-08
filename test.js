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
          console.error(`${description} - FAILED\n`);
          this.failed++;
        } else {
          this.passed++;
        }
      } else {
        console.error(`${description} - FAILED\n`);
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
    console.log("*************** Summary **************************\n");
    console.log(`Total Test cases : ${this.testCases.length}`);
    console.log(`Passed Test cases : ${this.passed}`);
    console.log(`failed Test cases : ${this.failed}`);
    console.log("\n\n*************** End **************************\n");
  }
}

const testCaseContainer = new TestCaseContainer();
testCaseContainer.runTestCases();
