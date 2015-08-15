var React = require('react');
var Sidebar = require('../components/Sidebar');
var Wreck = require('wreck');


var Page = module.exports = React.createClass({

    getInitialState: function () {

        return { state: '' };
    },

    fetchPage: function (page) {

        var self = this;

        Wreck.get('/api/page/' + page, function (err, res, payload) {

            if (err) {
                throw err;
            }

            if (res.statusCode != 200) {
                return self.setState({ content: 'PAGE NOT FOUND' });
            }

            self.setState({ content: payload.toString() });
        });
    },

    componentWillReceiveProps: function (props) {

        this.fetchPage(props.name);
    },

    componentDidMount: function () {

        this.fetchPage(this.props.name);
    },

    render: function () {

        return (
            <div className="row">
                <div className="columns medium-9">
                    <div dangerouslySetInnerHTML={{__html: this.state.content }} />
                </div>
                <Sidebar size="3"/>
            </div>
        );
    }
});
