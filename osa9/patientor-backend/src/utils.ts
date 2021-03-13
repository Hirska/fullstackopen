import { NewPatient, Gender } from './types';
type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation} : Fields) : NewPatient => {
  const newPatient : NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };
  return newPatient;
};

const parseName = (name : unknown) : string => {
  if(!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDateOfBirth = (date : unknown) : string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const parseSsn = (ssn : unknown) : string => {
  if(!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing date of birth: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender : unknown) : Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing date of birth: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation : unknown) : string => {
  if(!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing date of birth: ' + occupation);
  }
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param : any) : param is Gender => {
  return Object.values(Gender).includes(param);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};


export default toNewPatient;