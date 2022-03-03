const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls_color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);
ctx.strokeStyle = "#161616"
ctx.fillStyle = "#161616"
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting === false) { // !painting이랑 같은 의미, !painting은 !(false)=true이므로 if(true){}인것처럼 if문이 실행된다
    ctx.beginPath(); // 선을 그리겠다고 선언
    ctx.moveTo(x, y); // 시작좌표
  } else {
    if (filling === false) {
      ctx.lineTo(x, y); // 끝좌표
      ctx.stroke(); // 직선 그어주기
    }
  }
}



function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; // 선색 지정
  ctx.fillStyle = color; // 배경색 지정
}

function fillCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, 700, 700) // 배경 채우기
  }
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));


function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

if (range) {
  range.addEventListener("input", handleRangeChange)
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

function contextMenu(event){ // 우클릭 방지
  event.preventDefault();
}

if (save){
  save.addEventListener("click", saveClick);
}

function saveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image; // href가 주소값이여야 되고 download는 파일이름이여야 한다.
  link.download = "PaintJS😊"; // download는 anchor("a") 태그의 attribute(속성값)이다. (이모지 사용 win + .)
  link.click(); // fake the click
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", fillCanvasClick);
  canvas.addEventListener("contextmenu", contextMenu);
}


// function draw() { // 눈덩이 만들기
//   let color = ["#2197b8", "#379ebb", "#52a2b9", "#add2f7", "#c4dffa", "#d9ebfc"];
//   ctx.fillStyle = color[Math.floor(Math.random() * 6)];
//   ctx.fillRect(0, 0, 700, 700)
//   for (var i = 0; i < 15; i++) {
//     ctx.beginPath();
//     ctx.arc(Math.random() * 700, Math.random() * 700, 5 + Math.random() * 10, 0, Math.PI * 2)
//     ctx.fillStyle = `rgba(255,255,255,${0.1+Math.random()})`; //alpha값을 0으로 setTimeout써서 내려야할듯 alpha -= 0.01
//     ctx.fill();

//   }

//   ctx.font = '20px serif';
//   ctx.strokeStyle = "#fff"
//   for (i = 0; i < 10; i++) {
//     ctx.strokeText("눈 좋아", Math.random() * 700, Math.random() * 700);
//   }
// }

// function fadeOut() {
//   ctx.fillStyle = "rgba(255,255,255,0.2)";
//   ctx.fillRect(0,0,700,700)
//   setTimeout(fadeOut, 500);
// }
// fadeOut();
// draw()
// setInterval(draw, 2000);