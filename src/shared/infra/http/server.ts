// Em: src/shared/infra/http/server.ts

// 1. Pré-requisitos (devem ser os primeiros imports)
import 'reflect-metadata';
import 'dotenv/config';

// 2. Dependências
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ZodError } from 'zod';

// 3. Configurações e Rotas da Aplicação
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';

import { initializeDatabases } from '../typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter); 
app.use('/files', express.static(uploadConfig.tmpFolder));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof ZodError) {
    return response.status(400).json({
      status: 'error',
      message: 'Validation failed.',
      issues: err.flatten().fieldErrors,
    });
  }

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

Promise.all([
  initializeDatabases(),
])
  .then(() => {
    app.listen(3333, () => {
      console.log('🚀 Server started on port 3333!');
    });
  })
  .catch(err => {
    console.error('❌ Falha na inicialização dos serviços:', err);
  });