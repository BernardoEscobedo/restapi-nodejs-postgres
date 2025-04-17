import 'dotenv/config';
import express from 'express';

import userRouter from './routes/user.route.js'

const app = express();

app.use('/api/v1/users', userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Servidor corriendo en puerto ' + PORT));