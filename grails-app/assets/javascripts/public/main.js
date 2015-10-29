var app = angular.module('myApp');

app.controller('mainController', function ($scope, $http) {


    $scope.clients = [];
    $scope.projects = [];

    $scope.clientSelected = null;
    $scope.projectSelected = null;
    $scope.fromDateSelected = null;
    $scope.toDateSelected = null;

    $scope.months = "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre";


    $http.get('/client/all').then(function (response) {
        $('select').material_select();
        $('.modal-trigger').leanModal();
        $scope.clients = response.data;
        $scope.clientSelected = $scope.clients[0]
    });


    $scope.changeClient = function () {
        $http.get('/project/allByClient/' + $scope.clientSelected.name).then(function (response) {
            $scope.projects = response.data;
        });
    };


    $scope.export = function(){
        var filters = {
            clientName: $scope.clientSelected,
            projectName: $scope.projectSelected,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo
        }

        $http.get('/joblog/projectForHour/'+ filters).then(function (response) {
            $scope.projects = response.data;
        });
    };

    $scope.clean = function(){
        $scope.clientSelected = null;
        $scope.projectSelected = null;
        $scope.fromDateSelected = null;
        $scope.toDateSelected = null;
    };





});




