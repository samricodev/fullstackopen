import { useState } from "react"
import axios from 'axios'


function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleChangePerson = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    if (event.target.value === '') {
      setPersons(persons)
      return
    }

    setFilter(event.target.value)
    console.log(event.target.value)

    const filteredPersons = persons.filter(person => {
      return person.name.toLowerCase().includes(filter.toLowerCase())
    })

    setPersons(filteredPersons)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => {
      person.name === newName || person.number === newNumber
    })) {
      alert(`${newName} is already added to phonebook and used ${newNumber}`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input onChange={handleChangeFilter} />
      </div>
      <h2>Add a new user</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleChangePerson} />
        </div>
        <div>
          number: <input onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {
          persons.map(person => <p key={person.name}>Name: {person.name}<br />Number: {person.number} </p>)
        }
      </div>
    </div>
  )
}

export default App
