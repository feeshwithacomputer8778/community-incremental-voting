let coins = 0;
let coinsPerClick = 1;

const coinsDisplay = document.getElementById("coins");
const clickButton = document.getElementById("click-button");
const upgradeButton = document.getElementById("upgrade-button");

clickButton.addEventListener("click", () => {
    coins += coinsPerClick;
    updateGame();
});

upgradeButton.addEventListener("click", () => {
    if (coins >= 10) {
        coins -= 10;
        coinsPerClick += 1;
        updateGame();
    }
});

function updateGame() {
    coinsDisplay.textContent = `${coins} Coins`;

    upgradeButton.textContent =
        `+1 Coin per click — 10 Coins`;
}

function showPage(page) {
    document.getElementById("game-page").classList.add("hidden");
    document.getElementById("ideas-page").classList.add("hidden");
    document.getElementById("canon-page").classList.add("hidden");

    document.getElementById(`${page}-page`).classList.remove("hidden");
}
