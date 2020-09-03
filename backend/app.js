const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Post = require('./models/posts')
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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATH, PUT, DELETE, OPTIONS"
  )
  next()
})

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save().then(result => {
    res.status(201).json(
      {
        message: 'Post added successfully',
        postId: result._id
      }
    )
  })

})

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({ _id: req.params.id }, post)
    .then(result => {
      res.status(200).json({ message: "Update successful." })
    })
})

app.get('/api/posts', (req, res, next) => {

  Post
    .find()
    .then(documents => {
      res.status(200).json({
        message: 'Post fetched succesfuly!',
        posts: documents
      })
    })

})

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post)
    }
    else {
      res.status(404).json({ message: 'Post not found.' })
    }
  })
})

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: "Post deleted." })
    })
})

module.exports = app
