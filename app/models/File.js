"use strict";

/**
 * Dependencies
 */

const extend = require('util')._extend;

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
 * Model instance methods implement
 */

function defaultTransformer(doc, ret, options){
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
