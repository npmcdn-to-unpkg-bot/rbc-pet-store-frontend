(function(angular) {
    'use strict';

    angular.module('rbc.petStore')
        .factory('rbc.petStore.commons.PetStoreFactory', PetStoreFactory);

    PetStoreFactory.$inject = [
        '$resource',
    ];

    function PetStoreFactory($resource) {
        var baseUrl = 'http://localhost:8080/petstore/v1/pets';
        return {
            petResource: petResource,
            uploadFile: uploadFile,
            getImage: getImage
        };

        function petResource() {
            return $resource(
                baseUrl + "/:id",
                null,
                {
                    save: {
                        method: 'POST'
                    },
                    update: {
                        method: 'PUT'
                    }
                }
            );
        }

        function uploadFile() {
            return $resource(
                baseUrl + '/:id/uploadImage?overrideImage=:override',
                null,
                {
                    save: {
                        method: 'POST',
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }
                }
            );
        }

        function getImage() {
            return $resource(
                'http://localhost:8080/petstore/v1/pets/:id/image',
                null,
                {
                    get: {
                        method: 'GET',
                        responseType: 'arraybuffer',
                        transformResponse: function (data, headers) {
                            var image;
                            if(data) {
                                image = new Blob([data], {
                                    type: 'image/jpeg'
                                });
                            }
                            return {
                                file: image
                            };
                        }
                    }
                }
            );
        }
    }

})(angular);
