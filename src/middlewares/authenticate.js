import createHttpError from 'http-errors';

import * as servicesAuth from '../services/servicesAuth.js';

const authenticate = async (req, res, next) => {
  const authorization = req.get('Authorization');
  console.log('Authorization:', authorization);

  // const authorization = req.headers.authorization; // Check for the header

  // console.log('Authorization header:', authorization);

  if (!authorization) {
    return next(createHttpError(401, 'Authorization header not found'));
  }

  const [bearer, token] = authorization.split(' ');

  // console.log('Bearer token:', token);

  if (bearer !== 'Bearer') {
    return next(
      createHttpError(401, 'Authorization header must have Bearer type'),
    );
  }

  const session = await servicesAuth.findSessionByAccessToken(token);

  // console.log('Session:', session);

  if (!session) {
    return next(createHttpError(401, 'Session is not found'));
  }

  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await servicesAuth.findUser({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  req.user = user;

  next();
};

export default authenticate;
