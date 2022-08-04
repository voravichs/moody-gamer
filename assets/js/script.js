var aztroAPIKey = '0c3a2c35c5mshca3267e96406afcp16bdbcjsn57d168946cdf';
var startPageEl = $('#start-page');
var moodPageEl = $('#mood-choices');
var signPageEl = $('#sign');
var resultPageEl = $('#results-page');
var gameGenreEl = $('#game-genre');
var gameRecsEl = $('#game-recs');
var horoscopeEl = $('#horoscope');
var inputMoodEl = $('#user-input-mood');
var horoscopeMoodEl = $('#horoscope-mood');
var sign = '';
var mood = '';
// make var for RAWG API
var rawgAPIKey = '55468ae1e1444c17bf3c3a29d8b79732';
var rawgApiUrl = 'https://api.rawg.io/api/genres?key=' + rawgAPIKey;

// Assign genres to horoscope
var genreIndexes = [
    'sagittarius', // Action
    'scorpio', // Indie 
    'gemini', // Adventure 
    'cancer', // RPG
    'pisces', // Strategy
    'capricorn', // Shooter 
    'taurus', // Casual
    'virgo', // Simulation 
    'libra', // Puzzle
    'aquarius', // Arcade
    'leo', // Platformer
    'aries', // Racing
];

// Handle changing page through carosel/cycling
// display/showing
$(document).ready(function() {
    // Start page -> Sign Page
    $('#start-btn').click(function(){
        startPageEl.toggleClass('hidden');
        signPageEl.toggleClass('hidden');
    });
    // Sign page -> Mood Page
    $('.btn').click(function(event){
        var btnClicked = $(event.target);
        if (btnClicked.is('img')) {
            signPageEl.toggleClass('hidden');
            moodPageEl.toggleClass('hidden');
            sign = event.target.alt; 
            console.log(sign);
        }  
    });
    // Mood Page -> Results Page
    $('.icon').click(function(event){
        moodPageEl.toggleClass('hidden');
        resultPageEl.toggleClass('hidden');
        mood = event.target.id; 
        getGames();
        console.log(mood);
    });
});

function getGames() {
    fetch (rawgApiUrl)
    .then (function (reponse) {
        return reponse.json()
    })
    .then (function (data) {
        console.log(data);
        console.log(gameGenreEl);
        //gameRecsEl[0].textContent = data.results[1].games[0].name;

        // Genre 
        var signGenreIndex = 0;
        for (let i = 0; i < genreIndexes.length; i++) {
            if (sign == genreIndexes[i]) {
                gameGenreEl[0].textContent = data.results[i].name;
                signGenreIndex = i;
            }
        }
        
        // Game Recs 
        for (let i = 0; i < 6; i++) {
            console.log(gameRecsEl[0]);
            gameRecsEl[0].append(data.results[signGenreIndex].games[i].name + '\n');
        }
        

    })
}

const aztroApiURL = 'https://aztro.sameerkumar.website/?sign=aries&day=today';
fetch(aztroApiURL, {
    method: 'POST'
})
.then(response => response.json())
.then(json => {
    console.log(json);
    const date = json.current_date;
    console.log(date);
});

// function to fetch data from Aztro

// function display the data

// EXTRA: function to change background color depending on selected mood

// local storage function for previous inputs