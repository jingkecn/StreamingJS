'use strict';

module.exports = {
    app: {
        title: 'STREAMING.JS',
        description: 'A MEAN application for RESTful API of streaming media - Technical project of 5th year.',
        keywords: 'mongodb, express, angularjs, node.js, mongoose, passport',
        googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
    },
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    templateEngine: 'swig',
    // Session Cookie settings
    sessionCookie: {
        // session expiration is set by default to 24 hours
        maxAge: 24 * (60 * 60 * 1000),
        // httpOnly flag makes sure the cookie is only accessed
        // through the HTTP protocol and not JS/browser
        httpOnly: true,
        // secure cookie should be turned to true to provide additional
        // layer of security so that the cookie is set only when working
        // in HTTPS mode.
        secure: false
    },
    // sessionSecret should be changed for security measures and concerns
    sessionSecret: process.env.SESSION_SECRET || 'MEAN',
    // sessionKey is set to the generic sessionId key used by PHP applications
    // for obsecurity reasons
    sessionKey: 'sessionId',
    sessionCollection: 'sessions',
    logo: 'modules/core/client/img/brand/logo.png',
    favicon: 'modules/core/client/img/brand/favicon.ico',
    uploads: {
        profileUpload: {
            dest: './modules/users/client/img/profile/uploads/', // Profile upload destination path
            limits: {
                fileSize: 1 * 1024 * 1024 // Max file size in bytes (1 MB)
            }
        },
        audios: {
            dest: './modules/audios/server/uploads/',
            limits: {
                fileSize: 3000 * 1024 * 1024,  // Max file size in bytes (10 MB)
                fileNameSize: 1 * 1024
            }
        },
        videos: {
            dest: './modules/videos/server/uploads/',
            limits: {
                fileSize: 300 * 1024 * 1024  // Max file size in bytes (300 MB)
            }
        }
    }
};
