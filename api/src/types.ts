import * as express from 'express'
import { Photon } from '@prisma/photon';

export interface AuthPayload {
  userId: string;
}

export interface RestArgs<T> {
  body: T;
  req: express.Request
  photon: Photon;
}