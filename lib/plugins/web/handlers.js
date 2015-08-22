var _ = require('lodash');
var Path = require('path');
var RethinkDB =require('rethinkdb');


exports.public = {
    directory: {
        path: Path.join(__dirname, '../../../public')
    }
};


exports.home = function (request, reply) {

    var account = request.session.get('credentials');

    request.server.methods.videos.getAll(function (err, videos) {

        if (err) {
            return reply(err);
        }

        request.server.methods.vimeo.getAll(videos, function (err, vimeos) {

            if (err) {
                return reply(err);
            }

            console.log(vimeos);

            reply.view('home', {
                user: account,
                videos: _.chunk(vimeos, 3)
            });
        })
    });
};


exports.page = function (request, reply) {

    var account = request.session.get('credentials');

    request.server.methods.content.getPage(request.params.page, function (err, contents) {

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

    console.log(request.pre);

    reply.view('video', {
        user: account,
        video: request.pre.video,
        transcript: request.pre.transcript,
        showNotes: request.pre.showNotes
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

    RethinkDB.table('logins').insert({
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
