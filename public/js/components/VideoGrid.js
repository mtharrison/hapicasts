var React = require('react');
var VideoGridItem = require('./VideoGridItem');

var VideoGrid = module.exports = React.createClass({
    
    render: function () {

        var chunk = 3;
        var output = [];

        for (var i = 0, j = this.props.videos.length; i < j; i += chunk) {
            var row = this.props.videos.slice(i, i + chunk);
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
