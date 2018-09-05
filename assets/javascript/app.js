$(document).ready(() => {
    //global variables
    const questions = {
        1: {
            question: "What is the hero name of Todoroki's famous father?",
            answer: "Endeavor",
            options: ["Midnight", "Best-Jeanist", "Kamui Woods"],
            imageUrl: "assets/images/todoroki.jpg",
            winImgUrl: "assets/images/endevor.jpg"
        },
        2: {
            question: "Which leading hero started without a quirk?",
            answer: "Midoriya",
            options: ["Bakugo", "Todoroki", "Iida"],
            imageUrl: "assets/images/class1A.jpg",
            winImgUrl: "assets/images/midoriya.jpg"
        },
        3: {
            question: "How did Midoriya obtain his quirk?",
            answer: "He ate one of All Might's hairs",
            options: ["He was born with them", "He drank a liquid that gave him powers", "He obtained a magic suit that gvie him his quirk"],
            imageUrl: "assets/images/quirkless.jpg",
            winImgUrl: "assets/images/eatThis.jpg"
        },

    };
    let chosen;
    let currentQuest;
    let timer = 10;
    let run = false;
    let intervalID;
    let questionArr = [];
    let questionNum = 0;
    let newArray;
    let correct = 0;
    let incorrect = 0;

    //Functions
    //start timer
    const startTime = () => {

        if (!run) {
            intervalID = setInterval(decrement, 1000);
            run = true;
        }
    }
    //timer decrementer
    const decrement = () => {
        $('.timer').html("<h4>Time left: " + timer + "</h4>");
        timer--;
        if (timer === -1) {
            stopTime();
            incorrect++;
            $('li').remove();
            $('.currentQ').html("<p class = 'answer'>Time is up! correct answer: " + currentQuest.answer + "</p>");
            setTimeout(finishGame , 5000);
        }
    }
    //stop timer
    const stopTime = () => {
        run = false;
        clearInterval(intervalID);
        timer = 10;
    }
    //what start button click does
    const startBtn = () => {
        chosen = chooseQuest();
        $('.start').css('display', 'none');
        questionRend(chosen);
    }
    //choosing a random question
    const chooseQuest = () => {
        //$('.next').hide();
        let questIndex = (Math.floor(Math.random() * (Object.keys(questions).length))) + 1;
        let chosenQuest = questions[questIndex];
        currentQuest = chosenQuest;
        return chosenQuest;
    }
    //rendering question object to page
    const questionRend = (chosenQuest) => {
        $('.answer').remove();
        $('.card').css('display', 'inline-block');
        startTime();
        if (questionArr.includes(chosenQuest)) {
            //picks another question if the chosenQuest has already been chosen 
            finishGame();
        } else {
            //renders question, number question, and image
            questionArr.push(chosenQuest);
            questionNum++;
            let question = chosenQuest.question;
            let image = chosenQuest.imageUrl;
            $(".card-img-top").attr("src", image);
            $(".card-title").text(questionNum + ".)");
            $(".card-text").text(question);

            // adds options with answer to the options area
            options = Object.values(chosenQuest.options);
            options.push(chosenQuest.answer);
            qArrOpt = options;
            newArray = shuffleArray(options);
            for (let i = 0; i < 4; i++) {
                $('.options').append('<li class=' + i + '></li>');
                $('li.' + i + '').text(newArray[i]);
            }
        }
        $('li').on('click', checkAnswer);
    }
    // Shuffles array
    const shuffleArray = (optArray) => {
        let arrIndex = optArray.length, temporaryValue, randomIndex;
        while(0 !== arrIndex) {
            randomIndex = Math.floor(Math.random() * arrIndex);
            arrIndex -= 1;
            temporaryValue = optArray[arrIndex];
            optArray[arrIndex] = optArray[randomIndex];
            optArray[randomIndex] = temporaryValue;
        }
        return optArray;
    }
    //checks if correct answer was clicked
    const checkAnswer = (event) => {
        if ($(event.target).text() === currentQuest.answer) {
            correct++;
            stopTime();
            $('.card-img-top').attr('src', currentQuest.winImgUrl);
            $('li').remove();
            $('.currentQ').html("<p class = 'answer'>Correct!! the answer is: " + currentQuest.answer + "</p>");
            setTimeout(finishGame , 3000);
        } else {
            incorrect++;
            stopTime();
            $('li').remove();
            $('.currentQ').html("<p class = 'answer'>Inorrect ... the answer is: " + currentQuest.answer + "</p>");
            setTimeout(finishGame , 3000);
        }
    }
    //checks if the trivia game is over
    const finishGame = () => {
        console.log(correct);
        $('.card').css('display', 'none');
        let numQuestions = Object.keys(questions);
        if (questionArr.length === numQuestions.length) {
            end();
        } else {
            chosen = chooseQuest();
            questionRend(chosen);
        }
    }
    //what to do at the end of the trivia game
    const end = () => {
        $('.scores').html('<strong> Number Correct: ' + correct + '<br> Number Incorrect: ' + incorrect);
        $('.reset').show();
    }
    //reset button
    const reset = () => {
        $('strong').remove();
        $('.reset').hide();
        chosen = '';
        currentQuest = '';
        questionArr = [];
        questionNum = 0;
        qArrOpt = [];
        newArray = 0;
        correct = 0;
        incorect = 0;
        startBtn();
    }
    //steps:
    //initially hides the reset button and image
    $('.reset').hide();
    //what happens when start putton is pushed
    $('.btn-lg').on('click', startBtn);
    //resets the trivia game
    $('.reset').on('click', reset);
});
