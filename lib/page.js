var Fs = require('fs');
var Path = require('path');
var Wreck = require('wreck');

var internals = {};


internals.getFile = function (file, callback) {

    const contentDir = Path.join(__dirname, '..', 'content');

    Fs.readFile(Path.join(contentDir, file), 'utf-8', (err, file) => {

        if (err) {
            return callback(err);
        }

        callback(null, file);
    });
};


internals.markdownFileToHTML = function (file, callback) {

    internals.getFile(file + '.md', function (err, contents) {

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


exports.getPage = function (name, callback) {

    return internals.markdownFileToHTML('pages/' + name, callback);
};


exports.getTranscript = function (id, callback) {

    return internals.markdownFileToHTML('transcripts/' + id.toString(), callback);
};


exports.getShowNotes = function (id, callback) {

    return internals.markdownFileToHTML('show-notes/' + id.toString(), callback);
};
