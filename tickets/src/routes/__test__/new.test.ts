import request from 'supertest';
import { app } from '../../app';
import { response } from 'express';
import { Ticket } from '../../models/Ticket';

it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401);
});

it('returns a status other than 401 if the user is logged in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});
    expect(response.status).not.toEqual(401);
})

it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        }).expect(400);
});

it('returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'Test title',
            price: -10
        }).expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'Test title'
        }).expect(400);
});

it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'Test title',
            price: 11
        }).expect(201);

    tickets = await Ticket.find({});

    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(11);
    expect(tickets[0].title).toEqual('Test title');
});