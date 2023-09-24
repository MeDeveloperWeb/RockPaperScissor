const MEDIA_PATH = "media/";

let round = 0;

let userScore = 0;
let computerScore = 0;

const choiceButton = document.querySelector(".choice-maker");
const resetButton = document.querySelector(".reset button")

const userBox = document.querySelector(".user-cont");
const computerBox = document.querySelector(".computer-cont");

const commentBox = document.querySelector(".commentary");

const choices = [
    "Rock",
    "Paper",
    "Scissor"
];

function reset() {
    commentBox.textContent = "Wrap your belt and push the button!";
    commentBox.style.color = "black";
    round = computerScore = userScore = 0;
    document.querySelector(".choice-btn").style.display = "block";
    document.querySelector(".reset").style.display = "none";
    showResult("", "", "",true);
}

function getUserChoiceIndex() {
    const choice =  prompt("Choose: Rock✊, Paper🖐️ or Scissor✌️");
    
    for (let i = 0; i < 3; i++) {
        if (choice.trim().toLowerCase() === choices[i].toLowerCase()) return i;
    }

    alert("Wrong Choice!!");
    return getUserChoiceIndex();
}

function getComputerChoiceIndex() {
    return Math.floor(Math.random() * 3);
}

function changeGIF(userGIFSrc = "animation", computerGIFSrc = "animation") {
    const userGIF = userBox.querySelector(".gif-cont img");
    const computerGIF = computerBox.querySelector(".gif-cont img");
    const userChoiceBox = userBox.querySelector(".choice-cont");
    const computerChoiceBox = computerBox.querySelector(".choice-cont");

    userGIF.src = MEDIA_PATH + userGIFSrc + '.gif';
    computerGIF.src = MEDIA_PATH + computerGIFSrc + '.gif';

    if (userGIFSrc !== "animation") {
        userChoiceBox.textContent = userGIFSrc;
        computerChoiceBox.textContent = computerGIFSrc;
    }
}

function showResult(userChoice, computerChoice, winner, reset = false) {
    const resultBox = document.querySelector(".round-result b");
    const userScoreBox = userBox.querySelector(".score-cont .score");
    const computerScoreBox = computerBox.querySelector(".score-cont .score");
    const roundBox = document.querySelector(".choice-btn .round-no");
    const userGIFCont = userBox.querySelector(".gif-cont");
    const computerGIFCont = computerBox.querySelector(".gif-cont");


    if (reset) {
        resultBox.textContent = "";
        userScoreBox.textContent = computerScoreBox.textContent = roundBox.textContent = 0;
        userGIFCont.style.borderColor = computerGIFCont.style.borderColor = "gray";
        return;
    }

    round++;
    roundBox.textContent = round;

    switch (winner) {
        case "user":
            userScore++;
            userScoreBox.textContent = userScore;
            resultBox.textContent = `You win this round! ${userChoice} beats ${computerChoice}`;
            resultBox.style.color = "#016201";
            userGIFCont.style.borderColor = "green";
            computerGIFCont.style.borderColor = "red";
            break;

        case "computer":
            computerScore++;
            computerScoreBox.textContent = computerScore;
            resultBox.textContent = `You lose this round! ${computerChoice} beats ${userChoice}`;
            resultBox.style.color = "#b60303";
            userGIFCont.style.borderColor = "red";
            computerGIFCont.style.borderColor = "green";
            break;

        default:
            resultBox.textContent = "It's a Tie.";
            resultBox.style.color = "#020283";
            userGIFCont.style.borderColor = "blue";
            computerGIFCont.style.borderColor = "blue";
    }
}

function changeCommentary() {
    if (round === 5) {
        document.querySelector(".choice-btn").style.display = "none";
        document.querySelector(".reset").style.display = "block";
        
        if (userScore > computerScore) {
            commentBox.textContent = "Well done! You won the game! Want to assert your dominance again?";
            commentBox.style.color = "#016201";
        }
        else if (userScore < computerScore) {
            commentBox.textContent = "Shame! You lost the game to a machine! Want to try again?";
            commentBox.style.color = "#b60303";
        }
        else {
            commentBox.textContent = "Game ended in a tie! Do you want to replay?";
            commentBox.style.color = "#020283";
        }
    }

    else if(userScore > computerScore) commentBox.textContent = "You are leading the game! Don't mess it up!";
    else if (userScore < computerScore) commentBox.textContent = "You are losing the game! Try harder!";
    else commentBox.textContent = "Game is equal. It's a nail biting fight. Keep fighting!"
}

function playRound() {
    const userSelection = getUserChoiceIndex();
    const computerSelection = getComputerChoiceIndex();

    changeGIF();

    const winner = userSelection === computerSelection ? "" : userSelection - computerSelection === 1 || userSelection - computerSelection === -2  ? "user" : "computer";

    setTimeout(() => {
        showResult(choices[userSelection], choices[computerSelection], winner);
        changeGIF(choices[userSelection], choices[computerSelection]);
        changeCommentary();
    }, 1000);

}

choiceButton.onclick = playRound;
resetButton.onclick = reset;