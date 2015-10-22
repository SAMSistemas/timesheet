(function() {
    var app = angular.module('directives');

    app.directive('selectStatus', function() {
        return {
            restrict: 'AE',
            scope: {
                ngModel: '=',
            },
            templateUrl: '/assets/select-status.html'
        };
    });

})();