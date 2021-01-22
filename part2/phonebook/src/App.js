import React, { useEffect, useState } from 'react'
import personService from './services/persons'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState({ message: null, notiType: 'success' })

  useEffect(() => {
    personService.getAll()
      .then(initialPersons =>
        setPersons(initialPersons)
      )
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => {
    (event.target.value) ? setShowAll(false) : setShowAll(true) // '' is falsy
    setSearchFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const alreadyExist = persons.find(p => p.name === newName.trim())
    //trim() to prevent using whitespaces to add an existing person
    if (alreadyExist) {
      if (alreadyExist.number !== newNumber) {
        const updateNumber = window
          .confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
        if (updateNumber) {
          personService
            .update(alreadyExist.id, { ...alreadyExist, number: newNumber })
            .then(returnedPerson => {
              setPersons(persons
                .map(person => person.id !== alreadyExist.id ? person : returnedPerson)
              )
              const newNotification = {
                message: `Updated ${returnedPerson.name}`,
                notiType: 'success'
              }
              setNotification(newNotification)
              setTimeout(() => setNotification({ ...notification, message: null }), 5000)
            })
            .catch(error => {
              const newNotification = {
                message: `Information of ${alreadyExist.name} has already been removed from server`,
                  notiType: 'error'
              }
              setNotification(newNotification)
              setTimeout(() => setNotification({...notification, message: null}), 5000)
              setPersons(persons.filter(p => p.name !== alreadyExist.name))
            })
        }
      }
      else alert(`${newName.trim()} is already added to the phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService.create(personObject)
        .then(returnedPerson => {
          const newNotification = {
            message: `Added ${returnedPerson.name}`,
            notiType: 'success'
          }
          setPersons(persons.concat(returnedPerson))
          setNotification(newNotification)
          setTimeout(() => setNotification({ ...notification, message: null }), 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <SearchFilter
        searchFilter={searchFilter}
        handleFilterChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchFilter={searchFilter}
        showAll={showAll}
        setPersons={setPersons}
      />
    </>
  )
}

export default App