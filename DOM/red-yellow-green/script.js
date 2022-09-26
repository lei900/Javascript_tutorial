const redDiv = document.getElementById('red')
const yellowDiv = document.getElementById('yellow')
const greenDiv = document.getElementById('green')

yellowDiv.onclick = () => {
  console.log('user chose: Rock')
}
  
greenDiv.onclick = () => {
  console.log('user chose: Rock')
}

const squares = document.querySelectorAll('.color-square')

const timesClicked = {'red': 0, 'yellow': 0, 'green': 0}

squares.forEach(square => {
  square.onclick = () => {
    timesClicked[square.value] += 1
    square.innerText = timesClicked[square.value]
    console.log(square.value)
  }
})

const clearScores = () => {
  timesClicked.red = 0
  timesClicked.yellow = 0
  timesClicked.green = 0
  squares.forEach(square => square.innerText = 0)
}

const clearGameBtn = document.getElementById('clear-game')
clearGameBtn.onclick = () => clearScores()
