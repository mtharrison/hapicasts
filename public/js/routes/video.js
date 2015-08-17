var React = require('react');

var Video = require('../components/Video');

var VideoRoute = module.exports = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function () {

        var id = this.context.router.getCurrentParams().id;

        return (
            <Video id={id}/>
        );
    }
});
