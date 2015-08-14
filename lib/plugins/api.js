var Vimeo = require('../vimeo');


exports.register = function (server, options, next) {

    server.method('getAllVideos', Vimeo.getAllVideos, {
        cache: {
            expiresIn: 1000 * 60 * 60 * 24,
            staleIn: 1000 * 60 * 5,
            staleTimeout: 100,
            generateTimeout: 1000 * 60
        }
    });

    server.route({
        method: 'GET',
        path: '/videos',
        handler: function (request, reply) {

            server.methods.getAllVideos(function (err, videos) {

                if (err) {
                    return reply(err);
                }

                reply(videos);
            });
        }
    });

    next();
};


exports.register.attributes = { name: 'api' };
