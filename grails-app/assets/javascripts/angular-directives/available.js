// Fuente: http://stackoverflow.com/questions/15592117/email-form-validation-one-at-a-time
angular.module('directives')
    .directive('available', function ($http) {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                originalValue: '=',
                urlToCheck: '@',
            },
            link: function (scope, elem, attr, ctrl) {
                elem.on('blur', function () {
                    // get the value of the input
                    var viewValue = ctrl.$viewValue;

                    // check if the value is equal to the value before the edition
                    if (scope.originalValue !== viewValue) {
                        $http.get(scope.urlToCheck + viewValue).then(
                            function (response) {
                                if (response.data["exists"] === "true") { // if it exists, it set the validity to false
                                    ctrl.$setValidity('available', false);
                                } else {
                                    ctrl.$setValidity('available', true);
                                }
                            },
                            function () {
                                ctrl.$setValidity('available', false);
                            });
                    } else { // if it is equal, it's ok
                        ctrl.$setValidity('available', true);
                        scope.$apply();
                    }
                })
            }
        };
    });

