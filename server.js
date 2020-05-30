require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', err => console.err(err))
db.once('open', () => console.log('Connected to database'))


const articlesRouter = require('./routes/articles')
app.use('/articles', articlesRouter)

app.listen(3000, () => console.log('Server started'))