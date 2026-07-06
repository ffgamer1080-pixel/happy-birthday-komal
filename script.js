document.addEventListener("DOMContentLoaded",()=>{

const $=id=>document.getElementById(id);

const splash=$("splashScreen"),
countdown=$("countdownScreen"),
album=$("albumContainer"),
startBtn=$("startButton"),
countNum=$("countdownNumber"),
music=$("bgMusic"),
pages=[...document.querySelectorAll(".page")];

let current=0,startX=0;

const show=el=>{

document.querySelectorAll(".screen")
.forEach(s=>s.classList.remove("active"));

el?.classList.add("active");

};

const resetBook=()=>{

current=0;

pages.forEach((p,i)=>{

p.classList.remove("flipped");

p.style.zIndex=pages.length-i;

});

};

resetBook();

const countdownStart=()=>{

let n=3;

countNum.textContent=n;

const timer=setInterval(()=>{

countNum.textContent=--n;

if(n===0){

clearInterval(timer);

show(album);

}

},1000);

};

startBtn?.addEventListener("click",()=>{

music?.play().catch(()=>{});

show(countdown);

countdownStart();

});
pages.forEach((page,i)=>{

page.addEventListener("click",()=>{

if(i!==current)return;

page.classList.add("flipped");

current++;

});

});

album?.addEventListener("touchstart",e=>{

startX=e.touches[0].clientX;

},{passive:true});

album?.addEventListener("touchend",e=>{

const endX=e.changedTouches[0].clientX;

const diff=startX-endX;

if(diff>50&&current<pages.length){

pages[current].click();

}

if(diff<-50&&current>0){

current--;

pages[current].classList.remove("flipped");

}

});

window.addEventListener("resize",resetBook);

});
