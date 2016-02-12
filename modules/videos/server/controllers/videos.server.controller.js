'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Videos = mongoose.model('Videos'),
    path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    multer = require('multer'),
    config = require(path.resolve('./config/config'));

/**
 * Create a video
 */
exports.create = function (req, res) {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, config.uploads.videos.dest);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    var videoUploadFileFilter = require(path.resolve('./config/lib/multer')).videoUploadFileFilter;
    var upload = multer({
        storage: storage,
        fileFilter: videoUploadFileFilter,
        limits: {
            fileSize: 2048 * 1024 * 1024
        }
    }).single('uploadVideo');

    if (req.user) {
        upload(req, res, function (uploadError) {
            if (uploadError) {
                return res.status(400).send({
                    message: 'Error occurred while uploading videos'
                });
            }
            var video = new Videos();
            video.user = req.user;
            video.filename = req.file.filename;
            video.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(video);
                }
            });
        });
    }
};

/**
 * Show the current video
 */
exports.read = function (req, res) {
    res.json(req.video);
};

/**
 * Update a video
 */
exports.update = function (req, res) {

};

/**
 * Delete an
 */
exports.delete = function (req, res) {
    var video = req.video;
    var fs = require('fs');
    fs.unlink(config.uploads.videos.dest + video.filename, function (err) {
            if (err)
                res.json({'message': 'delete file failed!'});
            video.remove(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(video);
                }
            });
        }
    );
};

/**
 * List of
 */
exports.list = function (req, res) {
    Videos.find().sort('-created').populate('user', 'displayName').exec(function (err, videos) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(videos);
        }
    });
};

exports.play = function (req, res) {
    res.sendFile(path.resolve(config.uploads.videos.dest + req.video.filename));
};

/**
 * Video middleware
 */
exports.videoByID = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Video is invalid'
        });
    }

    Videos.findById(id).populate('user', 'displayName').exec(function (err, video) {
        if (err) {
            return next(err);
        } else if (!video) {
            return res.status(404).send({
                message: 'No video with that identifier has been found'
            });
        }
        req.video = video;
        next();
    });
};
