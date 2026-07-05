const lyrics={

1:[
"Happy Birthday ❤️",
"You are my beautiful memory"
],

2:[
"Every smile of yours",
"makes my day brighter ✨"
],

3:[
"Stay happy",
"Stay blessed ❤️"
],

4:[
"You are special",
"Forever and always 💖"
],

5:[
"May all your dreams",
"come true 🌹"
],

6:[
"Happy Birthday Komal ❤️",
"With lots of love 💕"
]

};

Object.keys(lyrics).forEach(id=>{

const box=document.getElementById("lyricsBox"+id);

if(!box)return;

lyrics[id].forEach(line=>{

const p=document.createElement("p");

p.textContent=line;

box.appendChild(p);

});

});
