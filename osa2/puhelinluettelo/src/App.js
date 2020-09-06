import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons =>
        setPersons(allPersons)
      )
  }, []);
  const deletePerson = (deletedPerson) => persons.filter(person => person.id !== deletedPerson.id)
  const findPerson = (name) => (persons.find(person => person.name === name));

  const addNewPerson = (event) => {
    event.preventDefault();

    if (findPerson(newName) === undefined) {
      handleAdd()
    } else if (newNumber !== '') {
      handleUpdate();
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('');
    setNewNumber('');
  }

  const filteredPerson = newFilter.length === 0 ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleNotificationChange = (msg, isError) => {
    setNotification(msg) 
    setIsError(isError);
    setTimeout(() => {
      setNotification(null)
    }, 2000)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleDelete = (deletedPerson) => {
    let result = window.confirm(`Do you want to delete ${deletedPerson.name}`)
    if (result) {
      personService.deletePerson(deletedPerson.id)
        .then(response => {
          setPersons(deletePerson(deletedPerson))
          handleNotificationChange(`Deleted ${deletedPerson.name}`, false);
        })
        .catch(error => {
          handleNotificationChange(`Information of ${deletedPerson.name} has already been removed from server`, true)
          setPersons(deletePerson(deletedPerson));
        })
    }
    
  }
  const handleUpdate = () => {
    let result = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )
    if (result) {
      const person = findPerson(newName);
      const changedPerson = { ...person, number: newNumber };

      personService
        .updatePerson(changedPerson.id, changedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : response))
          handleNotificationChange(`Updated number for ${response.name}`, false);
        })
        .catch(error => {
          handleNotificationChange(`Information of  ${changedPerson.name} has already been removed from server`, true)
          setPersons(deletePerson(changedPerson));
        })
    }
  }

  const handleAdd = () => {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService
      .addPerson(newPerson)
      .then(
        personData => {
          setPersons(persons.concat(personData))
          handleNotificationChange( `Added ${personData.name}`, false);
        })
      .catch(error => {
        console.log(error.message)
        handleNotificationChange(error.response.data.error, true)
      })
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} success={isError} />
      <Filter value={newFilter} handleChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} nameValue={newName} numberValue={newNumber} handleSubmit={addNewPerson} />
      <h2>Numbers</h2>
      <Persons filteredPerson={filteredPerson} handleClick={handleDelete} />
    </div>
  )

}

export default App
