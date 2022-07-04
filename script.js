
console.log("Welcome to Spotify")
// Initialize variables
let songIndex = 1
let audioElement = new Audio("/songs/1.mp3")
let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("myProgressBar")
let gif = document.getElementById("gif")
let songItem = Array.from(document.getElementsByClassName("songItem"))
let masterSongName = document.getElementById('masterSongName')
masterSongName.innerText = "Nature Walk"

let songs= [
    {songName:"Nature Walk", filePath: "songs/1.mp3", coverPath: "images/covers/1.jpg"},
    {songName:"Wedding Story", filePath: "songs/2.mp3", coverPath: "images/covers/2.jpg"},
    {songName:"Calming Acoustic", filePath: "songs/3.mp3", coverPath: "images/covers/3.jpg"},
    {songName:"Beyond The Time", filePath: "songs/4.mp3", coverPath: "images/covers/4.jpg"},
    {songName:"Lofi Study", filePath: "songs/5.mp3", coverPath: "images/covers/5.jpg"},
    {songName:"Rain and Tears", filePath: "songs/6.mp3", coverPath: "images/covers/6.jpg"},
    {songName:"Into The Nature", filePath: "songs/7.mp3", coverPath: "images/covers/7.jpg"},

]

songItem.forEach((element, i)=>{
    // console.log(element, i)
    element.getElementsByTagName("img")[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName
})

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play()
        masterSongName.innerText = songs[songIndex-1].songName
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1
    }else {
        audioElement.pause()
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        makeAllPlays()
        gif.style.opacity = 0
    }
})
// Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate')

    // Update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress
    // console.log(progress)
    if(progress > 99){
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        makeAllPlays()
        gif.style.opacity = 0
    }

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100
})

const makeAllPlays = ()=>{
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        // console.log(e)
        makeAllPlays()
        songIndex = parseInt(e.target.id)
        console.log(songIndex)
        audioElement.src = `songs/${songIndex}.mp3`
        if(audioElement.paused ){
            e.target.classList.remove('fa-play-circle')
            e.target.classList.add('fa-pause-circle')
            audioElement.currentTime = 0
            masterSongName.innerText = songs[songIndex-1].songName
            masterPlay.classList.remove('fa-play-circle')
            masterPlay.classList.add('fa-pause-circle')
            audioElement.play()
            gif.style.opacity = 1
        }else{
            e.target.classList.remove('fa-pause-circle')
            e.target.classList.add('fa-play-circle')
             gif.style.opacity = 0
        }


    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if (songIndex>=7){
        songIndex=1
    }else{
        songIndex+=1
    }
    makeAllPlays()
    audioElement.src = `songs/${songIndex}.mp3`
    audioElement.currentTime = 0
    masterSongName.innerText = songs[songIndex-1].songName
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    audioElement.play()
    gif.style.opacity = 1
})

document.getElementById('previous').addEventListener('click', ()=>{
    if (songIndex<=1){
        songIndex=7
    }else{
        songIndex-=1
    }
    makeAllPlays()
    audioElement.src = `songs/${songIndex}.mp3`
    audioElement.currentTime = 0
    masterSongName.innerHtml = songs[songIndex-1].songName
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    audioElement.play()
    gif.style.opacity = 1
})