var Items = require('items');
var Wreck = require('wreck');


var internals = {};


internals.get = exports.get = function (id, callback) {

    const options = {
        headers: {
            'Authorization': `bearer ${process.env.VIMEO_ACCESS_TOKEN}`
        },
        json: true
    }

    Wreck.get(`https://api.vimeo.com/videos/${id}`, options,  function (err, res, payload) {

        if (err) {
            return callback(err);
        }

        payload.id = id;

        callback(null, payload);
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
            video.thumbnail_large = video.pictures.sizes[video.pictures.sizes.length - 1].link;
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
