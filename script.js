const SUPABASE_URL = "https://aadfaumzjwnztwiqdurs.supabase.co";
const SUPABASE_KEY = "sb_publishable_L6yMr31VyJv7v8qwWCdewQ_o2iS2JA9";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
let ideas = [];
let coins = 0;
let coinsPerClick = 1;
let upgradeLevel = 0;
async function loadIdeas() {
    const { data, error } = await supabaseClient
        .from("ideas")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Could not load ideas:", error);
        return;
    }

    ideas = data;
    displayIdeas();
}

const coinsDisplay = document.getElementById("coins");
const clickButton = document.getElementById("click-button");
const upgradeButton = document.getElementById("upgrade-button");

clickButton.addEventListener("click", () => {
    coins += coinsPerClick;
    updateGame();
});

upgradeButton.addEventListener("click", () => {
    const cost = 10 * Math.pow(2.5, upgradeLevel);

    if (coins >= cost) {
        coins -= cost;
        coinsPerClick += 1;
        upgradeLevel += 1;
        updateGame();
    }
});
function updateGame() {
    coinsDisplay.textContent = `${coins} Coins`;

    const cost = 10 * Math.pow(2.5, upgradeLevel);

    upgradeButton.textContent =
        `+1 Coin per click — ${cost.toFixed(2)} Coins`;
}


function showPage(page) {
    document.getElementById("game-page").classList.add("hidden");
    document.getElementById("ideas-page").classList.add("hidden");
    document.getElementById("canon-page").classList.add("hidden");

    document.getElementById(`${page}-page`).classList.remove("hidden");
}


// COMMUNITY IDEAS

const submitButton = document.getElementById("submit-button");
const submitForm = document.getElementById("submit-form");
const publishButton = document.getElementById("publish-button");

submitButton.addEventListener("click", () => {
    submitForm.classList.toggle("hidden");
});

publishButton.addEventListener("click", () => {
    const title = document.getElementById("idea-title").value.trim();
    const description =
        document.getElementById("idea-description").value.trim();

    if (title === "" || description === "") {
        alert("Please fill in both fields!");
        return;
    }

    const idea = {
        title: title,
        description: description,
        votes: 0
    };

    ideas.push(idea);

    document.getElementById("idea-title").value = "";
    document.getElementById("idea-description").value = "";

    submitForm.classList.add("hidden");

    displayIdeas();
});


function displayIdeas() {
    const list = document.getElementById("ideas-list");

    list.innerHTML = "";

    ideas.forEach((idea, index) => {
        const ideaElement = document.createElement("div");

        ideaElement.className = "idea";

        ideaElement.innerHTML = `
            <h3>${idea.title}</h3>
            <p>${idea.description}</p>
            <p>👍 ${idea.votes} votes</p>

            <button
                class="vote-button"
                onclick="voteForIdea(${index})"
            >
                👍 Upvote
            </button>
        `;

        list.appendChild(ideaElement);
    });
}


function voteForIdea(index) {
    ideas[index].votes++;
    displayIdeas();
}
loadIdeas();
