import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

type TDecodedToken = {
  sub: string;
}

export async function addUserInformationToRequest(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppError('Token missing', 401);
  }

  try {
    const decoded = decode(token as string) as TDecodedToken;

    request.user = {
      decoded: decoded.sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid token!', 401);
  }
}
