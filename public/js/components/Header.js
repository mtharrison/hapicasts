var Link = require('react-router').Link;
var React = require('react');
var Wreck = require('wreck');

var Header = module.exports = React.createClass({

    getInitialState: function () {

        return {};
    },

    componentDidMount: function () {

        var self = this;

        Wreck.get('/account', { json: 'force' }, function (err, res, payload) {

            if (err) {
                throw err;
            }

            self.setState({ account: payload });
        });
    },

    render: function () {

        var login = this.state.account ? 
            <li><a href="/logout">Signed in as {this.state.account.displayName}. Log out?</a></li> :
            <li><a href="/login">Sign in with Github</a></li>;

        var request = this.state.account ?
            <li><Link to="page" params={{ name: 'request '}}>Request video</Link></li> :
            '';

        return  (
            <header>
                <div className="row">
                    <div className="columns large-6 large-offset-3">
                        <h1><Link to="home"><img src="/public/images/logo.png" alt="hapicasts"/></Link></h1>
                    </div>
                </div>
                <div className="row">
                    <nav className="columns large-12">
                        <ul>
                            <li><Link to="page" params={{ name: 'about '}}>What is this?</Link></li>
                            {request}
                            |
                            {login}
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
});
