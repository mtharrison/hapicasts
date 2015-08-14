var React = require('react');
var VideoGridItem = require('./VideoGridItem');
var Wreck = require('wreck');

var VideoGrid = module.exports = React.createClass({

    getInitialState: function () {

        return { videos: [] };
    },

    componentDidMount: function () {

        var self = this;

        Wreck.get('/api/videos', { json: true }, function (err, res, payload) {

            self.setState({ videos: payload.videos });
        });
    },
    
    render: function () {

        var chunk = 3;
        var output = [];

        for (var i = 0, j = this.state.videos.length; i < j; i += chunk) {
            var row = this.state.videos.slice(i, i + chunk);
            output.push(
                <div className="row">
                    {row.map(function (video, index) {
                        return <VideoGridItem key={index} video={video} end={index === row.length - 1}/>
                    })}
                </div>
            );
        }

        return <div className="videoGrid">{output}</div>;
    }
});