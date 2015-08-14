var Fs = require('fs');
var Path = require('path');


var internals = { };


internals.config = module.exports = { };


internals.config.manifest = {
    connections: [
        { port: 8080, host: '0.0.0.0' }
    ],
    plugins: {
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


if (process.env.NODE_ENV === 'production') {
    internals.config.manifest = {
        connections: [
            { port: 80 },
            {
                port: 443,
                tls: {
                    key: Fs.readFileSync(process.env.SSL_KEY_PATH),
                    cert: Fs.readFileSync(process.env.SSL_CERT_PATH)
                }
            }
        ],
        plugins: {
            './plugins/teaser': { },
            './plugins/https-only': { }
        }
    };
}
