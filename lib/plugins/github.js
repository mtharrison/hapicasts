exports.register = function (server, options, next) {

    server.auth.strategy('github', 'bell', {
        provider: 'github',
        password: options.password,
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        isSecure: process.env.NODE_ENV === 'production'
    });

    server.route({
        method: ['GET', 'POST'],
        path: '/login',
        config: {
            auth: 'github',
            handler: function (request, reply) {

                request.session.set('credentials', request.auth.credentials);
                return reply.redirect('/');
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/logout',
        config: {
            handler: function (request, reply) {

                request.session.clear('credentials');
                return reply.redirect('/');
            }
        }
    });

    next();
};


exports.register.attributes = { name: 'github' };
