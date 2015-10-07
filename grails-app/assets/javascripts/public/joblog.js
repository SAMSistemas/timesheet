// app.js
(function () {
    var app = angular.module('sortApp', ['directives']);

    app.controller('mainController', function ($scope) {
        $scope.joblogs = [];
        $scope.sortType = 'project'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.search = '';     // set the default search/filter term

        $scope.startsWith = function (actual, expected) {
            var lowerStr = (actual + "").toLowerCase();
            return lowerStr.indexOf(expected.toLowerCase()) === 0;
        };

        $.getJSON("/jobLog.json", function (data) {
            $scope.joblogs = data;
            $scope.$apply();
        });

    });

}());