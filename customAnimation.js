// filename: customAnimation.js

// This code demonstrates a custom animation module that creates complex animations using requestAnimationFrame
// The animation consists of a series of objects moving along a predefined path while changing colors

// Define a class for the animation
class Animation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.objects = [];
    this.path = [];

    this.frameCount = 0;
    this.startTime = null;
  }

  addObjects(numObjects) {
    for (let i = 0; i < numObjects; i++) {
      const obj = {
        x: 0,
        y: 0,
        color: '#000000',
        speed: Math.random() * 4 + 1,
        pathIndex: Math.floor(Math.random() * this.path.length)
      };
      this.objects.push(obj);
    }
  }

  addPathPoint(x, y) {
    this.path.push({ x, y });
  }

  update() {
    const currentTime = new Date().getTime();
    if (!this.startTime) this.startTime = currentTime;
    const deltaTime = currentTime - this.startTime;

    for (let i = 0; i < this.objects.length; i++) {
      const obj = this.objects[i];
      const target = this.path[obj.pathIndex];

      const dx = target.x - obj.x;
      const dy = target.y - obj.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > obj.speed) {
        obj.x += dx / distance * obj.speed;
        obj.y += dy / distance * obj.speed;
      } else {
        obj.x = target.x;
        obj.y = target.y;
        obj.pathIndex = (obj.pathIndex + 1) % this.path.length;
      }

      obj.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }

    this.draw();
    this.frameCount++;

    // Stop the animation after 1000 frames
    if (this.frameCount < 1000) {
      requestAnimationFrame(() => this.update());
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.objects.length; i++) {
      const obj = this.objects[i];
      this.ctx.beginPath();
      this.ctx.arc(obj.x, obj.y, 10, 0, Math.PI * 2);
      this.ctx.fillStyle = obj.color;
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
}

// Usage example:

// Create new animation instance and set up canvas
const animation = new Animation('canvas');
animation.canvas.width = window.innerWidth;
animation.canvas.height = window.innerHeight;

// Define a path for objects to move along
animation.addPathPoint(100, 100);
animation.addPathPoint(500, 200);
animation.addPathPoint(300, 400);
animation.addPathPoint(800, 600);
animation.addPathPoint(100, 600);
animation.addPathPoint(500, 400);

// Add objects to the animation
animation.addObjects(10);

// Start the animation loop
animation.update();