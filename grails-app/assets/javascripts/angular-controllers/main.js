//= require default
//= require_self

app.controller('mainController', function ($http) {

        /** Capturing controller instance **/
        var vm = this;

        vm.clients = [];
        vm.projects = [];

        vm.clientSelected = null;
        vm.projectSelected = null;
        vm.fromDateSelected = new Date();
        vm.toDateSelected = new Date();
        vm.max = new Date();

        vm.months = "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre";

        $http.get('/client/all').then(function (response) {
            $('select').material_select();
            $('.modal-trigger').not('.modal-trigger-applied').leanModal();
            $('.modal-trigger').addClass('modal-trigger-applied');
            vm.clients = response.data;
        });

        vm.changeClient = function () {
            $http.get('/project/allEnabledByClient/' + vm.clientSelected.name).then(function (response) {
                vm.projects = response.data;
            }, function () {

            });
        };

        vm.export = function () {
            var flag = vm.verifyDates();
            //if(flag){
            var filters = {
                clientName: vm.clientSelected,
                projectName: vm.projectSelected,
                dateFrom: vm.dateToString(vm.fromDateSelected),
                dateTo: vm.dateToString(vm.toDateSelected)
            };


            $http.post('/jobLog/projectForHour', filters).then(function (response) {
                window.location.href = '/jobLog/projectForHour';
                vm.clean();
            }, function () {
                var $toast = $('<span>No se encontraron datos para los par&aacute;metros ingresados</span>');
                Materialize.toast($toast, 4000,'rounded');
                vm.clean();
            });
        };

        vm.clean = function () {
            vm.clientSelected = null;
            vm.projectSelected = null;
            vm.projects = [];
            vm.fromDateSelected = new Date();
            vm.toDateSelected = new Date();
        };

        vm.dateToString = function (date) {

            var day = date.getDate();
            var monthIndex = date.getMonth();
            var month = monthIndex + 1;
            var year = date.getFullYear();
            return day + '-' + month + '-' + year;

        };

        vm.verifyDates = function () {
            var dayFrom = vm.fromDateSelected.getDate();
            var dayTo = vm.toDateSelected.getDate();
            var flag = false;

            var monthFrom = vm.fromDateSelected.getMonth();
            var monthTo = vm.toDateSelected.getMonth();

            if (monthFrom > monthTo) {
            } else if (monthFrom == monthTo) {
                if (dayFrom > dayTo) {
                } else {
                    flag = true;
                }
            }
            return flag
        };

        vm.showDateError = function () {
            $('#errorDate').show();
        }

    });




