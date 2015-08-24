var Handlers = require('./handlers');

module.exports = [
    {
        method: 'POST',
        path: '/suggestion',
        handler: Handlers.newSuggestion
    },
    {
        method: 'GET',
        path: '/suggestion',
        handler: Handlers.getSuggestions
    },
    {
        method: 'GET',
        path: '/suggestion/confirm',
        handler: Handlers.confirmSuggestion
    }
];
