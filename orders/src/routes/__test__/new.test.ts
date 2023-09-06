import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';
import { Order, OrderStatus } from '../../models/Order';
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler listening to /api/orders for post requests', async () => {
    await request(app)
        .post('/api/orders')
        .send({})
        .expect(401);
});

it('returns an error if the ticket is not found', async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            ticketId
        })
        .expect(404);
});

it('returns an error if the ticket is alredy reserved', async () => {
    const ticket = Ticket.build({
        title: 'Concert',
        price: 20
    });
    await ticket.save();

    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + 15 * 60);

    const order = Order.build({
        ticket,
        userId: 'asdf',
        status: OrderStatus.Created,
        expiresAt
    });
    await order.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            ticketId: ticket.id
        })
        .expect(400);
});

it('reserves a ticket', async () => {
    const ticket = Ticket.build({
        title: 'Concert',
        price: 20,
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            ticketId: ticket.id
        })
        .expect(201);
});

it('reserved a ticket with an event published', async () => {
    const ticket = Ticket.build({
        title: 'Concert',
        price: 20,
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            ticketId: ticket.id
        })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});