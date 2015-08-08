exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            reply({
                coming: 'soon',
                by: '@mt_harrison'
            });
        }
    });

    next();
};

exports.register.attributes = { name: 'teaser' };
