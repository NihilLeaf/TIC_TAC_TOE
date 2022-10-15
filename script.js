const cells = document.querySelectorAll('[data-cell]')
const board = document.querySelector('[data-board]')
const message = document.querySelector('[data-winning-message-text]')
const winningDiv = document.querySelector('[data-winning-message]')
const scoreVarx = document.querySelector('[scorex]')
const scoreVary = document.querySelector('[scorey]')
const button = document.querySelector('[button]')

let IsOTurn = false
let xscore = 0
let yscore = 0

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cells[index].classList.contains(currentPlayer)
        })
    })
}

const checkForDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o')
    })
}

const endGame = (isDraw) => {
    if (isDraw) {
        message.innerText = 'Empate'
    }
    else {
        message.innerText = IsOTurn ? 'O wins' : 'X wins'
        IsOTurn ? xscore++ : yscore++
    }

    winningDiv.classList.add('show-winning-message')
    scoreVarx.innerText = `X Score: ${yscore}`
    scoreVary.innerText = `O Score: ${xscore}`
}


const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
}

const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [0,4,8], [1,4,7], [2, 4, 6]
]

const swapTurns = () => {
    IsOTurn = !IsOTurn
    board.classList.remove('bo')
    board.classList.remove('bx')

    if (IsOTurn) {
        board.classList.add('bo')
        board.classList.remove('bx')
    }
    else {
        board.classList.add('bx')
        board.classList.remove('bo')
    }
}

const handleClick = (e) => {
    const cell = e.target
    const classToAdd = IsOTurn ? 'o' : 'x'

    placeMark(cell, classToAdd)

    const isWin = checkForWin(classToAdd)
    const isDraw = checkForDraw()
    if (isWin) {
        endGame(false)
    }
    else if (isDraw) {
        endGame(true)
    }
    else {
        swapTurns()
    }
}

const clearGame = () => {
    winningDiv.classList.remove('show-winning-message')
    board.classList.remove('bo')
    board.classList.remove('bx')

    for (let cell of cells) {
        cell.classList.remove('x')
        cell.classList.remove('o')
    }

    if (IsOTurn) {
        board.classList.add('bo')
    }
    else {
        board.classList.add('bx')
    }

    for (const cell of cells) {
        cell.addEventListener('click', handleClick, {once:true})
    }

}

button.addEventListener('click', () => {
    clearGame()
})

for (const cell of cells) {
    cell.addEventListener('click', handleClick, {once:true})
}