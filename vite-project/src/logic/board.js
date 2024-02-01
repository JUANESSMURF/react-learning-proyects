import { WINNER_COMBOS } from "../constants.js"

export const checkWinnerFrom = (boardToCheck) => {
    //Revisa todas las combos ganadoras para ver si X u O gano
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && //Revisar si hay una X u O
        boardToCheck[a] === boardToCheck[b] && //Revisa si esta X => X u O => O
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a] //Devuelve si el ganador es X u O
      }
    }
    //si no hay ganador
    return null
  }

export const checkEndGame = (newBoard) => {
    // revisar si no hay mas espacios vacios en el tablero
    // si en square hay otra cosa que no sea null(vacio)
    return newBoard.every((square) => square !== null)
  }