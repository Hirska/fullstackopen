import express from 'express';
import diagnoseController from './controllers/diagnoses';
import patientController from './controllers/patients';

import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseController);
app.use('/api/patients', patientController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});