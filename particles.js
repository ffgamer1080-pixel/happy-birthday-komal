class ParticleEngine{

constructor(){

this.canvas=document.getElementById("particleCanvas");

if(!this.canvas)return;

this.ctx=this.canvas.getContext("2d");

this.particles=[];

this.running=false;

this.resize();

window.addEventListener("resize",()=>this.resize());

this.createParticles();

this.start();

}

resize(){

this.canvas.width=innerWidth;

this.canvas.height=innerHeight;

this.createParticles();

}

createParticles(){

this.particles=[];

const total=Math.min(80,Math.floor(innerWidth/18));

for(let i=0;i<total;i++){

this.particles.push({

x:Math.random()*this.canvas.width,

y:Math.random()*this.canvas.height,

r:Math.random()*3+1,

vx:(Math.random()-.5)*.4,

vy:Math.random()*.8+.2,

a:Math.random()*.5+.2,

c:Math.random()>.5?"#FFD700":"#FF4D6D"

});

}

}

draw(){

this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

this.particles.forEach(p=>{

this.ctx.globalAlpha=p.a;

this.ctx.fillStyle=p.c;

this.ctx.beginPath();

this.ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

this.ctx.fill();

});

}

animate=()=>{

if(!this.running)return;

this.draw();

this.particles.forEach(p=>{

p.x+=p.vx;

p.y+=p.vy;

if(p.y>this.canvas.height+10){

p.y=-10;

p.x=Math.random()*this.canvas.width;

}

if(p.x<-10)p.x=this.canvas.width+10;

if(p.x>this.canvas.width+10)p.x=-10;

});

requestAnimationFrame(this.animate);

}

start(){

if(this.running)return;

this.running=true;

this.animate();

}

}

document.addEventListener("DOMContentLoaded",()=>new ParticleEngine());
