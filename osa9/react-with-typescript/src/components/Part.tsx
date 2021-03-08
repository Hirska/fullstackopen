import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../utils';
import './Part.css';

const Part = ({part}: {part : CoursePart}) => {
  switch (part.type) {
    case 'normal': {
      return (
        <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
        </>
      )
    }
    case 'groupProject': {
      return (
        <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>project exercises {part.groupProjectCount}</p>
        </>
      )
    }
    case 'submission': {
      return (
        <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </>
      )
    }
    case 'special': {
      return (
        <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </>
      )
    }
    default:
      return assertNever(part);
  }
}

export default Part