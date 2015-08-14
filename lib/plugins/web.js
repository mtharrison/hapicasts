var Path = require('path');


exports.register = function (server, options, next) {

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: Path.join(__dirname, '../..', 'templates'),
        layout: true,
        isCached: process.env.NODE_ENV === 'production'
    });

    server.route({
        method: 'GET',
        path: '/{p*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '../..', 'public')
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            var account = request.session.get('credentials');

            reply.view('home', {
                user: account
            });
        }
    });

    server.ext('onPreResponse', function (request, reply) {

        if (request.response.isBoom) {
            return reply.view('error', { error: request.response.output.payload });
        }

        reply.continue();
    });

    next();
};


exports.register.attributes = { name: 'web' };
