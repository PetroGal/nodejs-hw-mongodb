import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './src/utils/env.js';
import * as contactServices from './src/services/contacts.js';

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

  // routes
  app.get('/contacts', async (req, res) => {
    const data = await contactServices.getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = res.params;
    const data = await contactServices.getContactById(contactId);
    res.json({
      status: 200,
      message: 'Successfully found contact with id {contactId}!',
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
  });

  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
