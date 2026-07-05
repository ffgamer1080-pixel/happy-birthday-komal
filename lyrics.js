const lyrics={

lyricsBox1:[
"Tanne Main Likhu Rani Dil Ki 🥰",
"",
"Ya Tanne Mumtaj Likhunga 👰"
],

lyricsBox2:[
"Je Likhne Main Beth Gya Tanne 🤗",
"",
"To Pakka Main Kitab Likhunga ✍🏻"
],

lyricsBox3:[
"Re Hottha Na Gulab Likh Diyu 😊",
"",
"Chehre Pe Chand Likhunga 🌙"
],

lyricsBox4:[
"Teri Har Muskaan Meri Duniya Hai ❤️",
"",
"Tu Hi Meri Khushi Hai 💕"
],

lyricsBox5:[
"Har Lamha Tere Naam Kar Du 💖",
"",
"Bas Tu Hamesha Muskurati Rahe 😊"
],

lyricsBox6:[
"Happy Birthday Komal ❤️",
"",
"Stay Happy Forever 🎂"
]

};

document.addEventListener("DOMContentLoaded",()=>{

Object.keys(lyrics).forEach(id=>{

const box=document.getElementById(id);

if(!box)return;

lyrics[id].forEach(line=>{

const p=document.createElement("p");

p.textContent=line;

box.appendChild(p);

});

});

});
