import 'dotenv/config';
import express from 'express';

import userRouter from './routes/user.route.js'
import publicRouter from './routes/public.route.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use('/', publicRouter )
app.use('/api/v1/users', userRouter)

const PORT = process.env.PORT || 3000;

console.log('ENV:', {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD ? '***' : 'Not set',
});

app.listen(PORT, () => console.log('Servidor corriendo en puerto ' + PORT));