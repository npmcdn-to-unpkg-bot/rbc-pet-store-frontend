(function() {
    'use strict';
    angular.module('rbc.petStore')
        .run(ModuleRun);

    ModuleRun.$inject = [
        'rbc.core.states.StatesProvider',
        'rbc.core.states.StatesConstant'
    ];
    function ModuleRun(StatesProvider, StatesConstant) {
        var states = [
            {
                state: StatesConstant.PETSTORE,
                config: {
                    url: '/petstore',
                    templateUrl: 'petStore/petStore.template.html',
                    controller: 'rbc.petStore.PetStoreController as vm'
                }
            }
        ];
        StatesProvider.configureStates(states);
    }
}());
