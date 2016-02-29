(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('AssignationController', AssignationController);

    AssignationController.$inject = ['clientService', 'projectService', 'personService', 'jobLogService', 'utilsService'];

    function AssignationController(clientService, projectService, personService, jobLogService, utilsService) {

        /** Capturing controller instance **/
        var vm = this;

        vm.clients = [];
        vm.projects = [];
        vm.people = [];

        vm.clientSelected = null;
        vm.projectSelected = null;
        vm.personSelected = null;

        vm.confirmation = "";

        vm.form = null;

        vm.changeClient = changeClient;
        vm.changeProject = changeProject;
        vm.submit = submit;


        /** Callback Handlers **/

        function getClientsSuccess(response) {
            vm.clients = response.data;
        }

        function changeClientSuccess(response) {
            vm.projects = response.data;
            vm.confirmation = "";
        }

        function changeProjectSuccess(response) {
            vm.people = response.data;
            vm.confirmation = "";
        }

        function assignJobLogSuccess() {
            vm.confirmation = "Se asigno la persona al proyecto";
            vm.personSelected = null;
            personService.getPersonAvailableForProject(vm.projectSelected.name, changeProjectSuccess, assignJobLogError);
        }

        function assignJobLogError(response) {
            vm.confirmation = "Fallo la asignacion";
            utilsService.writeToLog(response, 'error');
        }

        function callbackError(response) {
            utilsService.writeToLog(response, 'error');
        }


        /** Controller Functions **/

        clientService.getEnabled(getClientsSuccess, callbackError);

        function changeClient() {
            projectService.getEnabledProjectsByClient(vm.clientSelected.name, changeClientSuccess, callbackError);
        };

        function changeProject() {
            personService.getPersonAvailableForProject(vm.projectSelected.name, changeProjectSuccess, callbackError);
        };

        function submit() {
            var jobLog = {
                person: vm.personSelected.name,
                project: {
                    id: vm.projectSelected.id
                }
            };

            jobLogService.assignJobLog(jobLog, assignJobLogSuccess, assignJobLogError);
        };

    }

})();