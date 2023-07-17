import request from 'supertest';
import { app } from '../../app';

describe('POST /api/users/signup', () => {
    test('returns a 201 on successful signup', async () => {   
        const response = await request(app)
            .post('/api/users/signup')
            .send({
                email: 'testmail@mail.com',
                password: 'password',
            }).expect(201);
        console.log(response.headers);
    });

    it('returns a 400 with an invalid email', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'testmail',
                password: 'password',
            }).expect(400);
    });

    it('returns a 400 with an invalid password', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'testmail@email.com',
                password: 'p',
            }).expect(400);
    });

    it('returns a 400 with missing email and password', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({}).expect(400);
    });

    it('disallows duplicate emails', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password',
            }).expect(201);

        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password',
            }).expect(400);
    });
    
    test('sets a cookie after successful signup', async () => {
        const response = await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password',
            })
            .expect(201);
        
        expect(response.get('Set-Cookie')).toBeDefined();
    });
}); 