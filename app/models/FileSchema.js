"use strict";

/**
 * Dependencies
 */

const BaseSchema = require('app/models/BaseSchema');
const ObjectId = BaseSchema.Types.ObjectId;

/**
 * Product schema
 */

const fields = {
    size: { type: Number, min: 0, max: 100*1024*1024 }, // bytes, max 100MB
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
    url: { type: String },
    tags: [{ type: ObjectId, ref: 'FileTag' }],
    type: { type: String, required: true, enum: [ 'image', 'audio', 'video', 'file'] },
    // TODO: set max and re-check db
    width: { type: Number, min: 0 }, // for image, (video?)
    height: { type: Number, min: 0 }, // for image, (video?)
    thumbImage: { type: ObjectId, ref: 'File' } // for image
};

class Schema extends BaseSchema {
    constructor(){
        super(fields);
    }
}

/**
 * Expose
 */

module.exports = Schema;

/**
 * @api {File} 存在雲端的檔案  File
 * @apiSampleRequest off
 * @apiName SchemaFile
 * @apiGroup 1_schema_file
 * @apiVersion 2.0.0
 *
 * @apiSuccessExample Schema fields
 * size: { type: Number, min: 0, max: 100*1024*1024 }, // bytes, max 100MB
 * filename: { type: String, required: true },
 * mimetype: { type: String, required: true },
 * url: { type: String },
 * tags: [{ type: ObjectId, ref: 'FileTag' }],
 * type: { type: String, required: true, enum: [ 'image', 'audio', 'video', 'file'] },
 * width: { type: Number, min: 0, max: 4096 }, // for image, (video?)
 * height: { type: Number, min: 0, max: 4096 }, // for image, (video?)
 * thumbImage: { type: ObjectId, ref: 'File' } // for image
 *
 * _id: ObjectId
 * objectId: virtual
 * disabled: { type: Boolean, default: false },
 * createdAt: { type: Date, default: Date.now },
 * updatedAt: Date
 *
 * @apiUse FileDefaultObject
 *
 */
