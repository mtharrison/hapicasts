var Moment = require('moment');
var React = require('react');
var TagList = require('./TagList');

var VideoGridItem = module.exports = React.createClass({

    render: function () {

        var video = this.props.video;
        var className = 'video-preview medium-4 columns ' + (this.props.end ? 'end' : '');

        return (
            <a href={'/#/videos/' + video.id} className={className}>
                <img src={video.thumbnail_large} />
                <h4>{video.title}</h4>
                <p class="date">{Moment(new Date(video.upload_date)).fromNow()}</p>
                <TagList tags={video.tags}/>
            </a>
        );
    }
});
