(function() {
    'use strict';

    angular
        .module('directives')
        .directive('tsModalTitle', tsModalTitle);

    function tsModalTitle() {
        return {
            restrict: 'AE',
            scope: {
                action: '@',
                object: '@',
            },
            templateUrl: '/assets/ts-modal-title.html'
        };
    }
})();