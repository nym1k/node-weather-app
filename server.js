const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

const port = process.env.PORT || 3000

const apiKey = '835e4af513e7eb9a72c386c2ca8978a6'

// Define dir for static files
app.use(express.static('public'))

// Set up body parser middleware to access key:value pairs in http req/res
app.use(bodyParser.urlencoded({ extended: true }))

// Set view engine to EJS
app.set('view engine', 'ejs')

// Handle GET request to /
app.get('/', function (req, res) {
  // Send index.ejs
  res.render('index', {weather: null, error: null})
})

// Handle POST request to /
app.post('/', function (req, res) {
  // Get city name from req body
  let city = req.body.city
  // Create URL from city name and API key
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  // Make a call to the openweathermap API
  request(url, function (err, response, body) {
    // If it errors
    if (err) {
      // Display the index page with an error message
      res.render('index', {weather: null, error: 'Error, please try again'})
    } else {
      // Parse the JSON in the req body
      let weather = JSON.parse(body)
      // If the request body is empty
      if (weather.main == undefined) {
        // Display the index page with error message
        res.render('index', {weather: null, error: 'Error, please try again'})
      } else {
        // Create weather string from data in the request
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`
        // Display index page with results from API call
        res.render('index', {weather: weatherText, error: null})
      }
    }
  })
})

// Start server listening port 3000
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
