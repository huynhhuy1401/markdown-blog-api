const express = require('express')
const router = express.Router()
const Article = require('../models/article')

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find()
    res.send(articles)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', getArticle, async (req, res) => {
  res.json(res.article)
})

router.post('/', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  })

  try {
    const newArticle = await article.save()
    res.status(201).json(newArticle)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.patch('/:id', getArticle, async (req, res) => {
  if (req.body.title != null) {
    res.article.title = req.body.title
  }
  if (req.body.description != null) {
    res.article.description = req.body.description
  }
  if (req.body.markdown != null) {
    res.article.markdown = req.body.markdown
  }
  try {
    const updatedArticle = await res.article.save()
    res.json(updatedArticle)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', getArticle, async (req, res) => {
  try {
    await res.article.remove()
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

async function getArticle(req, res, next) {
  let article
  try {
    article = await Article.findById(req.params.id)
    if (article == null)
    {
      return res.status(404).json({ message: 'Cannot find article'})
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
  res.article = article
  next()
}

module.exports = router