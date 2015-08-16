var Link = require('react-router').Link;
var React = require('react');

var Header = module.exports = React.createClass({

    render: function () {

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
                            <li><Link to="page" params={{ name: 'request '}}>Request video</Link></li>
                            |
                            <li><a href="/login">Sign in with Github</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
});
