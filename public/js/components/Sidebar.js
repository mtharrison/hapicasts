var React = require('react');

var Sidebar = module.exports = React.createClass({

    render: function () {

        var className = 'columns medium-' + this.props.size;

        return (
            <div className={className}>
                <h3>Blah blah blah!</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae magna dui. In id dolor viverra, pharetra ipsum non, volutpat erat. Nunc ultrices scelerisque lectus, non aliquet purus.</p>
                <img src="/images/hjsia.png"/>
            </div>
        );
    }
});
