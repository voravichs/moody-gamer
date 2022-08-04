var startPageEl = $('#start-page');
var moodPageEl = $('#mood-choices');
var signPageEl = $('#sign');
var resultPageEl = $('#results-page');
var gameGenreEl = $('#game-genre');
var gameRecsEl = $('#game-recs');
var horoscopeEl = $('#horoscope');
var inputMoodEl = $('#user-input-mood');
var horoscopeMoodEl = $('#horoscope-mood');
var horoscopeDescEl = $('#horoscope-description');

// APIs URLs and API Keys
var rawgAPIKey = '55468ae1e1444c17bf3c3a29d8b79732';
var rawgApiUrl = 'https://api.rawg.io/api/genres?key=' + rawgAPIKey;
var aztroAPIKey = '0c3a2c35c5mshca3267e96406afcp16bdbcjsn57d168946cdf';
var aztroApiURL = 'https://aztro.sameerkumar.website/?sign=';

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

// Global Variables for storing game and genre from API calls
var sign = '';
var mood = '';

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
        }  
    });
    // Mood Page -> Results Page
    $('.icon').click(function(event){
        moodPageEl.toggleClass('hidden');
        resultPageEl.toggleClass('hidden');
        mood = event.target.id; 
        getGames();
        setHoroscope();
    });
    // Function to reload results from most recent sign and mood from local storage
    $('#load-btn').on('click', loadGames);
    function loadGames() {
        mood = localStorage.getItem('mood');
        sign = localStorage.getItem('sign');
        startPageEl.toggleClass('hidden');
        resultPageEl.toggleClass('hidden');
        getGames();
        setHoroscope();
    }
});

// Make an API call to RAWG API and set the genre and game recommendations
function getGames() {
    fetch (rawgApiUrl)
    .then (function (reponse) {
        return reponse.json()
    })
    .then (function (data) {
        console.log(data);
        // Genre 
        var signGenreIndex = 0;
        for (let i = 0; i < genreIndexes.length; i++) {
            if (sign == genreIndexes[i]) {
                gameGenreEl[0].textContent = data.results[i].name;
                signGenreIndex = i;
                // Set Genre Image
                $('#genre-image').attr('src', data.results[i].image_background);
                $('#genre-image').attr('alt', data.results[i].name + ' game');
            }
        }

        // Game Recs 
        for (let i = 0; i < 6; i++) {
            console.log(gameRecsEl[0]);
            $(gameRecsEl[0]).append('<p class="text-center">' + data.results[signGenreIndex].games[i].name + '</p>');
        }
    })
}

// Make an API call to Aztro and get the current day's horoscope
function setHoroscope() {
    var aztroApiFetch = aztroApiURL + sign + '&day=today';
    fetch(aztroApiFetch, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        inputMoodEl[0].textContent = mood;
        horoscopeMoodEl[0].textContent = json.mood;
        horoscopeDescEl[0].textContent = json.description;
    });    
}

// Stores mood, and sign for future reference in local storage
$('#save-btn').on('click', storeGames);
function storeGames() {
    localStorage.setItem('mood', mood);
    localStorage.setItem('sign', sign);
}