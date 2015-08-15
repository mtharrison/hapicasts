var React = require('react');


// Load components

var VideoGrid = require('../components/VideoGrid');
var Sidebar = require('../components/Sidebar');


var Home = module.exports = React.createClass({

    render: function () {

        return (
            <div className="row">
                <div className="columns medium-9">
                    <VideoGrid/>
                </div>
                <Sidebar size="3"/>
            </div>
        );
    }
});
