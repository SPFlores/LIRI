require('dotenv').config()
const keys = require('./keys.js')
const Spotify = require('node-spotify-api')
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
          console.log(`          ***************
          The next scheduled show for ${lookup} is:

          Venue: ${venue.name}
          Location: ${venue.city}, ${venue.region}
          Date: ${moment(concertDate, 'YYYY-MM-DD').format('MM/DD/YYYY')}
          ***************`)
        }
      })
      .catch(e => console.log(`Please provide a valid band name to search for.`))
  }
}

const playThatFunkyMusic = lookup => {
  let searchString = lookup.split('by')
  let searchSong = searchString.join('')
  // let searchArtist = searchString[1]

  if (!searchSong) {
    searchSong = 'The Sign Ace of Base'
  }

  spotify
    .search({ type: 'track', query: searchSong, limit: 1 })
    .then(r => {
      let info = r.tracks.items[0]

      console.log(`      ***************
      Artist: ${info.artists[0].name}
      Song: ${info.name}
      Link: ${info.preview_url}
      Album: ${info.album.name}
      ***************`)
    })
    .catch(e => console.log('Please try searching again, that search did not yield any results.'))
}

const lightsCameraAction = lookup => {
  if (lookup === '') {
    lookup = 'Mr Nobody'
  }

  axios.get(`http://www.omdbapi.com/?t=${lookup}&apikey=8bf4b530`)
    .then(({ data }) => {
      console.log(`      ***************
      Title: ${data.Title}
      Year: ${data.Year}
      IMDB Rating: ${data.Ratings[0].Value}
      Rotten Tomatoes Rating: ${data.Ratings[1].Value}
      Country: ${data.Country}
      Language: ${data.Language}
      Plot: ${data.Plot}
      Actors: ${data.Actors}
      ***************`)
    })
    .catch(e => console.log(`Please provide a valid movie to search for.`))
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
