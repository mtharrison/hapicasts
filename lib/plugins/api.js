var Utils = require('../utils');


exports.register = function (server, options, next) {

    server.route({
        config: {
            cache: {
                expiresIn: Utils.fiveMinutes
            }
        },
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

    server.route({
        config: {
            cache: {
                expiresIn: Utils.oneHour
            }
        },
        method: 'GET',
        path: '/page/{page}',
        handler: function (request, reply) {

            server.methods.getPage(request.params.page, function (err, contents) {

                if (err) {
                    throw err;
                }

                reply(contents);
            });
        }
    });

    next();
};


exports.register.attributes = { name: 'api' };
