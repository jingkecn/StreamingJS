/**
 * Created by piano on 2016-01-31.
 */
'use strict';

/**
 * Modules dependencies
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var path = require('path');

var AudioSchema = new Schema({
    uploaded: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: ''
    },
    mediaInfo: {
        type: Schema.Types.Mixed,
        default: null
    },
    storageUrl: {
        type: String,
        default: ''
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Audio', AudioSchema);
