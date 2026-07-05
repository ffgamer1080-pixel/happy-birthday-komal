document.addEventListener("DOMContentLoaded",()=>{

const pages=document.querySelectorAll(".page");

pages.forEach((page,index)=>{

page.classList.add("fade-in");

page.style.animationDelay=`${index*0.08}s`;

});

const button=document.getElementById("startButton");

if(button){

button.addEventListener("mouseenter",()=>{

button.style.transform="scale(1.05)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="scale(1)";

});

button.addEventListener("touchstart",()=>{

button.style.transform="scale(.96)";

});

button.addEventListener("touchend",()=>{

button.style.transform="scale(1)";

});

}

const replay=document.getElementById("replayButton");

if(replay){

replay.addEventListener("click",()=>{

pages.forEach((page,index)=>{

page.classList.remove("flipped");

page.classList.remove("fade-in");

void page.offsetWidth;

page.classList.add("fade-in");

page.style.animationDelay=`${index*0.08}s`;

});

});

}

});
