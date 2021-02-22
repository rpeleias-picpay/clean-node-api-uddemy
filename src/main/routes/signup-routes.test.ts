import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an accont on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Rodrigo',
        email: 'rodrigo.peleias@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
