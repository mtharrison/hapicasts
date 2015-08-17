var Fs = require('fs');
var Path = require('path');
var Wreck = require('wreck');

var internals = {};


internals.markdownFileToHTML = function (file, callback) {

    debugger;

    Fs.readFile(Path.join(__dirname, '../content', file + '.md'), function (err, contents) {

        if (err) {
            if (err.code === 'ENOENT') {
                console.log(err);
                return callback(null, ''); // file not found is fine
            }
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


exports.getPage = function (name, callback) {

    return internals.markdownFileToHTML('pages/' + name, callback);
};


exports.getTranscript = function (id, callback) {

    return internals.markdownFileToHTML('transcripts/' + id.toString(), callback);
};


exports.getShowNotes = function (id, callback) {

    return internals.markdownFileToHTML('show-notes/' + id.toString(), callback);
};
