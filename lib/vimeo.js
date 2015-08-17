var Items = require('items');
var Wreck = require('wreck');
var Videos = require('./videos');

var internals = {};


internals.getVideo = exports.getVideo = function (id, callback) {

    Wreck.get('http://vimeo.com/api/v2/video/' + id + '.json', { json: true },  function (err, res, payload) {

        if (err) {
            return callback(err);
        }

        callback(null, payload[0]);
    });
};


exports.getAllVideos = function (callback) {

    var videos = [];

    var work = function (item, next) {

        internals.getVideo(item.id, function (err, video) {

            if (err) {
                return next(err);
            }

            video.tags = item.tags;
            videos.push(video);
            next();
        });
    };

    Items.parallel(Videos.videos, work, function (err) {

        if (err) {
            return reply(err);
        }

        callback(null, videos);
    });
};
