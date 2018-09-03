const questions = {
   1:{
       question: "What is the hero name of Todoroki's famous father?",
       answer: "Endevor",
       options: ["Midnight", "Best-Jeanist", "Kamui Woods"],
       imageUrl: "../images/todoroki.jpg",
       winImgUrl: "../images/endevor.jpg"
   },
   2:{
       question: "Which leading hero started without a quirk?",
       answer: "Midroiya",
       options: ["Bakugo","Todoroki","Iida"],
       imageUrl: "...images/class1A.jpg",
       winImgUrl: "../images/midoriya.jpg"
   },
   3:{
       question: "How did Midoriya obtain his quirk?",
       answer: "He ate one of All Might's hairs",
       options: ["He was born with them", "He drank a liquid that gave him powers", "he obtained a magic suit that gvie him his quirk"],
       imageUrl: "../images/quirkless.jpg",
       winImgUrl: "../images/eatThis.jpg"
   },

};

const chooseQuest = () => {
    let questIndex = (Math.floor(Math.random()* (Object.keys(questions).length))) + 1;
    let chosenQuest = questions[questIndex];
    return chosenQuest; 
}

const questionRend = (chosenQuest) => {
    let image = chosenQuest.imageUrl;
    console.log(image);
    //$(".card-img-top").attr("src", image);
}

$(document).ready(() =>{
    //$(".options").hide();

});

let chosen = chooseQuest();

questionRend(questions[chosen]);