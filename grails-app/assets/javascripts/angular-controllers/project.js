(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['projectService', 'clientService', 'utilsService'];

    function ProjectController(projectService, clientService, utilsService) {

        var vm = this;

        vm.projects = [];
        vm.cuProject = null;
        vm.project = null;

        vm.enabledClients = [];
        vm.clientSelected = null;

        vm.cuForm = null;
        vm.editForm = null;

        vm.months = "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre";

        vm.dateSelected = new Date();

        vm.new = openCreate;
        vm.edit = openUpdate;
        vm.createOrUpdate = createOrUpdate;

        clientService.getEnabled(getEnabledSuccess, callbackError);

        projectService.get(getSuccess, callbackError);


        /** Controller Functions **/

        function openCreate() {
            vm.clientSelected = "";
            vm.cuProject = {
                client_name: "",
                client: {name: "", enabled: true},
                project_name: "",
                short_name: "",
                start_date: "",
                enabled: true
            };
            vm.actionToPerform = "Crear";
            clearFields();
        }

        function openUpdate(project) {
            vm.clientSelected = {};
            vm.clientSelected.name = project.client.name;
            vm.parseDate(project.start_date);
            vm.cuProject = angular.copy(project);
            vm.project = project;
            vm.actionToPerform = "Editar";
            clearFields();
        }

        function clearFields() {
            // To clear the errors from previous edit forms
            if (vm.cuForm !== null) {
                vm.cuForm.name.$setValidity('available', true);
                vm.cuForm.short_name.$setValidity('available', true);
            }
        }

        function createOrUpdate() {
            if (vm.cuForm.$valid) {
                vm.cuProject.client_name = vm.clientSelected.name;
                vm.cuProject.start_date = vm.generateStringDate(vm.dateSelected);
                console.log(vm.cuProject);
                if (vm.cuProject.id) {
                    projectService.update(vm.cuProject, updateSuccess, callbackError);
                } else {
                    projectService.create(vm.cuProject, createSuccess, callbackError);
                }
                vm.clientSelected = {};
            }
        }

        /** Callback Handlers **/

        function getSuccess(response) {
            vm.projects = response.data;
        }

        function createSuccess(response) {
            utilsService.addToTable(vm.projects, response.data);
            var $toast = $('<span>El proyecto se creo satisfactoriamente!</span>');
            Materialize.toast($toast, 4000, 'rounded');
        }

        function updateSuccess(response) {
            utilsService.updateInTable(vm.projects, response.data);
            var $toast = $('<span>El proyecto ha sido editado!</span>');
            Materialize.toast($toast, 4000, 'rounded');
        }

        function getEnabledSuccess(response) {
            vm.enabledClients = response.data;
        }

        function callbackError(response) {
            utilsService.writeToLog(response, 'error');
        }


        /* Filter clients by enabled */

        vm.filter = function (clients) {
            var result = {};
            angular.forEach(clients, function (client, key) {
                if (!client.enabled) {
                    return;
                }
                result[key] = client;
            });
            return result;
        };

        vm.isEnabled = function (client_name) {

            vm.enabledClients.forEach(function (client) {
                console.log(client_name);
                console.log(client.name);
                if (!client.name.localeCompare(client_name)) {
                    return true;
                }
            });
            return false;
        };


        /** Utils **/

        vm.parseDate = function (date) {
            var date_array = date.split('-');
            vm.dateSelected = new Date(date_array[2], date_array[1] - 1, date_array[0]);
        };

        vm.generateStringDate = function (date) {
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var month = monthIndex + 1;
            var year = date.getFullYear();
            return day + '-' + month + '-' + year;

        };

    }

})();