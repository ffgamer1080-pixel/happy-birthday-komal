document.addEventListener("DOMContentLoaded",()=>{

const splash=document.getElementById("splashScreen");

const countdown=document.getElementById("countdownScreen");

const album=document.getElementById("albumContainer");

const startButton=document.getElementById("startButton");

const replayButton=document.getElementById("replayButton");

const countdownNumber=document.getElementById("countdownNumber");

const bgMusic=document.getElementById("bgMusic");

const pageFlip=document.getElementById("pageFlipSound");

const pages=document.querySelectorAll(".page");

let currentPage=0;

function showScreen(screen){

document.querySelectorAll(".screen").forEach(s=>{

s.classList.remove("active");

});

if(screen){

screen.classList.add("active");

}

}

if(startButton){

startButton.addEventListener("click",()=>{

if(bgMusic){

bgMusic.play().catch(()=>{});

}

showScreen(countdown);

startCountdown();

});

}

function startCountdown(){

let number=3;

if(countdownNumber){

countdownNumber.textContent=number;

}
const timer=setInterval(()=>{

number--;

if(number>0){

if(countdownNumber){

countdownNumber.textContent=number;

}

}else{

clearInterval(timer);

showScreen(album);

}

},1000);

}

pages.forEach((page,index)=>{

page.style.zIndex=pages.length-index;

page.addEventListener("click",()=>{

if(index!==currentPage)return;

page.classList.add("flipped");

if(pageFlip){

pageFlip.currentTime=0;

pageFlip.play().catch(()=>{});

}

currentPage++;

});

});
let touchStartX=0;

if(album){

album.addEventListener("touchstart",(e)=>{

touchStartX=e.touches[0].clientX;

});

album.addEventListener("touchend",(e)=>{

const touchEndX=e.changedTouches[0].clientX;

const distance=touchStartX-touchEndX;

if(distance>50){

if(currentPage<pages.length){

pages[currentPage].click();

}

}else if(distance<-50){

if(currentPage>0){

currentPage--;

pages[currentPage].classList.remove("flipped");

pages[currentPage].style.zIndex=pages.length-currentPage;

if(pageFlip){

pageFlip.currentTime=0;

pageFlip.play().catch(()=>{});

}

}

}

});

}
if(replayButton){

replayButton.addEventListener("click",()=>{

pages.forEach((page,index)=>{

page.classList.remove("flipped");

page.style.zIndex=pages.length-index;

});

currentPage=0;

if(bgMusic){

bgMusic.pause();

bgMusic.currentTime=0;

}

showScreen(splash);

});

}

window.addEventListener("resize",()=>{

pages.forEach((page,index)=>{

page.style.zIndex=pages.length-index;

});

});

});
