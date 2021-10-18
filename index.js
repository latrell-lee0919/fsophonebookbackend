const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Entry = require('./models/entry')
require('dotenv').config()

app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

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

app.get('/api/persons', (request, response) => {
    Entry.find({})
    .then(entries => {
        response.json(entries)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Entry.findById(request.params.id)
    .then(entry => {
        response.json(entry)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(body.name === undefined || body.number === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    // const matchedName = persons.find(person => person.name === body.name)

    // if(!body.name || !body.number) {
    //     return response.status(400).json({
    //         error: 'content missing'
    //     })
    // } else if (matchedName) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    const person = new Entry({
        name: body.name,
        number: body.number
    })

    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})