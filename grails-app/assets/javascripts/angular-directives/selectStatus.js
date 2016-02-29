angular
    .module('directives')
    .directive('selectStatus', selectStatus);

function selectStatus() {
    return {
        restrict: 'AE',
        scope: {
            ngModel: '=',
        },
        templateUrl: '/assets/select-status.html'
    };
}