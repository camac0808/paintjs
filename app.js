const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// ctx.strokeStyle = "#161616"
// ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath(); // 선을 그리겠다고 선언
    ctx.moveTo(x, y); // 시작좌표
  } else {
    ctx.lineTo(x, y); // 끝좌표
    ctx.stroke(); // 직선 그어주기
  }
}


function onMouseDown(event) {
  painting = true;
}

function mouseClick(event){ 
  const x = event.offsetX;
  const y = event.offsetY;
  
}

function draw(){ // 눈덩이 만들기
  let color = ["#2197b8", "#379ebb","#52a2b9", "#add2f7", "#c4dffa", "#d9ebfc"];
  ctx.fillStyle= color[Math.floor(Math.random()*6)];
  ctx.fillRect(0, 0, 700, 700)
  for(var i=0; i<15; i++){
    ctx.beginPath();
    ctx.arc(Math.random()*700, Math.random()*700, 5+Math.random()*10, 0, Math.PI*2)
    ctx.fillStyle = "rgba(255,255,255,"+(0.1+Math.random())+")";
    ctx.fill();
  }
  ctx.font = '20px serif';
  ctx.strokeStyle = "#fff"
  for(i=0; i<10; i++){
    ctx.strokeText("눈좋아", Math.random()*700 , Math.random()*700);
  }
}
draw()
setInterval(draw, 1800)


if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", mouseClick);
}