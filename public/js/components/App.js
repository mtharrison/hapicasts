var React = require('react');
var Router = require('react-router');

// Import react router classes

var RouteHandler = Router.RouteHandler;

// Load components

var Header = require('./Header');


var App = module.exports = React.createClass({

    render: function () {

        return (
            <div className="App">
                <Header/>
                <div className="container"> 
                    <RouteHandler/>
                </div>
            </div>
        );
    }
});
