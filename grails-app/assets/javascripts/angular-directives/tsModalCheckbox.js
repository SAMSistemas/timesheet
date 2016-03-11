(function() {
    'use strict';

    angular
        .module('directives')
        .directive('tsModalCheckbox', tsModalCheckbox);

    function tsModalCheckbox() {
        return {
            restrict: 'AE',
            scope: {
                label: '@',
                ngModel: '=',
            },
            templateUrl: '/assets/ts-modal-checkbox.html'
        };
    }
})();