var Items = require('items');
var Wreck = require('wreck');


var internals = {};


internals.get = exports.get = function (id, callback) {

    Wreck.get('http://vimeo.com/api/v2/video/' + id + '.json', { json: true },  function (err, res, payload) {

        if (err) {
            return callback(err);
        }

        callback(null, payload[0]);
    });
};


exports.getAll = function (videos, callback) {

    var result = [];

    var work = function (item, next) {

        internals.get(item.id, function (err, video) {

            if (err) {
                return next(err);
            }

            video.tags = item.tags;
            result.push(video);
            next();
        });
    };

    Items.parallel(videos, work, function (err) {

        if (err) {
            return reply(err);
        }

        callback(null, result);
    });
};
