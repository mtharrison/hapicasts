var _ = require('lodash');
var RethinkDB =require('rethinkdb');


exports.newSuggestion = function (request, reply) {

    var self = this;

    var newSuggestion = {
        votes: 1,
        tags: ['needs-moderation']
    };

    RethinkDB.table('suggestions').insert(_.assign(request.payload, newSuggestion))
    .run(this.db, function (err) {

        if (err) {
            throw err;
        }

        return request.server.methods.getSuggestions(reply);
    });
};


exports.getSuggestions = function (request, reply) {

    request.server.settings.app.events.emit('ev');
    return request.server.methods.getSuggestions(reply);
};
