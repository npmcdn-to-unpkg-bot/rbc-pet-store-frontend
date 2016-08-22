(function (angular) {
    'use strict';

    angular.module('rbc.petStore')
    .controller('rbc.petStore.FileUploadController', FileUploadController);

    FileUploadController.$inject = [
        '$uibModalInstance',
        'rbc.petStore.commons.PetStoreService',
        'id'
    ];

    function FileUploadController(
        $uibModalInstance,
        PetStoreService,
        id
    ) {
        var vm = this;
        vm.isImageAlreadyExist = false;
        vm.errorMessage = null;
        vm.successMessage = null;
        vm.validateFile = validateFile;
        vm.uploadFile = uploadFile;
        vm.closeFileUpload = closeFileUpload;


        function validateFile(override) {
            if(vm.myFile === null || vm.myFile === undefined) {
                vm.errorMessage = "Please provide an image to be uploaded.";
                return;
            }
            uploadFile(override);
        }


        function uploadFile(override) {
            PetStoreService.uploadFile(id, vm.myFile, override).then(onSuccess, onError);

            function onSuccess() {
                vm.errorMessage = '';
                vm.successMessage = 'File Uploaded Sucessfully!';
                vm.isImageAlreadyExist = false;
            }

            function onError(response) {
                vm.successMessage = '';
                if(response.status >= 400 && response.status < 500) {
                    if(response.status === 409) {
                        vm.isImageAlreadyExist = true;
                    }
                    vm.errorMessage = response.data.cause;
                } else {
                    vm.errorMessage = 'Sorry! Something went wrong while uploading image. Please try again after sometime.';
                }
            }
        }

        function closeFileUpload() {
            $uibModalInstance.close();
        }
    }
})(angular);
