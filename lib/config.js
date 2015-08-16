var Fs = require('fs');
var Path = require('path');


var internals = {
    manifest: {}
};


internals.manifest = {
    plugins: {
        'inert': null,
        'vision': null,
        'yar': {
            cookieOptions: {
                password: process.env.COOKIE_PASS,
                isSecure: process.env.NODE_ENV === 'production'
            }
        },
        'bell': null,
        './plugins/github': {
            provider: 'github',
            password: process.env.GITHUB_API_PASSWORD,
            clientId: process.env.GITHUB_API_CLIENT_ID,
            clientSecret: process.env.GITHUB_API_CLIENT_SECRET
        },
        './plugins/web': null,
        './plugins/api': [
            {
                routes: { prefix: '/api' }
            }
        ]
    }
};


internals.manifest.connections = process.env.NODE_ENV === 'production' ?
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


exports.manifest = internals.manifest;
