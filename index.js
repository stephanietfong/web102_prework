/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/
const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {

    // loop over each item in the data
    for (var i = 0; i < games.length; i++){
        let game = document.createElement("div");
        game.classList.add("game-card");
        game.innerHTML = `<h2>${games[i].name}</h2>
                        <p>${games[i].description}</p>
                        <img src=${games[i].img} />`
        gamesContainer.append(game);
    }
}
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((sum, game) => {
    return sum + game.backers;
}, 0)
contributionsCard.innerHTML = `${totalContributions.toLocaleString('en-US')}`


const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((sum, game) => {
    return sum + game.pledged;
}, 0)
raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    
    const unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    })

    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    const fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged > game.goal;
    })

    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
})
const total = GAMES_JSON.reduce((sum, game) => {
    return sum + game.pledged;
}, 0)
const displayStr = (unfundedGames.length == 1) ? `$${total.toLocaleString('en-US')} has been raised for 11 games. 1 game remains unfunded. We need your help to fund these amazing games!` :
                                                 `$${total.toLocaleString('en-US')} has been raised for 11 games. ${unfundedGames.length} games remain unfunded. We need your help to fund these amazing games!`;

const explanation = document.createElement("p");
explanation.innerHTML = displayStr;
descriptionContainer.append(explanation);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [first, second, ...rest]= sortedGames;
const firstGameName = document.createElement("p");
firstGameName.innerHTML = first.name;
firstGameContainer.append(firstGameName);

const secondGameName = document.createElement("p");
secondGameName.innerHTML = second.name;
console.log(second);
secondGameContainer.append(secondGameName);