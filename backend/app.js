const path = require("path")
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
const config = require('./config')
const app = express()

mongoose
  .connect(
    `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@${config.CLUSTER}.xuzor.mongodb.net/${config.DB}?retryWrites=true&w=majority`
  ).then(() => {
    console.log('Connected to the data base.');
    //app.listen(config.PORT || 5000)
  })
  .catch(err => {
    console.log(err);
  })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/images", express.static(path.join("backend/images")))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATH, PUT, DELETE, OPTIONS"
  )
  next()
})

app.use("/api/posts", postRoutes)
app.use("/api/user", userRoutes)

module.exports = app
