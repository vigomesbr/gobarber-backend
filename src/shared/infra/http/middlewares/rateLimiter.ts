import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';
import redisClient from '@shared/infra/redis'; // 👈 Importe o cliente compartilhado

const limiter = new RateLimiterRedis({
  storeClient: redisClient, // Use o cliente compartilhado
  keyPrefix: 'ratelimit',
  points: 10,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (request.ip) {
      await limiter.consume(request.ip);
    }
    return next();
  } catch (err) {
    throw new AppError('Too many requests.', 429);
  }
}