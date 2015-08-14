var React = require('react');

var NotFound = module.exports = React.createClass({

    render: function () {

        return (
            <div className="row">
                <div className="columns medium-12">
                    <div className="error">
                        <h3>404</h3>
                        <h3>NOT FOUND</h3>
                    </div>
                </div>
            </div>
        );
    }
});
