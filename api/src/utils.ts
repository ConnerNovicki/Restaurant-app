import * as express from 'express'
import { User, Photon } from '@prisma/photon';
import { AuthPayload } from './types';
import * as Jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';

export const getUser = (req: express.Request, photon: Photon): Promise<User> => {
  const token = req.headers.authorization;
  if (!token) throw new Error('Not authorized');

  const parseToken = token.replace('Bearer ', '');
  const payload = Jwt.verify(parseToken, process.env.API_SECRET) as AuthPayload;

  if (!payload || !payload.userId) throw new Error('Not authorized')

  const user = photon.users.findOne({ where: { id: payload.userId } });

  if (!user) throw new Error('Not authorized');

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
    // console.log('error: ', e)
    if (e && e.message && e.message.includes('Not authorized')) {
      res.sendStatus(401);
    } else {
      res.sendStatus(400)
    }
  }
}

export const generateSalt = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
}

export const isValidPassword = async (password: string, salt: string): Promise<boolean> => {
  return bcrypt.compare(password, salt);
}