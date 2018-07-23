// global 
var moment = require('moment');
var request = require("request");
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

var command = process.argv[2];  // my-tweets, spotify-this-song, movie-this, do-what-it-says
var search = process.argv[3];

function showmovie(search) {
    var movie = search; //process.argv.splice(3).join("+");
    if (!search) {
        var movie = "The Matrix";
        console.log("If you haven't watched 'The Matrix', then you should: <https://www.imdb.com/title/tt0133093/?ref_=fn_tt_tt_1>");
    }
    var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(url,
        function (error, response, body) {
            //        console.log(JSON.parse(body));

            if (!error && response.statusCode === 200) {
                var moviestring =
                    "__________________movie_________________" + "\r\n" +
                    "title: " + JSON.parse(body).Title + "\r\n" +
                    "Year: " + JSON.parse(body).Year + "\r\n" +
                    "IMDB rating: " + JSON.parse(body).imdbRating + "\r\n";
                if (JSON.parse(body).Ratings[1]) {
                    moviestring += "Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value + "\r\n";
                }
                else {
                    moviestring += "Rotten Tomatoes rating: not rated.\r\n";

                }
                moviestring += "Country: " + JSON.parse(body).Country + "\r\n" +
                    "Language : " + JSON.parse(body).Language + "\r\n" +
                    "Plot: " + JSON.parse(body).Plot + "\r\n" +
                    "Actors: " + JSON.parse(body).Actors + "\r\n" +
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
    var twitterSearchResults1 = "Recent 20 tweets____________________" + "\r\n";
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
function callspotify(search) {
    var songname = search;
    if (!search) { // If no music informed,shows Vasco that is my team song in brazil
        var songname = "Hino do vasco (oficial)";
        console.log("If you haven't listen 'Vasco', then you should");
    }

    clientspotify.search({ type: "track", query: songname }, function (error, data) {

        if (!error) {
            var song = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (song[i]) {
                    var artists = "unavailable";
                    if (song[i].artists[0]) {// test if there is a preview to update otherwise mantain unavailable
                        for (x = 0; x < song[i].artists.length; x++) {
                            artists += song[i].artists[x].name
                            if (x + 1 < song[i].artists.length) {
                                artists += ", "; // Adds a comma if there is more artists
                            }
                        }
                    }
                    var preview = "unavailable";
                    if (song[i].preview_url) { // test if there is a preview to update otherwise mantain unavailable
                        preview = song[i].preview_url;
                    }
                    var musics =
                        "______________Music: " + (parseInt(i) + 1) + "______________" + "\r\n" +
                        "- Artist(s): " + artists + "\r\n" +
                        "- Song's Name: " + song[i].name + "\r\n" +
                        "- Preview link: " + preview + "\r\n" +
                        "- Album: " + song[i].album.name + "\r\n" +
                        "______________Music: " + (parseInt(i) + 1) + "______________" + "\r\n";
                    console.log(musics);
                    //                    console.log(JSON.stringify(songInfo[i].artists[0], null, 2));
                }
            }
        } else {
            console.log("Error :" + error);
        }
    });
}
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error) {
            //console.log(JSON.stringify(data));
            var resultsarray = data.split("\r\n");
            //        results = results.replace("\","");
            console.log(JSON.stringify(resultsarray));

            for (var z = 0; z < resultsarray.length; z++) {
               // console.log(resultsarray[z]);
                
                //res = res.replace("/", "");
                console.log(JSON.stringify(resultsarray[z]));
                var res = resultsarray[z].split(",");
                console.log("res1:" + res[0]);
                console.log("res2:" + res[1]);
                callliri(res[0], res[1]);
            }
        } else {
            console.log("random.txt file error : " + error);
        }
    });
};
function callliri(command, search) {
    if (command === "my-tweets") {
        callmytwitter(); // show my tweets
    }
    else if (command === "spotify-this-song") {
        callspotify(search); // show my music
    }
    else if (command === "movie-this") {
        showmovie(search); // if no arg, show matrix. mr nobody is good too
    }
    else if (command === "do-what-it-says") {
        doWhatItSays();
    }
    else {
        console.log("Ohhh no...I can't understand...To use liri you should command:\r\n");
        console.log("$ node liri.js <command> <search>\r\n");
        console.log("example 1: $ node liri.js spotify-this-song samba\r\n");
        console.log("example 2: $ node liri.js movie-this 'the matrix'\r\n");
        console.log("example 3: $ node liri.js do-what-it-says\r\n");
        console.log("example 4: $ node liri.js my-tweets\r\n");
        console.log("no search available for my-tweets and do-what-it-says\r\n");

    }
}
callliri(command, search);