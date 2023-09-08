let $ = document
const image = $.getElementById("cover")

const title = $.getElementById("title")

const artist = $.getElementById("artist")

const music = $.querySelector("audio")

const currentTimeEl = $.getElementById("current-time")

const durationEl = $.getElementById("duration")

const progress = $.getElementById("progress")

const progressContainer = $.getElementById("progress-container")

const prevBtn = $.getElementById("prev")

const playBtn = $.getElementById("play")

const nextBtn = $.getElementById("next")

const background = $.getElementById("background")

const songs = [
	{path:"./music/shay.mp3",artist:"Shayea",musicName:"BEHTARIN RAFIGH ❤️",cover:"./img/shayea2.jpg"},
	{path:"./music/Erfan.mp3",artist:"AmirAbbas Gholab",musicName:"Erfan",cover:"./img/Erfan.jpg"},
	{path:"./music/shaggy.mp3",artist:"Shaggy",musicName:"Boombastic",cover:"./img/Boombastic.jpg"},
	
	
	
]

let isLoading = false

function playSong(){
	isLoading = true
	playBtn.classList.replace("fa-play", "fa-pause");
	playBtn.setAttribute("title", "Pause");
	music.play()
}

function pauseSong(){
	isLoading = false
	playBtn.classList.replace("fa-pause", "fa-play");
  	playBtn.setAttribute("title", "Play");
	music.pause()
}


function playToggle(){
	if (isLoading) {
		pauseSong()
	} else {
		playSong()
	}
}

function loadSongs(song){
	title.innerHTML = song.musicName
	artist.innerHTML = song.artist
	music.src = song.path
	changeCover(song.cover)
}

function changeCover(cover) {
	image.classList.remove("active");
	setTimeout(function(){
		image.src = cover
		image.classList.add("active");
	},100)
	background.src = cover
}

let songIndex = 0

function prevSong(){
	songIndex--
	if(songIndex < 0) {
		songIndex = 2
	}
	loadSongs(songs[songIndex])
	playSong()
}

function nextSong(){
	songIndex++
	if(songIndex > songs.length - 1) {
		songIndex = 0
	}
	loadSongs(songs[songIndex])
	playSong()
}

loadSongs(songs[songIndex])


function updateProgressBar(){
	if(isLoading){
		const duration = music.duration
	let currentTime = music.currentTime
	let progressPercent = (currentTime / duration) * 100
	progress.style.width = progressPercent + "%"
	const durationMinutes = Math.floor(duration / 60)
	let durationSeconds = Math.floor(duration % 60)
	if (durationSeconds < 10){
		durationSeconds = "0" + durationSeconds
	}
	if (durationSeconds){
		durationEl.innerHTML = durationMinutes + ":" + durationSeconds
	}
	const currentMinutes = Math.floor(currentTime / 60)
	let currentSeconds = Math.floor(currentTime % 60)
	if (currentSeconds < 10) {
		currentSeconds = "0" + currentSeconds
	}
	currentTimeEl.innerHTML = currentMinutes + ":" + currentSeconds
	}
}

function setProgressBar(e) {
	const width = this.clientWidth;
  	const clickX = e.offsetX;
  	const duration = music.duration;
  	music.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener("click",playToggle)
prevBtn.addEventListener("click",prevSong)
nextBtn.addEventListener("click",nextSong)
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);