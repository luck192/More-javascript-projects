document.addEventListener("DOMContentLoaded", function(){

    const textarea = document.querySelector("textarea");
    let voiceselect = document.querySelector("select");
    const listenbtn = document.getElementById("listenbtn");

    let speech = new SpeechSynthesisUtterance();
    
    let voices =[];

    window.speechSynthesis.onvoiceschanged = ()=>{
        voices = window.speechSynthesis.getVoices();
        speech.voice = voices[0];
        voiceselect.innerHTML ="";
        voices.forEach((voice,i)=>{
            voiceselect.options[i] =  new Option(voice.name, i);
        }) 
    }

    voiceselect.addEventListener("change", function(){
        speech.voice = voices[voiceselect.value];
    })
   
    textarea.addEventListener("keydown", function(e){
        if(e.key == "Enter"){
            listenbtn.click();
        }
    })

    listenbtn.addEventListener('click', function(){
        speech.text = textarea.value;
        
        window.speechSynthesis.speak(speech);

     })
})