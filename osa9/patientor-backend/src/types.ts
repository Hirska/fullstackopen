export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}
interface BaseEntry {
  id: string;
  type: EntryType
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
interface SickLeave {
  startDate: string;
  endDate: string;
}
export interface Discharge {
  date: string;
  criteria: string;
}
interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave
}
interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
  
export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
  entries: Entry []
}

export type NewPatient = Omit<Patient, 'id'>;

export type NewEntry = DistributiveOmit<Entry, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;
  
export type NewBaseEntry = Omit<BaseEntry, 'id'>;


export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum EntryType {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealtcare',
  HealthCheck = 'HealthCheck'
}

