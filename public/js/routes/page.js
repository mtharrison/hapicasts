var React = require('react');

var Pages = {
    about: {
        title: 'About',
        content: '<p>Hiiii</p>'
    }
};

var Page = module.exports = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function () {

        var name = this.context.router.getCurrentParams().name;
        var page = Pages[name];

        return (
            <div className="row">
                <div className="columns medium-12">
                    <div className="error">
                        <h2>{page.title}</h2>
                        <div dangerouslySetInnerHTML={{__html: page.content }} />
                    </div>
                </div>
            </div>
        );
    }
});
