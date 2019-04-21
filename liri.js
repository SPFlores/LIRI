require('dotenv').config()
// const keys = require('./keys.js')
// const spotify = new Spotify(keys.spotify)
// const axios = require('axios')
// const inquirer = require('inquirer')
const fs = require('fs')
const [, , action, ...userInput] = process.argv

// console.log(action)
// console.log(userInput.length)

const crankTheBass = _ => {
  console.log('concert')
  console.log(`
  Venue:
  Location:
  Date:
  `)
}

const playThatFunkyMusic = _ => {
  console.log('spotify')
  console.log(`
  Artist:
  Song:
  Link:
  Album:
  `)
}

const lightsCameraAction = _ => {
  console.log('movie')
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
  console.log('read')
  fs.readFile('random.txt', 'utf8', (e, data) => {
    if (e) {
      console.log(e)
    } else {
      console.log(data)
      // let readAction = data[0]
    }
  })
}

const doSomething = _ => {
  switch (action) {
    case 'concert-this':
      crankTheBass()
      break
    case 'spotify-this-song':
      playThatFunkyMusic()
      break
    case 'movie-this':
      lightsCameraAction()
      break
    case 'do-what-it-says':
      justDoIt()
      break
    default:
      break
  }
}

doSomething()
