$(document).ready(() => {
    //global variables
    const questions = {
        "One": {
            question: "What is the hero name of Todoroki's famous father?",
            answer: "Endeavor",
            options: ["Midnight", "Best-Jeanist", "Kamui Woods"],
            imageUrl: "assets/images/todoroki.jpg",
            winImgUrl: "assets/images/endevor.jpg"
        },
        "Two": {
            question: "Which leading hero started without a quirk?",
            answer: "Midoriya",
            options: ["Bakugo", "Todoroki", "Iida"],
            imageUrl: "assets/images/class1A.jpg",
            winImgUrl: "assets/images/midoriya.jpg"
        },
        "Three": {
            question: "How did Midoriya obtain his quirk?",
            answer: "He ate one of All Might's hairs",
            options: ["He was born with them", "He drank a liquid that gave him powers", "He obtained a magic suit that gvie him his quirk"],
            imageUrl: "assets/images/quirkless.jpg",
            winImgUrl: "assets/images/eatThis.jpg"
        },
        "Four": {
            question:"How many members are part of the Wild, Wild Pussycats Team?",
            answer: "Four",
            options: ["Three", "Ten", "Seven"],
            imageUrl: "assets/images/who.jpg",
            winImgUrl: "assets/images/WWP.gif"
        },
        "Five": {
            question:"Who is All Mights number one nemesis?",
            answer: "All For One",
            options: ["Shigaraki", "Stain", "Nomus"],
            imageUrl: "assets/images/AllMight.jpg",
            winImgUrl: "assets/images/allForOne.jpg"
        },
        "Six": {
            question:"What is Class 1A's instructor's power?",
            answer: " Nullify anyone's Quirk by looking at them",
            options: ["Creates a vortex that turns anything it sucks into dust", "In crease the volume of his voice", "put targets to sleep by exuding a sleep-inducing aroma from body"],
            imageUrl:"assets/images/aizawa.gif",
            winImgUrl: "assets/images/eraserhead.gif"
        },
        "Seven": {
            question: "How many volumes of manga are there currently for MHA?",
            answer: "Twenty",
            options: ["Fifteen", "Thirty", "Eight"],
            imageUrl: "assets/images/Qseven.jpg",
            winImgUrl: "assets/images/shock.gif"
        },
        "Eight": {
            question: "Which of these Heros is not a Pro Hero?",
            answer: "Mineta",
            options: ["Midnight", "Cementos", "Gang Orca"],
            imageUrl: "assets/images/AllChara.jpg_large",
            winImgUrl: "assets/images/mineta.gif"
        },
        "Nine": {
            question: "Which of these characters is a female student Hero in class 1A?",
            answer: "Uraraka",
            options: ["Kendo", "Shiozaki", "Toga"],
            imageUrl: "assets/images/femaleChara.jpg",
            winImgUrl: "assets/images/Uraraka.gif"
        },
        "Ten": {
            question: "Who won first place in the sports festival?",
            answer: "Bakugo",
            options: ["Todoroki", "Tokoyami", "Midoriya"],
            imageUrl: "assets/images/sportsFest.jpg",
            winImgUrl: "assets/images/bakugou.jpg"
        }
    };
    let chosenSeq;
    let currentQuestKey;
    let currentQuestArr;
    let currentQuest;
    let timer = 10;
    let run = false;
    let intervalID;
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
            setTimeout(finishGame , 4000);
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
        correct = 0;
        incorrect = 0;
        //chosen = chooseQuest();
        chosenSeq = qShuff();
        $('.start').css('display', 'none');
        questionRend(chosenSeq);
    }
    //shuffles all of the questions to be random
    const qShuff = () => {
        let startArr = Object.keys(questions);
        let newShuffQs = shuffleArray(startArr);
        return newShuffQs;
    } 
    //rendering question object to page
    const questionRend = (chosenQuestArr) => {
        currentQuestArr = chosenQuestArr;
        currentQuestKey = chosenQuestArr[0];
        currentQuest = questions[currentQuestKey];
        $('.answer').remove();
        $('.card').css('display', 'inline-block');
        startTime();
        questionNum++;
        let question = currentQuest.question;
        let image = currentQuest.imageUrl;
        $(".card-img-top").attr("src", image);
        $(".card-title").text(questionNum + ".)");
        $(".card-text").text(question);

        options = Object.values(currentQuest.options);
        options.push(currentQuest.answer);
        let qArrOpt = options;
        newArray = shuffleArray(qArrOpt);
        for (let i = 0; i < 4; i++) {
            $('.options').append('<li class=' + i + '></li>');
            $('li.' + i + '').text(newArray[i]);
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
            $('.currentQ').html("<p class = 'answer'>Correct!! the answer is:<br>" + currentQuest.answer + "</p>");
            console.log('correct ' + correct);
            setTimeout(finishGame , 3000);
        } else {
            incorrect++;
            stopTime();
            $('li').remove();
            $('.currentQ').html("<p class = 'answer'>Incorrect ... the answer is:<br>" + currentQuest.answer + "</p>");
            console.log('incorrect' + incorrect);
            setTimeout(finishGame , 3000);
        }
    }
    //checks if the trivia game is over
    const finishGame = () => {
        $('.card').css('display', 'none');
        $('li').remove();
        currentQuestArr.shift();
        if(currentQuestArr.length < 1){
            end();
        }else {
            questionRend(currentQuestArr);
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
        currentQuestArr = [];
        currentQuestKey = 0;
        currentQuest = 0;
        run = false;
        clearInterval(intervalID);
        questionNum = 0;
        newArray = [];
        correct = 0;
        incorrect = 0;
        $('li').remove();
        chosenSeq = qShuff();
        questionRend(chosenSeq);
    }
    //steps:
    //initially hides the reset button and image
    $('.reset').hide();
    //what happens when start putton is pushed
    $('.btn-lg').on('click', startBtn);
    //resets the trivia game
    $('.reset').on('click', reset);
});
