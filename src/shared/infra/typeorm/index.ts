import { DataSource } from 'typeorm';
import path from 'path';

// --- Configuração da Conexão PostgreSQL ---
// (Seu DataSource original, agora com um nome)
export const PostgresDataSource = new DataSource({
  name: 'default', // Nome da conexão. 'default' é um bom padrão para a principal.
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'gostack_gobarber',
  entities: [
    path.join(__dirname, '..', '..', '..', 'modules', '**', 'infra', 'typeorm', 'entities', '*.ts'),
  ],
  migrations: [
    path.join(__dirname, 'migrations', '*.ts'),
  ],
});

// --- Configuração da Conexão MongoDB ---
// (O novo DataSource para o MongoDB)
export const MongoDataSource = new DataSource({
  name: 'mongo', // NOME ÚNICO E OBRIGATÓRIO!
  type: 'mongodb',
  url: 'mongodb://localhost:27017/gobarber', // URL de conexão do MongoDB
  entities: [
    // Entidades do MongoDB geralmente ficam em um caminho diferente
    path.join(__dirname, '..', '..', '..', 'modules', '**', 'infra', 'typeorm', 'schemas', '*.ts'),
  ],
});

// Função para inicializar ambos os bancos de dados
export const initializeDatabases = async (): Promise<void> => {
  await Promise.all([
    PostgresDataSource.initialize(),
    MongoDataSource.initialize()
  ]);
  console.log('📦 Bancos de dados conectados!');
};