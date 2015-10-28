var app = angular.module('myApp');

app.controller('asignationController', function ($scope, $http) {
    $scope.clients = [];
    $scope.projects = [];
    $scope.people = [];

    $scope.clientSelected = null;
    $scope.projectSelected = null;
    $scope.personSelected = null;

    $scope.confirmation = "";

    $http.get('/client/all').then(function (response) {
        $scope.clients = response.data;
    });

    $scope.changeClient = function () {
        $http.get('/project/allByClient/' + $scope.clientSelected.name).then(function (response) {
            $scope.projects = response.data;
        });
    };

    $scope.changeProject = function () {
        $http.get('/person/allAvailableForProject/' + $scope.projectSelected.project_name).then(function (response) {
            $scope.people = response.data;
        });
    };

    $scope.submit = function () {
        var jobLog = {
            person: $scope.personSelected.name,
            project: $scope.projectSelected.project_name
        }
        $http.post('/jobLog/asign', jobLog).then(function(response) {
            if (response.status === 200)
                $scope.confirmation = "Se asigno la persona al proyecto";
            else
                $scope.confirmation = "Fallo la asignacion";
        });
    }

});