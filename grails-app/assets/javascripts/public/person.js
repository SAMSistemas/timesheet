// app.js
(function () {
    var app = angular.module('sortApp', ['directives']);

    app.controller('mainController', function ($scope) {
        $scope.people = [];
        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.search = '';     // set the default search/filter term

        $scope.startsWith = function (actual, expected) {
            var lowerStr = (actual + "").toLowerCase();
            return lowerStr.indexOf(expected.toLowerCase()) === 0;
        };

        $scope.disable = function (person) {
            $.ajax({
                url: '/person/disable/' + person.id,
                type: 'PUT'
            });
            person.enabled = false;
        };

        $scope.able = function (person) {
            $.ajax({
                url: '/person/able/' + person.id,
                type: 'PUT'
            });
            person.enabled = true;
        };

        $.getJSON("/person.json", function (data) {
            $scope.people = data;
            $scope.$apply();
        });

    });

}());