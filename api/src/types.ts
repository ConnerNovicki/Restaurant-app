import * as express from 'express'
import { PrismaClient } from '@prisma/client';

export interface AuthPayload {
  userId: string;
}

export interface RestArgs<T> {
  body: T;
  req: express.Request
  prisma: PrismaClient;
}