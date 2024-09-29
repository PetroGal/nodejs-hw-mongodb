import { Router } from 'express';
import * as controllersAuth from '../controllers/controllersAuth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  userregisterSchema,
  userloginSchema,
} from '../validation/validationUsers.js';
import { requestResetEmailSchema } from '../validation/validationAuth.js';
import { requestResetEmailController } from '../controllers/controllersAuth.js';
import { resetPasswordSchema } from '../validation/validationAuth.js';
import { resetPasswordController } from '../controllers/controllersAuth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userregisterSchema),
  ctrlWrapper(controllersAuth.registerController),
);

authRouter.post(
  '/login',
  validateBody(userloginSchema),
  ctrlWrapper(controllersAuth.loginController),
);

authRouter.post('/refresh', ctrlWrapper(controllersAuth.refreshController));

authRouter.post('/logout', ctrlWrapper(controllersAuth.logoutController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;
