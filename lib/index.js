var Config = require('./config');
var Glue = require('glue');

var options = { relativeTo: __dirname };

Config.getManifest(function (err, manifest) {

    if (err) {
        throw err;
    }

    Glue.compose(manifest, options, function (err, server) {

        if (err) {
            throw err;
        }

        server.start(function (err) {

            if (err) {
                throw err;
            }

            console.log('Server started at', server.info.uri);
        });
    });
});