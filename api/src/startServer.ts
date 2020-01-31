import { PrismaClient, Role } from '@prisma/client'
import bodyParser from 'body-parser'
import express from 'express'
import postLogin from './operations/postLogin';
import { handleOperation, isLoggedIn } from './utils';
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
import postReviewComment from './operations/postReviewComment';
import putUser from './operations/putUser';
import putReview from './operations/putReview';
import putRestaurant from './operations/putRestaurant';
import putComment from './operations/putComment';
import { Server } from 'net';
import cors from 'cors';

import * as yup from 'yup';
import {
  PostLoginArgs,
  PostUserArgs,
  PostUserRestaurantArgs,
  PostRestaurantReviewArgs,
  PutUserArgs,
  PutReviewArgs,
  PutRestaurantArgs,
  PutCommentArgs,
  PostReviewCommentArgs
} from '../Shared/restTypes';
import getUserPendingReviews from './operations/getUserPendingReviews';

export default async function (prisma: PrismaClient): Promise<Server> {
  const app = express()

  app.use(bodyParser.json())

  app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://conner-novicki-toptal-app.herokuapp.com']
  }))

  // NON-AUTHENTICATED ROUTES //

  app.post('/login', async (req: express.Request, res: express.Response) => {
    const body = await yup.object<PostLoginArgs>({
      username: yup.string(),
      password: yup.string(),
    })
      .validate(req.body)
      .catch((e) => {
        res.sendStatus(400)
        throw new Error(`Incorrect args: ${e.message}`)
      })

    handleOperation(
      () => postLogin({ body, prisma, req }),
      res,
    )
  });

  app.post('/user', async (req: express.Request, res: express.Response) => {
    const body = await yup.object<PostUserArgs>({
      username: yup.string().required(),
      password: yup.string().required(),
      role: yup.mixed().required(),
    })
      .validate(req.body)
      .catch((e) => {
        res.sendStatus(400)
        throw new Error(`Incorrect args: ${e.message}`)
      })

    handleOperation(
      () => postUser({ body, prisma, req }),
      res,
    )
  });

  // AUTHENTICATED ROUTES //

  app.use((req, res, next) => {
    if (!isLoggedIn(req)) {
      res.sendStatus(401)
      throw new Error('Not authorized');
    }

    next();
  })

  app.get('/user/restaurants', async (req: express.Request, res: express.Response) => {
    handleOperation(
      () => getUserRestaurants({ body: req.body, prisma, req }),
      res,
    )
  });

  app.get('/user/pendingReviews', async (req: express.Request, res: express.Response) => {
    handleOperation(
      () => getUserPendingReviews({ body: req.body, prisma, req }),
      res,
    )
  })

  app.get('/restaurants', async (req: express.Request, res: express.Response) => {
    handleOperation(
      () => getRestaurants({ body: req.body, prisma, req }),
      res,
    )
  });

  app.post('/user/restaurant', async (req: express.Request, res: express.Response) => {
    const body = await yup.object<PostUserRestaurantArgs>({
      name: yup.string(),
      description: yup.string().required(),
    })
      .validate(req.body)
      .catch((e) => {
        res.sendStatus(400)
        throw new Error(`Incorrect args: ${e.message}`)
      })

    handleOperation(
      () => postUserRestaurant({ req, body, prisma }),
      res,
    )
  });

  app.get('/user', async (req: express.Request, res: express.Response) => {
    handleOperation(
      () => getUser({ req, body: req.body, prisma }),
      res,
    )
  })

  app.get('/restaurants/:id', async (req: express.Request, res: express.Response) => {
    handleOperation(
      () => getRestaurantById({ req, body: req.body, prisma }),
      res,
    )
  });

  app.post('/restaurants/:id/review', async (req: express.Request, res: express.Response) => {
    const body = await yup.object<PostRestaurantReviewArgs>({
      rating: yup.number().required(),
      comment: yup.string().required(),
      dateOfVisit: yup.mixed().required(),
    })
      .validate(req.body)
      .catch((e) => {
        res.sendStatus(400)
        throw new Error(`Incorrect args: ${e.message}`)
      })

    handleOperation(
      () => postRestaurantReview({ req, body, prisma }),
      res,
    )
  })

  app.get('/admin/users', async (req: express.Request, res: express.Response) => {
    handleOperation(
      () => getAllUsers({ req, body: req.body, prisma }),
      res,
    )
  });

  app.put('/user/:id', async (req: express.Request, res: express.Response) => {
    const body = await yup.object<PutUserArgs>({
      username: yup.string(),
      role: yup.mixed(),
    })
      .validate(req.body)
      .catch((e) => {
        res.sendStatus(400)
        throw new Error(`Incorrect args: ${e.message}`)
      })

    handleOperation(
      () => putUser({ req, body, prisma }),
      res,
    )
  })

  app.put('/review/:id', async (req: express.Request, res: express.Response) => {
    const body = await yup.object<PutReviewArgs>({
      rating: yup.number(),
      dateOfVisit: yup.mixed(),
    })
      .validate(req.body)
      .catch((e) => {
        res.sendStatus(400)
        throw new Error(`Incorrect args: ${e.message}`)
      })

    handleOperation(
      () => putReview({ req, body, prisma }),
      res,
    )
  })

  app.put('/restaurant/:id', async (req: express.Request, res: express.Response) => {
    const body = await yup.object<PutRestaurantArgs>({
      name: yup.string(),
      description: yup.string(),
    })
      .validate(req.body)
      .catch((e) => {
        res.sendStatus(400)
        throw new Error(`Incorrect args: ${e.message}`)
      })

    handleOperation(
      () => putRestaurant({ req, body, prisma }),
      res,
    )
  })

  app.put('/comment/:id', async (req: express.Request, res: express.Response) => {
    const body = await yup.object<PutCommentArgs>({
      text: yup.string(),
    })
      .validate(req.body)
      .catch((e) => {
        res.sendStatus(400)
        throw new Error(`Incorrect args: ${e.message}`)
      })

    handleOperation(
      () => putComment({ req, body, prisma }),
      res,
    )
  })

  app.delete('/user/:id', async (req: express.Request, res: express.Response) => {
    handleOperation(
      () => deleteUser({ req, body: req.body, prisma }),
      res,
    )
  })

  app.delete('/review/:id', async (req: express.Request, res: express.Response) => {
    handleOperation(
      () => deleteReview({ req, body: req.body, prisma }),
      res,
    )
  })

  app.delete('/restaurant/:id', async (req: express.Request, res: express.Response) => {
    handleOperation(
      () => deleteRestaurant({ req, body: req.body, prisma }),
      res,
    )
  })

  app.delete('/comment/:id', async (req: express.Request, res: express.Response) => {
    handleOperation(
      () => deleteComment({ req, body: req.body, prisma }),
      res,
    )
  })

  app.post('/review/:id/comment', async (req: express.Request, res: express.Response) => {
    const body = await yup.object<PostReviewCommentArgs>({
      comment: yup.string().required(),
    })
      .validate(req.body)
      .catch((e) => {
        res.sendStatus(400)
        throw new Error(`Incorrect args: ${e.message}`)
      })

    handleOperation(
      () => postReviewComment({ req, body, prisma }),
      res,
    )
  })

  const port = process.env.PORT || 4000;

  const server = app.listen(port, () =>
    console.log(
      `🚀 Server ready at: http://localhost:${port}`,
    ),
  );

  return server;
}