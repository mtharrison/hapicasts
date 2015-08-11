var React = require('react');
var Wreck = require('wreck');

var VideoGrid = require('./components/VideoGrid');

Wreck.get('/api/videos', { json: true }, function (err, res, payload) {

    if (err) {
        throw err;
    }

    React.render(<VideoGrid videos={payload.videos}/>, document.getElementById('home'));
});
