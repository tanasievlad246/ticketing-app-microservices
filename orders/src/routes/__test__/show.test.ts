import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';
import { Order, OrderStatus } from '../../models/Order';

it('has a route handler listening to /api/orders for get requests', async () => {
    await request(app)
        .get('/api/orders')
        .send({})
        .expect(401);
});

const createTicket = async () => {
    const ticket = Ticket.build({
        title: 'Concert',
        price: 20
    });
    await ticket.save();
    return ticket;
}

it('fetches orders for a particular user', async () => {
    const ticketOne = await createTicket();
    const ticketTwo = await createTicket();
    const ticketThree = await createTicket();

    const userOne = global.signin();
    const userTwo = global.signin();

    const { body: orderOne } = await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({
            ticketId: ticketOne.id
        })
        .expect(201);

    const { body: orderTwo } = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({
            ticketId: ticketTwo.id
        })
        .expect(201);


    const { body: orderThree } = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({
            ticketId: ticketThree.id
        })
        .expect(201);

    const response = await request(app)
        .get('/api/orders')
        .set('Cookie', userTwo)
        .expect(200);

    expect(response.body.length).toEqual(2);
    expect(response.body[0].id).toEqual(orderTwo.id);
    expect(response.body[0].ticket.id).toEqual(orderTwo.ticket.id);
    expect(response.body[1].id).toEqual(orderThree.id);

    const response2 = await request(app)
        .get('/api/orders')
        .set('Cookie', userOne)
        .expect(200);

    expect(response2.body.length).toEqual(1);
    expect(response2.body[0].id).toEqual(orderOne.id);
    expect(response2.body[0].ticket.id).toEqual(orderOne.ticket.id);
});

it('returns an error if one user tries to fetch another users order', async () => {
    const ticketOne = await createTicket();

    const userOne = global.signin();
    const userTwo = global.signin();

    const { body: orderOne } = await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({
            ticketId: ticketOne.id
        })
        .expect(201);

    await request(app)
        .get(`/api/orders/${orderOne.id}`)
        .set('Cookie', userTwo)
        .expect(401);
});

it('fetches an order', async () => {
    const ticket = await createTicket();

    const user = global.signin();

    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({
            ticketId: ticket.id
        })
        .expect(201);

    const response = await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()

    expect(response.body.id).toEqual(order.id);
})

