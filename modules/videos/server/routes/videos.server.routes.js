'use strict';

var videos = require('../controllers/videos.server.controller');

module.exports = function (app) {
    // Routing logic
    // ...
    app.route('/api/videos').get(videos.list)
        .post(videos.create);

    app.route('/api/videos/:videoId').get(videos.read)
        .put(videos.update)
        .delete(videos.delete);

    app.route('/api/videos/play/:videoId').get(videos.play);

    // Finish by binding the video middleware
    app.param('videoId', videos.videoByID);
};
