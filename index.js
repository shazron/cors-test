const express = require('express')
const path = require('path')
const app = express()

const SITE_PORT = 8000

app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.render('index')
})

const log = (req) => {
  console.log(`${req.method}: ${req.url}`)
  
  // Content-Type: application/x-www-form-urlencoded
  if(req.body) {
    console.log('POST data')
    Object.keys(req.body).forEach(key => {
      const value = req.body[key]
      console.log(`${key}: ${value}`)
    })
  }
  return req
}

const cors = (res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')

  return res
}

app.options('/', function (req, res) {
  log(req)
  cors(res).end()
})

app.post('/', function (req, res) {
  log(req)
  cors(res).send('ok')
})

// /////////////////////////////////////////
// map static files and assets to the public folder

app.use('/static', express.static('public'))

// /////////////////////////////////////////
// this is the default handler

app.use(function (_req, res) {
  res.status('404').render('404')
})

// /////////////////////////////////////////
// error handler

app.use(function (err, _req, res, _next) {
  console.log(err.stack)
  res.status('500').render('500')
})

// /////////////////////////////////////////

app.listen(SITE_PORT)

module.exports = app
