// In the beginning, there was the
export function littleBang(canvas) {
  // Thanks for helping, function
  Array.prototype.pushIfNotIncluded = function (element) {
    if (!this.includes(element)) {
      this.push(element)
    }
  }

  // Thanks for helping ... function
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // Hypha class
  class Hypha {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.id = 0
      this.diameter = 1
      this.growing = true
      this.direction = { x: 0, y: 0 }
      this.length = 0
      this.visited = []

      // Generate a random color for the hypha
      let h = Math.random() * 360
      let s = Math.random() * 100
      let l = Math.random() * 100
      this.color = `hsl(${h}, ${s}%, ${l}%)`
    }
    //
    // Update the hypha network
    update() {
      // Gradually grow the hypha network
      if (this.growing) {
        this.length += 0.000001
        let sign = Math.ceil((Math.random() - 0.5) * 2) < 1 ? -1 : 1

        // Use a random walk algorithm to explore the canvas
        let x = this.x + Math.round(Math.random() * 2 - 1)
        let y = this.y + Math.round(Math.random() * 2 - 1)
        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
          this.x = x
          this.y = y
          // Record as visited
          this.visited.push(`${Math.floor(this.x)},${Math.floor(this.y)}`)
        }
      } else {
        // console.log(this);
      }
    }

    // Display the hypha network
    display() {
      // Set the fill color to the random color
      ctx.fillStyle = this.color

      // Draw a rectangle at the current position of the hypha network
      ctx.beginPath()
      ctx.rect(this.x, this.y, this.diameter + 1, this.diameter + 1)
      ctx.fill()
    }
  }

  let hyphae = []

  // Get the canvas element and the 2d context
  let ctx = canvas.getContext('2d')

  // Set the dimensions of the canvas
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  function reduceToCompleteNumbers(numbers) {
    // Create a new array to hold the complete numbers
    const completeNumbers = []

    // Loop through the numbers in the given array
    for (let i = 0; i < numbers.length; i++) {
      // If the current number is null or does not have a complete property set to true,
      // it is not part of a complete sequence of numbers, so we skip it
      if (!numbers[i] || !numbers[i].complete) continue

      // Otherwise, the current number is part of a complete sequence,
      // so we add it to the array of complete numbers
      completeNumbers.push(i + 1)
    }

    // Return the array of complete numbers
    return completeNumbers
  }

  // Generate the mycelium network
  async function generateMyceliumNetwork() {
    // Set the canvas style
    ctx.fillStyle = '#e8e3d9'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Create n starting hyphae at random positions on the screen
    for (let i = 0; i < 25; i++) {
      let x = Math.random() * canvas.width
      let y = Math.random() * canvas.height
      hyphae[i] = new Hypha(x, y)
      hyphae[i].id = i
    }

    // Keep generating and updating the hyphae until each has a connection
    let allConnected = false
    let previousLength = 0
    let complete = []
    while (!allConnected) {
      // Update results after a loop of the entire network
      // if (complete.length > previousLength) {
      //   previousLength++
      //   document.getElementById('legend').innerText =
      //     reduceToCompleteNumbers(complete).join()
      // }
      // allConnected = true
      for (let i = 0; i < hyphae.length; i++) {
        let m = hyphae[i]

        // Check if all hyphae are connected
        if (m.growing) allConnected = false
        // No growth can happen, sorry
        if (!m.growing) {
          complete[i] = { complete: true }
          break
        }

        m.update()
        m.display()

        // Stop growing if we bump into another hypha
        for (let j = 0; j < hyphae.length; j++) {
          let my = hyphae[j]
          // Let a hypha into myself
          if (i !== j) {
            if (my.visited.includes(Math.floor(m.x) + ',' + Math.floor(m.y))) {
              m.growing = false
            }
          }
        }
      }
      // Modifies growth rate
      await delay(5)
    }
    // Report results as [ complete ]
    // document.getElementById('legend').innerText = `[ ${
    //   document.getElementById('legend').innerText
    // } ]`
    document.getElementById('legend').innerText = `[ Complete ]`
    console.log('Mycelium network complete!')
  }

  generateMyceliumNetwork()
}

export default littleBang
