const express = require('express')

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATH, DELETE, OPTIONS"
  )
  next()
})

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'fjfajs',
      title: 'First post.',
      content: 'From the server'
    },
    {
      id: 'sldkjlasd',
      title: 'Second post.',
      content: 'Second from the server'
    },
  ]

  res.status(200).json({
    message: 'Post fetched succesfuly!',
    posts: posts
  })
})

module.exports = app
