// Fuente: http://stackoverflow.com/questions/15592117/email-form-validation-one-at-a-time

(function() {
    'use strict';

    angular
        .module('directives')
        .directive('available', available);

    available.$inject = ['$http'];

    function available($http) {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                originalValue: '=',
                urlToCheck: '@',
            },
            link: function (scope, elem, attr, ctrl) {
                elem.on('blur', function () {
                    var viewValue = ctrl.$viewValue; // get the value of the input

                    if (scope.originalValue !== viewValue && viewValue !== "") {
                        // check if the value isn't equal to the value before the edition and it isn't empty
                        $http.get(scope.urlToCheck + viewValue).then(
                            function (response) {
                                if (response.data.length === 0) { // if it doesn't exists, it set the validity to true
                                    ctrl.$setValidity('available', true);
                                } else { // if it does then it is set to false
                                    ctrl.$setValidity('available', false);
                                }
                            },
                            function () { // if there is an error, it set the validity to false
                                ctrl.$setValidity('available', false);
                            });
                    } else { // if it's the same or it's empty, it's ok
                        ctrl.$setValidity('available', true);
                        scope.$apply();
                    }
                })
            }
        };
    }
})();

