var React = require('react');
var Wreck = require('wreck');

var Video = module.exports = React.createClass({

    getInitialState: function () {

        return {};
    },

    componentDidMount: function () {

        var self = this;

        Wreck.get('/api/video/' + this.props.id, { json: 'force' }, function (err, res, payload) {

            self.setState({ video: payload });
        });
    },

    render: function () {

        var content = this.state.video ?
            <div>
                <h2>{this.state.video.title}</h2>
                <iframe src={'https://player.vimeo.com/video/' + this.state.video.id + '?portrait=0&badge=0'} width="500" height="400" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
            </div> :
            '';

        return (
            <div className="row">
                <div className="columns medium-8 medium-offset-2">
                   {content} 
                </div>
            </div>
        );
    }
});
