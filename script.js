document.addEventListener("DOMContentLoaded",()=>{

const splash=document.getElementById("splashScreen");

const countdown=document.getElementById("countdownScreen");

const album=document.getElementById("albumContainer");

const startBtn=document.getElementById("startButton");

const replayBtn=document.getElementById("replayButton");

const count=document.getElementById("countdownNumber");

const music=document.getElementById("bgMusic");

const flip=document.getElementById("pageFlipSound");

const pages=document.querySelectorAll(".page");

let currentPage=0;

function showScreen(screen){

splash.classList.remove("active");

countdown.classList.remove("active");

album.classList.remove("active");

screen.classList.add("active");

}

startBtn.addEventListener("click",()=>{

music.play().catch(()=>{});

showScreen(countdown);

startCountdown();

});

function startCountdown(){

let n=3;

count.innerHTML=n;

const timer=setInterval(()=>{

n--;

if(n>0){

count.innerHTML=n;

}else{

clearInterval(timer);

showScreen(album);

}

},1000);

}

pages.forEach((page,index)=>{

page.style.zIndex=pages.length-index;

page.addEventListener("click",()=>{

if(currentPage!==index)return;

page.classList.add("flipped");

if(flip){

flip.currentTime=0;

flip.play().catch(()=>{});

}

currentPage++;

});

});

let touchStart=0;

album.addEventListener("touchstart",(e)=>{

touchStart=e.touches[0].clientX;

});

album.addEventListener("touchend",(e)=>{

const touchEnd=e.changedTouches[0].clientX;

if(touchStart-touchEnd>50){

if(currentPage<pages.length){

pages[currentPage].click();

}

}

if(touchEnd-touchStart>50){

if(currentPage>0){

currentPage--;

pages[currentPage].classList.remove("flipped");

pages[currentPage].style.zIndex=pages.length-currentPage;

}

}

});

replayBtn.addEventListener("click",()=>{

pages.forEach((page,index)=>{

page.classList.remove("flipped");

page.style.zIndex=pages.length-index;

});

currentPage=0;

music.currentTime=0;

showScreen(splash);

});

});
