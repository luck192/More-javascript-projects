document.addEventListener("DOMContentLoaded",function(){

    const optioncontainer = document.querySelector(".options-btn");
    const content = document.querySelector(".questions");
    const buttons = document.querySelectorAll(".options-btn button");
    const nextbutton = document.getElementById("next-btn");
    const questionText = document.getElementById("Ques");
    const simplequiz = document.getElementById("simplequiz");
    
    let started = false;
  
        simplequiz.addEventListener('click',function(){

            if(started)return;
            started=true;
            simplequiz.style.background = "white";
            simplequiz.style.border = "none";
            simplequiz.style.color = "#001e4d";
            content.style.display ="block";
            loadQuestions();
            
        })
   

    const quizData =[
        {
            question:"1. If 20% of a number is 50, what is the number?..",
            options: ["150", "200","250","300"],
            correctIdx : 2
        },
         {
            question:"The ratio of a and b is 3:4 and a+b = 280, find smaller number",
            options: ["120", "60","70","89"],
            correctIdx : 0
        },
         {
            question:"The average of 5 numbers is 20. if one num is excluded,the average becomes 15,find excluded num",
            options: ["50", "40","70","08"],
            correctIdx : 1
        },
         {
            question:"A train running at 60km/hr crosses a pole in 9s, length of train is?",
            options: ["100meter", "230meter","150meter","830meter"],
            correctIdx : 2
        }
    ];

    let totalCorrectans = 0;
    let currentQuesIdx = 0;
    let answered = false;
    loadQuestions();
    function loadQuestions(){
       
        let currQuiz = quizData[currentQuesIdx];
        nextbutton.style.display = "none"
        questionText.innerText = currQuiz.question;

        buttons.forEach((btn, index) =>{
             btn.innerText = currQuiz.options[index];
             btn.style.background ="";
        });
        //  content.style.display = "1";
        answered = false;  
    }

    optioncontainer.addEventListener('click', function(event){
       if(answered)return; 

       if(event.target === optioncontainer){
           return;
       }
        answered = true;

        let correctOptionIdx = quizData[currentQuesIdx].correctIdx ;
        let correctbutton = buttons[correctOptionIdx];
         
        if(event.target == correctbutton) totalCorrectans++;
        correctbutton.style.background = "green";
        
        if( event.target != correctbutton ){
              event.target.style.background = "red";
           }
             //next button;
           nextbutton.style.display = "block";
                
    });
     nextbutton.addEventListener('click', function(){
     
          currentQuesIdx++;
          if( currentQuesIdx < quizData.length){
             optioncontainer.style.display = "flex";
            loadQuestions();
          }else{
            questionText.innerHTML = `you got ${totalCorrectans} correct ans out of 4!`;
            optioncontainer.style.display = "none";
          }
    
     })
})
