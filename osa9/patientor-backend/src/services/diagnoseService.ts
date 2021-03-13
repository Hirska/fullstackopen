import diagnosis from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = () : Diagnosis[] => {
  return diagnosis;
};

export default {
  getDiagnoses
};