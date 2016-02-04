'use strict';

angular.module('videos').controller('VideosController', ['$scope', '$window', 'Authentication', 'FileUploader', 'Videos', '$stateParams',
  function ($scope, $window, Authentication, FileUploader, Videos, $stateParams) {
    // Controller Logic
    // ...
    if ($stateParams.videoId) {
    $scope.currentVideo = "api/videos/play/" + $stateParams.videoId;
    }
    $scope.currentvideoId = $stateParams.videoId;
    $scope.user = Authentication.user;
    $scope.videos = Videos.query();
    console.log($scope.users);
    console.log($scope.videos);

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
            }
        }
    }

    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;
      $scope.videoUploaded = response;
      $scope.uploader.clearQueue();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      $scope.uploader.clearQueue();
      // Show error message
      $scope.error = response.message;
    };


  }
]);
