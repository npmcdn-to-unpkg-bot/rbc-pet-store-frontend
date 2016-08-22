describe('petStore/commons/petStore.service.spec.js', function () {
    'use strict';

    var $scope;
    var deferred;
    var PetStoreFactory;
    var PetStoreService;
    var pets;
    var newPet;
    var petToBeUpdated;
    var petToBeDeleted;
    var imageToBeUploaded;
    var imageToBeDownloaded;
    var imageResponse = [];

    beforeEach(function () {
        module('rbc.petStore');

        angular.mock.inject([
            '$q',
            '$rootScope',
            'rbc.petStore.commons.PetStoreFactory',
            'rbc.petStore.commons.PetStoreService',
            function ($q, $rootScope, _PetStoreFactory_, _PetStoreService_) {
                deferred = $q.defer();
                $scope = $rootScope.$new();
                PetStoreFactory = _PetStoreFactory_;
                PetStoreService = _PetStoreService_;

                newPet = {
                    name : 'Dog',
                    status : 'Available',
                    tag : 'Animal'
                };

                pets = [
                    {
                        id: 1,
                        name : 'Dog',
                        status : 'Available',
                        tag : 'Animal'
                    },
                    {
                        id: 2,
                        name : 'Cat',
                        status : 'Available',
                        tag : 'Animal'
                    }
                ];

                petToBeUpdated = {
                    id: 1,
                    name : 'Dog',
                    status : 'Available',
                    tag : 'Animal'
                };

                petToBeDeleted = {
                    id: 1,
                    name : 'Dog',
                    status : 'Available',
                    tag : 'Animal'
                };

                imageToBeUploaded = [];
                imageResponse = new Blob([], {
                    type: 'image/jpeg'
                });

                imageToBeDownloaded = {
                    file: imageResponse
                };
            }
        ]);
    });

    it('should get the pets from store', function () {
        spyOn(PetStoreFactory, 'petResource').and.returnValue({
            query: function () {
                return {
                    $promise: deferred.promise
                };
            }
        });

        var response = PetStoreService.getPets();

        $scope.$apply(function () {
            deferred.resolve(pets);
        });

        expect(PetStoreFactory.petResource).toHaveBeenCalled();
        expect(response.$$state.value).toEqual(pets);
    });

    it('should add a new pet to store', function () {
        spyOn(PetStoreFactory, 'petResource').and.returnValue({
            save: function () {
                return {
                    $promise: deferred.promise
                };
            }
        });

        var response = PetStoreService.addNewPet(newPet);

        $scope.$apply(function () {
            deferred.resolve(newPet);
        });

        expect(PetStoreFactory.petResource).toHaveBeenCalled();
        expect(response.$$state.value).toEqual(newPet);
    });

    it('should update an existing pet in store', function () {
        spyOn(PetStoreFactory, 'petResource').and.returnValue({
            update: function () {
                return {
                    $promise: deferred.promise
                };
            }
        });

        var response = PetStoreService.updatePet(petToBeUpdated);

        $scope.$apply(function () {
            deferred.resolve(petToBeUpdated);
        });

        expect(PetStoreFactory.petResource).toHaveBeenCalled();
        expect(response.$$state.value).toEqual(petToBeUpdated);
    });

    it('should delete an existing pet from store', function () {
        spyOn(PetStoreFactory, 'petResource').and.returnValue({
            remove: function () {
                return {
                    $promise: deferred.promise
                };
            }
        });

        var response = PetStoreService.deletePet(petToBeDeleted);

        $scope.$apply(function () {
            deferred.resolve('204 No Content');
        });

        expect(PetStoreFactory.petResource).toHaveBeenCalled();
        expect(response.$$state.value).toEqual('204 No Content');
    });

    it('should upload an image fo an existing pet in store', function () {
        spyOn(PetStoreFactory, 'uploadFile').and.returnValue({
            save: function () {
                return {
                    $promise: deferred.promise
                };
            }
        });

        var response = PetStoreService.uploadFile(petToBeUpdated.id, imageToBeUploaded, false);

        $scope.$apply(function () {
            deferred.resolve('204 No Content');
        });

        expect(PetStoreFactory.uploadFile).toHaveBeenCalled();
        expect(response.$$state.value).toEqual('204 No Content');
    });

    it('should download an image fo an existing pet in store', function () {
        spyOn(PetStoreFactory, 'getImage').and.returnValue({
            get: function () {
                return {
                    $promise: deferred.promise
                };
            }
        });

        var response = PetStoreService.getImage(petToBeUpdated);

        $scope.$apply(function () {
            deferred.resolve(imageToBeDownloaded);
        });

        expect(PetStoreFactory.getImage).toHaveBeenCalledWith();
    });
});
