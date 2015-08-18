// Load Modules

var _ = require('lodash');
var React = require('react');
var Redux = require('redux');

// Load Components

var SuggestionsApp = require('./components/SuggestionsApp');


var reducer = function (state, action) {

    switch(action.type) {
        case 'newSuggestion':
            return _.assign({}, state, {
                requestsAllowed: false,
                suggestions: [].concat(state.suggestions, {
                    id: state.suggestions + 1,
                    title: action.title,
                    votes: 1,
                    tags: ['needs-moderation']
                })
            });
        break;
        case 'downVote':
            return _.assign({}, state, {
                suggestions: state.suggestions.map(function (item) {

                    if (item.id === action.id) {
                        return _.assign({}, item, { votes: item.votes - 1 });
                    }

                    return item
                })
            });

        break;
        case 'upVote':
            return _.assign({}, state, {
                suggestions: state.suggestions.map(function (item) {

                    if (item.id === action.id) {
                        return _.assign({}, item, { votes: item.votes + 1 });
                    }

                    return item
                })
            });
        break;
        default:
            return state;
    }
};

var store = Redux.createStore(reducer, {
    requestsAllowed: true,
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
});

var render = function () {

    React.render(<SuggestionsApp store={store}/>, document.getElementById('request'));
};

if (document.getElementById('request')) {
    store.subscribe(render);
    render();
}
