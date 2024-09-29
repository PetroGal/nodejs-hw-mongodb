import * as servicesAuth from '../services/servicesAuth.js';
import { requestResetToken } from '../services/servicesAuth.js';
import { resetPassword } from '../services/servicesAuth.js';

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

export const registerController = async (req, res) => {
  const newUser = await servicesAuth.register(req.body);

  res.status(201).json({
    status: 201,
    message: 'User was registered successfully',
    data: newUser,
  });
};

export const loginController = async (req, res) => {
  const session = await servicesAuth.login(req.body);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'login successfully!',
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

export const logoutController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await servicesAuth.logout(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
  console.log(req.body);

  await requestResetToken(req.body.email); // Use the request email

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
