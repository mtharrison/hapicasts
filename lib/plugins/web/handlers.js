var _ = require('lodash');
var Path = require('path');
var R = require('rethinkdb');


exports.public = {
    directory: {
        path: Path.join(__dirname, '../../../public')
    }
};


exports.home = function (request, reply) {

    var account = request.session.get('credentials');

    request.server.methods.getAllVideos(function (err, videos) {

        if (err) {
            return reply(err);
        }

        reply.view('home', {
            user: account,
            videos: _.chunk(videos, 3)
        });
    });
};


exports.page = function (request, reply) {

    var account = request.session.get('credentials');

    request.server.methods.getPage(request.params.page, function (err, contents) {

        if (err) {
            throw err;
        }

        reply.view('page', {
            user: account,
            page: contents
        });
    });
};


exports.video = function (request, reply) {

    var account = request.session.get('credentials');

    reply.view('video', {
        user: account,
        video: request.pre.getVideo,
        transcript: request.pre.getTranscript,
        showNotes: request.pre.getShowNotes
    });
};


exports.request = function (request, reply) {

    var account = request.session.get('credentials');

    reply.view('request', {
        user: account
    });
};


exports.login = function (request, reply) {

    request.session.set('credentials', request.auth.credentials);

    R.table('logins').insert({
        timestamp: new Date(),
        username: request.auth.credentials.profile.username
    })
    .run(this.db, function (err) {

        if (err) {
            throw err;
        }
    });

    return reply.redirect('/');
};


exports.logout = function (request, reply) {

    request.session.clear('credentials');
    return reply.redirect('/');
};
