/**
 * Created by piano on 2016-01-31.
 */
(function () {
    'use strict';

    angular.module('audios').controller('AudiosController', AudiosController);

    AudiosController.$inject = ['$scope', '$state', '$window',
        'audioResolve', 'Authentication', 'FileUploader', 'AudiosService'];

    function AudiosController($scope, $state, $window, audio, Authentication, FileUploader, AudiosService) {
        var vm = this;

        vm.audios = AudiosService.query();

        vm.audio = audio;
        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};

        // Remove existing audio
        vm.remove = function () {
            if (confirm('Are you sure you want to delete this audio?')) {
                vm.audio.$remove($state.go('audios.list'));
            }
        };

        // Save Audio
        vm.save = function (isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.audioForm');
                return false;
            }

            if (vm.audio._id) {
                vm.audio.$update(successCb, failureCb);
            } else {
                vm.audio.$save(successCb, failureCb);
            }

            function successCb(res) {
                $state.go('audios.view', {
                    audioId: res._id
                });
            }

            function failureCb(res) {
                vm.error = res.data.message;
            }
        };

        $scope.uploader = new FileUploader({
            url: 'api/audios',
            alias: 'audioUploader'
        });

        $scope.uploader.filters.push({
            name: 'audioFilter',
            fn: function (item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|mp3|ogg|wav|'.indexOf(type) !== -1;
            }
        });

        $scope.uploader.onAfterAddingFile = function (fileItem) {
            if ($window.FileReader) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(fileItem._file);
                fileReader.onprogress = updateProgress;
                fileReader.onload = function (fileReaderEvent) {
                    $scope.audioUploadOnProgress = false;
                    $scope.audioUploadSuccess = $scope.audioUploadError = null;
                    $scope.uploader.uploadAll();
                };
            }
        };

        function updateProgress(evt) {
            $scope.audioUploadOnProgress = true;
            if (evt.lengthComputable) {
                $scope.uploadProgress = Math.round((evt.loaded / evt.total) * 100);
            }
        }

        $scope.uploader.onSuccessItem = function (fileItem, res, status, headers) {
            //$scope.fileItem = fileItem;
            console.debug('file item', fileItem);
            $scope.audioUploadSuccess = true;
            $scope.audioUploaded = res;
            $scope.uploader.clearQueue();
            $state.go('audios.view', {
                audioId: res._id
            });
        };

        $scope.uploader.onErrorItem = function (fileItem, res, status, headers) {
            $scope.uploader.clearQueue();
            $scope.audioUploadError = res.message;
            $state.go('audios.list');
        };
    }
})();
