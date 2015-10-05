// app.js
(function() {
    var app = angular.module('sortApp', []);

    app.controller('mainController', function($scope) {
        $scope.projects = [];
        $scope.sortType     = 'name'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.search   = '';     // set the default search/filter term

        $scope.startsWith = function (actual, expected) {
            var lowerStr = (actual + "").toLowerCase();
            return lowerStr.indexOf(expected.toLowerCase()) === 0;
        };

        $scope.disableProject = function(project){
            $.ajax({
                url: '/project/disable/' + project.id,
                type: 'PUT'
            });
            project.enabled = false;
        };

        $scope.ableProject = function(project){
            $.ajax({
                url: '/project/able/' + project.id,
                type: 'PUT'
            });
            project.enabled = true;
        };

        $.getJSON("/project.json", function(data) {
            $scope.projects = data;
            $scope.$apply();
        });

    });

}());
