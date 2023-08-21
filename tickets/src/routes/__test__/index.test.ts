import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
    const cookie = global.signin();
    return request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: `Title ${Math.round(Math.random() * 100)}`,
            price: 20
        })
        .expect(201);
}

it('returns a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
        .get('/api/tickets')
        .send()

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(3);
});