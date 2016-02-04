"use strict";

/**
 * Dependencies
 */

const mongoose = require('mongoose');
const extend = require('util')._extend;

/**
 * Class definition
 */

class BaseSchema extends mongoose.Schema {

    constructor(fields){
        /**
         * Extend with basic schema attributes
         */

        extend(fields, {
            _objectId: { type: String, unique: true, sparse: true },
            _source: { type: mongoose.Schema.Types.Mixed },
            disabled: { type: Boolean, default: false }
        });
        super(fields, { id: false, timestamps: true });

        /**
         * Configuration
         */

        let schema = this;

        schema.virtual('objectId').get(function(){ return this._id;});
        schema.set('toJSON', {virtuals: true});

        /**
         * Middleware hook
         */

        schema.pre("save", BaseSchema.buildHook(preSaveParamTransformer));
        schema.pre("update", BaseSchema.buildHook(preUpdateParamTransformer));
        schema.pre("findOneAndUpdate", BaseSchema.buildHook(preUpdateParamTransformer));

        /**
         * Instance methods of mongoose.model instance object(i.e. document)
         */

        schema.methods = {
            _defaultTransformer,
            _toJSON
        };

        /**
         * Static methods of mongoose.model 
         */

        schema.statics = {
            defaultQueryDecorator
        };

        /**
         * Validations
         */

        /*
        schema.path('path').validate(function(arr){
            let ret = true;
            return ret;
        }, '{PATH} should be ');
        */
    }

    registerModel(modelName){
        return mongoose.model(modelName, this, modelName);
    }

    static buildHook(fn){
        return function(next){
            fn.apply(this);
            next();
        }
    }
}

/**
 * Hook implements
 */

function preSaveParamTransformer(){
    this.updatedAt = Date.now();
    this.markModified("updatedAt");
}

function preUpdateParamTransformer(){
    const criteria = this.getUpdate();

    // dismiss null string
    Object.keys(criteria).forEach(function(attr){
        if(criteria[attr] === '' || criteria[attr] === null) delete criteria[attr];
    });

    Object.keys(criteria.$set).forEach(function(attr){
        if(criteria.$set[attr] === '' || criteria.$set[attr] === null) delete criteria.$set[attr];
    });
}

/**
 * Model instance method implements
 */

function _toJSON(role){
    let fn; 
    if(role && this[role+'Transformer']) fn = this[role+'Transformer'];
    else if(this.defaultTransformer) fn = this.defaultTransformer;

    let ret = this.toJSON({ transform: _defaultTransformer, virtuals: true});
    return fn.bind(this)(this, ret);

}

function _defaultTransformer(doc, ret, options){
    Object.keys(ret).forEach(attr => ret[attr] = ret[attr] instanceof Date ? ret[attr].toISOString() : ret[attr]);
    delete ret._id;
    delete ret.id;
    delete ret._objectId;
    delete ret._source;
    delete ret.password;
    delete ret.disabled;
    return ret;
}

/**
 * Static instance method implements
 */

function defaultQueryDecorator(q){
    return q.limit(50);
}

/**
 * Expose
 */

module.exports = BaseSchema;
