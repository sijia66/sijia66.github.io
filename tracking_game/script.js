const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas width and height to window width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = 50;
let dx = 1;

let mouseX = 0;
let mouseY = 0;


const colors = ['#00FF00', // green
                '#0D98BA' // blue
                ];
let target_color_index = 0;
let mouse_color_index = 0;


function drawSphere(xPos, yPos, color = '#FF6633') {

    ctx.beginPath();
    ctx.arc(xPos, yPos, 50, 0, Math.PI * 2);
    //ctx.stroke();

    ctx.fillStyle = color;
    ctx.fill();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (x + dx > canvas.width - 50 || x + dx < 50) {
        dx = -dx;
    }

    x += dx;



    drawSphere(x, canvas.height / 2, colors[target_color_index]);
    drawSphere(mouseX, mouseY, colors[mouse_color_index]);
}

canvas.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});

canvas.addEventListener('touchmove', function(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.touches[0].clientX - rect.left;
    mouseY = e.touches[0].clientY - rect.top;
  });

canvas.addEventListener('click', function(event) {
    // rotate color
    mouse_color_index = (mouse_color_index + 1) % colors.length;
});


function change_color() {
    // rotate color
    target_color_index = (target_color_index + 1) % colors.length;
}

setInterval(update, 10);

// change color
setInterval(change_color, 3000);