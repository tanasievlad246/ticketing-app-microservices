import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from '@ticketingapporg/common';

// stan is the client
/**
 * ticketing is the clusterId
 * abc is the clientId
 * url is the url of the nats server
 */
const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Publisher connected to NATS');

    new TicketCreatedPublisher(stan).publish({
        id: '123',
        title: 'concert',
        price: 20,
    });
});

