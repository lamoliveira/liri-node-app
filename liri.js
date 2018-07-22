// global 
var moment = require('moment');
require("dotenv").config();
var fs = require("fs"); //to append text
var keys = require('./keys.js'); // to load keys
var twitter = require('twitter'); // to call twitter api
var spotify = require('node-spotify-api'); // to call spotify api
var clientspotify = new spotify(keys.spotify);
var clienttwitter = new twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
});
const omdb = require('omdb-js'); //to call omdb api
var clientomdb = new omdb("trilogy");

function showmovie() {
    var movie = process.argv.splice(3).join("+");
    //if (!userSearch) {
        movie = "Matrix";
    //}
    console.log("Movie: " + movie);
    clientomdb.configure({
        plot: 'short',
        page: 1,
        type: 'movie'
      });
    clientomdb.getSpecificMovie(movie,
        function (error, data, body) {
            if (!error && data.statusCode === 200) {
                var moviestring =
                    "__________________movie_________________" + "\r\n" +
                    "movie: " + JSON.parse(body).Title + "\r\n" +
                    "Year: " + JSON.parse(body).Year + "\r\n" +
                    "Tomatoes rating: " + JSON.parse(body).Ratings[1].Value + "\r\n" +
                    "IMDB rating: " + JSON.parse(body).imdbRating + "\r\n" +
                    "language(s) : " + JSON.parse(body).Language + "\r\n" +
                    "Produced in: " + JSON.parse(body).Country + "\r\n" +
                    "Cast: " + JSON.parse(body).Actors + "\r\n" +
                    "Plot: " + JSON.parse(body).Plot + "\r\n" +
                    "_____________movie end__________________" + "\r\n";
                console.log(moviestring);
                //log(moviestring); 
            } else {
                console.log("OMDB error: " + error);
                return;
            };
        });
}
function showtwitter(data) {
    var twitterSearchResults1 = "Recent " + myparams.mycount + " tweets____________________" + "\r\n";
    console.log(twitterSearchResults1);
    //var twitterSearchResults2 = [];

    for (var i = 0; i < data.length; i++) {
        //console.log(data[i].created_at);
        var datecreated = data[i].created_at;
        //datecreated = datecreated.replace("+0000 ","");
        //datecreated = datecreated.substring(4,30);
        //console.log(datecreated);
        //var year = moment(datecreated,"L");
        //console.log(year);
        //Sun Jul 22 16:44:30 +0000 2018
        //var datecreated = toString(data[i].created_at);
        //twitterSearchResults2[i] = data[i].user.screen_name + " says: " + data[i].text + "\r\n" +
        //  "Date: " + datecreated + "\r\n";
        //"Date: " + moment(year).format('L')+ "\r\n"+ "\r\n";
        console.log("- " + datecreated + " - " + data[i].user.screen_name + " says:\r\n" + "--- " + data[i].text + "\r\n");
    };
    //    var twitterSearchResults3 =
    "_____________end Twitter_________________" + "\r\n";
    //    var twitterSearchResults = twitterSearchResults1 + twitterSearchResults2 + twitterSearchResults3;
    console.log("_____________end Twitter_________________" + "\r\n");
    //log(twitterSearchResults); // calling log function
};

function callsearchtwitter() {
    var subject = "Donald Trump";
    var params = {
        q: subject,
        count: 10,
        result_type: 'recent',
        lang: 'en'
    };

    clienttwitter.get('search/tweets', params, function (error, data, response) {
        if (error) {
            console.log("Twitter Error serch: " + error);
        } else {
            // console.log(JSON.stringify(data,null,2));
            showtwitter(data.statuses);
        }
        // console.log("The search result: " + JSON.stringify(data));  //this prints out the entire response object
    });
}
function callmytwitter() {
    var twitterUsername = process.argv.splice(3).join("");
    if (!twitterUsername) {
        var twitterUsername = "@luiz25170475";
    };
    var myparams = {
        screen_name: twitterUsername,
        mycount: 10,
        myresult_type: 'recent',
    };

    clienttwitter.get('statuses/user_timeline/', myparams, function (err, data, response) {
        //console.log(JSON.stringify(data,null,2));
        if (err) {
            console.log("Twitter Error: " + JSON.stringify(err, null, 2));
        } else {
            showtwitter(data);
        };
    });
}
function callspotify() {
    var songName = "Hino do vasco (oficial)";

    params = songName;
    clientspotify.search({ type: "track", query: params }, function (error, data) {
        if (!error) {
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var musics =
                        "______________Music: " + parseInt(i) + 1 + "______________" + "\r\n" +
                        "- Music: " + songInfo[i].name + "\r\n" +
                        "- Artist: " + songInfo[i].artists[0].name + "\r\n" +
                        "- Album: " + songInfo[i].album.name + "\r\n" +
                        "- Url: " + songInfo[i].preview_url + "\r\n" +
                        "______________Music: " + parseInt(i) + 1 + "______________" + "\r\n";
                    console.log(musics);
                }
            }
        } else {
            console.log("Error :" + error);
        }
    });
}
callspotify(); // show my music
callmytwitter(); // show my tweets
callsearchtwitter(); //bonus for searching other tweets just for testing  
showmovie(); // if no arg, show matrix. mr nobody is good too