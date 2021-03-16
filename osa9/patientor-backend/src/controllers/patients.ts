import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import { PublicPatient } from '../types';
import { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient: PublicPatient | undefined = patientService.getPatientWithId(id);
  if (!patient) {
    res.status(400).send('No patient with given id');
    return;
  }
  res.json(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);
    const patient = patientService.getPatientWithId(id);
    if (!patient) {
      res.status(400).send('No patient with given id');
      return;
    }
    const updatedPatient = patientService.addEntryToPatient(patient, newEntry);
    res.json(updatedPatient);
  } catch (e) {
    res.status(400).send(e.message);
    return;
  }
});

export default router;