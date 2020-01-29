import startServer from "../src/startServer"
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Photon } from "@prisma/photon";
import { Server } from "net";
import { generateSalt } from "../src/utils";

chai.use(chaiHttp);

const mockPhoton = {
  users: {
    create: ({ data: { role, username, passwordSalt } }) => ({
      id: 'some-user-id',
      role,
      username,
    }),
    findOne: async ({ where: { username } }) => ({
      id: 'some-id',
      username,
      passwordSalt: await generateSalt('password'),
      role: 'OWNER',
    })
  },
  restaurants: {
    findMany: () => [
      {
        id: 'restaurant-1',
        name: 'Some Really Cool Restaurant',
        description: 'Some description',
        reviews: [
          {
            id: 'review-1',
            rating: 3,
            comments: [
              {
                id: 'comment-1',
              },
              {
                id: 'comment-2'
              }
            ]
          }, {
            id: 'review-2',
            rating: 2,
            comments: [
              {
                id: 'comment-3',
              },
            ]
          }
        ]
      }
    ]
  }
}

describe('with mocked ORM', () => {
  let server: Server;
  let token: string;

  before(async () => {
    server = await startServer(mockPhoton as any as Photon)
  })

  it('should create a user', async () => {
    const response = await chai.request(server)
      .post('/user')
      .send({
        role: 'ADMIN',
        username: 'conner',
        password: 'password',
      });

    expect(response.status).to.equal(200);
    expect(response.body.user).to.deep.equal({
      id: 'some-user-id',
      username: 'conner',
      role: 'ADMIN',
    });

    expect(response.body.token).to.be.a('string');
  });

  it('should not login a user if password is wrong', async () => {
    const response = await chai.request(server)
      .post('/login')
      .send({
        username: 'conner-user',
        password: 'password123',
      });

    expect(response.status).to.equal(401);
  })

  it('should login a user if password is right', async () => {
    const response = await chai.request(server)
      .post('/login')
      .send({
        username: 'conner-user',
        password: 'password',
      });

    expect(response.status).to.equal(200);
    expect(response.body.token).to.be.a('string');

    token = response.body.token;
  })

  it('should not let you GET /restaurants if not logged in', async () => {
    const response = await chai.request(server)
      .get('/restaurants');

    expect(response.status).to.equal(401);
  })

  it('should let you GET /restaurants if you are logged in', async () => {
    const response = await chai.request(server)
      .get('/restaurants')
      .set({ 'authorization': `Bearer ${token}` });

    expect(response.status).to.equal(200);

    // one restaurant
    expect(response.body.length).to.equal(1);

    // 2 restaurants
    expect(response.body[0].numReviews).to.equal(2);
    expect(response.body[0].numComments).to.equal(3);

    // (2 + 3) / 2 = 2.5
    expect(response.body[0].averageRating).to.equal(2.5)
  })
})
