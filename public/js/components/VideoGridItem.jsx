var Moment = require('moment');
var React = require('react');
var TagList = require('./TagList');

var VideoGridItem = module.exports = React.createClass({
    displayName: 'VideoGridItem',
    render: function () {

        console.log(this.props);

        var info = this.props.video.info;
        var video = this.props.video;
        var className = 'video-preview medium-4 columns ' + (this.props.end ? 'end' : '');

        return (
            <div className={className}>
                <img src={info.thumbnail_large} />
                <h4><a href={'/videos/' + info.id}>{info.title}</a></h4>
                <p class="date">{Moment(new Date(info.upload_date)).fromNow()}</p>
                <TagList tags={video.tags}/>
            </div>
        );
    }
});
