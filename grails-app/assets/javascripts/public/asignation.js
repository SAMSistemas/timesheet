var app = angular.module('myApp', []);

app.controller('mainController', function ($scope, $http) {
    $scope.clients = [];
    $scope.projects = [];
    $scope.people = [];

    $scope.clientSelected = null;
    $scope.projectSelected = null;
    $scope.personSelected = null;

    $http.get('/client/all').then(function (response) {
        $scope.clients = response.data;
    });

    $scope.changeClient = function () {
        $http.get('/project/allByClient/' + $scope.clientSelected.name).then(function (response) {
            $scope.projects = response.data;
        });
    };

    $scope.changeProject = function () {
        $http.get('/person/all').then(function (response) {
            $scope.people = response.data;
        });
    };

    $scope.submit = function () {
        var jobLog = {
            person: $scope.personSelected.name,
            project: $scope.projectSelected.project_name
        }
        console.log(jobLog);
        $http.post('/jobLog/asign', jobLog);
    }

});