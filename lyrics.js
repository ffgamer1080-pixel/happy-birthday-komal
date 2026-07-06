const lyrics={

lyricsBox1:[
"Tanne Main Likhu Rani Dil Ki 🥰",
"Ya Tanne Mumtaj Likhunga 👰"
],

lyricsBox2:[
"Je Likhne Main Beth Gya Tanne 🤗",
"To Pakka Main Kitab Likhunga ✍🏻"
],

lyricsBox3:[
"Re Hottha Na Gulab Likh Diyu 😊",
"Chehre Pe Chand Likhunga 🌙"
],

lyricsBox4:[
"Teri Har Muskaan Meri Duniya Hai ❤️",
"Tu Hi Meri Khushi Hai 💖"
],

lyricsBox5:[
"Har Lamha Tere Naam Kar Du 💕",
"Bas Tu Hamesha Muskurati Rahe ✨"
],

lyricsBox6:[
"Happy Birthday Komal ❤️",
"May God Bless You Always 🌹"
]

};

document.addEventListener("DOMContentLoaded",()=>{

Object.entries(lyrics).forEach(([id,lines])=>{

const box=document.getElementById(id);

if(!box)return;

let i=0;

const show=()=>{

box.classList.add("fade-in");

box.innerHTML=`<p>${lines[i]}</p>`;

i=(i+1)%lines.length;

setTimeout(show,3000);

};

show();

});

});
