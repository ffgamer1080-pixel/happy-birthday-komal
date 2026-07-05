class ParticleEngine{

constructor(){

this.canvas=document.getElementById("particleCanvas");

this.ctx=this.canvas.getContext("2d");

this.particles=[];

this.resize();

window.addEventListener("resize",()=>this.resize());

this.createParticles();

this.animate();

}

resize(){

this.canvas.width=window.innerWidth;

this.canvas.height=window.innerHeight;

}

createParticles(){

for(let i=0;i<60;i++){

this.particles.push({

x:Math.random()*this.canvas.width,

y:Math.random()*this.canvas.height,

size:Math.random()*5+2,

speedX:(Math.random()-0.5)*1.2,

speedY:Math.random()*1+0.5,

angle:Math.random()*360,

rotate:Math.random()*2-1,

opacity:Math.random()*0.5+0.4

});

}

}

draw(){

this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

this.particles.forEach(p=>{

p.x+=p.speedX;

p.y+=p.speedY;

p.angle+=p.rotate;

if(p.y>this.canvas.height+20){

p.y=-20;

p.x=Math.random()*this.canvas.width;

}

this.ctx.save();

this.ctx.translate(p.x,p.y);

this.ctx.rotate(p.angle*Math.PI/180);

this.ctx.fillStyle=`rgba(255,77,109,${p.opacity})`;

this.ctx.beginPath();

this.ctx.ellipse(0,0,p.size,p.size/1.5,0,0,Math.PI*2);

this.ctx.fill();

this.ctx.restore();

});

}

animate(){

this.draw();

requestAnimationFrame(()=>this.animate());

}

}

new ParticleEngine();
