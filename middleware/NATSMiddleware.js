const { Middleware } = require('@moleculer/channels');
const { connect } = require('nats');

async function ensureStreamExists({ servers, user, pass }) {
    const nc = await connect({
        servers,
        user,
        pass,
    });

    const jsm = await nc.jetstreamManager();

    const streamName = 'MOLECULER_STREAM';

    const subjects = [
        'moleculer.>',
        // 'dev.>',
        'MOL-dev.>',
        // 'internal.>',
        // 'deliveries.>',
    ];

    try {
        const existing = await jsm.streams.info(streamName);
        const currentSubjects = existing.config.subjects || [];

        const missing = subjects.filter(s => !currentSubjects.includes(s));

        if (missing.length > 0) {
            console.log(
                `🔁 Updating stream '${streamName}' with new subjects:`,
                missing
            );
            await jsm.streams.update(streamName, {
                ...existing.config,
                subjects: Array.from(
                    new Set([...currentSubjects, ...subjects])
                ),
            });
        } else {
            console.log(
                `✅ Stream '${streamName}' already exists and has all required subjects.`
            );
        }
    } catch (err) {
        console.log(
            `ℹ️ Stream '${streamName}' does not exist. Creating it now...`
        );
        await jsm.streams.add({
            name: streamName,
            subjects,
            storage: 'file',
            retention: 'limits',
        });
        console.log(`✅ Stream '${streamName}' created.`);
    }

    await nc.close();
}

function NATSMiddleware(transporterOptions = {}) {
    const {
        user = 'moleculer',
        pass = '123455alknfklj',
        servers = ['nats://localhost:4222'],
    } = transporterOptions;

    ensureStreamExists({ servers, user, pass }).catch(err => {
        console.error('❌ Failed to ensure stream exists:', err);
    });

    return Middleware({
        name: 'NATSMiddleware',
        adapter: {
            type: 'NATS',
            options: {
                durableName: 'MOLECULER_CONSUMER',
                nats: {
                    url: servers[0],
                    connectionOptions: {
                        user,
                        pass,
                        debug: true,
                    },
                    streamConfig: {
                        name: 'MOLECULER_STREAM',
                        subjects: [
                            'moleculer.>',
                            // 'dev.>',
                            'MOL-dev.>',
                            // 'internal.>',
                            // 'deliveries.>',
                        ],
                        storage: 'file',
                    },
                },
                consumerOpts: {
                    config: {
                        ack_policy: 'explicit',
                        deliver_policy: 'new',
                        ack_wait: 30 * 1000,
                        max_ack_pending: 1, // Ensure consistency
                        max_deliver: 5, // Allow more retries for debugging
                    },
                },
                maxInFlight: 1, // Align with max_ack_pending
                maxRetries: 3,
            },
        },
        context: true,
    });
}

module.exports = { NATSMiddleware };
