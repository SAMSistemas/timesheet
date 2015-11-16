angular.module('directives')
    .directive('selectStatus', function () {
        return {
            restrict: 'AE',
            scope: {
                ngModel: '=',
            },
            templateUrl: '/assets/select-status.html'
        };
    });