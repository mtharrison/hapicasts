var Utils = require('./utils');
var Vimeo = require('./vimeo');
var Page = require('./page');


var internals = {
    methods: []
};


internals.methods.push({
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


internals.methods.push({
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


module.exports = internals.methods;
