document.addEventListener("DOMContentLoaded", function(){

    const newQuote = document.getElementById("newQuote");
    const authorText = document.getElementById("author");
    const quoteContent = document.getElementById("quoteContent");
    const postbutton =document.getElementById("postbutton");

     let quote ;
     let author;
    
     async function getQuote(){
        try{
        let response = await fetch( "https://dummyjson.com/quotes//random");
        let data = await response.json();   
        quote = await data.quote;
        author = await data.author;
        quoteContent.textContent = `"${quote}"` ;
        authorText.textContent = author;
        }
        catch(error){
            console.error("error in fetching:", error);
        }
     }

    newQuote.addEventListener('click', function(){
        getQuote();
        
    })

     let linkedinURL = "https://www.linkedin.com/feed/?shareActive=true&text="
     postbutton.addEventListener('click', function(){
        window.open(linkedinURL+quoteContent.textContent, "_blank");
     })
})