angular
    .module('directives')
    .directive('inputFieldText', inputFieldText);

inputFieldText.$inject = ['$timeout'];

function inputFieldText($timeout) {
    return {
        restrict: 'AE',
        scope: {
            ngModel: '=',
            ngPlaceholder: '@',
            ngId: '@'
        },
        link: function (scope, elem, attr) {
            $timeout(function () {
                // http://stackoverflow.com/questions/19733723/angularjs-dynamic-form-field-id-with-a-directive-not-working

                var input = elem.find("#" + attr.ngId);

                input.on('focus', function () {
                    input.attr('placeholder', '');
                });

                input.on('blur', function () {
                    input.attr('placeholder', attr.ngPlaceholder);
                });
            });
        },
        templateUrl: '/assets/input-field-text.html'
    };
}