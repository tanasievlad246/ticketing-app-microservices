import { randomBytes } from 'crypto';
import nats from 'node-nats-streaming';

const clientId = randomBytes(4).toString('hex');

// stan is the client
const stan = nats.connect('ticketing', clientId, {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');
    const subscribe = stan.subscribe('ticket:updated');
    subscribe.on('message', (msg) => {
        console.log(
            `Received event #${msg.getSequence()}, with data: ${msg.getData()}`
        )
    });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
