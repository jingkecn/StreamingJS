'use strict';

// Videos module config
angular.module('videos').run(['Menus',
  function (Menus) {
    // Config logic
    // ...
    Menus.addMenuItem('topbar', {
        title: 'Videos',
        state: 'videos',
        roles: ['*']
    })
  }
]);
