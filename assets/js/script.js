var aztroAPIKey = '0c3a2c35c5mshca3267e96406afcp16bdbcjsn57d168946cdf';
var startPageEl = $('#start-page');
var moodPageEl = $('#mood-choices');
var signPageEl = $('#sign');
var resultPageEl = $('#result-page');
var gameGenreEl = $('game-genre');
var gameRecsEl = $('#game-recs');
var horoscopeEl = $('#horoscope');
var inputMoodEl = $('#user-input-mood');
var horoscopeMoodEl = $('#horoscope-mood');

// make var for RAWG API
var rawgAPIKey = '55468ae1e1444c17bf3c3a29d8b79732';

// Handle changing page through carosel/cycling
// display/showing
$(document).ready(function() {
    $('#start-btn').click(function(){
        startPageEl.toggleClass('hidden');
        moodPageEl.toggleClass('hidden');
    });
    $('.icon').click(function(){
        moodPageEl.toggleClass('hidden');
        signPageEl.toggleClass('hidden');
    });
    $('.btn').click(function(){
        // moodPageEl.toggleClass('hidden');
        signPageEl.toggleClass('hidden');
        resultPageEl.toggleClass('hidden');
    });
});

    var rawgApiUrl = 'https://api.rawg.io/api/platforms?key=' + rawgAPIKey;

    fetch (rawgApiUrl)
    .then (function (reponse) {
        return reponse.json()
    })
    .then (function (data) {
        console.log(data);
        document.querySelector('#game-recs').textContent = data.name;
        document.querySelector('#game-genre').textContent = data.genres;
    })

// const rawgApiUrl = 'https://api.rawg.io/api/platforms?key=' + rawgAPIKey;
// fetch (rawgApiUrl, {
//     method: 'POST'
// })
// .then(response => response.json())
// .then(json => {
//     console.log(json);
//     document.querySelector('#game-recs').textContent = json.name;
//         document.querySelector('#game-genre').textContent = json.genres;
// })


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