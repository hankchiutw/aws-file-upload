"use strict";

/**
 * Dependencies
 */

const extend = require('util')._extend;
const fs = require('fs');

const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const s3Bucket = require("config/config").s3Bucket;

/**
 * User schema
 */

const Schema = require('./FileSchema');
const schema = new Schema();

/**
 * Models instance methods
 */

schema.methods = extend( schema.methods, {
    defaultTransformer
})

/**
 * Static methods
 */

schema.statics = extend( schema.statics, {
    createS3File
})

/**
 * Model instance methods implement
 */

function defaultTransformer(doc, ret, options){
    return ret;
}

/**
 * Static methods implement
 */

function _p(fn){
    return function(parent){
        let args = Array.prototype.slice.apply(arguments, [1]);
        return new Promise(function(resolve, reject){
            args[args.length] = function(err, data){
                if(err) reject(err);
                resolve(data);
            };
            fn.apply(parent, args);
        });
    };
}

function *createS3File(file){
    const fBuffer = yield _p(fs.readFile)(fs, file.path); 

    const params = {
        Bucket: s3Bucket,
        Key: file.filename,
        ACL: 'public-read',
        ContentType: file.mimetype,
        Metadata: {
            _source: JSON.stringify(file)
        },
        Body: fBuffer
    };

    yield _p(s3.putObject)(s3, params);

    let ret = s3.endpoint.href+s3Bucket+'/'+file.filename;
    return ret;
}


/**
 * Register
 */

const modelName = __filename.substring(__filename.lastIndexOf("/")+1, __filename.lastIndexOf("."));
module.exports = schema.registerModel(modelName);

/**
 * @apiDefine FileDefaultObject
 * @apiSuccessExample Default object
 * {
 *     size: Number,
 *     filename: String,
 *     mimeType: String,
 *     type: String,
 *     url: String,
 *
 *     (for image, optional)
 *     width: Number,
 *     height: Number,
 *     thumbImage: File default object,
 *
 *     objectId: String,
 *     createdAt: Date,
 *     updatedAt: Date
 * }
 */
