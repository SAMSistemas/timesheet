(function() {
    'use strict';

    angular
        .module('directives')
        .directive('tsModalButton', tsModalButton);

    function tsModalButton() {
        return {
            restrict: 'AE',
            scope: {
                cuForm: '=',
                label: '@',
            },
            templateUrl: '/assets/ts-modal-button.html'
        };
    }
})();