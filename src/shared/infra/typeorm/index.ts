import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Banco de dados conectado com sucesso!');
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
  });
