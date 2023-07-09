console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3")
let masterPlay = document.getElementById("masterPlay")
let gif = document.getElementById("gif")
let myProgressBar = document.getElementById("myProgressBar")
let songItems = Array.from(document.getElementsByClassName("songItem"))
let songItemPlays = Array.from(document.getElementsByClassName("songItemPlay"))
let masterSongName = document.getElementById("masterSongName")

let songs = [
    {songName: "at-my-worse", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "love-is-gone", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "ashes - stellar", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "you-broke-me-first", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "all-nights", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "blinding-lights", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "so-done", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "without-you", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "thunder-imaginedragons", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "goosebumbs", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]
masterSongName.innerText = ""

songItems.forEach((e,i)=>{
    e.getElementsByTagName("img")[0].src = songs[i].coverPath
    e.getElementsByClassName("songName")[0].innerText = songs[i].songName
})
// audioElement.play()

masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        document.getElementById(songIndex).classList.remove("fa-circle-play")
        document.getElementById(songIndex).classList.add("fa-circle-pause")
        masterPlay.classList.remove("fa-circle-play")        
        masterPlay.classList.add("fa-circle-pause")
        gif.style.opacity = 1      
    }
    else{
        audioElement.pause()
        document.getElementById(songIndex).classList.add("fa-circle-play")
        document.getElementById(songIndex).classList.remove("fa-circle-pause")
        masterPlay.classList.remove("fa-circle-pause")  
        masterPlay.classList.add("fa-circle-play")  
        gif.style.opacity = 0      
    }
})

audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100
})

const makeAllPlays = () => {
    songItemPlays.forEach((e)=>{
        e.classList.remove("fa-circle-pause")
        e.classList.add("fa-circle-play")
    })
}

songItemPlays.forEach((e)=>{
    e.addEventListener('click',(e)=>{
        makeAllPlays()
        if(audioElement.paused || audioElement.currentTime<=0){
            songIndex = parseInt(e.target.id)
            e.target.classList.remove("fa-circle-play")
            e.target.classList.add("fa-circle-pause")
            masterSongName.innerText = songs[songIndex].songName 
            audioElement.src = `songs/${songIndex+1}.mp3`
            audioElement.currentTime = 0
            audioElement.play()
            gif.style.opacity = 1      
            masterPlay.classList.remove("fa-circle-play")        
            masterPlay.classList.add("fa-circle-pause")

        }else{
            audioElement.pause()
            e.target.classList.add("fa-circle-play")
            e.target.classList.remove("fa-circle-pause")
            masterPlay.classList.remove("fa-circle-pause")  
            masterPlay.classList.add("fa-circle-play")  
            gif.style.opacity = 0   
        }
    })
})

document.getElementById("next").addEventListener("click",()=>{
    if(songIndex >= 9){
        songIndex = 0
    }else{
        songIndex += 1
    }
    makeAllPlays()
    document.getElementById(songIndex).classList.remove("fa-circle-play")
    document.getElementById(songIndex).classList.add("fa-circle-pause")
    masterSongName.innerText = songs[songIndex].songName
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove("fa-circle-play")        
    masterPlay.classList.add("fa-circle-pause")
})

document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex <= 0){
        songIndex = 9
    }else{
        songIndex -= 1
    }
    makeAllPlays()
    document.getElementById(songIndex).classList.remove("fa-circle-play")
    document.getElementById(songIndex).classList.add("fa-circle-pause")
    masterSongName.innerText = songs[songIndex].songName
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove("fa-circle-play")        
    masterPlay.classList.add("fa-circle-pause")
})