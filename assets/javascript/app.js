$(document).ready(() =>{ 
const questions = {
   1:{
       question: "What is the hero name of Todoroki's famous father?",
       answer: "Endevor",
       options: ["Midnight", "Best-Jeanist", "Kamui Woods"],
       imageUrl: "assets/images/todoroki.jpg",
       winImgUrl: "assets/images/endevor.jpg"
   },
   2:{
       question: "Which leading hero started without a quirk?",
       answer: "Midroiya",
       options: ["Bakugo","Todoroki","Iida"],
       imageUrl: "assets/images/class1A.jpg",
       winImgUrl: "assets/images/midoriya.jpg"
   },
   3:{
       question: "How did Midoriya obtain his quirk?",
       answer: "He ate one of All Might's hairs",
       options: ["He was born with them", "He drank a liquid that gave him powers", "He obtained a magic suit that gvie him his quirk"],
       imageUrl: "assets/images/quirkless.jpg",
       winImgUrl: "assets/images/eatThis.jpg"
   },

};
let chosen;
let currentQuest;
let questionArr = [];
let questionNum = 0;
let qArrOpt = [];
let correct = 0;
//what start button click does
const startBtn = () => {
    chosen = chooseQuest();
    $('.start').css('display','none');    
    questionRend(chosen);
}
//choosing a random question
const chooseQuest = () => {
    $('.next').hide();
    let questIndex = (Math.floor(Math.random()* (Object.keys(questions).length))) + 1;
    let chosenQuest = questions[questIndex];
    currentQuest = chosenQuest;
    return chosenQuest; 
}
//rendering question object to page
const questionRend = (chosenQuest) => {
    $('.card').css('display','inline-block');
    if(questionArr.includes(chosenQuest)){
    //picks another question if the chosenQuest has already been chosen 
        chosenQuest = chooseQuest;
    }else{
        //renders question, number question, and image
    questionArr.push(chosenQuest);
    questionNum ++;
    let question = chosenQuest.question;
    let image = chosenQuest.imageUrl;
    $(".card-img-top").attr("src", image);
    $(".card-title").text(questionNum);
    $(".card-text").text(question);

        // adds options with answer to the options area
        let options = Object.values(chosenQuest.options);
        options.push(chosenQuest.answer);
        qArrOpt = options;
        for(let i = 0; i < 4; i++){
            $('.options').append('<li class=' + i + '></li>');
            $('li.'+ i +'').text(options[i]);
        }
    }
    $('li').on('click', checkAnswer);
}
//checks if correct answer was clicked
const checkAnswer = (event) => {
    if($(event.target).text() === currentQuest.answer){
        correct++;
        console.log(correct);
        $('.card-img-top').attr('src', currentQuest.winImgUrl);
        $('.next').toggle(100, clearQuest);
    }else{
        $(event.target).toggle();
    }
}
const clearQuest = () => {
    
}
$('.reset').hide();

//what happens when start putton is pushed
$('.btn-lg').on('click', startBtn);
//what happens when option is chosen

});
