import { Photon } from '@prisma/photon'
import * as bodyParser from 'body-parser'
import * as express from 'express'

const photon = new Photon()
const app = express()

app.use(bodyParser.json())

app.post('/user', async (req, res) => {
  await photon.users.create({
    data: {}
  })
  res.sendStatus(200)
})

app.get('/users', async (req, res) => {
  const users = await photon.users();
  res.json(users)
})

const server = app.listen(3000, () =>
  console.log(
    '🚀 Server ready at: http://localhost:3000\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#5-using-the-rest-api',
  ),
)
