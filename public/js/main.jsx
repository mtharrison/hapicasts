var React = require('react');
var Router = require('react-router');
var Wreck = require('wreck');

var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var VideoGrid = require('./components/VideoGrid');

Wreck.get('/api/videos', { json: true }, function (err, res, payload) {

    if (err) {
        throw err;
    }

    var Home = React.createClass({

        render: function () {

            return (
                <VideoGrid videos={payload.videos}/>
            );
        }
    });

    var Video = React.createClass({

        contextTypes: {
            router: React.PropTypes.func
        },

        render: function () {

            console.log(this.context.router.getCurrentParams());

            return (
                <div>Hiya</div>
            );
        }
    });

    var NotFound = React.createClass({

        render: function () {

            return (
                <h1>NOT FOUND</h1>
            );
        }
    });

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
            <NotFoundRoute handler={NotFound}/>
        </Route>
    );

    Router.run(routes, function (Handler) {
        React.render(<Handler/>, document.getElementById('home'));
    });
});