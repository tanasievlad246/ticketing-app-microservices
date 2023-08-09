import { randomBytes } from 'crypto';
import nats from 'node-nats-streaming';
import { TicketCreatedListener } from '@ticketingapporg/common';

const clientId = randomBytes(4).toString('hex');

// stan is the client
const stan = nats.connect('dragon', clientId, {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');
    const subscribe = stan.subscribe('livevox:call');
    subscribe.on('message', (msg) => {
        console.log(
            `Received event #${msg.getSequence()}, with data: ${msg.getData()}`
        )
    });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
