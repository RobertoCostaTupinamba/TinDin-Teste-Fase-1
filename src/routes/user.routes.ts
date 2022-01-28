import express from 'express';

import { login } from '../controllers/autenticarUser';

const router = express.Router();

router.post('/', login);

export default router;
