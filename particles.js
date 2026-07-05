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

this.canvas.width=window.innerWidth;

this.canvas.height=window.innerHeight;

}

createParticles(){

this.particles=[];

for(let i=0;i<100;i++){

this.particles.push({

x:Math.random()*this.canvas.width,

y:Math.random()*this.canvas.height,

size:Math.random()*4+2,

speedX:(Math.random()-0.5)*0.8,

speedY:Math.random()*1.2+0.4,

opacity:Math.random()*0.5+0.3,

angle:Math.random()*360,

rotation:(Math.random()-0.5)*2,

color:Math.random()>0.5?"#FFD700":"#FF4D6D"

});

}

}
draw(){

this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

this.particles.forEach(p=>{

this.ctx.save();

this.ctx.globalAlpha=p.opacity;

this.ctx.translate(p.x,p.y);

this.ctx.rotate(p.angle*Math.PI/180);

this.ctx.fillStyle=p.color;

this.ctx.beginPath();

this.ctx.arc(0,0,p.size,0,Math.PI*2);

this.ctx.fill();

this.ctx.restore();

});

}

animate(){

if(!this.running)return;

this.draw();

this.particles.forEach(p=>{

p.x+=p.speedX;

p.y+=p.speedY;

p.angle+=p.rotation;

if(p.y>this.canvas.height+20){

p.y=-20;

p.x=Math.random()*this.canvas.width;

}

if(p.x<-20){

p.x=this.canvas.width+20;

}

if(p.x>this.canvas.width+20){

p.x=-20;

}

});

requestAnimationFrame(()=>this.animate());

}
start(){

if(!this.canvas || !this.ctx)return;

if(this.running)return;

this.running=true;

this.animate();

}

stop(){

this.running=false;

}

}

document.addEventListener("DOMContentLoaded",()=>{

new ParticleEngine();

});
