import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import contactsRouter from './src/routers/routersContacts.js';
import { env } from './src/utils/env.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { notFoundHandler } from './src/middlewares/notFoundHandler.js';
import authRouter from './src/routers/routersAuth.js';
import { UPLOAD_DIR } from './src/constants/index.js';
import { swaggerMiddleware } from './src/middlewares/swaggerDocs.js'; // Updated import

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
  app.use(cookieParser());

  // Include Swagger documentation route before authentication-required routes
  app.use('/api-docs', swaggerMiddleware); // Updated to use swaggerMiddleware

  // Auth and contacts routes
  app.use('/auth', authRouter);
  app.use(contactsRouter);

  // Handle not found and error
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  // Serve static uploads
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

// import express from 'express';
// import cors from 'cors';
// import pino from 'pino-http';
// import cookieParser from 'cookie-parser';
// import contactsRouter from './src/routers/routersContacts.js';
// import { env } from './src/utils/env.js';
// import { errorHandler } from './src/middlewares/errorHandler.js';
// import { notFoundHandler } from './src/middlewares/notFoundHandler.js';
// import authRouter from './src/routers/routersAuth.js';
// import { UPLOAD_DIR } from './src/constants/index.js';
// import { swaggerDocs } from './src/middlewares/swaggerDocs.js';

// const port = Number(env('PORT', 3000));

// export const setupServer = () => {
//   const app = express();

//   const logger = pino({
//     transport: {
//       target: 'pino-pretty',
//     },
//   });

//   app.use(logger);
//   app.use(cors());
//   app.use(express.json());
//   app.use(cookieParser());

//   app.use('/auth', authRouter);
//   app.use(contactsRouter);
//   app.use('/api-docs', swaggerDocs());

//   app.use('*', notFoundHandler);

//   app.use(errorHandler);

//   app.use('/uploads', express.static(UPLOAD_DIR));

//   app.listen(port, () => console.log(`Server is running on port ${port}`));
// };
