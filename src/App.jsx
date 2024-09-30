import { useState } from 'react'
import './App.css'
import { Square, SeePiece } from './Square.jsx'

const TURN = {
  X: "x",
  O: "o"
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

function comprobarGanador(board) {
  let winner = { winner: false, ubication: [0, 0, 0] };
  Object.values(DIRRECTION).forEach(direction => {
    const countRepit = direction.FORM[1] == 4 ? 1 : 3
    for (let i = 0; i < countRepit; i++) {
      if (
        board[direction.FORM[0] + (i * direction.SUM)] != null &&
        board[direction.FORM[1] + (i * direction.SUM)] != null &&
        board[direction.FORM[2] + (i * direction.SUM)] != null &&
        board[direction.FORM[0] + (i * direction.SUM)] == board[direction.FORM[1 ]+ (i * direction.SUM)] &&
        board[direction.FORM[0] + (i * direction.SUM)] == board[direction.FORM[2 ]+ (i * direction.SUM)]) {
        winner = { winner: true, ubication: [direction.FORM[0] + (i * direction.SUM), direction.FORM[1] + (i * direction.SUM), direction.FORM[2] + (i * direction.SUM)] }
      }
    }
  });
  return winner
}

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [resultWinner,setResultWinner]=useState({ winner: false, ubication: [null, null,null] })
  const [turn, setTurn] = useState(TURN.X)
  function updateBoard(index) {
    let comprobarWinner;
    if (resultWinner.winner) return
    if (board[index]) return
    const newBoard = [...board]
    newBoard[index] = turn
    setTurn(turn == TURN.X ? TURN.O : TURN.X)
    comprobarWinner=comprobarGanador(newBoard);
    console.log(comprobarWinner)
    if(comprobarWinner.winner){
      setResultWinner(comprobarGanador(newBoard))
    }
    setBoard(newBoard);
  }

  return (
    <>
      <main className='board'>
        <h1>Tic tac toe</h1>
        <section className='game'>
          {
            board.map((_, index) => {
              return (<Square
                key={index}
                piece={board[index]}
                index={index}
                updateTheBoard={updateBoard}
                winner={resultWinner.ubication.some(element=>element==index)}
              />)
            })
          }
        </section>
      </main>
      <section>
        <>
          {resultWinner.winner ? <h1>He ganado</h1> : <h1>No he ganado</h1>}
          {SeePiece({
            piece: TURN.X,
            isActive: turn == TURN.X
          })}
          {SeePiece({
            piece: TURN.O,
            isActive: turn == TURN.O
          })}
        </>
      </section>
    </>
  )
}

export default App
