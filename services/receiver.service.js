const { connect } = require('nats');

module.exports = {
    name: 'receiver',
    channels: {
        'v1.test.scan.start.channel.event': {
            group: 'receiver',
            context: true,
            async handler(ctx) {
                this.logger.info(
                    '✅ Received test channel message:',
                    ctx.params
                );
                this.logger.debug(
                    'Context object:',
                    JSON.stringify(ctx, null, 2)
                ); // Debug ctx
                try {
                    const nc = await connect({
                        servers: ['nats://localhost:4222'],
                        user: 'moleculer',
                        pass: '35280155-5d3e-4d85-bcad-6a7945002383',
                    });
                    const js = nc.jetstream();
                    if (ctx.raw) {
                        await js.ack(ctx.raw);
                        this.logger.info(
                            '✅ Test channel message acknowledged manually'
                        );
                    } else {
                        this.logger.warn(
                            '⚠️ No raw message available for test channel, relying on middleware acknowledgment'
                        );
                    }
                    await nc.close();
                } catch (err) {
                    this.logger.error(
                        '❌ Failed to acknowledge test channel message:',
                        err
                    );
                }
            },
        },
        'v1.ldap.sync.start.event': {
            group: 'v1.ldap',
            context: true,
            async handler(ctx) {
                this.logger.info('✅ Received LDAP sync message:', ctx.params);
                this.logger.debug(
                    'Context object:',
                    JSON.stringify(ctx, null, 2)
                ); // Debug ctx
                try {
                    const nc = await connect({
                        servers: ['nats://localhost:4222'],
                        user: 'moleculer',
                        pass: '35280155-5d3e-4d85-bcad-6a7945002383',
                    });
                    const js = nc.jetstream();
                    if (ctx.raw) {
                        await js.ack(ctx.raw);
                        this.logger.info(
                            '✅ LDAP sync message acknowledged manually'
                        );
                    } else {
                        this.logger.warn(
                            '⚠️ No raw message available for LDAP sync, relying on middleware acknowledgment'
                        );
                    }
                    await nc.close();
                } catch (err) {
                    this.logger.error(
                        '❌ Failed to acknowledge LDAP sync message:',
                        err
                    );
                }
            },
        },
    },
    started() {
        this.logger.info('🚀 Receiver service started');
    },
};
