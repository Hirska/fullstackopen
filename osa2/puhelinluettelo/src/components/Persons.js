import React from 'react'
import Button from './Button'

const Persons = ({ filteredPerson, handleClick }) => (
  <div>
    {filteredPerson
      .map(person =>
        <div key={person.name}>
          {person.name} {person.number} <Button handleClick={() => handleClick(person)} text="delete"/>
        </div>
      )}
  </div>

)

export default Persons;