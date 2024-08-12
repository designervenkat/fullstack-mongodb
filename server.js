const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(bodyParser.json())
app.use(cors())

// Replace with your MongoDB connection string
const mongoURI =
   'Replace your string'
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const postSchema = new mongoose.Schema({
   userId: Number,
   title: String,
   body: String,
})

const Post = mongoose.model('Post', postSchema, 'posts')

app.get('/posts', async (req, res) => {
   const posts = await Post.find()
   res.json(posts)
})

app.post('/posts', async (req, res) => {
   const newPost = new Post(req.body)
   await newPost.save()
   res.status(201).json(newPost)
})

app.put('/posts/:id', async (req, res) => {
   const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
   })
   res.json(updatedPost)
})

app.delete('/posts/:id', async (req, res) => {
   await Post.findByIdAndDelete(req.params.id)
   res.status(204).send()
})

const PORT = 3000
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
})
