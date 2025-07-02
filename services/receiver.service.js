module.exports = {
    name: 'receiver',
    channels: {
        'internal.v1.test.scan.start.channel.event': {
            async handler(payload) {
                try {
                    this.logger.info('✅ Received message:', payload);
                    // Assuming ctx.ack() is replaced by some acknowledgment logic
                    this.logger.info('✅ Message acknowledged successfully');
                } catch (err) {
                    this.logger.error('❌ Failed to acknowledge message:', err);
                    // Optionally handle the error or retry logic here
                }
            },
        },
    },
    started() {
        this.logger.info('🚀 Receiver service started');
    },
};
