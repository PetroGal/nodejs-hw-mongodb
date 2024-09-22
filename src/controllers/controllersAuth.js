import * as servicesAuth from '../services/servicesAuth.js';
import createHttpError from 'http-errors';

const setupSession = (res, session) => {
  console.log('Session:', session);
  console.log('Refresh Token Valid Until:', session.refreshTokenValidUntil);

  // Using session.refreshTokenValidUntil directly for expires
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

// const setupSession = (res, session) => {
//   console.log('Session:', session);
//   console.log('Refresh Token Valid Until:', session.refreshTokenValidUntil);

//   res.cookie('refreshToken', session.refreshToken, {
//     httpOnly: true,
//     expires: new Date(Date.now() + session.refreshTokenValidUntil),
//   });

//   res.cookie('sessionId', session._id, {
//     httpOnly: true,
//     expires: new Date(Date.now() + session.refreshTokenValidUntil),
//   });
// };

export const signUpController = async (req, res) => {
  const newUser = await servicesAuth.signup(req.body);

  res.status(201).json({
    status: 201,
    message: 'User was registered successfully',
    data: newUser,
  });
};

export const signInController = async (req, res) => {
  const session = await servicesAuth.signin(req.body);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Signin successfully!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  const session = await servicesAuth.refreshSession({
    refreshToken,
    sessionId,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refresh session',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const signoutController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await servicesAuth.signout(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
