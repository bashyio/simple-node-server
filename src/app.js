const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Static directory to serve
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Bashy'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
    name: 'Bashy'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Bashy',
    helpText: 'This is some helpful text.'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address

  if (!address) {
    return res.send({
      error: 'Please provide a location.'
    })
  }

  geocode(address, (error, {
    latitude,
    longitude,
    location
  } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
      res.send({
        forecast: forecastData,
        location,
        address: address
      })
    })
  })

})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Please provide a search term.'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help article not found.',
    name: 'Bashy',
  })
})


app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page Not Found',
    name: 'Bashy',
  })
})

app.listen(port, () => {
  console.log('Server is up on port 3000.')
})