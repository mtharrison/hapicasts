var Fs = require('fs');
var Path = require('path');


var internals = { };


internals.config = module.exports = { };


internals.config.manifest = {
    connections: [
        { port: 8080 }
    ],
    plugins: {
        './teaser': { }
    }
};


if (process.env.NODE_ENV === 'production') {
    internals.config.manifest = {
        connections: [
            { port: 80 },
            {
                port: 443,
                tls: {
                    key: Fs.readFileSync(Path.join('/etc/ssl', 'hapicasts.com.key')),
                    cert: Fs.readFileSync(Path.join('/etc/ssl', 'hapicasts.com.crt'))
                }
            }
        ],
        plugins: {
            './teaser': { },
            './https-only': { }
        }
    };
}
