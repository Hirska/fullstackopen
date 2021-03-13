import patients from '../../data/patients';
import { Patient, NewPatient, PublicPatient } from '../types';
import {v1 as uuid} from 'uuid';

const getPublicPatients = () : PublicPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getPatientWithId = (id: string) : PublicPatient | undefined => {
  return patients.find(patient => patient.id === id);
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
  getPublicPatients,
  addPatient,
  getPatientWithId
};