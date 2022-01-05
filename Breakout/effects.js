const canvas1 = document.querySelector('.box');
const ctx1 = canvas1.getContext('2d');
const width1 = canvas1.width;
const height1 = canvas1.height;
console.log(width1, height1);

const balls = [];
while (balls.length < 90) {
    let color = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
    let b = new ball(
        random(0, width1), random(0, height1), 
        random(2, 3), random(2, 3),
        color, 0.9
        )
    balls.push(b);
}
loop();

function ball(x, y, vx, vy, color, size){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;

    this.draw = () => {
        ctx1.beginPath();
        ctx1.fillStyle = this.color;
        ctx1.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx1.fill();
    }

    this.update = () => {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.size/2 <= 0) {
            this.vx *= -1
        }
        if (this.y - this.size/2 <= 0) {
            this.vy *= -1
        }
        if (this.x + this.size/2 >= width1) {
            this.vx *= -1
        }
        if (this.y + this.size/2 >= height1) {
            this.vy *= -1
        }
    }

    this.collisionDetect = function() {
      for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
          const dx = this.x - balls[j].x;
          const dy = this.y - balls[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.size + balls[j].size) {
            balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';          }
        }
      }
    }
}

function loop() {
    ctx1.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx1.fillRect(0, 0, width1, height1);

    for (let i=0; i<balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    
    requestAnimationFrame(loop)
}


function random(min, max) {
    return Math.floor(Math.random() * (max-min +1 ) + min);
}