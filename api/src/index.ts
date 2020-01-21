import { Photon } from '@prisma/photon'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as cors from 'cors'
import postLogin from './operations/postLogin';
import { handleOperation } from './utils';
import postUser from './operations/postUser';
import getUserRestaurants from './operations/getUserRestaurants'
import postUserRestaurant from './operations/postUserRestaurant';
import getUser from './operations/getUser';
import getRestaurants from './operations/getRestaurants';
import getRestaurantById from './operations/getRestaurantById';
import postRestaurantReview from './operations/postRestaurantReview';
import getAllUsers from './operations/getAllUsers';
import deleteUser from './operations/deleteUser';
import deleteReview from './operations/deleteReview';
import deleteRestaurant from './operations/deleteRestaurant';
import deleteComment from './operations/deleteComment';

const photon = new Photon()
const app = express()

app.use(bodyParser.json())

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

app.post('/login', async (req: express.Request, res: express.Response) => {
  handleOperation(
    () => postLogin({ body: req.body, photon, req }),
    res,
  )
});

// create user
app.post('/user', async (req: express.Request, res: express.Response) => {
  handleOperation(
    () => postUser({ body: req.body, photon, req }),
    res,
  )
});

app.get('/user/restaurants', async (req: express.Request, res: express.Response) => {
  handleOperation(
    () => getUserRestaurants({ body: req.body, photon, req }),
    res,
  )
});

app.get('/restaurants', async (req: express.Request, res: express.Response) => {
  handleOperation(
    () => getRestaurants({ body: req.body, photon, req }),
    res,
  )
});

app.post('/user/restaurant', async (req: express.Request, res: express.Response) => {
  handleOperation(
    () => postUserRestaurant({ req, body: req.body, photon }),
    res,
  )
});

app.get('/user', async (req: express.Request, res: express.Response) => {
  handleOperation(
    () => getUser({ req, body: req.body, photon }),
    res,
  )
})

app.get('/restaurants/:id', async (req: express.Request, res: express.Response) => {
  handleOperation(
    () => getRestaurantById({ req, body: req.body, photon }),
    res,
  )
});

app.post('/restaurants/:id/review', async (req: express.Request, res: express.Response) => {
  handleOperation(
    () => postRestaurantReview({ req, body: req.body, photon }),
    res,
  )
})

app.get('/admin/users', async (req: express.Request, res: express.Response) => {
  handleOperation(
    () => getAllUsers({ req, body: req.body, photon }),
    res,
  )
});

app.delete('/user/:id', async (req: express.Request, res: express.Response) => {
  handleOperation(
    () => deleteUser({ req, body: req.body, photon }),
    res,
  )
})
app.delete('/review/:id', async (req: express.Request, res: express.Response) => {
  handleOperation(
    () => deleteReview({ req, body: req.body, photon }),
    res,
  )
})
app.delete('/restaurant/:id', async (req: express.Request, res: express.Response) => {
  handleOperation(
    () => deleteRestaurant({ req, body: req.body, photon }),
    res,
  )
})
app.delete('/comment/:id', async (req: express.Request, res: express.Response) => {
  handleOperation(
    () => deleteComment({ req, body: req.body, photon }),
    res,
  )
})

const server = app.listen(4000, () =>
  console.log(
    '🚀 Server ready at: http://localhost:4000',
  ),
);
