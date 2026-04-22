import express from 'express';
const router = express.Router();
import { registerUser, loginUser, logoutUser, userProfile } from '../controllers/UserController.js';
import BorrowerRouter from './BorrowerRouter.js';
import { IsLoggedIn } from '../middlewares/IsLoggedIn.js';
import SplitsRouter from './SplitsRouter.js'

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', IsLoggedIn, userProfile);
router.use('/borrowers', IsLoggedIn, BorrowerRouter);
router.use('/splits', IsLoggedIn, SplitsRouter);

export default router;