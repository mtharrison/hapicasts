About
================================

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae magna dui. In id dolor viverra, pharetra ipsum non, volutpat erat. Nunc ultrices scelerisque lectus, non aliquet purus. Phasellus eu purus eros. Suspendisse ultricies ut tortor vel pharetra. Phasellus mattis ac mauris blandit convallis. Nulla facilisi. Integer euismod quam sit amet imperdiet iaculis. Aenean dignissim gravida convallis. Cras nec feugiat metus. Phasellus purus neque, laoreet congue nibh vel, tincidunt iaculis quam. Ut sagittis velit vel laoreet congue. Nunc nec augue quis nibh viverra vehicula. Integer tincidunt id est pellentesque imperdiet. Donec id mi eu odio sagittis vehicula nec a enim.

```javascript
exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/videos',
        handler: function (request, reply) {

            server.methods.getAllVideos(function (err, videos) {

                if (err) {
                    return reply(err);
                }

                reply(videos);
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/page/{page}',
        handler: function (request, reply) {

            server.methods.getPage(request.params.page, function (err, contents) {

                if (err) {
                    throw err;
                }

                reply(contents);
            });
        }
    });

    next();
};


exports.register.attributes = { name: 'api' };
```