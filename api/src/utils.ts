import * as express from 'express'
import { User, Photon } from '@prisma/photon';
import { AuthPayload } from './types';
import * as Jwt from 'jsonwebtoken'

export const getUser = (req: express.Request, photon: Photon): Promise<User> => {
  const token = req.headers.authorization;
  if (!token) throw new Error('');

  const parseToken = token.replace('Bearer ', '');
  const payload = Jwt.verify(parseToken, process.env.API_SECRET) as AuthPayload;

  if (!payload || !payload.userId) throw new Error('')

  const user = photon.users.findOne({ where: { id: payload.userId } });

  if (!user) throw new Error('');

  return user;
}

export const createToken = ({ userId }) => {
  return Jwt.sign({ userId }, process.env.API_SECRET)
}

export const handleOperation = async (
  operation: () => any,
  res: express.Response,
) => {
  try {
    const response = await operation();
    res.json(response);
  } catch (e) {
    res.sendStatus(400)
  }
}