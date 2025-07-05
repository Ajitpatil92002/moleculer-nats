const { ServiceBroker } = require('moleculer');
const { NATSMiddleware } = require('./middleware/NATSMiddleware');

const broker = new ServiceBroker({
    middlewares: [
        NATSMiddleware({
            user: 'moleculer',
            pass: '35280155-5d3e-4d85-bcad-6a7945002383',
        }),
    ],
    nodeID: 'node-' + process.pid,
    namespace: 'dev',
    logger: {
        type: 'Console',
        options: {
            level: 'debug',
        },
    },
});

broker.loadService('./services/sender.service.js');
broker.loadService('./services/receiver.service.js');

async function start() {
    try {
        await broker.start();
        setTimeout(async () => {
            try {
                await broker.call('sender.sendMessage');
            } catch (err) {
                console.error('Failed to send message:', err);
            }
        }, 2000);
    } catch (err) {
        console.error('Failed to start broker:', err);
    }
}

start();
