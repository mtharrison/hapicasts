var RethinkDB = require('rethinkdb');

exports.getAll = function (callback) {

    RethinkDB.table('videos').run(this.db, function (err, cursor) {

        if (err) {
            callback(err);
        }

        return cursor.toArray(callback);
    });
};