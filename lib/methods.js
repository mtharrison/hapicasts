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
            expiresIn: 1000 * 60 * 60 * 24,
            staleIn: 1000 * 60 * 5,
            staleTimeout: 100,
            generateTimeout: 1000 * 60
        }
    }
});


internals.methods.push({
    name: 'getPage', 
    method: Page.getPage, 
    options: {
        cache: {
            expiresIn: 1000 * 60 * 5,
            staleIn: 1000 * 60,
            staleTimeout: 100,
            generateTimeout: 1000 * 60
        }
    }
});


module.exports = internals.methods;
