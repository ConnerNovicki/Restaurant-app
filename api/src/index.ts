import { AuthPayload } from './types';
import { Photon, User } from '@prisma/photon'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import * as cors from 'cors'

const photon = new Photon()
const app = express()

const getUser = (req: express.Request): Promise<User> => {
  const token = req.headers.authorization;
  if (!token) throw new Error('');

  const parseToken = token.replace('Bearer ', '');
  const payload = jwt.verify(parseToken, process.env.API_SECRET) as AuthPayload;

  if (!payload || !payload.userId) throw new Error('')

  const user = photon.users.findOne({ where: { id: payload.userId } });

  if (!user) throw new Error('');

  return user;
}

const createToken = ({ userId }) => {
  return jwt.sign({ userId }, process.env.API_SECRET)
}

app.use(bodyParser.json())

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

// login user
app.post('/login', async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  const user = await photon.users.findOne({
    where: { username },
    select: {
      id: true,
      username: true,
      role: true,
    }
  });

  if (!user) res.sendStatus(400);

  const token = createToken({ userId: user.id });

  return res.json({
    user,
    token,
  });
});

// create user
app.post('/user', async (req: express.Request, res: express.Response) => {
  const { role, username } = req.body;
  const user = await photon.users.create({
    data: {
      role,
      username,
    },
    select: {
      id: true,
      role: true,
      username: true,
    }
  });

  if (!user) res.sendStatus(400);

  const token = createToken({ userId: user.id });

  return res.json({
    user,
    token,
  });
});

app.get('/user/restaurants', async (req: express.Request, res: express.Response) => {
  const user = await getUser(req);
  if (user.role !== 'OWNER') {
    throw new Error('Only owners can query their restaurants.')
  }

  const restaurants = await photon.restaurants.findMany({
    where: {
      owner: { id: user.id },
    },
    select: {
      id: true,
      name: true,
      reviews: {
        select: {
          id: true,
          author: { select: { username: true, } },
          rating: true,
          comments: {
            select: {
              id: true,
              author: { select: { username: true } },
            }
          }
        }
      }
    }
  });

  return res.json(restaurants);
});

app.get('/restaurants', async (req: express.Request, res: express.Response) => {
  const restaurants = await photon.restaurants.findMany();
  return res.json(restaurants);
});

app.post('/user/restaurant', async (req: express.Request, res: express.Response) => {
  const user = await getUser(req);
  const { name } = req.body;
  const restaurant = await photon.restaurants.create({
    data: {
      owner: { connect: { id: user.id } },
      name,
    }
  });

  return res.json(restaurant);
});

app.get('/user', async (req: express.Request, res: express.Response) => {
  const user = await getUser(req);
  return res.json(user);
})

// app.get('/restaurants/:id', async (req: express.Request, res: express.Response) => {
//   const { id } = req.query;
//   const restaurants = await photon.restaurants.findOne({ where: { id } })
//   return res.json(restaurants);
// });

const server = app.listen(4000, () =>
  console.log(
    '🚀 Server ready at: http://localhost:4000',
  ),
);
