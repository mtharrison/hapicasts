var _ = require('lodash');
var R = require('rethinkdb');


exports.register = function (server, options, next) {

    server.bind({ db: options.db });

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

                R.table('logins').insert({
                    timestamp: new Date(),
                    username: request.auth.credentials.profile.username
                })
                .run(this.db, function (err) {

                    if (err) {
                        throw err;
                    }
                });

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
