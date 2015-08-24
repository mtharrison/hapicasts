var EventEmitter = require('events').EventEmitter;
var Fs = require('fs');
var Nodemailer = require('nodemailer');
var Path = require('path');
var RethinkDB = require('rethinkdb');

exports.getManifest = function (callback) {

    var mailer = Nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    var events = new EventEmitter();
    var options = { db: 'hapicasts' };

    RethinkDB.connect(options, function (err, conn) {

        if (err) {
            throw err;
        }

        var manifest = {};

        manifest = {
            plugins: {
                'yar': {
                    cookieOptions: {
                        password: process.env.COOKIE_PASS,
                        isSecure: process.env.NODE_ENV === 'production'
                    }
                },
                'bell': null,
                './plugins/methods': {
                    db: conn 
                },
                './plugins/web': {
                    db: conn,
                    events: events,
                    provider: 'github',
                    password: process.env.GITHUB_API_PASSWORD,
                    clientId: process.env.GITHUB_API_CLIENT_ID,
                    clientSecret: process.env.GITHUB_API_CLIENT_SECRET
                },
                './plugins/api': [{
                    options: { db: conn, events: events },
                    routes: { prefix: '/api' }
                }],
                './plugins/mailer': [{
                    options: { events: events, mailer: mailer }
                }]
            }
        };


        if (process.env.NODE_ENV === 'production') {
            manifest.plugins['./plugins/https-only'] = null;
        }

        manifest.server = {
            debug: {
                log: ['error'],
                request: ['error'],
            }
        };

        manifest.connections = process.env.NODE_ENV === 'production' ?
            [
                { port: 80 },
                {
                    port: 443,
                    tls: {
                        key: Fs.readFileSync(process.env.SSL_KEY_PATH),
                        cert: Fs.readFileSync(process.env.SSL_CERT_PATH)
                    }
                }
            ] :
            [
                { port: 8000, host: '0.0.0.0' }
            ];

        callback(null, manifest);
    });
};
