var Path = require('path');


exports.register = function (server, options, next) {

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: Path.join(__dirname, '..', 'templates')
    });

    server.route({
        method: 'GET',
        path: '/{p*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '..', 'public')
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            reply.view('home');
        }
    });

    next();
};


exports.register.attributes = { name: 'website' };
