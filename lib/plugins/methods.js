var Utils = require('../utils');
var Vimeo = require('../vimeo');
var Page = require('../page');


exports.register = function (server, options, next) {

    server.method({
        name: 'getVideo',
        method: Vimeo.getVideo,
        options: {
            cache: {
                expiresIn: Utils.oneDay,
                staleIn: Utils.fiveMinutes,
                staleTimeout: 100,
                generateTimeout: Utils.oneMinute
            }
        }
    });

    server.method({
        name: 'getTranscript',
        method: Page.getTranscript,
        options: {
            cache: {
                expiresIn: Utils.oneDay,
                staleIn: Utils.fiveMinutes,
                staleTimeout: 100,
                generateTimeout: Utils.oneMinute
            }
        }
    });

    server.method({
        name: 'getShowNotes',
        method: Page.getShowNotes,
        options: {
            cache: {
                expiresIn: Utils.oneDay,
                staleIn: Utils.fiveMinutes,
                staleTimeout: 100,
                generateTimeout: Utils.oneMinute
            }
        }
    });

    server.method({
        name: 'getAllVideos',
        method: Vimeo.getAllVideos,
        options: {
            cache: {
                expiresIn: Utils.oneDay,
                staleIn: Utils.fiveMinutes,
                staleTimeout: 100,
                generateTimeout: Utils.oneMinute
            }
        }
    });

    server.method({
        name: 'getPage',
        method: Page.getPage,
        options: {
            cache: {
                expiresIn: Utils.fiveMinutes,
                staleIn: Utils.oneMinute,
                staleTimeout: 100,
                generateTimeout: Utils.oneMinute
            }
        }
    });

    next();
};

exports.register.attributes = { name: 'methods' };
