var Jwt = require('jsonwebtoken');
var Path = require('path');

exports.register = function (server, options, next) {

    server.bind({
        events: options.events,
        mailer: options.mailer
    });

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: '.',
        relativeTo: Path.join(__dirname, 'templates'),
        layout: true,
        isCached: process.env.NODE_ENV === 'production'
    });

    options.events.on('newSuggestion', function (suggestion) {

        var token = Jwt.sign({ action: 'confirmSuggestion', id: suggestion.id }, process.env.JWT_SECRET);
        var ctx = { token: token, suggestion: suggestion };

        server.render('newSuggestion', ctx, function (err, rendered, config) {

            if (err) {
                throw err;
            }

            var mailOptions = {
                from: process.env.GMAIL_FROM_ADDRESS,
                to: process.env.GMAIL_ADMIN_ADDRESS,
                subject: 'Please confirm new suggestion',
                html: rendered
            };

            options.mailer.sendMail(mailOptions, function (err, info){

                if (err) {
                    throw err;
                }
            });
        });
    });

    next();
};


exports.register.attributes = { name: 'mailer' };
