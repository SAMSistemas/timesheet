(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['projectService', 'clientService', 'utilsService'];

    function ProjectController(projectService, clientService, utilsService) {

        var vm = this;

        vm.projects = [];
        vm.projectToCreate = null;
        vm.projectToEdit = null;
        vm.project = null;

        vm.enabledClients = [];
        vm.clientSelected = null;

        vm.createForm = null;
        vm.editForm = null;

        vm.months = "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre";

        vm.dateSelected = new Date();

        vm.new = openCreate;
        vm.create = create;
        vm.edit = openUpdate;
        vm.update = update;

        clientService.getEnabled(getEnabledSuccess, callbackError);

        projectService.get(getSuccess, callbackError);


        /** Controller Functions **/

        function openCreate() {
            vm.clientSelected = "";
            vm.projectToCreate = {
                client_name: "",
                client: {name: "", enabled: true},
                project_name: "",
                short_name: "",
                start_date: "",
                enabled: true
            };

            // To clear the errors from previous create forms
            if (vm.createForm !== null) {
                vm.createForm.project_name.$setValidity('available', true);
                vm.createForm.sname.$setValidity('available', true);
            }
        };

        function create() {
            vm.projectToCreate.client_name = vm.clientSelected.name;
            vm.projectToCreate.start_date = vm.generateCreateStringDate(vm.dateSelected);

            if (vm.createForm.$valid) {
                projectService.create(vm.projectToCreate, createSuccess, callbackError);
            }

            vm.clientSelected = {};
        };

        function openUpdate(project) {
            vm.clientSelected = {};
            vm.clientSelected.name = project.client.name;
            vm.parseDate(project.start_date);

            vm.projectToEdit = angular.copy(project);
            vm.project = project;

            // To clear the errors from previous edit forms
            if (vm.editForm !== null) {
                vm.editForm.project_name.$setValidity('available', true);
                vm.editForm.sname.$setValidity('available', true);
            }

        };

        function update() {
            vm.projectToEdit.client_name = vm.clientSelected.name;
            vm.projectToEdit.start_date = vm.generateEditStringDate(vm.dateSelected);

            if (vm.editForm.$valid) {
                projectService.update(vm.projectToEdit, updateSuccess, callbackError);
            }

            vm.clientSelected = {};
        };


        /** Callback Handlers **/

        function getSuccess(response) {
            vm.projects = response.data;
        }

        function createSuccess(response) {
            vm.addToTable(vm.projects, response.data);
        }

        function updateSuccess(response) {
            vm.updateInTable(vm.projects, response.data);
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

        vm.generateCreateStringDate = function (date) {
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var month = monthIndex + 1;
            var year = date.getFullYear();
            return day + '-' + month + '-' + year;

        };

        vm.generateEditStringDate = function (date) {
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var month = monthIndex + 1;
            var year = date.getFullYear();
            return day + '-' + month + '-' + year;
        };

    }

})();