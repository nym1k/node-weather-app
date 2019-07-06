const express = require('express')
const app = express()

// Define dir for static files
app.use(express.static('public'))

// Set view engine to EJS
app.set('view engine', 'ejs')

// Handle get request to /
app.get('/', function (req, res) {
  // Send index.ejs
  res.render('index')
})

// Start server listening port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
