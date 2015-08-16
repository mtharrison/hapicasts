var Fs = require('fs');
var Path = require('path');
var Wreck = require('wreck');


exports.getPage = function (name, callback) {

    Fs.readFile(Path.join(__dirname, '../pages', name + '.md'), function (err, contents) {

        if (err) {
            return callback(err);
        }

        Wreck.post('https://api.github.com/markdown/raw', {
            payload: contents,
            headers: {
                'content-type': 'text/plain',
                'user-agent': 'hapicasts.com',
                authorization: 'token ' + process.env.GITHUB_PERSONAL_TOKEN
            }
        }, function (err, res, body) {

            if (err) {
                return callback(err);
            }

            callback(null, body.toString());
        });
    });
};
