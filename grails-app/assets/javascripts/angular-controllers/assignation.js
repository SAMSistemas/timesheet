//= require default
//= require_self

app.controller('assignationController', function (clientService, projectService, personService, jobLogService) {

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

        if (response.status === 200) {
            vm.confirmation = "Se asigno la persona al proyecto";
            vm.personSelected = null;
            personService.getPersonAvailableForProject(vm.projectSelected.project_name, changeProjectSuccess, callbackError);
        }
        else
            vm.confirmation = "Fallo la asignacion";

        vm.writeToLog(response, 'success');
    }

    function callbackError(response) {
        vm.writeToLog(response, 'error');
    }


    /** Controller Functions **/

    clientService.getEnabledClients(getClientsSuccess, callbackError);


    vm.changeClient = function () {
        projectService.getEnabledProjectsByClient(vm.clientSelected.name, changeClientSuccess, callbackError);
    };

    vm.changeProject = function () {
        personService.getPersonAvailableForProject(vm.projectSelected.project_name, changeProjectSuccess, callbackError);
    };

    vm.submit = function () {
        var jobLog = {
            person: vm.personSelected.name,
            project: vm.projectSelected.project_name
        };

        jobLogService.assignJobLog(jobLog, assignJobLogSuccess, callbackError);

    };


    /** Utils **/

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