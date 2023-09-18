import express from 'express';
const router = express.Router();

import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, //15 mins
  max: 10,
  message: 'Too many requests, please try again later.',
});

import {
  register,
  login,
  updateUser,
  changePassword,
} from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';
import testUser from '../middleware/testUser.js';

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/updateUser').patch(authenticateUser, testUser, updateUser);
router
  .route('/changePassword')
  .patch(authenticateUser, testUser, changePassword);

export default router;
