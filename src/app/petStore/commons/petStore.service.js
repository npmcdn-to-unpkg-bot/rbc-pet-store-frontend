(function(angular) {
    'use strict';

    angular.module('rbc.petStore')
        .service('rbc.petStore.commons.PetStoreService', PetStoreService);

    PetStoreService.$inject = [
        'rbc.petStore.commons.PetStoreFactory'
    ];

    function PetStoreService(PetStoreFactory) {
        this.getPets = getPets;
        this.addNewPet = addNewPet;
        this.updatePet = updatePet;
        this.findPet = findPet;
        this.deletePet = deletePet;
        this.uploadFile = uploadFile;
        this.getImage = getImage;

        function getPets() {
            return PetStoreFactory.petResource().query().$promise.then(parsePetStoreResponse);

            function parsePetStoreResponse(pets) {
                _.forEach(pets, function(pet){
                    pet.isEdit = false;
                });
                return pets;
            }
        }

        function addNewPet(pet) {
            return PetStoreFactory.petResource().save(pet).$promise;
        }

        function updatePet(pet) {
            return PetStoreFactory.petResource().update({
                id: pet.id
            }, pet).$promise;
        }

        function findPet(id) {
            return PetStoreFactory.get({
                id: id
            }).$promise;
        }

        function deletePet(pet) {
            return PetStoreFactory.petResource().remove({
                id: pet.id
            }).$promise;
        }

        function uploadFile(id, file, override) {
            var fd = new FormData();
            fd.append('file', file);
            return PetStoreFactory.uploadFile().save({
                id: id,
                override: override
            }, fd).$promise;
        }

        function getImage(pet) {
            return PetStoreFactory.getImage().get({
                id: pet.id
            }).$promise.then(function(data){
                saveAs(data.file, 'Pet.jpg');
            });
        }
    }
})(angular);
