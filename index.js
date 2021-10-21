const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Entry = require('./models/entry')
require('dotenv').config()

app = express()
app.use(express.json())
app.use(express.static('build'))

morgan.token('data', (req, res) => { 
    const data = {"name": req.body.name, "number": req.body.number};
    const jsonData = JSON.stringify(data)
    const method = JSON.stringify(req.route.methods.post)
    if(method) {
        return jsonData
    } else {
        return null
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
}

app.get('/info', (request, response) => {
    const dataLength = persons.length
    const date = new Date()
    response.send(`
        <p>Phonebook has info for ${dataLength} people</p>
        <p>${date}</p>
        `)
})

app.get('/api/persons', (request, response, next) => {
    Entry.find({})
    .then(entries => {
        response.json(entries)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Entry.findById(request.params.id)
    .then(entry => {
        response.json(entry)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Entry.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if(body.name === undefined || body.number === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Entry({
        name: body.name,
        number: body.number
    })

    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        number: body.number
    }

    Entry.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
  
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})