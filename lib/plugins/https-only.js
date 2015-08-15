exports.register = function (server, options, next) {

    server.ext('onRequest', function (request, reply) {

        if (request.connection.info.protocol !== 'https' || request.url.path !== '/') {
            return reply.redirect('https://' + request.info.host);
        }

        reply.continue();
    });

    next();
};


exports.register.attributes = { name: 'https-only' };
