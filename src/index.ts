/* eslint-disable no-console */
import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import userRoutes from './routes/user.routes';
import classeRoutes from './routes/classe.routes';

import checkToken from './middlewares/checkToken';

dotenv.config();

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/classes', checkToken, classeRoutes);

// Cedenciais

const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASS || '';

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.pkk8r.mongodb.net/TinDin?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(PORT);
    console.log('Servidor iniciado na porta:', PORT);
    console.log('Banco conectado');
  })
  .catch((err) => {
    console.log(err);
  });
