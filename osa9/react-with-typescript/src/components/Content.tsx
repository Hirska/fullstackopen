import React from 'react';
import { CoursePart } from '../types';

const Content = ({ name, exerciseCount }: CoursePart) => {
  return  <p key={name}>{name} {exerciseCount}</p>
}

export default Content