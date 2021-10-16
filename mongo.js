const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} 

const password = process.argv[2]

const url =
`mongodb+srv://latrell_admin:${password}@cluster0.8d7xk.mongodb.net/fsophonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const entrySchema = new mongoose.Schema({
    name: String,
    number: String
  })
  
const Entry = mongoose.model('Entry', entrySchema)
  
const entry = new Entry({
    name: process.argv[3],
    number: process.argv[4]
})

if(process.argv.length === 5) {
    entry.save().then(result => {
    console.log(`added ${entry.name} number ${entry.number} to phonebook`)
        mongoose.connection.close()
    })
}  

if (process.argv.length === 3) {
    Entry.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(entry => {
            console.log(`${entry.name} ${entry.number}`)
        })
        mongoose.connection.close()
    })
}