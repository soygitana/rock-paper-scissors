const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const game = {
    playerHand: "",
    aiHand: "",
}


const hands = [...document.querySelectorAll('.select img')];

// handSelection function
function handSelection() {

    game.playerHand = this.dataset.option
    console.log(game.playerHand);
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 3px gray';
}

// aiChoice function
function aiChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;
}


// checkResult function 
function checkResult(player, ai) {
    if (player === ai) {
        return 'draw';
    } else if ((player === "paper" && ai === "rock") || (player === "rock" && ai === "scissors") || (player === "scissors" && ai === "paper")) {
        return 'win';
    } else {
        return 'loss';
    }
}


// publishResult function
function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;

    document.querySelector('[data-summary="ai-choice"]').textContent = ai;

    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;

    if (result === 'win') {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = "you";
        document.querySelector('[data-summary="who-win"]').style.color = "gray";
    } else if (result === 'loss') {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = "computer";
        document.querySelector('[data-summary="who-win"]').style.color = "gray";
    } else {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = "draw";
        document.querySelector('[data-summary="who-win"]').style.color = "gray";
    }
}



//endGame function
function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
    game.playerHand = "";
    game.aiHand = "";
}

//startGame function 
function startGame() {
    if (!game.playerHand) {
        return alert("what is your choice?");
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame()
}

hands.forEach(hand => hand.addEventListener('click', handSelection))

document.querySelector('.play').addEventListener('click', startGame)