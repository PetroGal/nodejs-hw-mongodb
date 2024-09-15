import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './src/routers/routersContacts.js'; // Імпортуємо роутер
import { env } from './src/utils/env.js';
// import * as contactServices from './src/services/contacts.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { notFoundHandler } from './src/middlewares/notFoundHandler.js';

const port = Number(env('PORT', 3000));

export const setupServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(express.json());

  // app.get('/', (req, res) => {
  //   res.json({
  //     message: 'Welcome to the Contacts-App!',
  //   });
  // });

  app.use(contactsRouter);
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
