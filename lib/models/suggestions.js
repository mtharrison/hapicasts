var RethinkDB = require('rethinkdb');


exports.getAll = function (callback) {

    RethinkDB
        .table('suggestions')
        .filter(function (s) {
            return s('status').ne('needs-moderation')
        })
        .run(this.db, function (err, cursor) {

            if (err) {
                throw err;
            }

            return cursor.toArray(callback);
        });
};


exports.updateStatus = function (id, status, callback) {

    RethinkDB
        .table('suggestions')
        .get(id)
        .update({ status: status })
        .run(this.db, function (err) {

            if (err) {
                return callback(err);
            }

            callback('OK');
        });
};
