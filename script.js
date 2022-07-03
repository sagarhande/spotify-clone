
console.log("Welcome to Spotify")
// Initialize variables
let songIndex = 0
let audioElement = new Audio("/songs/1.mp3")
let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("myProgressBar")
let gif = document.getElementById("gif")


let songs= [
    {songName:"Song1", filePath: "songs/1.mp3", coverPath: "images/covers/1.jpg"},
    {songName:"Song1", filePath: "songs/1.mp3", coverPath: "images/covers/1.jpg"},
    {songName:"Song1", filePath: "songs/1.mp3", coverPath: "images/covers/1.jpg"},
    {songName:"Song1", filePath: "songs/1.mp3", coverPath: "images/covers/1.jpg"},
    {songName:"Song1", filePath: "songs/1.mp3", coverPath: "images/covers/1.jpg"},
    {songName:"Song1", filePath: "songs/1.mp3", coverPath: "images/covers/1.jpg"},
]

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1
    }else {
        audioElement.pause()
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0
    }
})
// Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate')

    // Update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress
    console.log(progress)

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100
})