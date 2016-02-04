'use strict';

/**
 * Dependencies
 */

const _co = require('lib/_co');
const File = require("app/models/File");

/**
 * Expose
 */

module.exports = {
    create: _co(create)
};

/**
 *
 * Implements
 *
 */

function *create(req, res, next){
    logger('to create a file: ', req.files);
    if(req.files.length === 0) return next(logger.E('empty file'));

    let f = req.files[0];
    f.type = f.mimetype.split('/')[0];
    if(['text', 'audio', 'video', 'image'].indexOf(f.type) < 0) f.type = 'file';

    f.url = yield File.createS3File(f);

    res.ok(f);
}
