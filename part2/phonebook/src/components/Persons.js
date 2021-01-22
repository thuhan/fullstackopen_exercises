import React from 'react'
import personService from '../services/persons'
import Person from './Person'

const Persons = ({ persons, searchFilter, showAll, setPersons }) => {
  const personsToShow = showAll
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase()
        .includes(searchFilter.toLowerCase())
    )

    const handleDelete = id => {
      const peresonToDelete = persons.find(p => p.id === id)
      if(window.confirm(`Delete ${peresonToDelete.name}?`)){
        personService.deletePerson(id)
        setPersons(persons.filter(p => p.id !== id))
      }
    }

  return (
    <div>
      {personsToShow
        .map(person =>
          <Person
            key={person.name}
            name={person.name}
            number={person.number}
            handleDelete={() => handleDelete(person.id)}
          />)
      }
    </div>
  )
}

export default Persons