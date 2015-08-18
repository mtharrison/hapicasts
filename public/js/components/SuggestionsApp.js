var React = require('react');
var Suggestion = require('./Suggestion');

var SuggestionsApp = module.exports = React.createClass({

    add: function () {

        var value = $('#request-input').val();
        this.props.store.dispatch({ type: 'newSuggestion', title: value});
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

        var store = this.props.store;

        var suggestions = store.getState().suggestions.sort(sort).map(function (item) {

            return <Suggestion store={store} suggestion={item}/>;
        });

        var input = store.getState().requestsAllowed ? 
            <div className="row">
                <div className="request-input-container columns medium-8 medium-offset-2">
                    <input type="text" name="" id="request-input" className="request-input"/>
                    <button onClick={this.add} className="request-submit">Request</button>
                </div>
            </div> :
            <h2>Thanks for your suggestions!</h2>;

        return (
            <div>
                {input}
                <div className="request-suggestions">
                    {suggestions}
                </div>
            </div>
        );
    }
});
