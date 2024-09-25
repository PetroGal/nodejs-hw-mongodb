import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import UserCollection from '../db/models/ModelUser.js';
import SessionCollection from '../db/models/ModelSession.js';
import { randomBytes } from 'crypto';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/constantsUsers.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifeTime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifeTime);

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const register = async (payload) => {
  const { email, password } = payload;

  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError('409', 'Email already exists.');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const data = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });

  delete data._doc.password;

  return data._doc;
};

export const login = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Email or password are invalid');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password are invalid');
  }

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifeTime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifeTime);

  const userSession = SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return userSession;
};

export const findSessionByAccessToken = (accessToken) =>
  SessionCollection.findOne({ accessToken });

export const refreshSession = async ({ refreshToken, sessionId }) => {
  const oldSession = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!oldSession) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > oldSession.refreshTokenValidUntil) {
    throw createHttpError(401, 'Session token expired');
  }

  await SessionCollection.deleteOne({ _id: sessionId });

  const sessionData = createSession();

  const userSession = await SessionCollection.create({
    userId: oldSession._id,
    ...sessionData,
  });

  return userSession;
};

export const logout = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const requestResetToken = async (email) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
};
export const findUser = (filter) => UserCollection.findOne(filter);
