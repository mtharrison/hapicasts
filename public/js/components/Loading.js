var React = require('react');

var Loading = module.exports = React.createClass({

    render: function () {

        var className = this.props.loaded ? 'hide' : '';

        return  (
            <div className={className}>
                <img className="loading" src="/public/images/helmet.png" alt=""/>
                <h3 className="text-center">Loading...</h3>
            </div>
        );
    }
});
