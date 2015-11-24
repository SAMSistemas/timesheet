//= require default
//= require_self

app.controller('mainController', function ($scope, $http) {

        $scope.clients = [];
        $scope.projects = [];

        $scope.clientSelected = null;
        $scope.projectSelected = null;
        $scope.fromDateSelected = new Date();
        $scope.toDateSelected = new Date();
        $scope.max = new Date();

        $scope.months = "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre";

        $http.get('/client/all').then(function (response) {
            $('select').material_select();
            $('.modal-trigger').not('.modal-trigger-applied').leanModal();
            $('.modal-trigger').addClass('modal-trigger-applied');
            $scope.clients = response.data;
        });

        $scope.changeClient = function () {
            $http.get('/project/allEnabledByClient/' + $scope.clientSelected.name).then(function (response) {
                $scope.projects = response.data;
            }, function () {

            });
        };

        $scope.export = function () {
            var flag = $scope.verifyDates();
            //if(flag){
            var filters = {
                clientName: $scope.clientSelected,
                projectName: $scope.projectSelected,
                dateFrom: $scope.dateToString($scope.fromDateSelected),
                dateTo: $scope.dateToString($scope.toDateSelected)
            };


            $http.post('/jobLog/projectForHour/', filters).then(function (response) {
                window.location.href = '/jobLog/projectForHour/';
                $scope.clean();
            }, function () {
                $scope.clean();
            });
            //}else{
            //$scope.showDateError();
            //alert("fecha incorrecta!");
            //}
        };

        $scope.clean = function () {
            $scope.clientSelected = null;
            $scope.projectSelected = null;
            $scope.projects = [];
            $scope.fromDateSelected = new Date();
            $scope.toDateSelected = new Date();
        };

        $scope.dateToString = function (date) {

            var day = date.getDate();
            var monthIndex = date.getMonth();
            var month = monthIndex + 1;
            var year = date.getFullYear();
            return day + '-' + month + '-' + year;

        };

        $scope.verifyDates = function () {
            var dayFrom = $scope.fromDateSelected.getDate();
            var dayTo = $scope.toDateSelected.getDate();
            var flag = false;

            var monthFrom = $scope.fromDateSelected.getMonth();
            var monthTo = $scope.toDateSelected.getMonth();

            if (monthFrom > monthTo) {
            } else if (monthFrom == monthTo) {
                if (dayFrom > dayTo) {
                } else {
                    flag = true;
                }
            }
            return flag
        };

        $scope.showDateError = function () {
            $('#errorDate').show();
        }

    });



