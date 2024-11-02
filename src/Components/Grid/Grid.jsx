import { useState } from "react";
import { Card } from "../Cards/Card";
import "./Grid.css";
import IsWinner from "../Utils/isWinner";

function Grid({ numOfCards }) {
    const [board, setBoards] = useState(Array(numOfCards).fill(""));
    const [turn, setTurn] = useState(true); // True => O, False => X
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);

    function play(index) {
        if (board[index] !== "" || winner || isDraw) return; // Prevent play if cell is filled, game is won, or it's a draw

        board[index] = turn ? "O" : "X";
        const updatedBoard = [...board];

        // Check for a winner
        const win = IsWinner(updatedBoard, turn ? "O" : "X");
        if (win) {
            setWinner(win);
        } else if (updatedBoard.every(cell => cell !== "")) {
            // If all cells are filled and there's no winner, it's a draw
            setIsDraw(true);
        }

        setBoards(updatedBoard);
        setTurn(!turn); // Toggle turn
    }

    function resetGame() {
        setBoards(Array(numOfCards).fill("")); // Clear the board
        setTurn(true); // Reset to starting player
        setWinner(null); // Clear winner
        setIsDraw(false); // Clear draw state
    }

    return (
        <div className="grid-wraper">
            {winner ? (
                <>
                    <h1 className="turn-highlight">Winner is: {winner}</h1>
                    <button className="reset" onClick={resetGame}>Reset Game</button>
                </>
            ) : isDraw ? (
                <>
                    <h1 className="turn-highlight">It's a Draw!</h1>
                    <button className="reset" onClick={resetGame}>Reset Game</button>
                </>
            ) : (
                <h1 className="turn-highlight">Current Turn is: {turn ? "O" : "X"}</h1>
            )}
            <div className="grid">
                {board.map((el, idx) => (
                    <Card key={idx} onPlay={play} player={el} index={idx} />
                ))}
            </div>
        </div>
    );
}

export default Grid;
