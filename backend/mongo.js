const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else {
  const password = process.argv[2]
  const url = `mongodb+srv://sam:${password}@phonebook.oetawlb.mongodb.net/phoneBookApp?retryWrites=true&w=majority`
  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: Number
  })

  const Person = mongoose.model('Person', personSchema)

  if (process.argv.length == 3) {
    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
  } else if (process.argv.length == 5) {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4]
    })

    person.save().then(result => {
      console.log('person saved!')
      mongoose.connection.close()
    })
  }
}





