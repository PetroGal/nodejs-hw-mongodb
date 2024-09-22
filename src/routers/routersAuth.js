import { Router } from 'express';
import * as controllersAuth from '../controllers/controllersAuth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  userSignUpSchema,
  userSignInSchema,
} from '../validation/validationUsers.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateBody(userSignUpSchema),
  ctrlWrapper(controllersAuth.signUpController),
);

authRouter.post(
  '/signin',
  validateBody(userSignInSchema),
  ctrlWrapper(controllersAuth.signInController),
);

authRouter.post('/refresh', ctrlWrapper(controllersAuth.refreshController));

authRouter.post('/signout', ctrlWrapper(controllersAuth.signoutController));

export default authRouter;
