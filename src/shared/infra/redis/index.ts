import Redis from 'ioredis'; // 👈 1. Importe de 'ioredis'

// 2. A criação da instância é um pouco diferente
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  // Se você tiver senha, adicione aqui:
  // password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', err => console.error('❌ Redis Client Error', err));

export default redisClient;