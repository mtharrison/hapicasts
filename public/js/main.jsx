var React = require('react');
var EventEmitter = require('events');

var ev = new EventEmitter();

var Request = React.createClass({

    add: function () {

        var value = $('#request-input').val();

        console.log(data);

        data.suggestions.push({
            title: value,
            tags: [],
            votes: 0
        });
        ev.emit('update');
    },

    render: function () {

        var sort = function (a, b) {

            if (a.votes < b.votes) {
                return 1;
            }

            if (a.votes > b.votes) {
                return -1;
            }

            return 0;
        };

        var suggestions = this.props.data.suggestions.sort(sort).map(function (item) {

            return <Suggestion suggestion={item}/>;
        });

        return (
            <div>
                <div className="row">
                    <div className="request-input-container columns medium-8 medium-offset-2">
                        <input type="text" name="" id="request-input" className="request-input"/>
                        <button onClick={this.add} className="request-submit">Request</button>
                    </div>
                </div>
                <div className="request-suggestions">
                    {suggestions}
                </div>
            </div>
        );
    }
});

var Suggestion = React.createClass({

    upVote: function () {

        for (var i = 0; i < data.suggestions.length; i++) {
            if (data.suggestions[i].id === this.props.suggestion.id) {
                data.suggestions[i].votes++;
            }
        }
        ev.emit('update');
    },

    downVote: function () {

        for (var i = 0; i < data.suggestions.length; i++) {
            if (data.suggestions[i].id === this.props.suggestion.id) {
                data.suggestions[i].votes--
            }
        }
        ev.emit('update');
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

var request = document.getElementById('request');

if (request) {

    var data = {
        suggestions: [
            {
                id: 1,
                title: 'Smart Configuration with Confidence',
                tags: ['confirmed', 'in-progress'],
                votes: 24
            },
            {
                id: 2,
                title: 'Composing Plugins with Glue',
                tags: [],
                votes: 5
            },
            {
                id: 3,
                title: 'A/B Testing with Configuration',
                tags: ['confirmed'],
                votes: 16
            },
        ]
    };

    React.render(<Request data={data}/>, request);
}

ev.on('update', function () {

    React.render(<Request data={data}/>, request);
});
