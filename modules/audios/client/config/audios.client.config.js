/**
 * Created by piano on 2016-01-31.
 */
(function () {
    'use strict';

    angular.module('audios').run(menuConfig);

    menuConfig.$inject = ['Menus'];

    function menuConfig(Menus) {
        Menus.addMenuItem('topbar', {
            title: 'Audios',
            state: 'audios.list',
            //type: 'dropdown',
            roles: ['*']
        });
    }
})();
