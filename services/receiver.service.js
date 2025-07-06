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
                );
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
                );
            },
        },
    },
    started() {
        this.logger.info('🚀 Receiver service started');
    },
};
