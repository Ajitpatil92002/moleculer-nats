module.exports = {
    name: 'sender',
    actions: {
        sendMessage: {
            async handler(ctx) {
                try {
                    await ctx.broker.sendToChannel(
                        'v1.test.scan.start.channel.event',
                        { msg: 'Hello from sender (test channel)' },
                        { ctx }
                    );
                    this.logger.info('✅ Test channel message sent.');
                } catch (err) {
                    this.logger.error(
                        '❌ Failed to send test channel message',
                        err
                    );
                }
            },
        },
        sendLdapMessage: {
            async handler(ctx) {
                try {
                    await ctx.broker.sendToChannel(
                        'v1.ldap.sync.start.event',
                        { msg: 'Hello from sender (LDAP sync)' },
                        { ctx }
                    );
                    this.logger.info('✅ LDAP sync message sent.');
                } catch (err) {
                    this.logger.error(
                        '❌ Failed to send LDAP sync message',
                        err
                    );
                }
            },
        },
        sendMultiple: {
            async handler(ctx) {
                try {
                    for (let i = 0; i < 10; i++) {
                        await ctx.broker.sendToChannel(
                            'v1.test.scan.start.channel.event',
                            { msg: `Test channel message ${i + 1}` },
                            { ctx }
                        );
                        this.logger.info(
                            `✅ Test channel message ${i + 1} sent.`
                        );
                        await ctx.broker.sendToChannel(
                            'v1.ldap.sync.start.event',
                            { msg: `LDAP sync message ${i + 1}` },
                            { ctx }
                        );
                        this.logger.info(`✅ LDAP sync message ${i + 1} sent.`);
                    }
                } catch (err) {
                    this.logger.error('❌ Failed to send messages', err);
                }
            },
        },
    },
    started() {
        this.logger.info('🚀 Sender service started');
    },
};
