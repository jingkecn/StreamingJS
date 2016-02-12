'use strict';

angular.module('videos').controller('VideosController', ['$scope', '$window', 'Authentication', 'FileUploader', 'Videos', '$stateParams', '$state',
    function ($scope, $window, Authentication, FileUploader, Videos, $stateParams, $state) {
        // Controller Logic
        // ...
        if ($stateParams.videoId) {
            $scope.currentVideo = "api/videos/play/" + $stateParams.videoId;
        }
        $scope.currentvideoId = $stateParams.videoId;
        $scope.user = Authentication.user;
        $scope.videos = Videos.query();

        $scope.uploader = new FileUploader({
            url: 'api/videos',
            alias: 'uploadVideo'
        });

        $scope.uploader.filters.push({
            name: 'videoFilter',
            fn: function (item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|mp4|ogg|mpeg|webm|'.indexOf(type) !== -1;
            }
        });

        $scope.uploader.onAfterAddingFile = function (fileItem) {
            if ($window.FileReader) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(fileItem._file);
                fileReader.onload = function (fileReaderEvent) {
                    $scope.uploader.uploadAll();
                };
            }
        };

        $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
            // Show success message
            $scope.success = true;
            // $scope.videoUploaded = response;
            $scope.uploader.clearQueue();
            $state.go('videos', {'videoId': response._id});
        };

        // Called after the user has failed to uploaded a new picture
        $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
            $scope.uploader.clearQueue();
            // Show error message
            $scope.error = response.message;
        };

        $scope.remove = function (video) {
            if (confirm('Are you sure you want to delete?')) {
                if ($scope.currentvideoId === video._id)
                    video.$remove($state.go('videos', {'videoId': ''}));
                else
                    video.$remove($state.reload());
            }
        };

    }
]);
