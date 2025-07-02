module.exports = {
    name: 'sender',
    actions: {
        sendMessage: {
            async handler(ctx) {
                try {
                    await ctx.broker.sendToChannel(
                        'internal.v1.test.scan.start.channel.event',
                        { msg: 'Hello from sender' },
                        { ctx }
                    );
                    this.logger.info('✅ Message sent.');
                } catch (err) {
                    this.logger.error('❌ Failed to send message', err);
                }
            },
        },
    },
    started() {
        this.logger.info('🚀 Sender service started');
    },
};
