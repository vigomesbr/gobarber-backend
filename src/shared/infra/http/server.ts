import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../typeorm/data-source';
import routes from './routes'; 
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
import '@shared/container';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

// Inicializa conexão com o banco e inicia o servidor
AppDataSource.initialize()
  .then(() => {
    console.log('📦 Banco de dados conectado!');

    app.listen(3333, () => {
      console.log('🚀 Server started on port 3333!');
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
  });
