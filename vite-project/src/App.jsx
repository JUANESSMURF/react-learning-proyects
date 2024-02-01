import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { checkEndGame, checkWinnerFrom } from "./logic/board.js"


function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
    )
    const [turn, setTurn] = useState(TURNS.X)
    
    //Null = no hay ganador y false = empate
    const [winner, setWinner] = useState(null)

    
    
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  

  const updateBoard = (index) => {
    //No actualizar esta posicion del board si ya tiene algo o ya tiene ganador
    if (board[index] || winner) return

    // Al darle click guarda posicion X u O
    const newBoard = [...board]
    newBoard[index] = turn 
    setBoard(newBoard)

    //Cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
  }
  }
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
      {
        board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square> 
          )
        })
      }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
    )
  }
  
  


export default App
