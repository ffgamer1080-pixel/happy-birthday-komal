document.addEventListener("DOMContentLoaded",()=>{

const frames=document.querySelectorAll(".photo-frame");

frames.forEach((frame,index)=>{

frame.style.animationDelay=`${index*2}s`;

});

});
