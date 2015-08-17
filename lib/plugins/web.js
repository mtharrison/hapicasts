var _ = require('lodash');
var Path = require('path');


exports.register = function (server, options, next) {

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: '.',
        partialsPath: 'partials',
        relativeTo: Path.join(__dirname, '../..', 'templates'),
        layout: true,
        isCached: process.env.NODE_ENV === 'production'
    });

    server.route({
        method: 'GET',
        path: '/public/{p*}',
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

            server.methods.getAllVideos(function (err, videos) {

                if (err) {
                    return reply(err);
                }

                reply.view('home', {
                    user: account,
                    videos: _.chunk(videos, 3)
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/pages/{page}',
        handler: function (request, reply) {

            var account = request.session.get('credentials');

            server.methods.getPage(request.params.page, function (err, contents) {

                if (err) {
                    throw err;
                }

                reply.view('page', {
                    user: account,
                    page: contents
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/account',
        handler: function (request, reply) {

            var account = request.session.get('credentials');

            reply(account ? account.profile : null);
        }
    });

    server.ext('onPreResponse', function (request, reply) {

        if (request.response.isBoom) {
            return reply.view('error', { error: request.response.output.payload })
                .code(request.response.output.payload.statusCode);
        }

        reply.continue();
    });

    next();
};


exports.register.attributes = { name: 'web' };
