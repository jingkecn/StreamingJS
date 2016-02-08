'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('audios');
ApplicationConfiguration.registerModule('audios.services');
ApplicationConfiguration.registerModule('audios.routes', ['ui.router', 'audios.services']);
