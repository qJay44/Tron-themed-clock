const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const w = canvas.width = innerWidth;
const h = canvas.height = innerHeight;

const hoursRadius = 420;
const minutesRadius = hoursRadius * 0.8;
const secondsRadius = hoursRadius * 0.6;
const mainColor = '#28d1fa';

function degreeToRad(deg) { return deg * Math.PI / 180; }

function renderTime() {
    let now = new Date();
    let today = now.toDateString();
    let time = now.toLocaleTimeString();
    let hours = now.getHours();
    let minutes =  now.getMinutes();
    let seconds = now.getSeconds();
    let milliseconds = now.getMilliseconds();
    let newSeconds = seconds + milliseconds / 1000;

    // Background
    let gradient = ctx.createRadialGradient(w / 2, h / 2, 5, w / 2, h / 2, hoursRadius);
    gradient.addColorStop(0, '#09303a');
    gradient.addColorStop(1, 'black');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 22;
    ctx.lineCap = 'round';
    ctx.shadowBlur = '15';
    ctx.shadowColor = mainColor;

    // Hours
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, hoursRadius, degreeToRad(-90), degreeToRad((hours - 12) * (360 / 12) - 90));
    ctx.stroke();

    // Minutes
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, minutesRadius, degreeToRad(-90), degreeToRad(minutes * (360 / 60) - 90));
    ctx.stroke();

    // Seconds
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, secondsRadius, degreeToRad(-90), degreeToRad(newSeconds * (360 / 60) - 90));
    ctx.stroke();

    // Time
    ctx.font = '35px Arial';
    ctx.fillStyle = mainColor; 
    const textTime = ctx.measureText(time);
    ctx.fillText(time, (w - textTime.width) / 2, h / 2);

    // Date
    ctx.font = '25px Arial bold';
    ctx.fillStyle = mainColor; 
    const textDate = ctx.measureText(today);
    ctx.fillText(today, (w - textDate.width) / 2, h / 2 + 50);

    requestAnimationFrame(renderTime);
}

renderTime();