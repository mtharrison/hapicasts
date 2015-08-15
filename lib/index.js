var Config = require('./config');
var Glue = require('glue');

var options = { relativeTo: __dirname };

Glue.compose(Config.manifest, options, function (err, server) {

    server.method(require('./methods'));

    server.start(function (err) {

        if (err) {
            throw err;
        }

        console.log('Server started at', server.info.uri);
    });
});
