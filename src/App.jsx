import { useState } from 'react'
import './App.css'
import { Square, SeePiece } from './Square.jsx'
import { XCircle, Circle } from 'lucide-react'

const TURN = {
  X: <XCircle className="cell_content" />,
  O: <Circle className="cell_content" />
}

const DIRRECTION = {
  HORIZONTAL: {
    SUM: 3,
    FORM: [0, 1, 2]
  },
  VERTICAL: {
    SUM: 1,
    FORM: [0, 3, 6]
  },
  DIAGONAL_RIGHT: {
    SUM: 0,
    FORM: [0, 4, 8]
  },
  DIAGONAL_LEFT: {
    SUM: 0,
    FORM: [2, 4, 6]
  }
}

function checkWinner(board) {
  let winner = { winner: false, ubication: [0, 0, 0] };
  Object.values(DIRRECTION).forEach(direction => {
    const countRepit = direction.FORM[1] == 4 ? 1 : 3
    for (let i = 0; i < countRepit; i++) {
      if (
        board[direction.FORM[0] + (i * direction.SUM)] != null &&
        board[direction.FORM[1] + (i * direction.SUM)] != null &&
        board[direction.FORM[2] + (i * direction.SUM)] != null &&
        board[direction.FORM[0] + (i * direction.SUM)] == board[direction.FORM[1] + (i * direction.SUM)] &&
        board[direction.FORM[0] + (i * direction.SUM)] == board[direction.FORM[2] + (i * direction.SUM)]) {
        winner = { winner: true, ubication: [direction.FORM[0] + (i * direction.SUM), direction.FORM[1] + (i * direction.SUM), direction.FORM[2] + (i * direction.SUM)] }
      }
    }
  });
  return winner
}
function checkDraw(board) {
  let isDraw = true;
  board.map((value, index) => {
    if (value == null && isDraw) {
      isDraw = false;
    }
  }
  )
  return isDraw
}

function App() {
  const [draw, setDraw] = useState(false)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [resultWinner, setResultWinner] = useState({ winner: false, ubication: [null, null, null] })
  const [turn, setTurn] = useState(TURN.X)

  function updateBoard(index) {
    let comprobarWinner;
    if (draw) return;
    if (resultWinner.winner) return
    if (board[index]) return
    const newBoard = [...board]
    newBoard[index] = turn
    comprobarWinner = checkWinner(newBoard)
    if (comprobarWinner.winner) {
      setResultWinner(comprobarWinner)
    } else {
      setTurn(turn == TURN.X ? TURN.O : TURN.X)
    }
    setDraw(checkDraw(newBoard));
    setBoard(newBoard);
  }

  function handClick() {
    setResultWinner({ winner: false, ubication: [null, null, null] })
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setDraw(false)
  }
  return (
    <main className='screen'>
      <div className='board' >
      <>
        <h1 className='space'>Tic tac toe</h1 >
        <button className='custom_button' onClick={ ()=>handClick()}>Resetear tablero</button>
        <section className='game' >
          {
            board.map((_, index) => {
              return (<Square
                key={index}
                isPieceX={board[index] == null ? null : board[index]}
                index={index}
                updateTheBoard={updateBoard}
                winner={resultWinner.ubication.some(element => element == index)}
              />)
            })
          }
        </section>
        <section key="content" >
          <>
            {draw ? <h1 className='space'>Empate</h1> : resultWinner.winner ? <h1 className="subTitle">Winner:{turn}</h1> : ""}
            {!resultWinner.winner && !draw ? SeePiece({
              key: "x",
              piece: TURN.X,
              isActive: turn == TURN.X
            }) : <div></div>}
            {!resultWinner.winner && !draw ? SeePiece({
              key: "o",
              piece: TURN.O,
              isActive: turn == TURN.O
            }) : <div></div>}
          </>
        </section>
      </>
      </div>
    </main>


  )
}

export default App
