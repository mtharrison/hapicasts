// Load modules

var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var Wreck = require('wreck');


// Import react router classes

var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


// Load routess

var Home = require('./routes/home');
var NotFound = require('./routes/not-found');
var Page = require('./routes/page');
var Video = require('./routes/video');


var App = React.createClass({

    render: function () {

        return (
            <div className="App">
                <RouteHandler/>
            </div>
        );
    }
});

var routes = (
    <Route handler={App} path="/">
        <DefaultRoute handler={Home} />
        <Route name="video" path="/videos/:id" handler={Video} />
        <Route name="page" path="/pages/:name" handler={Page} />
        <NotFoundRoute handler={NotFound}/>
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById('home'));
});
