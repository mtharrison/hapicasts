var React = require('react');

var TagList = module.exports = React.createClass({

    render: function () {

        var tags = this.props.tags || [];
        tags = tags.map(function (tag) {

            return <a href={"/#/videos/tags/" + tag}>{tag}</a>
        });

        return (
            <div className="tagList">
                {tags}
            </div>
        );
    }
});
