var Jwt = require('jsonwebtoken');

exports.register = function (server, options, next) {

    server.bind({
        events: options.events,
        mailer: options.mailer
    });

    options.events.on('newSuggestion', function (suggestion) {

        var token = Jwt.sign({ action: 'confirmSuggestion', id: suggestion.id }, process.env.JWT_SECRET);

        var mailOptions = {
            from: process.env.GMAIL_FROM_ADDRESS,
            to: process.env.GMAIL_ADMIN_ADDRESS,
            subject: 'Please confirm new suggestion',
            html: '<p>There has been a new suggestion (' + suggestion.title + '). </p>\n' +
                  '<a href="http://hapicasts.com/api/suggestion/confirm?token=' + token + '">Please click here to accept.</a>' 
        };

        options.mailer.sendMail(mailOptions, function(error, info){

            if (error) {
                throw err;
            }
        });
    });

    next();
};


exports.register.attributes = { name: 'mailer' };
