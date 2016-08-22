(function (angular) {
    'use strict';

    angular.module('rbc.petStore')
        .constant('rbc.petStore.commons.PetStoreConstant', {
            Pet_Features: [
               {
                              id:'id',
                              name:'ID'
               },
               {
                              id:'name',
                              name:'Name'
               },
               {
                              id:'tag',
                              name:'Tag'
               },
               {
                              id:'status',
                              name:'Status'
               },
               {
                              id:'uploadLink',
                              name:'Upload'
               },
               {
                              id:'downloadLink',
                              name:'Download'
               }
            ]
        });
})(angular);
