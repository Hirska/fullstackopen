import patients from '../../data/patients';
import { Patient, NewPatient } from '../types';
import {v1 as uuid} from 'uuid';

const getNonSensitivePatients = () : Omit<Patient, 'ssn'>[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (newPatient : NewPatient) : Patient => {
  const patient : Patient = {
    ...newPatient,
    id : uuid()
  };
  patients.push(patient);
  return patient;
};

export default {
  getNonSensitivePatients,
  addPatient
};