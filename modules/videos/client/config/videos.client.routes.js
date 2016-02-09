'use strict';

//Setting up route
angular.module('videos').config(['$stateProvider',
  function($stateProvider) {
    // Videos state routing
    $stateProvider
      .state('videos', {
        url: '/videos/:videoId',
        templateUrl: 'modules/videos/client/views/videos.client.view.html',
        controller: 'VideosController'
      });
  }
]);
