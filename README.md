# liri-node-app

# LIRI Bot

### Overview

In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

1. LIRI will display your latest tweets. As we do not want to display your personal account, or its keys, please make an alias account and add a few tweets to it!

2. Make a new GitHub repository called liri-node-app and clone it to your computer.

3. create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:
```js
# Spotify API keys
SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
# Twitter API keys
TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

* This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.

use a files `random.txt`to show some predefined values like * spotify-this-song,"I Want it That Way"

uses dotenv package to build keys
and use contructor of spotify and twitter
  var spotify = new Spotify(keys.spotify);
  var client = new Twitter(keys.twitter);
  ```
liri.js can take in one of the following commands:

    * `my-tweets`

    * `spotify-this-song`

    * `movie-this`

    * `do-what-it-says`
What Each Command Should Do

1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

 2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then your program will default to "hino do vasco (oficial)" .
   
   * the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   
   * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:
   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
  
   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:
     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'the matrix'
     
     * If you haven't watched "the matrix," then you should:
   
   *use the request package to retrieve data from the OMDB API.

4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run 5 lines with `spotify-this-song`, my-tweets and movies as follows the text in `random.txt`.
     
     * Feel free to change the text in that document to test out the feature for other commands.

* In addition to logging the data to terminal/bash window, output the data to a .txt file called `log.txt`.

* append each command you run to the `log.txt` file. Delete this files to test from scratch 

enjoy
