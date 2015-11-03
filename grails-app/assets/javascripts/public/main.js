var app = angular.module('myApp');

app.controller('mainController', function ($scope, $http) {


    $scope.clients = [];
    $scope.projects = [];

    $scope.clientSelected = null;
    $scope.projectSelected = null;
    $scope.fromDateSelected = new Date();
    $scope.toDateSelected = new Date();

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
            dateFrom: $scope.dateToString($scope.fromDateSelected),
            dateTo: $scope.dateToString($scope.toDateSelected)
        }

        $http.post('/jobLog/projectForHour/', filters).then(function (response) {
            console.log(response.data);
        });
    };

    $scope.clean = function(){
        $scope.clientSelected = null;
        $scope.projectSelected = null;
        $scope.fromDateSelected = null;
        $scope.toDateSelected = null;
    };

    $scope.dateToString = function(date){

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var month = monthIndex+1;
        var year = date.getFullYear();
        return  day+ '-' +month+ '-' +year;

    };





});




