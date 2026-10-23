document.addEventListener("DOMContentLoaded",function(){

    const song = document.getElementById("song");
    const ctrlicon = document.getElementById("ctrlicon");
    const playbutton = document.getElementById("playbtn");
    const progress = document.getElementById("progress");
    const songName = document.getElementById("songName");
    const artistName = document.getElementById("artistName");
    const songImgCover = document.getElementById("songImgCover");
    const forwardsong = document.getElementById("nxtbtn");
    const backwardsong = document.getElementById("prevbtn");
    const enteredArtist = document.getElementById("enterName");
    const searchicon = document.getElementById("searchicon");
    
    let enteredArtistName ="";

    enteredArtist.addEventListener("keydown",function(event){
        if(event.key =="Enter") {
            enteredArtistName = enteredArtist.value;
            forwardsong.click();
        }
    })

     searchicon.addEventListener('click',function(){
        
            enteredArtistName = enteredArtist.value;
            forwardsong.click();
        
    })

    let songHistory = [];
    let currSongidx = -1;

    song.onloadedmetadata = function(){
        progress.max= song.duration;
        progress.value = song.currentTime;
    }
    
    playbutton.addEventListener('click', function(){
      
        if( song.paused){
            song.play();
            playbutton.innerHTML='<i class="fa-solid fa-pause" id="ctrlicon"></i>';
        }
        else{
            song.pause();
           playbutton.innerHTML= '<i class="fa-solid fa-play"  id="ctrlicon"></i>'
        }
    })

    song.addEventListener("timeupdate", function(){
        progress.value = song.currentTime;
    })

    progress.addEventListener("change",function(){
           song.currentTime = progress.value;
    })

    function playsongFromdata(currsong){
            let fetchedAudioUrl = currsong.previewUrl;
            let fetchedTitle = currsong.trackName;
            let fetchedArtist = currsong.artistName;
            let fetchedLogo = currsong.artworkUrl100.replace('100*100', '300*300');

            song.src = fetchedAudioUrl;
            songName.innerHTML = fetchedTitle;
            artistName.innerHTML = fetchedArtist;
            songImgCover.src = fetchedLogo;
            
            playbutton.click();
    }
     
    forwardsong.addEventListener('click', async function () {

         try{
            let response = await fetch( `https://itunes.apple.com/search?term=${enteredArtistName}&entity=song&limit=15`);
            if(!response.ok){
                console.log("gbdg hai khiii");
            }
            let data = await response.json();
            
            console.log("data is here", data);

            let randomidx = Math.floor( Math.random()*data.results.length);
            let currsong = data.results[randomidx];
            console.log("currsong", currsong);
         
            currSongidx++;
            songHistory[currSongidx] = currsong;
            
            console.log("forward button presses");
            playsongFromdata(currsong);
           
         }

         catch(e){
            console.log(e);
         }
    })
    
    backwardsong.addEventListener('click', function(){
        
         console.log("backward button presses");
           currSongidx-=1;
           if(currSongidx >=0 ){
             let stackSong = songHistory[currSongidx];
            playsongFromdata(stackSong);
           }
           else{
            console.log("history empty");
           }
    })

})