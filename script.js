const fileInput = document.getElementById("fileInput");
const audio = document.getElementById("audio");

const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const list = document.getElementById("list");

let songs = [];
let index = 0;
let playing = false;

// LOAD FILES
fileInput.addEventListener("change", (e) => {
songs = Array.from(e.target.files).map(file => ({
name: file.name,
url: URL.createObjectURL(file)
}));

renderList();
loadSong(0);
});

// LOAD SONG
function loadSong(i){
if(!songs.length) return;

audio.src = songs[i].url;
title.innerText = songs[i].name;
artist.innerText = "Local File";
}

// PLAY
function playSong(){
audio.play();
playing = true;
playBtn.innerText = "⏸";
}

// PAUSE
function pauseSong(){
audio.pause();
playing = false;
playBtn.innerText = "▶";
}

playBtn.onclick = () => {
playing ? pauseSong() : playSong();
};

// NEXT
nextBtn.onclick = () => {
if(!songs.length) return;
index = (index + 1) % songs.length;
loadSong(index);
playSong();
};

// PREV
prevBtn.onclick = () => {
if(!songs.length) return;
index = (index - 1 + songs.length) % songs.length;
loadSong(index);
playSong();
};

// PROGRESS
audio.addEventListener("timeupdate", () => {
progress.value = (audio.currentTime / audio.duration) * 100;
current.innerText = format(audio.currentTime);
duration.innerText = format(audio.duration);
});

progress.oninput = () => {
audio.currentTime = (progress.value / 100) * audio.duration;
};

// VOLUME
volume.oninput = () => {
audio.volume = volume.value;
};

// FORMAT TIME
function format(t){
if(isNaN(t)) return "0:00";
let m = Math.floor(t/60);
let s = Math.floor(t%60);
return `${m}:${s < 10 ? "0"+s : s}`;
}

// LIST
function renderList(){
list.innerHTML = "";

songs.forEach((s,i)=>{
let li = document.createElement("li");
li.innerText = s.name;

li.onclick = () => {
index = i;
loadSong(i);
playSong();
};

list.appendChild(li);
});
}

// AUTO NEXT
audio.addEventListener("ended", ()=>{
index = (index + 1) % songs.length;
loadSong(index);
playSong();
});
