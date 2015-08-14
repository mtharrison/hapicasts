var Moment = require('moment');
var React = require('react');
var TagList = require('./TagList');

var VideoGridItem = module.exports = React.createClass({

    render: function () {

        var video = this.props.video;
        var className = 'video-preview medium-4 columns ' + (this.props.end ? 'end' : '');

        console.log(video);

        return (
            <div className={className}>
                <div className="inner">
                    <a href={'/#/videos/' + video.id} className="thumbnail" ><img src={video.thumbnail_large} /></a>
                    <a href={'/#/videos/' + video.id} ><h4>{video.title}</h4></a>
                    <p class="date">{video.upload_date ? Moment(new Date(video.upload_date)).fromNow() : ''}</p>
                    <TagList tags={video.tags}/>
                </div>
            </div>
        );
    }
});
