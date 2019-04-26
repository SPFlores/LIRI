# LIRI

## What it is

Want to know when your favorite band is next playing? Want to look up their song on Spotify? Curious about information on your favorite movie? Ask LIRI!

## What you can use

For all commands, yourQuery can be almost any string of text, including spaces. See below documentation for examples.

--------------------------------------------------

To ask LIRI to find a band's next show, use the command

```
concert-this yourQuery
```

and LIRI will give you the venue name, location, and date of the next show for the selected band. LIRI accepts spaces so feel free to search for that long band name! 

![successful concert](/assets/images/concert-this_success.png)

If your band doesn't have shows upcoming or if you mispell the band name, LIRI will prompt you to try again.

![unsuccessful concert](/assets/images/concert-this_failure.png)


--------------------------------------------------

LIRI will find you the Spotify information about a particular song if you use

``
spotify-this-song yourQuery
``

The information it returns to you are the song's artist, name, the Spotify preview link, and the name of the album the song is on. You can search two ways with this input: using only the song name, or by specifying "Song Name by Artist" (e.g. "I Write Sins Not Tragedies by Panic at the Disco" can be searched with or without the "by").

![successful spotify no artist](/assets/images/spotify-this-song_success_no-artist.png)

![successful spotify](/assets/images/spotify-this-song_failure.png)

If you can't think of a particular song, just try

``
spotify-this-song
``

with no query for a default response.

![unsuccessful spotify](/assets/images/spotify-this-song_default.png)

---------------------------------------------------

If you're interested in movies, LIRI can give you that information as well! Just use

``
movie-this yourQuery
``

and LIRI will return you the title, year the movie came out, the IMDB and Rotten Tomatoes ratings, the country of the movie, language, a plot summary, and some of the actors in the film. If you can't think of a film to look up LIRI can give you a suggestion in the form of a default movie. Check it out, you might just love it!

![successful movie](/assets/images/movie-this_success.png)

![default movie](/assets/images/movie-this_default.png)

Mess up the movie title? No worries, LIRI will help prompt you to do it again!

![unsuccessful movie](/assets/images/movie-this_default.png)

---------------------------------------------------

Lastly, LIRI can

``
do-what-it-says
``

and will perform a lookup for a string of text located in another file. The value is set to

``
spotify-this I Want It That Way
``

![successful do what it says](/assets/images/do-what-it-says_success.png)

in case you need a 90's throwback :)
