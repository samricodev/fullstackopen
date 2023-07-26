const personRouter = require('express').Router()
const Person = require('../models/person')

//Get
personRouter.get('/', (req, res) => {
  Person.find({}).then(person => {
    res.json(person)
  })
})

personRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

//Post
personRouter.post('/', (req, res, next) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

//Put
personRouter.put('/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id

  const personUpdated = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(id, personUpdated, { new: true })
    .then(updatePerson => {
      res.json(updatePerson)
    })
    .catch(error => next(error))
})

//Delete
personRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then( () => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = personRouter