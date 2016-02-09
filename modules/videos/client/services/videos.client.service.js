'use strict';

angular.module('videos').factory('Videos', ['$resource',
    function ($resource) {
        // Videos service logic
        // ...

        // Public API
        return $resource('api/videos/:videoId', {
            videoId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
