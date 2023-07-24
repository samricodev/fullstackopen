require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person')

const app = express()
const PORT = process.env.PORT || 3001

//Tokens morgan
morgan.token('body', (req, res) => req.method === 'POST' ? JSON.stringify(req.body) : '')

//Middlewares
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res),
    ].join(' ')
}))

//Home
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

//Get
app.get('/api/persons', (req, res) => {
    Person.find({}).then(person => {
        res.json(person)
        console.log(person)
    })
})

app.get('/info', (req, res) => {
    const date = new Date()
    const peopleLenght = 0

    console.log(peopleLenght)

    res.send(`<p>Phonebook has info for ${peopleLenght} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res, next) => {
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
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

//Put
app.put('/api/persons/:id', (req, res, next) => {
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
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

//ErrorHandlers
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT} 🚀`)
})