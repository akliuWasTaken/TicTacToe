import { useState } from 'react';

function Box({ value, onBoxClick }) {
  return (
    <button className="Box" onClick={onBoxClick}>
      {value}
    </button>
  );
}

function Board({ playerXNext, boxes, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(boxes) || boxes[i]) {
      return;
    }
    const nextboxes = boxes.slice();
    if (playerXNext) {
      nextboxes[i] = 'X';
    } else {
      nextboxes[i] = 'O';
    }
    onPlay(nextboxes);
  }

  const winner = calculateWinner(boxes);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (playerXNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Box value={boxes[0]} onBoxClick={() => handleClick(0)} />
        <Box value={boxes[1]} onBoxClick={() => handleClick(1)} />
        <Box value={boxes[2]} onBoxClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Box value={boxes[3]} onBoxClick={() => handleClick(3)} />
        <Box value={boxes[4]} onBoxClick={() => handleClick(4)} />
        <Box value={boxes[5]} onBoxClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Box value={boxes[6]} onBoxClick={() => handleClick(6)} />
        <Box value={boxes[7]} onBoxClick={() => handleClick(7)} />
        <Box value={boxes[8]} onBoxClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const playerXNext = currentMove % 2 === 0;
  const currentboxes = history[currentMove];

  function handlePlay(nextboxes) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextboxes];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((boxes, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board playerXNext={playerXNext} boxes={currentboxes} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(boxes) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      return boxes[a];
    }
  }
  return null;
}
