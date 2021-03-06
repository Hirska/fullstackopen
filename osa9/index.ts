import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  if(!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({weight, height, bmi});
  } else {
    res.status(400).json({error: 'malformatted parameters'});
  }
});

app.post('/exercise', (req, res) => {
  const { daily_exercises, target } = req.body;
  if ( !daily_exercises || !target) {
    res.status(400).json({error: 'parameters missing'});
  }
  const exerciseArray : number[] = daily_exercises.map((day: number) => Number(day));
  if(!isNaN(Number(target)) && exerciseArray.every((day: number) => !isNaN(day))) {
    const exerciseLog = calculateExercises(exerciseArray, target);
    res.json(exerciseLog);
  } else {
    res.status(400).json({error: 'malformatted parameters'});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});