import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  function signin(): Promise<string[]>;
}

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  // mongo = await MongoMemoryServer.create();
  // const mongoUri = await mongo.getUri();
  // mongodb+srv://tanasievladcristian:104tcuR7oMAA4CY7@cluster0.6xlg3bz.mongodb.net/?retryWrites=true&w=majority
  await mongoose.connect('mongodb+srv://vlad246:Fortuna246@cluster0.qs8fxbq.mongodb.net/?retryWrites=true&w=majority');
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  try {
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  } catch (error) {
    console.log(error)
  }
});

afterAll(async () => {
  // await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async (): Promise<string[]> => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email, password
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  return cookie;
}
