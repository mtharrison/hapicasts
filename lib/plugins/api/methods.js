var RethinkDB =require('rethinkdb');


module.exports = [
    {
        name: 'getSuggestions',
        method: function (callback) {

            return RethinkDB.table('suggestions').run(this.db, function (err, cursor) {

                if (err) {
                    throw err;
                }

                callback(null, cursor.toArray());
            });
        }
    }
];
