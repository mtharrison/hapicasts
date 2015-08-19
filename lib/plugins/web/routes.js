var Handlers = require('./handlers');

module.exports = [
    {
        method: 'GET',
        path: '/public/{p*}',
        handler: Handlers.public
    },
    {
        method: 'GET',
        path: '/',
        handler: Handlers.home
    },
    {
        method: 'GET',
        path: '/pages/{page}',
        handler: Handlers.page
    },
    {
        config: {
            pre: [
                'getVideo(params.id)',
                'getTranscript(params.id)',
                'getShowNotes(params.id)'
            ]
        },
        method: 'GET',
        path: '/video/{id}',
        handler: Handlers.video
    },
    {
        method: 'GET',
        path: '/request',
        handler: Handlers.request
    }
];
