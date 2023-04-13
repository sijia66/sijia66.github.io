// Author: Si Jia Li
// Date: 2023-04-12

class SphereModel {
    constructor(x, dx, colors) {
      this.x = x;
      this.dx = dx;
      this.colors = colors;
      this.target_color_index = 0;
    }
  
    update(canvas) {
      if (this.x + this.dx > canvas.width - 50 || this.x + this.dx < 50) {
        this.dx = -this.dx;
      }
  
      this.x += this.dx;
    }
  
    changeColor() {
      // rotate color
      this.target_color_index = (this.target_color_index + 1) % this.colors.length;
    }
  }
  
class SphereView {
    constructor(canvas, model) {
      this.ctx = canvas.getContext('2d');
      this.model = model;
      this.mouse_color_index = 0;
      this.mouseX = 0;
      this.mouseY = 0;
    }
  
    drawSphere(xPos, yPos, color = '#FF6633') {
      this.ctx.beginPath();
      this.ctx.arc(xPos, yPos, 50, 0, Math.PI * 2);
      this.ctx.fillStyle = color;
      this.ctx.fill();
    }
  
    draw() {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      this.drawSphere(this.model.x, canvas.height / 2, this.model.colors[this.model.target_color_index]);
      this.drawSphere(this.mouseX, this.mouseY, this.model.colors[this.mouse_color_index]);
    }
  
    onMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;
    }
  
    onTouchMove(e) {
      const rect = canvas.getBoundingClientRect();
      this.mouseX = e.touches[0].clientX - rect.left;
      this.mouseY = e.touches[0].clientY - rect.top;
    }
  
    onClick() {
      // rotate color
      this.mouse_color_index = (this.mouse_color_index + 1) % this.model.colors.length;
    }
  }
  
  class SphereController {
    constructor(canvas, model, view) {
      this.canvas = canvas;
      this.model = model;
      this.view = view;
  
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
      } else {
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
      }
  
      canvas.addEventListener('click', this.onClick.bind(this));
    }
  
    start() {
      setInterval(() => {
        this.model.update(this.canvas);
        this.view.draw();
      }, 10);
  
      setInterval(() => {
        this.model.changeColor();
      }, 3000);
    }
  
    onMouseMove(event) {
      this.view.onMouseMove(event);
    }
  
    onTouchMove(e) {
      this.view.onTouchMove(e);
    }
  
    onClick() {
      this.view.onClick();
    }
  }
  
  const canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const colors = ['#00FF00', '#0D98BA'];
  const model = new SphereModel(50, 1, colors);
  const view = new SphereView(canvas, model);
  const controller = new SphereController(canvas, model, view);
  
  controller.start();
  
  