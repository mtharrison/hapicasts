var Constants = require('../constants');
var Vimeo = require('../vimeo');
var Videos = require('../models/videos');
var Page = require('../page');


exports.register = function (server, options, next) {

    server.bind({ db: options.db });

    // Videos

    server.method({
        name: 'videos.getAll',
        method: Videos.getAll,
        options: {
            cache: {
                expiresIn: Constants.oneDay,
                staleIn: Constants.fiveMinutes,
                staleTimeout: 100,
                generateTimeout: Constants.oneMinute
            }
        }
    });

    // Vimeo

    server.method({
        name: 'vimeo.get',
        method: Vimeo.get,
        options: {
            cache: {
                expiresIn: Constants.oneDay,
                staleIn: Constants.fiveMinutes,
                staleTimeout: 100,
                generateTimeout: Constants.oneMinute
            }
        }
    });

    server.method({
        name: 'vimeo.getAll',
        method: Vimeo.getAll
    });

    // Content

    server.method({
        name: 'content.getTranscript',
        method: Page.getTranscript,
        options: {
            cache: {
                expiresIn: Constants.oneDay,
                staleIn: Constants.fiveMinutes,
                staleTimeout: 100,
                generateTimeout: Constants.oneMinute
            }
        }
    });

    server.method({
        name: 'content.getShowNotes',
        method: Page.getShowNotes,
        options: {
            cache: {
                expiresIn: Constants.oneDay,
                staleIn: Constants.fiveMinutes,
                staleTimeout: 100,
                generateTimeout: Constants.oneMinute
            }
        }
    });

    server.method({
        name: 'content.getPage',
        method: Page.getPage,
        options: {
            cache: {
                expiresIn: Constants.fiveMinutes,
                staleIn: Constants.oneMinute,
                staleTimeout: 100,
                generateTimeout: Constants.oneMinute
            }
        }
    });

    next();
};

exports.register.attributes = { name: 'methods' };
