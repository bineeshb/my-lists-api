import 'dotenv/config';
import express from 'express';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

import errorHandler from './middlewares/errorHandler.js';
import Books from './models/books.js';
import Videos from './models/videos.js';
import createRouter from './routes/createRouter.js';

const PORT = process.env.PORT || 3000;
const API_ROOT = '/api/v1';

const serviceAccountAuth = new JWT({
  email: process.env.SA_EMAIL_ID,
  key: process.env.SA_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(process.env.SHEET_ID, serviceAccountAuth);

// (async () => {
  await doc.loadInfo();

  const app = express();

  app.use(express.json());

  const books = new Books(doc);
  const videos = new Videos(doc);

  app.use(`${API_ROOT}/books`, createRouter(books));
  app.use(`${API_ROOT}/videos`, createRouter(videos));

  app.use((_, res, next) => {
    res.status(404).json({ status: 404, message: 'Resource Not found' });
  });

  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Running on port ${PORT}...`));

  process.on('uncaughtException', error => {
    console.log('UncaughtException', error);
  });
// })();
