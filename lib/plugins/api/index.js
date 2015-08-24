var RethinkDB =require('rethinkdb');
var _ = require('lodash');

exports.register = function (server, options, next) {

    server.bind({
        db: options.db,
        events: options.events
    });

    server.route(require('./routes'));
    next();
};


exports.register.attributes = { name: 'api' };
