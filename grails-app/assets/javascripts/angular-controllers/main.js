//= require default
//= require_self

app.controller('mainController', function (clientService, projectService, jobLogService) {

        /** Capturing controller instance **/
        var vm = this;

        vm.clients = [];
        vm.projects = [];

        vm.reportURI = '/jobLog/projectForHour';

        vm.clientSelected = null;
        vm.projectSelected = null;
        vm.fromDateSelected = new Date();
        vm.toDateSelected = new Date();
        vm.max = new Date();

        vm.months = "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre";


        /** Callback Handlers **/

        function getClientsSuccess(response) {
            $('select').material_select();
            $('.modal-trigger').not('.modal-trigger-applied').leanModal();
            $('.modal-trigger').addClass('modal-trigger-applied');
            vm.clients = response.data;
        }

        function getProjectsByClientSuccess(response) {
            vm.projects = response.data;
        }

        function reportSuccess() {
            window.location.href = vm.reportURI;
            vm.clean();
        }

        function reportFailure(response) {
            var $toast = $('<span>No se encontraron datos para los par&aacute;metros ingresados</span>');
            Materialize.toast($toast, 4000,'rounded');
            vm.clean();
            callbackError(response);
        }

        function callbackError(response) {
            vm.writeToLog(response, 'error');
        }


        /** Controller Functions **/

        clientService.getClients(getClientsSuccess, callbackError);

        vm.changeClient = function () {
            projectService.getEnabledProjectsByClient(vm.clientSelected.name, getProjectsByClientSuccess, callbackError);
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

            jobLogService.filterDataToReport(vm.reportURI, filters, reportSuccess, reportFailure);

        };


        /** Utils **/

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
        };

        //Write result message to console
        vm.writeToLog = function(response, result){

            var resultMessage = {
                result: result,
                status: response.status,
                data: response.data
            };

            console.log(JSON.stringify(resultMessage));
        };


});




