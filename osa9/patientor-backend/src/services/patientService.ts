import patients from '../../data/patients';
import { Patient, NewPatient, PublicPatient, NewEntry, Entry } from '../types';
import {v1 as uuid} from 'uuid';

const getPublicPatients = () : PublicPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getPatientWithId = (id: string) : Patient | undefined => {
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

const addEntryToPatient = (patient: Patient, newEntry: NewEntry) : Patient => {
  const entry : Entry = {
    ...newEntry,
    id : uuid()
  };
  patient.entries.push(entry);
  return patient;
};

export default {
  getPublicPatients,
  addPatient,
  getPatientWithId,
  addEntryToPatient
};