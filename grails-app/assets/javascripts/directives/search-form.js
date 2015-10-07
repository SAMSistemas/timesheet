(function() {
    var app = angular.module('directives', [])

    app.directive('searchForm', function() {
        return {
            restric: 'E',
            scope: {
                ngModel: '=',
                ngPlaceholder: '@'
            },
            templateUrl: '/assets/search-form.html'
        }
    });

})();