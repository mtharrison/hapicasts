var _ = require('lodash');
var Boom = require('boom');
var RethinkDB =require('rethinkdb');
var Jwt = require('jsonwebtoken');


exports.newSuggestion = function (request, reply) {

    var self = this;

    var newSuggestion = {
        votes: 1,
        status: 'needs-moderation'
    };

    _.assign(newSuggestion, request.payload);

    RethinkDB.table('suggestions').insert(newSuggestion)
    .run(this.db, function (err, results) {

        if (err) {
            throw err;
        }

        _.assign(newSuggestion, { id: results.generated_keys[0] });
        self.events.emit('newSuggestion', newSuggestion);

        return request.server.methods.suggestions.getAll(reply);
    });
};


exports.getSuggestions = function (request, reply) {

    return request.server.methods.suggestions.getAll(reply);
};


exports.confirmSuggestion = function (request, reply) {

    var token = request.query.token;
    Jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {

        if (err) {
            return reply(Boom.forbidden('Token not valid'));
        }

        return request.server.methods.suggestions.updateStatus(decoded.id, 'confirmed', reply);
    });
};
