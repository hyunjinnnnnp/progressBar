const progressBar = document.querySelector(".progress-bar-normal");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let maxScrollValue;
let endAngle = 0;

function drawCircle(scrollPer) {
  //---------원형 프로그래스 바 (x, y, radius, startAngle, endAngle [, anticlockwise])
  const startAngle = 0;
  endAngle = ((2 * Math.PI) / 100) * scrollPer * 100;
  //"2 * PI" = 360°  //and "/ 100 * e.percent" = e.percent%

  canvas.style.transform = "rotate(-90deg)";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(centerX, centerY, 30, startAngle, endAngle);
  ctx.lineCap = "round";
  ctx.lineWidth = "10";
  ctx.strokeStyle = "rgb(151, 28, 28)";
  ctx.stroke();
  if (scrollPer === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function resizeHandler() {
  maxScrollValue = document.body.offsetHeight - window.innerHeight;
}

window.addEventListener("scroll", function () {
  const scrollPer = window.pageYOffset / maxScrollValue;
  //console.log(document.body.offsetHeight - window.innerHeight);
  //바디 총 높이 - 윈도우 이너하이트= 윈도우 스크롤된 범위
  //console.log(window.pageYOffset, "스크롤 된 범위?");
  //퍼센트 = 현재 스크롤된 정도 / 맥스 스크롤
  //console.log(scrollPer); //0 ~ 1 사이의 수
  const xMove = scrollPer * 100;
  progressBar.style.width = `${xMove}%`;
  //----------일자 프로그래스바
  drawCircle(scrollPer);
});

window.addEventListener("resize", resizeHandler); //익명함수로 쓰면 maxScrollValue 처음에 작동 안함
resizeHandler(); //분리해주고 콜 !!
