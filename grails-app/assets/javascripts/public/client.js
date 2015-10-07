(function () {
    var app = angular.module('sortApp', ['directives']);

    app.controller('mainController', function ($scope) {
        $scope.clients = [];
        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.search = '';     // set the default search/filter term

        $scope.startsWith = function (actual, expected) {
            var lowerStr = (actual + "").toLowerCase();
            return lowerStr.indexOf(expected.toLowerCase()) === 0;
        };

        $scope.disable = function (client) {
            $.ajax({
                url: '/client/disable/' + client.id,
                type: 'PUT'
            });
            client.enabled = false;
        };

        $scope.able = function (client) {
            $.ajax({
                url: '/client/able/' + client.id,
                type: 'PUT'
            });
            client.enabled = true;
        };

        $.getJSON("/client.json", function (data) {
            $scope.clients = data;
            $scope.$apply();
        });

    });

}());