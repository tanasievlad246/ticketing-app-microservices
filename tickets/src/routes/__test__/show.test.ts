import request from 'supertest';
import { app } from '../../app';

it('returns a 404 if the ticket is not found', async () => {
    await request(app)
        .get('/api/tickets/asnmdbkjasdj')
        .send()
        .expect(404);
});

it('returns the ticket if the ticket is found', async () => {
    const ticket = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'title',
            price: 20
        })
        .expect(201);

    console.log(ticket.body)

    const response = await request(app)
        .get(`/api/tickets/${ticket.body.id}`)
        .send()

    console.log(response.body)
    expect(response.status).toEqual(200);
});