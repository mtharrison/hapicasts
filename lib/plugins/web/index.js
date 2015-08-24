var _ = require('lodash');
var Path = require('path');
var Constants = require('../../constants');


exports.register = function (server, options, next) {

    server.bind({
        db: options.db,
        events: options.events
    });

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: '.',
        helpersPath: 'helpers',
        partialsPath: 'partials',
        relativeTo: Path.join(__dirname, '../../../templates'),
        layout: true,
        isCached: process.env.NODE_ENV === 'production'
    });

    server.auth.strategy('github', 'bell', {
        provider: 'github',
        password: options.password,
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        isSecure: process.env.NODE_ENV === 'production'
    });

    server.route(require('./routes'));

    if (process.env.NODE_ENV === 'production') {
        server.ext('onPreResponse', function (request, reply) {

            if (request.response.isBoom) {
                return reply.view('error', { error: request.response.output.payload })
                    .code(request.response.output.payload.statusCode);
            }

            reply.continue();
        });
    }

    next();
};


exports.register.attributes = { name: 'web' };
