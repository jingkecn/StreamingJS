/**
 * Created by piano on 2016-01-31.
 */
'use strict';

var audios = require('../controllers/audios.server.controller');

module.exports = function (app) {
    // Audios collection routes
    app.route('/api/audios')
        .get(audios.list)
        .post(audios.create);

    // Single audio routes
    app.route('/api/audios/:audioId')
        .get(audios.read)
        .put(audios.update)
        .delete(audios.delete);

    // Streaming
    app.route('/api/audios/stream/:audioId')
        .get(audios.stream);

    // Finish by binding the audio middleware
    app.param('audioId', audios.audioByID);
};
