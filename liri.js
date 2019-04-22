require('dotenv').config()
const keys = require('./keys.js')
var Spotify = require('node-spotify-api')
const spotify = new Spotify(keys.spotify)
const axios = require('axios')
const moment = require('moment')
const fs = require('fs')
const [, , action, ...userInput] = process.argv
const lookup = userInput.join(' ')

const crankTheBass = lookup => {
  if (lookup === '') {
    console.log(`Please provide a valid band name to search for.`)
  } else {
    axios.get(`https://rest.bandsintown.com/artists/${lookup}/events?app_id=codingbootcamp&date=upcoming`)
      .then(({ data }) => {
        if (data.length === 0) {
          console.log(`I'm sorry, this band does not seem to have any tours schdeuled. Would you like to try another band?`)
        } else {
          let venue = data[0].venue
          let concertDate = data[0].datetime.slice(0, 10)
          console.log(`      ***************
          THe next scheduled show for ${lookup} is:

          Venue: ${venue.name}
          Location: ${venue.city}, ${venue.region}
          Date: ${moment(concertDate, 'YYYY-MM-DD').format('MM/DD/YYYY')}
          ***************`)
        }
      })
      .catch(e => console.log(e))
  }
}

const playThatFunkyMusic = lookup => {
  let searchSong = lookup.split(' ').join('+')
  console.log(spotify.credentials.id)
  axios.get(`https://api.spotify.com/v1/search?query="${searchSong}"&limit=1&type=track,artist&Authorization=${spotify.credentials.id}`)
    .then(r => {
      // console.log(r.response)
      // console.log(`      ***************
      // Artist:
      // Song:
      // Link:
      // Album:
      // ***************`)
    })
  // .catch(e => console.log(e))
}

const lightsCameraAction = lookup => {
  axios.get(`http://www.omdbapi.com/?t=${lookup}&apikey=8bf4b530`)
    .then(r => {
      let movieInfo = r.data
      console.log(r.data)
      console.log(`      ***************
      Title: ${movieInfo.Title}
      Year: ${movieInfo.Year}
      IMDB Rating: ${movieInfo.Ratings[0].Value}
      Rotten Tomatoes Rating: ${movieInfo.Ratings[1].Value}
      Country: ${movieInfo.Country}
      Language: ${movieInfo.Language}
      Plot: ${movieInfo.Plot}
      Actors: ${movieInfo.Actors}
      ***************`)
    })
    .catch(e => console.log(e))
}

const justDoIt = _ => {
  fs.readFile('random.txt', 'utf8', (e, data) => {
    if (e) {
      console.log(e)
    } else {
      let readInfo = data.split(',')
      let readAction = readInfo[0]
      let readLookup = readInfo[1]
      doSomething(readAction, readLookup)
    }
  })
}

const doSomething = (action, lookup) => {
  switch (action) {
    case 'concert-this':
      crankTheBass(lookup)
      break
    case 'spotify-this-song':
      playThatFunkyMusic(lookup)
      break
    case 'movie-this':
      lightsCameraAction(lookup)
      break
    case 'do-what-it-says':
      justDoIt()
      break
    default:
      break
  }
}

doSomething(action, lookup)
