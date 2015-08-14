var React = require('react');

var Video = module.exports = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function () {

        var id = this.context.router.getCurrentParams().id;

        return (
            <div>Hiya</div>
        );
    }
});
