import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import { AppDataSource } from '../typeorm/data-source';

// Importa e executa o registro de todas as dependências síncronas
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.tmpFolder)); // Usando a propriedade correta
app.use(routes);

// Middleware de tratamento de erros global
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
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

// Inicializa a conexão com o banco e inicia o servidor
AppDataSource.initialize()
  .then(() => {
    console.log('📦 Banco de dados conectado!');

    app.listen(3333, () => {
      console.log('🚀 Server started on port 3333!');
    });
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
  });