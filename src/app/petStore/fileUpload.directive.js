(function(angular) {
    'use strict';

    angular.module('rbc.petStore')
        .directive('fileUpload', FileUploadDirective);

        FileUploadDirective.$inject = [
            '$parse'
        ];

        function FileUploadDirective($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileUpload);
                  var modelSetter = model.assign;

                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
        }

})(angular);
