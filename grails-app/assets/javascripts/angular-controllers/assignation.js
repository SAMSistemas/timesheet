//= require default
//= require_self

app.controller('assignationController', function ($scope, $http) {

    $scope.clients = [];
    $scope.projects = [];
    $scope.people = [];

    $scope.clientSelected = null;
    $scope.projectSelected = null;
    $scope.personSelected = null;

    $scope.confirmation = "";

    $http.get('/client/allEnabled').then(function (response) {
        $scope.clients = response.data;
    }, function () {

    });

    $scope.changeClient = function () {
        $http.get('/project/allEnabledByClient/' + $scope.clientSelected.name).then(function (response) {
            $scope.projects = response.data;
        }, function () {

        });
    };

    $scope.changeProject = function () {
        $http.get('/person/allEnabledAndAvailableForProject/' + $scope.projectSelected.project_name).then(function (response) {
            $scope.people = response.data;
        }, function () {

        });
    };

    $scope.submit = function () {
        var jobLog = {
            person: $scope.personSelected.name,
            project: $scope.projectSelected.project_name
        };

        $http.post('/jobLog/assign', jobLog).then(function (response) {
            if (response.status === 200) {
                $scope.confirmation = "Se asigno la persona al proyecto";
                $scope.personSelected = null;
                $http.get('/person/allEnabledAndAvailableForProject/' + $scope.projectSelected.project_name).then(function (response) {
                    $scope.people = response.data;
                }, function () {

                });
            }
            else
                $scope.confirmation = "Fallo la asignacion";
        }, function () {

        });
    };

});