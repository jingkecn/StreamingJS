/**
 * Created by piano on 2016-01-31.
 */
(function () {
    'use strict';

    angular
        .module('audios.services')
        .factory('AudiosService', AudiosService);

    AudiosService.$inject = ['$resource'];

    function AudiosService($resource) {
        return $resource('api/audios/:audioId', {
            audioId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
})();
