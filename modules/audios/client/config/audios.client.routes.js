/**
 * Created by piano on 2016-01-31.
 */
(function () {
    'use strict';

    angular.module('audios.routes').config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {

        $stateProvider.state('audios', {
            abstract: true,
            url: '/audios',
            template: '<ui-view/>'
        }).state('audios.list', {
            url: '',
            templateUrl: 'modules/audios/client/views/audios.client.view.html',
            controller: 'AudiosController',
            controllerAs: 'vm',
            resolve: {
                audioResolve: getAudio
            }
        }).state('audios.upload', {
            url: '/upload',
            templateUrl: 'modules/audios/client/views/audios.client.view.html',
            controller: 'AudiosController',
            controllerAs: 'vm',
            resolve: {
                audioResolve: getAudio
            },
            data: {
                roles: ['user', 'admin']
            }
        }).state('audios.update', {
            url: '/:audioId/update',
            templateUrl: 'modules/audios/client/views/audios.client.view.html',
            controller: 'AudiosController',
            controllerAs: 'vm',
            resolve: {
                audioResolve: getAudio
            },
            data: {
                roles: ['user', 'admin']
            }
        }).state('audios.view', {
            url: '/:audioId',
            templateUrl: 'modules/audios/client/views/audios.client.view.html',
            controller: 'AudiosController',
            controllerAs: 'vm',
            resolve: {
                audioResolve: getAudio
            }
        });
    }

    getAudio.$inject = ['$stateParams', 'AudiosService'];

    function getAudio($stateParams, AudiosService) {
        //console.debug('state params', $stateParams);
        return $stateParams.audioId ?
            AudiosService.get({
                audioId: $stateParams.audioId
            }).$promise : new AudiosService();
    }
})();
