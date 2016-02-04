'use strict';

/**
 * Dependencies
 */

const res = require('config/middlewares/res');
const cors = require('config/middlewares/cors');
const errorHandler = require("config/middlewares/errorHandler");

/**
 * Expose
 */

module.exports = function(app, auth){
    logger('Config routes ...');

/**
 * Common middlewares
 */

    app.use(cors);
    app.use(res);

/**
 * Routes
 */

    app.get('/', function(req, res){ res.ok('ok');});

    require('app/routes/file')(app, auth);

    app.use(errorHandler.clientErrorHandler);
};
