(function(angular) {
    'use strict';

    angular.module('rbc.petStore')
        .controller('rbc.petStore.PetStoreController', PetStoreController);

    PetStoreController.$inject = [
        '$q',
        '$scope',
        '$uibModal',
        'rbc.petStore.commons.PetStoreService',
        'rbc.petStore.commons.PetStoreConstant'
    ];

    function PetStoreController(
        $q,
        $scope,
        $uibModal,
        PetStoreService,
        PetStoreConstant

    ) {
        var vm = this;
        vm.pets = [];
        vm.newPet = null;
        vm.isAddEnable = true;
        vm.isEditingEntry = false;
        vm.isEditEnable = false;
        vm.showFilters = false;
        vm.disableFilterButton = false;
        vm.backupPet = {};
        vm.petFeatures = PetStoreConstant.Pet_Features;
        vm.successMessage = null;
        vm.errorMessage = null;
        var backupPetStore = [];

        vm.getPets = getPets;
        vm.createNewPet = createNewPet;
        vm.validatePet = validatePet;
        vm.addNewPet = addNewPet;
        vm.findPet = findPet;
        vm.deletePet = deletePet;
        vm.cancelNewPet = cancelNewPet;
        vm.enableEditOrSave = enableEditOrSave;
        vm.enableDeleteOrCancel = enableDeleteOrCancel;
        vm.openPetInEditMode = openPetInEditMode;
        vm.openFileUpload = openFileUpload;
        vm.getImage = getImage;
        vm.filterPetStore = filterPetStore;

        // OPERATIONS ON PETS
        function getPets() {
            PetStoreService.getPets().then(onSuccess, onError);

            function onSuccess(data) {
                vm.pets = data;
                backupPetStore = data;
                vm.errorMessage = '';
            }

            function onError(response) {
                vm.successMessage = '';
                if (response.status >= 400 && response.status < 500 && response.data && response.data.cause) {
                    vm.errorMessage = response.data.cause;
                } else {
                    vm.errorMessage = 'Sorry, unable to load pets in store. Please try again after sometime.';
                }
            }
        }

        function filterPetStore(feature) {
            var filteredPets = [];
            if(vm.searchPet[feature]) {
                _.forEach(backupPetStore, function(pet) {
                    var petInfo = pet[feature];
                    var searchKey = vm.searchPet[feature];
                    if(_.startsWith(petInfo.toString().toUpperCase(), searchKey.toUpperCase())) {
                        filteredPets.push(pet);
                    }
                });
                vm.pets = filteredPets;
            } else {
                vm.pets = backupPetStore;
            }
        }

        function enableEditOrSave(pet) {
            if(!pet.isEdit) {
                vm.disableFilterButton = true;
                pet.isEdit = !pet.isEdit;
                vm.isEditEnable = true;
                vm.backupPet = angular.copy(pet);
                vm.successMessage = '';
                vm.errorMessage = '';
            } else {
                validatePet(pet);
            }
        }


        function enableDeleteOrCancel(pet) {
            if(!pet.isEdit) {
                deletePet(pet);
            } else {
                pet.isEdit = !pet.isEdit;
                pet.name = vm.backupPet.name;
                pet.status = vm.backupPet.status;
                pet.tag = vm.backupPet.tag;
                vm.isAddEnable = true;
                vm.isEditEnable = false;
                vm.disableFilterButton = false;
                vm.successMessage = '';
                vm.errorMessage = '';
                vm.backupPet = {};
            }
            vm.isAddEnable = true;
        }

        function updatePet(pet) {
            PetStoreService.updatePet(pet).then(onSuccess, onError);

            function onSuccess(data) {
                pet.isEdit = false;
                vm.errorMessage = '';
                vm.successMessage = 'Pet update successful!';
            }

            function onError(response) {
                vm.successMessage = '';
                if (response.status >= 400 && response.status < 500 && response.data && response.data.cause) {
                    vm.errorMessage = response.data.cause;
                } else {
                    vm.errorMessage = 'Sorry, unable to update pet. Please try again after sometime.';
                }
            }
        }

        function addNewPet() {
            PetStoreService.addNewPet(vm.newPet).then(onSuccess, onError);

            function onSuccess() {
                vm.newPet = null;
                vm.isAddEnable = true;
                vm.errorMessage = '';
                vm.successMessage = 'Pet addition to store successful!';
                getPets();
            }

            function onError(response) {
                vm.successMessage = '';
                if (response.status >= 400 && response.status < 500 && response.data && response.data.cause) {
                    vm.errorMessage = response.data.cause;
                } else {
                    vm.errorMessage = 'Sorry, unable to add new pet to store. Please try again after sometime.';
                }
            }
        }

        function deletePet(pet) {
            PetStoreService.deletePet(pet).then(onSuccess, onError);

            function onSuccess() {
                vm.errorMessage = '';
                vm.successMessage = 'Pet removal succesful!';
                vm.pets = _.remove(vm.pets, function(p) {
                    return p.id !== pet.id;
                });
            }

            function onError(response) {
                vm.successMessage = '';
                if (response.status >= 400 && response.status < 500 && response.data && response.data.cause) {
                    vm.errorMessage = response.data.cause;
                } else {
                    vm.errorMessage = 'Sorry, unable to delete pet from store. Please try again after sometime.';
                }
            }
        }

        function validatePet(pet) {
            if(_.isEmpty(pet.name) || _.isEmpty(pet.status) || _.isEmpty(pet.tag)) {
                vm.errorMessage = "Pet name, tag and status are mandatory fields. It cannot be left blank.";
                if(!_.isNil(pet.id)) {
                    pet.isEdit = true;
                }
                return;
            }
            if(_.isNil(pet.id)) {
                addNewPet(pet);
            } else {
                updatePet(pet);
                vm.isEditEnable = false;
            }
        }

        function findPet(pet) {
            PetStoreService.findPet(pet.id).then(onSuccess, onError);

            function onSuccess(data) {
                vm.errorMessage = '';
                vm.pets = data;
            }

            function onError(response) {
                if (response.status >= 400 && response.status < 500 && response.data && response.data.cause) {
                    vm.errorMessage = response.data.cause;
                } else {
                    vm.errorMessage = 'Sorry, unable to find pet from store. Please try again after sometime.';
                }
            }
        }

        function createNewPet() {
            vm.isAddEnable = false;
            vm.disableFilterButton = true;
            vm.successMessage = '';
            vm.errorMessage = '';
            vm.newPet = {
                name: '',
                status: '',
                tag: ''
            };
        }

        function cancelNewPet() {
            vm.newPet = null;
            vm.isAddEnable = true;
            vm.isEditEnable = false;
            vm.disableFilterButton = false;
            vm.successMessage = '';
            vm.errorMessage = '';

        }

        function openPetInEditMode(feature) {
            if(feature.id === 'name' || feature.id === 'status' || feature.id === 'tag') {
                return true;
            } else {
                return false;
            }
        }

        function openFileUpload(pet) {
            vm.successMessage = '';
            vm.errorMessage = '';
            var modalInstance = $uibModal.open({
                templateUrl: 'petStore/fileUpload.template.html',
                controller: 'rbc.petStore.FileUploadController as vm',
                resolve: {
                    id: function () {
                        return pet.id;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function getImage(pet) {
            PetStoreService.getImage(pet).then(onSuccess, onError);

            function onSuccess() {

            }

            function onError(response) {
                if (response.status >= 400 && response.status < 500) {
                    if(response.status === 404) {
                        vm.errorMessage = 'Sorry! No image found for pet.';
                    }
                } else {
                    vm.errorMessage = 'Sorry, unable to find pet from store. Please try again after sometime.';
                }
            }
        }

        function initialize() {
            getPets();
        }

        initialize();
    }
})(angular);
