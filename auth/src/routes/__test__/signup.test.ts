import request from 'supertest';
import { app } from '../../app';

describe('POST /api/users/signup', () => {
    it('returns a 201 on successful signup', async () => {   
        request(app)
            .post('/api/users/signup')
            .send({
                email: 'testmail@mail.com',
                password: 'password',
            }).expect(201);
    });

    it('returns a 400 with an invalid email', async () => {
        request(app)
            .post('/api/users/signup')
            .send({
                email: 'testmail',
                password: 'password',
            }).expect(400);
    });

    it('returns a 400 with an invalid password', async () => {
        request(app)
            .post('/api/users/signup')
            .send({
                email: 'testmail@email.com',
                password: 'p',
            }).expect(400);
    });
});