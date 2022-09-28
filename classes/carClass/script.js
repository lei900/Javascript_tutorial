class Car {
  constructor(name, color, speed) {
    this.name = name
    this.color = color
    this.topSpeed = speed
    this.currentSpeed = 0;
  }

  getCurrentSpeed() {
    return this.currentSpeed
  }

  drive(speed=10) {
    this.currentSpeed += speed
    console.log(`driving speed at ${this.currentSpeed} mph`)
    console.log('just drove 2 miles!')
  }

  broke() {
    console.log('braking!')
    this.currentSpeed -= 10
  }

  zeroToSixty() {
    setTimeout(() => {
      console.log('pHEW! That was fast!')
      this.currentSpeed = 60;
      console.log(this.currentSpeed)
    }, 3000)
  }
}

const ferrari = new Car('ferrari', 'red', 250)
console.log(ferrari)

ferrari.drive(20)
console.log(ferrari.getCurrentSpeed())
ferrari.drive(20)
console.log(ferrari.getCurrentSpeed())
ferrari.drive()
console.log(ferrari.getCurrentSpeed())

Array.prototype.myPush = function(item) {
  this[this.length] = item 
  return this
}

const fruits = ['🍌', '🍓', '🍪', '🍐', '🍎']
fruits.myPush('🥝')
fruits.myPush('🍪')
fruits.myPush('🍓')
fruits.myPush('🍊')
console.log(fruits)
