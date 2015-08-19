var React = require('react');

var Suggestion = module.exports = React.createClass({

    upVote: function () {

        this.props.store.dispatch({ type: 'UPVOTE', id: this.props.suggestion.id });
    },

    downVote: function () {

        this.props.store.dispatch({ type: 'DOWNVOTE', id: this.props.suggestion.id });
    },

    render: function () {

        var tags = this.props.suggestion.tags.map(function (tag) {

            var className = 'request-suggestion-tag ' + tag;

            return (
                <div className={className}>{tag}</div>
            );
        });

        return (
            <div className="row">
                <div className="request-suggestion columns medium-10 medium-offset-1">
                    <div className="title">
                        {this.props.suggestion.title}
                        <button onClick={this.upVote}>u</button>
                        <button onClick={this.downVote}>d</button>
                    </div>
                    <div className="tags">{tags}</div>
                    <div className="votes">{this.props.suggestion.votes}</div>
                </div>
            </div>
        );
    }
});