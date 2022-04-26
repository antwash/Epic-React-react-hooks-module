// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import { useLocalStorageState } from "../utils"

const squaresInitialValue = [Array(9).fill(null)]
function Board({ onClick, squares }) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  /**
   * Keep a history of the game that allows you to go backward and forward in time
   * - It renders the entire history
   * - Clicking a listed history button updates the board state to that time
   * - In a previous listed history board state, clicking a new move rewrites history
   *
   * [
   *  { board: At that time in history } // initial = currentStep = 0
   *  { board: After first person moves } // currentStep = 1
   *  { board: After second person moves } // currentStep = 2
   * ]
   *
   * Steps:
   * = X clicks spot
   * = O clicks spot
   * = Click Step 1 to review history, currentStep = 1
   * = O clicks a spot and board history[2+] is cleared and history[1] is saved
   * */
  const [history, setHistory] = useLocalStorageState("history", squaresInitialValue)
  const [currentStep, setCurrentStep] = useLocalStorageState("step", history.length - 1 ?? 0)

  const currentSquares = history[currentStep]
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  const handleHistoryStepClicked = (index) => setCurrentStep(index)
  const handleRestartBtnClicked = () => {
    setCurrentStep(0)
    setHistory(squaresInitialValue)
  }

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function handleSelectSquare(square) {
    // if there's already winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    if (winner || currentSquares[square]) {
      return
    }

    const newSquares = currentSquares.map((s, index) => {
      if (index === square) {
        return nextValue
      }
      return s
    })

    const newHistory = history.slice(0, currentStep + 1)
    setHistory([...newHistory, newSquares])
    setCurrentStep(newHistory.length)
  }

  const renderMoves = () => (
    history.map((h, index) => {
      const isInitial = index === 0
      const isCurrent = currentStep === index
      const label = `${isInitial ? "Go to game start" : `Go to move #${index}`} ${isCurrent ? "(current)": ""}`
      return <li key={index}><button key={index} disabled={isCurrent} onClick={() => handleHistoryStepClicked(index)}>{label}</button></li>
    })
  )

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={handleSelectSquare} squares={currentSquares} />
        <button className="restart" onClick={handleRestartBtnClicked}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{renderMoves()}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
