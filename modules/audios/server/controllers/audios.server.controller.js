/**
 * Created by piano on 2016-01-31.
 */
'use strict';

/**
 * Module dependencies
 * @type {*|exports|module.exports}
 */
var path = require('path');
var mongoose = require('mongoose');
var AudioModel = mongoose.model('Audio');
var errHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var getMediaInfo = require('mediainfoq');
var config = require(path.resolve('./config/config'));
var fs = require('fs');
var multer = require('multer');

/**
 * Create an audio
 * @param req
 * @param res
 */
exports.create = function (req, res) {
    var audio = new AudioModel(req.body);
    /*var audio = new AudioModel({
     user: req.user
     });*/
    // storage audio file
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, config.uploads.audios.dest);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });

    var audioUploadFileFilter = require(path.resolve('./config/lib/multer')).audioUploadFileFilter;
    var upload = multer({
        storage: storage,
        fileFilter: audioUploadFileFilter,
        limits: config.uploads.audios.limits
    }).single('audioUploader');

    if (req.user) {
        upload(req, res, function (err) {
            if (err) {
                console.error(err);
                return res.status(400).send({
                    message: errHandler.getErrorMessage(err)
                });
            }
            // retrieve media information
            getMediaInfo(path.resolve(config.uploads.audios.dest + req.file.filename)).then(function (mediaInfo) {
                audio.mediaInfo = mediaInfo[0];
                audio.title = audio.mediaInfo.track_name ? audio.mediaInfo.track_name : req.file.filename;
                audio.storageUrl = config.uploads.audios.dest + req.file.filename;
                audio.save(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errHandler.getErrorMessage(err)
                        });
                    } else {
                        res.json(audio);
                    }
                });
            }).catch(function (err) {
                console.error(err);
            });
        });
    }
};

/**
 * Show the current audio
 * @param req
 * @param res
 */
exports.read = function (req, res) {
    res.json(req.audio);
};

/**
 * Streaming audio
 * @param req
 * @param res
 */
exports.stream = function (req, res) {
    var audio = req.audio;
    var file = path.resolve(audio.storageUrl);
    /*res.sendFile(file, null, function (err) {
     if (err) {
     return res.status(err.statusCode).send({
     message: errHandler.getErrorMessage(err)
     });
     } else {
     console.log('STREAMING audio: ', audio.title);
     }
     });*/

    var range = req.headers.range;
    var positions = range.replace(/bytes=/, '').split('-');
    var start = parseInt(positions[0], 10);

    // Stream audio file
    fs.stat(file, function (err, stats) {
        var total = stats.size;
        var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        var chunkSize = (end - start) + 1;

        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': range
        });

        var stream = fs.createReadStream(file, {
            start: start,
            end: end
        }).on('open', function () {
            return stream.pipe(res);
        }).on('error', function (err) {
            return res.status(err.statusCode).send({
                message: errHandler.getErrorMessage(err)
            });
        });
    });
};

/**
 * Update an audio
 * @param req
 * @param res
 */
exports.update = function (req, res) {
    var audio = req.audio;

    audio.title = req.body.title;

    audio.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errHandler.getErrorMessage(err)
            });
        } else {
            res.json(audio);
        }
    });
};

/**
 * Delete an audio
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
    var audio = req.audio;

    audio.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errHandler.getErrorMessage(err)
            });
        } else {
            res.json(audio);
        }
    });
};

/**
 * List of Audios
 * @param req
 * @param res
 */
exports.list = function (req, res) {
    AudioModel.find().sort('-uploaded').populate('user', 'displayName').exec(function (err, audios) {
        if (err) {
            return res.status(400).send({
                message: errHandler.getErrorMessage(err)
            });
        } else {
            res.json(audios);
        }
    });
};


exports.audioByID = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Audio is invalid'
        });
    }

    AudioModel.findById(id).populate('user', 'displayName').exec(function (err, audio) {
        if (err) {
            return next(err);
        } else if (!audio) {
            return res.status(404).send({
                message: 'No audio with that identifier has been found'
            });
        }
        req.audio = audio;
        next();
    });
};
