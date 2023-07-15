import { useEffect, useState } from "react"
import noteService from './services/notes'
import Message from './components/Message'

function App() {
  //States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [typeMessage, setTypeMessage] = useState('')

  useEffect(() => {
    noteService
      .getAllPersons()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const handleChangePerson = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    const input = event.target.value.toLowerCase()

    if (input === '') {
      setPersons(persons)
      return
    }

    const filteredPersons = persons.filter(person => {
      return person.name.toLowerCase().includes(filter.toString())
    })

    setFilter(input)
    setPersons(filteredPersons)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName == '' || newNumber == '') {
      setMessage('Complete the fields')
      setTypeMessage('error')
      setTimeout(() => {
        setMessage(null)
        setTypeMessage(null)
      }, 5000)
      return
    }

    if (persons.find(person => person.name === newName && person.number !== newNumber)) {
      const confirmNewNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmNewNumber) {
        noteService
          .updatePerson(persons.find(person => person.name === newName).id, { name: newName, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setMessage(`Modified ${returnedPerson.name}`)
            setTypeMessage('success')
            setTimeout(() => {
              setMessage(null)
              setTypeMessage(null)
              }, 5000
            )
          })
      }
    } else if (persons.find(person => person.name === newName && person.number === newNumber)) {
        alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      noteService
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${returnedPerson.name}`)
          setTypeMessage('success')
          setTimeout(() => {
            setMessage(null)
            setTypeMessage(null)
            }, 5000
          )
        })
        .catch(() => alert("Failed adding"))
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    const result = window.confirm(`Delete ${person.name}?`)
    if (result) {
      noteService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(`Deleted ${person.name}`)
          setTypeMessage('error')
          setTimeout(() => {
            setMessage(null)
            setTypeMessage(null)
            }, 5000
          )
        })
        .catch(() => alert("Failed deleting"))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} type={typeMessage}/>
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
          persons.map(person => {
            return (
              <div key={person.id}>
                <p>Name: {person.name}<br />Number: {person.number} </p>
                <button onClick={() => deletePerson(person.id)}>Delete</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App
