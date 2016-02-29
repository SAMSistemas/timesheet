//= require default
//= require_self

app.controller('assignationController', function (clientService, projectService, personService, jobLogService, utilsService) {

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

    function assignJobLogSuccess(response) {
        vm.confirmation = "Se asigno la persona al proyecto";
        vm.personSelected = null;
        personService.getPersonAvailableForProject(vm.projectSelected.name, changeProjectSuccess, assignJobLogError);
        vm.writeToLog(response, 'success');
    }

    function assignJobLogError(response) {
        vm.confirmation = "Fallo la asignacion";
        vm.writeToLog(response, 'error');
    }

    function callbackError(response) {
        utilsService.writeToLog(response, 'error');
    }


    /** Controller Functions **/

    clientService.getEnabledClients(getClientsSuccess, callbackError);


    vm.changeClient = function () {
        projectService.getEnabledProjectsByClient(vm.clientSelected.name, changeClientSuccess, callbackError);
    };

    vm.changeProject = function () {
        personService.getPersonAvailableForProject(vm.projectSelected.name, changeProjectSuccess, callbackError);
    };

    vm.submit = function () {
        var jobLog = {
            person: vm.personSelected.name,
            project: {
                id: vm.projectSelected.id
            }
        };

        jobLogService.assignJobLog(jobLog, assignJobLogSuccess, assignJobLogError);

    };

});