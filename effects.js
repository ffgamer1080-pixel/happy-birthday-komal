document.addEventListener("DOMContentLoaded",()=>{

const pages=document.querySelectorAll(".page");

pages.forEach((page,i)=>{

page.classList.add("fade-in");

page.style.animationDelay=`${i*.08}s`;

});

document.querySelectorAll(".gold-btn").forEach(btn=>{

btn.addEventListener("touchstart",()=>{

btn.style.transform="scale(.96)";

},{passive:true});

btn.addEventListener("touchend",()=>{

btn.style.transform="scale(1)";

});

btn.addEventListener("touchcancel",()=>{

btn.style.transform="scale(1)";

});

});

document.querySelectorAll(".photo").forEach(photo=>{

photo.addEventListener("touchstart",()=>{

photo.style.transform="scale(1.03)";

},{passive:true});

photo.addEventListener("touchend",()=>{

photo.style.transform="scale(1)";

});

photo.addEventListener("touchcancel",()=>{

photo.style.transform="scale(1)";

});

});

const glow=()=>{

document.querySelectorAll(".cover-overlay").forEach(el=>{

el.animate([

{opacity:.85},

{opacity:1},

{opacity:.85}

],{

duration:3000,

iterations:Infinity

});

});

};

glow();

});
