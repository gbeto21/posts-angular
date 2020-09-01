const express = require('express')

const app = express()

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
    post: posts
  })
})

module.exports = app
