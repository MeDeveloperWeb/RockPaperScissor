// Setting the directory path according to where media files are stored
const MEDIA_PATH = "media/";

// Keeps count of the current round
let round = 0;

// Keep count of user and computer score
let userScore = 0;
let computerScore = 0;

// Getting access to choice and Reset button
const choiceButton = document.querySelector(".choice-maker");
const resetButton = document.querySelector(".reset button")

// User and Computer container
const userBox = document.querySelector(".user-cont");
const computerBox = document.querySelector(".computer-cont");

// Commentary Box
const commentBox = document.querySelector(".commentary");

// Array of Choices
const choices = [
    "Rock",
    "Paper",
    "Scissor"
];

/**
 * Resets the round and score counters to 0. Changes the page to its very initial state.
 */
function reset() {
    commentBox.textContent = "Wrap your belt and push the button!";
    commentBox.style.color = "black";
    round = computerScore = userScore = 0;
    document.querySelector(".choice-btn").style.display = "block";
    document.querySelector(".reset").style.display = "none";
    showResult("", "", "",true);
}

/**
 * Prompts user for a choice
 * @returns Index of array choices according to the user choice
 * @example 0 for rock, 1 for paper, 2 for scissor
 */
function getUserChoiceIndex() {
    // Prompt user for a choice.
    const choice =  prompt("Choose: Rock✊, Paper🖐️ or Scissor✌️");
    
    // Loop through choice to check if the choice is valid
    for (let i = 0; i < 3; i++) {
        // If choice is valid return its index based on `choices` array
        if (choice.trim().toLowerCase() === choices[i].toLowerCase()) return i;
    }

    // If wrong Choice give an alert
    alert("Wrong Choice!!");

    // Ask for a choice from user
    return getUserChoiceIndex();
}

/**
 * 
 * @returns Index of array choices according to the computer choice
 * @example 0 for rock, 1 for paper, 2 for scissor
 */
function getComputerChoiceIndex() {
    // Choose random number among 0, 1 and 2
    return Math.floor(Math.random() * 3);
}

/**
 * Changes the GIF according to user choices.
 * If no prompts given, Changes src to hand animation
 * @param {string} userGIFSrc User Choice
 * @param {string} computerGIFSrc Computer Choice
 */
function changeGIF(userGIFSrc = "animation", computerGIFSrc = "animation") {
    const userGIF = userBox.querySelector(".gif-cont img");
    const computerGIF = computerBox.querySelector(".gif-cont img");
    const userChoiceBox = userBox.querySelector(".choice-cont");
    const computerChoiceBox = computerBox.querySelector(".choice-cont");

    userGIF.src = MEDIA_PATH + userGIFSrc + '.gif';
    computerGIF.src = MEDIA_PATH + computerGIFSrc + '.gif';

    // If choice has been made name the choices
    if (userGIFSrc !== "animation") {
        userChoiceBox.textContent = userGIFSrc;
        computerChoiceBox.textContent = computerGIFSrc;
    }
}
/**
 * Changes UI according to the rounds result!
 * @param {string} userChoice 
 * @param {string} computerChoice 
 * @param {string} winner 
 * @param {boolean} reset 
 */
function showResult(userChoice, computerChoice, winner, reset = false) {
    const resultBox = document.querySelector(".round-result b");
    const userScoreBox = userBox.querySelector(".score-cont .score");
    const computerScoreBox = computerBox.querySelector(".score-cont .score");
    const roundBox = document.querySelector(".choice-btn .round-no");
    const userGIFCont = userBox.querySelector(".gif-cont");
    const computerGIFCont = computerBox.querySelector(".gif-cont");

    // If reset
    if (reset) {
        // Revert all changes
        resultBox.textContent = "";
        userScoreBox.textContent = computerScoreBox.textContent = roundBox.textContent = 0;
        userGIFCont.style.borderColor = computerGIFCont.style.borderColor = "gray";
        return;
    }
    // Increment round Count
    round++;
    roundBox.textContent = round;

    // Change UI and increment score according to who wins
    switch (winner) {
        case "user":
            userScore++;
            userScoreBox.textContent = userScore;
            resultBox.textContent = `You win this round! ${userChoice} beats ${computerChoice}`;
            resultBox.style.color = "green";
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
            resultBox.style.color = "blue";
            userGIFCont.style.borderColor = "blue";
            computerGIFCont.style.borderColor = "blue";
    }
}

/**
 * Change comments and their colors according to the players game win or lose
 */
function changeCommentary() {
    // If 5 rounds are over Show the button to restart the game and hide The choice making button.
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
    // Show comments based on who is winning
    else if(userScore > computerScore) commentBox.textContent = "You are leading the game! Don't mess it up!";
    else if (userScore < computerScore) commentBox.textContent = "You are losing the game! Try harder!";
    else commentBox.textContent = "Game is equal. It's a nail biting fight. Keep fighting!"
}

/**
 * Implements main game logic
 */
function playRound() {
    // Get user and computer choice
    const userSelection = getUserChoiceIndex();
    const computerSelection = getComputerChoiceIndex();

    // Disable the choice maker button temporarily
    choiceButton.disabled = true;
    // Run the hand animation
    changeGIF();

    // Get the winner 
    // If choice is same its a tie
    // else if userChoice - computerChoice == 1 or -2 user wins
    // else user loses
    const winner = userSelection === computerSelection ? "" : userSelection - computerSelection === 1 || userSelection - computerSelection === -2  ? "user" : "computer";

    // Change the UI after 1 sec in order to show the animation
    setTimeout(() => {
        showResult(choices[userSelection], choices[computerSelection], winner);
        changeGIF(choices[userSelection], choices[computerSelection]);
        changeCommentary();
        choiceButton.disabled = false;
    }, 1000);

}

// On clicking choice button play game
choiceButton.onclick = playRound;

// On clicking Reset button Reset everything as it was before.
resetButton.onclick = reset;