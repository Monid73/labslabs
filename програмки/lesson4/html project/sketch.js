let cloud = {
  speed: 5,
  y_pos: 200,
  x_pos: 0
}

let gameObjects = {
 sceneryObjects: [
      function drawCloud()
        {
          noStroke()
          fill(255)
          circle(cloud.x_pos, cloud.y_pos, 50)
          circle(cloud.x_pos - 20, cloud.y_pos + 5, 40)
          circle(cloud.x_pos + 20, cloud.y_pos + 2, 45)
        },
      
  function drawMountain() 
        {
            noStroke();
            fill ("#696969");
            rect (500, 400, 100, 300)

            fill ("#808080");
            rect (420, 450, 100, 300)
            rect (580, 450, 100, 300)

            fill ("#A9A9A9");
            rect (340, 500, 100, 300)
            rect (660, 500, 100, 300)

            fill ("#C0C0C0");
            rect (260, 550, 100, 300)
            rect (740, 550, 100, 300)
        },

        function drawGround()
        {
            fill ("#32CD32")
            rect(0, 700, 800, 100)
        },

  function drawCanyon() 
        {
            fill(0)
            square(150, 700, 100)
        }
 ]
}

function setup()
{
 createCanvas(800, 800)
}

function draw()
{
 background("#87CEEB")
 gameObjects.sceneryObjects.forEach(obj => obj())
  
    cloud.x_pos += cloud.speed
    
    if(cloud.x_pos > 800)
    {
      cloud.x_pos = 0
    }
}