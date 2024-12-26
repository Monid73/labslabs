let x = 0
let y = 350
let speed = 5
let forward = true

function setup()
{
  createCanvas(700, 700)
}

function draw()
{
  background(0)
  
  fill(255)
  circle(x, y, 50)
  
  if(forward)
  {
    x += speed
  }
  
  if(!forward)
  {
    x -= speed
  }
  
  if(x >= 700)
  {
    forward = false
  }
  
  if(x <= 0)
  {
    forward = true
  }
  
}