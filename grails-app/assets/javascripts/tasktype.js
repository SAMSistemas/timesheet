// app.js
(function() {
    var app = angular.module('sortApp', []);

    app.controller('mainController', function($scope) {
        $scope.tasktypes = [];
        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.search = '';     // set the default search/filter term

        $scope.startsWith = function (actual, expected) {
            var lowerStr = (actual + "").toLowerCase();
            return lowerStr.indexOf(expected.toLowerCase()) === 0;
        };

        $scope.disable = function(tasktype) {
            $.ajax({
                url: '/taskType/disable/' + tasktype.id,
                type: 'PUT'
            });
            tasktype.enabled = false;
        };

        $scope.able = function(tasktype) {
            $.ajax({
                url: '/taskType/able/' + tasktype.id,
                type: 'PUT'
            });
            tasktype.enabled = true;
        };

        $.getJSON("/taskType.json", function(data) {
            $scope.tasktypes = data;
            $scope.$apply();
        });

    });

}());