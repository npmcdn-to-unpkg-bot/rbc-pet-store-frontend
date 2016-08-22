module.exports = (function () {
    'use strict';

    // Plugins Dependencies
    var Server = require('karma').Server;

    // Interface
    return {
        unit: unit
    };

    function unit (callback) {
        var server = new Server({
            configFile: __dirname + '/../src/tests/karma.config.js'
        }, callback);
        server.start();
    }
})();