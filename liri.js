require('dotenv').config()
// const keys = require('./keys.js')
// const spotify = new Spotify(keys.spotify)
const axios = require('axios')
const moment = require('moment')
// const inquirer = require('inquirer')
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
          console.log(`
          THe next scheduled show for ${lookup} is:

          Venue: ${venue.name}
          Location: ${venue.city}, ${venue.region}
          Date: ${moment(concertDate, 'YYYY-MM-DD').format('MM/DD/YYYY')}
          `)
        }
      })
      .catch(e => console.log(e))
  }
}

const playThatFunkyMusic = lookup => {
  console.log(lookup)
  axios.get('')
    .then(r => {

    })
    .catch(e => console.log(e))
  console.log(`
  Artist:
  Song:
  Link:
  Album:
  `)
}

const lightsCameraAction = lookup => {
  console.log(lookup)
  console.log(`
  Title:
  Year:
  IMDB Rating:
  Rotten Tomatoes Rating:
  Country:
  Language:
  Plot:
  Actors:
  `)
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
