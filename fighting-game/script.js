// ** Grabs elements from the DOM and stores them into variables **
const playButton = document.getElementById('play')
const resultDiv = document.getElementById('result')
const p1NameDiv = document.getElementById('p1Name')
const p2NameDiv = document.getElementById('p2Name')
const p1HealthDiv = document.getElementById('p1Health')
const p2HealthDiv = document.getElementById('p2Health')
const victorySound = document.getElementById('victory')

// ** Check if either players health is  0 and if it is, then update isOver to true **
const updateGame = (p1, p2, gameState) => {
  // Update the DOM with the names and the latest health of players
  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health
  // Condition IF either player health is <= 0 then set isOver to true and declareWinner
  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true;
    gameState = game.isOver
    resultDiv.innerText = game.declareWinner(game.isOver,p1,p2)
    return gameState
  }
}

// ** Create the Player class which can create a player with all it's attributes and methods **
class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  // ** Attack an enemy with a random number from 0 to YOUR attackDmg bonus **
  strike (player, enemy, attackDmg) {
    // Get random number between 1 - 10 and that is damageAmount
    let damageAmount = Math.ceil(Math.random() * attackDmg) 
    // Subtract the enemy health with the damageAmount
    enemy.health -= damageAmount
    //  Update the game and DOM with updateGame()
    let message = `${player.name} attacks ${enemy.name} for ${damageAmount} damage`
    resultDiv.innerText = message
    updateGame(p1, p2, game.isOver)
    return message
  }
  // ** Heal the player for random number from  1 to 5 **
  heal (player) {
    // Get random number between 1 - 5 and store that in hpAmount
    let hpAmount = Math.ceil(Math.random() * 5)
    // Add hpAmount to players health
    player.health += hpAmount
    let message = `${player.name} heals for ${hpAmount} HP`
    resultDiv.innerText = message
        //  Update the game and DOM with updateGame()
    updateGame(p1, p2, game.isOver)
    return message
  }
}

// ** Create the Game class with all it's attributes and methods to run a match **
// game = new Game()
// game.isOver 👉 false
class Game {
  constructor() {
    this.isOver = false;
  }

  // ** If the game is over and a player has 0 health declare the winner! **
  declareWinner(isOver,p1, p2) {
    let winnerMsg;
    if (isOver == true && p2.health <= 0) {
      winnerMsg = `${p1.name} WINS!`
    }
    else if(isOver == true && p1.health <= 0) {
      winnerMsg = `${p2.name} WINS!`
    }
    victorySound.play()
    return winnerMsg
  }

  // ** Reset the players health back to it's original state and isOver to FALSE **
  reset(p1, p2) {
    p1.health = 100
    p2.health = 100
    this.isOver = false
    resultDiv.innerText = ''
    updateGame(p1, p2, this.isOver)
  }
  
  // ** Simulates the whole match untill one player runs out of health **
  play(p1, p2) {
    // Reset to make sure player health is back to full before starting
    this.reset(p1, p2)
    while (!this.isOver) {
      p1.strike(p1, p2, p1.attackDmg)
      p2.strike(p2, p1, p2.attackDmg)
    }
    return this.declareWinner(this.isOver, p1, p2)
  }
}

// ** Create 2 players using the player class **
let player1 = new Player('Xiaozi', 100, 15)
let player2 = new Player('Lei', 100, 15)

// ** Save original Player Data into a variable in order to reset **
let p1 = player1
let p2 = player2

// ** Create the game object from the Game class **
let game = new Game();

// ** Intialize the game by calling updateGame() **
updateGame(p1, p2, game.isOver)

// ** Save intial isOver from the game object inside this variable **
let gameState = game.isOver


// ** Add a click listener to the simulate button that runs the play() method on click and pass in the players **
playButton.onclick = () => result.innerText = game.play(p1,p2);

// Add functionality where players can press a button to attack OR heal

// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
  if (e.key == "q" && p2.health > 0 && game.isOver == false ){
    p1.strike(p1, p2, p1.attackDmg)
    // After striking then play attack sound
    document.getElementById('p1attack').play();
  }
});

document.addEventListener('keydown', function(e) {
    // if you press a AND the player health is greater than 0 AND isOver is still false then heal()
    if (e.key == "a" && p1.health > 0 ){
      p1.heal(p1)
       // After healing then play heal sound
      document.getElementById('p1heal').play();
     }
   });

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {
  // if you press p AND enemy health is greater than 0 AND isOver is still false then stike()
  if (e.key == "p" && p1.health > 0 && game.isOver == false ){
    p2.strike(p2, p1, p2.attackDmg)
    // After striking then play attack sound
    document.getElementById('p2attack').play();
  }
});

document.addEventListener('keydown', function(e) {
  // if you press l AND the player health is greater than 0 AND isOver is still false then heal()
  if (e.key == "l" && p2.health > 0 ){
    // After healing then play heal sound
   p2.heal(p2)
  document.getElementById('p2heal').play();
  }
});
