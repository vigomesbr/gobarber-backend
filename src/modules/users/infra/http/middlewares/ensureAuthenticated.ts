import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing.', 401);
    }

    const [scheme, token] = authHeader.split(' ');

    if (!scheme || !token) {
        throw new AppError('Token error: Malformed token.', 401);
    }
    
    if (scheme !== 'Bearer') { 
        throw new AppError('Token error: Malformed token format.', 401);
    }
    
    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };
        return next();

    } catch {
        throw new AppError('Invalid JWT token.', 401);
    }
}