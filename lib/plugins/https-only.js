exports.register = function (server, options, next) {

    server.ext('onRequest', function (request, reply) {

        if (request.connection.info.protocol !== 'https') {
            return reply.redirect('https://' + request.info.host + request.url.path);
        }

        reply.continue();
    });

    next();
};


exports.register.attributes = { name: 'https-only' };
