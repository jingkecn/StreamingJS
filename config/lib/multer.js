'use strict';

module.exports.profileUploadFileFilter = function (req, file, cb) {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

module.exports.audioUploadFileFilter = function (req, file, cb) {
    var fs = require('fs');
    var path = require('path');
    var config = require(path.resolve('./config/config'));
    if (file.mimetype !== 'audio/mp3' && file.mimetype !== 'audio/ogg' && file.mimetype !== 'audio/wav') {
        return cb(new Error('Only audio files are allowed!'), false);
    } else {
        fs.exists(config.uploads.audios.dest + file.originalname, function (exists) {
            if (exists)
                return cb(new Error('Files exist!'), false);
        });
    }
    cb(null, true);
};

module.exports.videoUploadFileFilter = function (req, file, cb) {
    var fs = require('fs');
    var path = require('path');
    var config = require(path.resolve('./config/config'));
    if (file.mimetype !== 'video/mp4' && file.mimetype !== 'video/ogg' && file.mimetype !== 'video/mpeg' && file.mimetype !== 'video/webm') {
        return cb(new Error('Only video files are allowed!'), false);
    } else {
        fs.exists(config.uploads.videos.dest + file.originalname, function (exists) {
            if (exists)
                return cb(new Error('Files exist!'), false);
        });
    }
    cb(null, true);
};
