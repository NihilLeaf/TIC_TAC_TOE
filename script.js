const cells = document.querySelectorAll('[data-cell]')
const board = document.querySelector('[data-board]')

let IsOTurn = false

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
}

const winningCombinations = [
    []
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
    swapTurns()
}

for (const cell of cells) {
    cell.addEventListener('click', handleClick, {once:true})
}