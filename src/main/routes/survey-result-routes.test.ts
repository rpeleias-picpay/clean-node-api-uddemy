import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'

let surveyCollection: Collection
let accountCollection: Collection
beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
  await MongoHelper.disconnect()
})

beforeEach(async () => {
  surveyCollection = await MongoHelper.getCollection('surveys')
  await surveyCollection.deleteMany({})

  accountCollection = await MongoHelper.getCollection('accounts')
  await accountCollection.deleteMany({})
})
const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Rodrigo',
    email: 'rodrigo.peleias@gmail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('PUT /surveys/:survetId/results', () => {
  test('Should return 403 on save survey result without accessToken', async () => {
    await request(app)
      .put('/api/surveys/any_id/results')
      .send({
        answer: 'any_answer'
      })
      .expect(403)
  })

  test('Should return 200 on save survey result with accessToken', async () => {
    const accessToken = await makeAccessToken()
    const res = await surveyCollection.insertOne({
      question: 'Question',
      answers: [{
        answer: 'Answer 1',
        image: 'http://image-name.com'
      },
      {
        answer: 'Answer 2'
      }],
      date: new Date()
    })
    await request(app)
      .put(`/api/surveys/${res.ops[0]._id}/results`)
      .set('x-access-token', accessToken)
      .send({
        answer: 'Answer 1'
      })
      .expect(200)
  })
})

describe('GET /surveys/:survetId/results', () => {
  test('Should return 403 on load survey result without accessToken', async () => {
    await request(app)
      .get('/api/surveys/any_id/results')
      .expect(403)
  })
})
