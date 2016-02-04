'use strict';

module.exports.profileUploadFileFilter = function (req, file, cb) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

module.exports.videoUploadFileFilter = function (req, file, cb) {
  if (file.mimetype !== 'video/mp4' && file.mimetype !== 'video/ogg' && file.mimetype !== 'video/mpeg' && file.mimetype !== 'video/webm') {
    return cb(new Error('Only video files are allowed!'), false);
  }
  cb(null, true);
};
