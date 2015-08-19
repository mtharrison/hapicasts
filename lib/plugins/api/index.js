var R = require('rethinkdb');
var _ = require('lodash');

exports.register = function (server, options, next) {

    server.bind({ db: options.db });
    server.method(require('./methods'));
    server.route(require('./routes'));
    next();
};


exports.register.attributes = { name: 'api' };
