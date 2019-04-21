require('dotenv').config()
// const keys = require('./keys.js')
// const spotify = new Spotify(keys.spotify)
// const axios = require('axios')
// const inquirer = require('inquirer')
const fs = require('fs')
const [, , action, ...userInput] = process.argv
const lookup = userInput.join(' ')

const crankTheBass = lookup => {
  console.log(lookup)
  console.log(`
  Venue:
  Location:
  Date:
  `)
}

const playThatFunkyMusic = lookup => {
  console.log(lookup)
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
