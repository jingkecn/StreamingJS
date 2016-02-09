'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Videos Schema
 */
var VideosSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    filename: {
        type: String,
        default: '',
        trim: true,
        required: 'Filename cannot be blank'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Videos', VideosSchema);
