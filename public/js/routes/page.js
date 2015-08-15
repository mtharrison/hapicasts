var React = require('react');
var Wreck = require('wreck');
var Page = require('../components/Page');


var PageRoute = module.exports = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function () {

        return (
            <Page name={this.context.router.getCurrentParams().name} />
        );
    }
});
