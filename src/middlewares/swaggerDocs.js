import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/index.js';

// Function to serve the Swagger docs
export const swaggerDocs = (req, res, next) => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    swaggerUI.setup(swaggerDoc)(req, res, next);
  } catch (error) {
    next(createHttpError(500, "Can't load swagger docs"));
  }
};

// Create a middleware chain for Swagger
export const swaggerMiddleware = [swaggerUI.serve, swaggerDocs];

// import createHttpError from 'http-errors';
// import swaggerUI from 'swagger-ui-express';
// import fs from 'node:fs';

// import { SWAGGER_PATH } from '../constants/index.js';

// export const swaggerDocs = () => {
//   try {
//     const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
//     return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
//   } catch {
//     return (req, res, next) =>
//       next(createHttpError(500, "Can't load swagger docs"));
//   }
// };
