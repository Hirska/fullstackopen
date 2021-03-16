import { NewPatient, Gender, NewEntry, EntryType, Discharge, HealthCheckRating, NewBaseEntry } from './types';
type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation} : Fields) : NewPatient => {
  const newPatient : NewPatient = {
    name: parseToString(name, 'name'),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseToString(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseToString(occupation, 'occupation'),
    entries: []
  };
  return newPatient;
};

const parseToString = (param : unknown, paramName: string) : string => {
  if(!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}:`  + param);
  }
  return param;
};

const parseDateOfBirth = (date : unknown) : string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const parseGender = (gender : unknown) : Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing date of birth: ' + gender);
  }
  return gender;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (entry: any) : NewEntry => {
  const newBaseEntry = toNewBaseEntry(entry) as NewEntry;

  switch(newBaseEntry.type) {
    case EntryType.OccupationalHealthcare:
      return {
        ...newBaseEntry,
        employerName: parseToString(entry.employerName, 'employerName')
      };
    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        discharge: parseDischarge(entry.discharge)
      };
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheck(entry.healthCheck)
      };
    default:
      return assertNever(newBaseEntry);    
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewBaseEntry = (entry: any) : NewBaseEntry => {
  const newBaseEntry : NewBaseEntry = {
    type: parseEntryType(entry.type),
    description: parseToString(entry.description, 'description'),
    date: parseDate(entry.date),
    specialist: parseToString(entry.specialist, 'description')
  };
  if(entry.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
  }
  return newBaseEntry;
};

const parseDiagnosisCodes = (diagnosis : unknown[]) => {
  if(!diagnosis || !isArrayOfString(diagnosis)) {
    throw new Error('Incorrect or missing entrytype: ' + diagnosis);
  }
  return diagnosis;
};

const isArrayOfString = (array: unknown[]): array is string[] => {
  for (const item of array) {
    if(!isString(item)){
      return false;
    }
  }
  return true;
};  

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param : any) : param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseEntryType = (entryType: unknown) : EntryType => {
  if(!entryType || !isEntryType(entryType)) {
    throw new Error('Incorrect or missing entrytype: ' + entryType);
  }
  return entryType;
};

const parseDate = (date : unknown) : string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge : any) : Discharge => {
  if(!discharge ||!discharge.date || !discharge.criteria || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' +  JSON.stringify(discharge));
  }
  return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge: any) : discharge is Discharge => {
  return isDate(discharge.date) && isString(discharge.criteria);
};

const parseHealthCheck = (healthCheck : unknown) : HealthCheckRating => {
  if(!healthCheck || !isHealthCheckRating(healthCheck) ) {
    throw new Error('Incorrect or missing health check rating: ' + healthCheck);
  }
  return healthCheck;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any) : param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};


/**
 * Helper function for exhaustive type checking
 */
 export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
export default toNewPatient;