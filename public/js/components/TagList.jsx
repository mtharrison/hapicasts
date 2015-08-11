var React = require('react');

var TagList = module.exports = React.createClass({
    displayName: 'TagList',
    render: function () {

        var tags = this.props.tags || [];
        tags = tags.map(function (tag) {

            return <span>{tag}</span>
        });

        return (
            <div className="tagList">
                {tags}
            </div>
        );
    }
});
