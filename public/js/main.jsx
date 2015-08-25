// Load Modules

var _ = require('lodash');
var React = require('react');
var Redux = require('redux');
var Wreck = require('wreck');

// Load Components

var SuggestionsApp = require('./components/SuggestionsApp');

var handleNewSuggestion = function (action) {

    var options = { payload: JSON.stringify({ title: action.title }), json: 'force' };
    Wreck.post('/api/suggestion', options, function (err, response, payload) {

        store.dispatch({ type: 'SERVER_DATA', data: payload });
    });
};

var rehydrate = function () {

    var options = { json: 'force' };
    Wreck.get('/api/suggestion', options, function (err, response, payload) {

        store.dispatch({ type: 'SERVER_DATA', data: payload });
    });
};

var reducer = function (state, action) {

    switch(action.type) {
        case 'SERVER_DATA':
            return _.assign({}, state, {
                suggestions: action.data.suggestions,
                requestsAllowed: action.data.allowed
            });
        break;
        case 'NEW_SUGGESTION':

            handleNewSuggestion(action);

            return state;
        break;
        case 'DOWNVOTE':
            return _.assign({}, state, {
                suggestions: state.suggestions.map(function (item) {

                    if (item.id === action.id) {
                        return _.assign({}, item, { votes: item.votes - 1 });
                    }

                    return item
                })
            });

        break;
        case 'UPVOTE':
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

var store = Redux.createStore(reducer, { suggestions: [], requestsAllowed: true });

rehydrate();

var render = function () {

    React.render(<SuggestionsApp store={store}/>, document.getElementById('request'));
};

if (document.getElementById('request')) {
    store.subscribe(render);
    render();
}
