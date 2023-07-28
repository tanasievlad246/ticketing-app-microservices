import { randomBytes } from 'crypto';
import nats, { Message } from 'node-nats-streaming';

const clientId = randomBytes(4).toString('hex');

// stan is the client
const stan = nats.connect('ticketing', clientId, {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    stan.on('close', () => {
        process.exit();
    });

    const options = stan.subscriptionOptions()
        .setManualAckMode(true)
        .setAckWait(20000)
        .setDeliverAllAvailable()
        .setDurableName('accounting-service');

    // Second argument is queue group name
    const ticketsSub = stan.subscribe('ticket:created', options);

    ticketsSub.on('message', (msg: Message) => {
        const data = msg.getData();

        if (typeof data === 'string') {
            console.log(`Received event #${msg.getSequence()}, with data ${data}`);
            msg.ack();
        }
    });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
