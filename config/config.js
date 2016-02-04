'use strict';

/**
 * Dependencies
 */

global.logger = require('lib/logger');

const dev = require('./env/dev');
const test = require('./env/test');
const prod = require('./env/prod');
const extend = require('util')._extend;
const path = require('path');

const defaults = {
    s3Bucket: 'api-bucket-01',
    dbOptions: { server: { keepAlive: 256, auto_reconnect: true } },
    thumbWidth: 300,
    maxFileSize: 20*1024*1024,   // upload limits, bytes
    apiPath: '/api',
    uploadDir: path.join(__dirname, '..', 'public/uploads')
};

/**
 * Transform
 */

let ret = {
    dev: extend(dev, defaults),
    test: extend(test, defaults),
    prod: extend(prod, defaults)
}[process.env.NODE_ENV || 'dev'];

ret.hostUrl = 'http://'+ret.host+':'+ret.port;
ret.apiUrl = ret.hostUrl+ret.apiPath;
ret.publicApiUrl = ret.publicHostUrl+ret.apiPath;

/**
 * Expose
 */

module.exports = ret;
