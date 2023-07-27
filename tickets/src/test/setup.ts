import mongoose from 'mongoose';
import request from 'supertest';
import { sign } from 'jsonwebtoken';
import { app } from '../app';

// modifying global to declare global function
declare global {
  function signin(): string[];
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

global.signin = (): string[] => {
  const payload = {
    email: 'test@email.com',
    id: 'akldjasdi123'
  };

  const token = sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`express:sess=${base64}`];
}
