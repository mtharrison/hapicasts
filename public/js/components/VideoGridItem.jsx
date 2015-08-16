var Moment = require('moment');
var React = require('react');
var TagList = require('./TagList');

var Link = require('react-router').Link;

var VideoGridItem = module.exports = React.createClass({

    render: function () {

        var video = this.props.video;
        var className = 'video-preview medium-4 columns ' + (this.props.end ? 'end' : '');

        return (
            <Link to="video" params={{ id: video.id }} className={className}>
                <div className="inner">
                    <div className="thumb-container">
                        <img className="playButton" src="/public/images/play.png"/>
                        <img src={video.thumbnail_large.replace('http', 'https')} />
                    </div>
                    <h4>{video.title}</h4>
                    <p className="date">{video.upload_date ? Moment(new Date(video.upload_date)).fromNow() : ''}</p>
                </div>
            </Link>
        );
    }
});
