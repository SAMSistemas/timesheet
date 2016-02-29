//= require shared/table-body-observer

angular
    .module('myApp')
    .controller('ProjectController', ProjectController);

ProjectController.$inject = ['projectService', 'clientService', 'utilsService'];

function ProjectController(projectService, clientService, utilsService) {

    /** Capturing controller instance **/
    var vm = this;

    vm.sortType = 'name'; // set the default sort type
    vm.sortReverse = false;  // set the default sort order
    vm.search = {client: "", project_name: "", short_name: ""};     // set the default search/filter term
    vm.status = 'all';

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


    /** Callback Handlers **/

    function getSuccess(response) {
        vm.projects = response.data;
    }

    function createSuccess(response) {
        vm.addToTable(vm.projects, response.data);
        vm.writeToLog(response, 'created');
    }

    function updateSuccess(response) {
        vm.updateInTable(vm.projects, response.data);
        vm.writeToLog(response, 'updated');
    }

    function getEnabledSuccess(response) {
        vm.enabledClients = response.data;
    }

    function callbackError(response) {
        utilsService.writeToLog(response, 'error');
    }


    /** Project ABM **/

    clientService.getEnabledClients(getEnabledSuccess, callbackError);

    projectService.getProjects(getSuccess, callbackError);

    vm.new = function () {
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

    vm.create = function () {
        vm.projectToCreate.client_name = vm.clientSelected.name;
        vm.projectToCreate.start_date = vm.generateCreateStringDate(vm.dateSelected);

        if (vm.createForm.$valid) {
            projectService.createProject(vm.projectToCreate, createSuccess, callbackError);
        }

        vm.clientSelected = {};
    };

    vm.edit = function (project) {
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

    vm.update = function () {
        vm.projectToEdit.client_name = vm.clientSelected.name;
        vm.projectToEdit.start_date = vm.generateEditStringDate(vm.dateSelected);

        if (vm.editForm.$valid) {
            projectService.updateProject(vm.projectToEdit, updateSuccess, callbackError);
        }

        vm.clientSelected = {};
    };


    /* Filter functions */

    vm.reverseOrder = function (sortType) {
        vm.sortType = sortType;
        vm.sortReverse = !vm.sortReverse
    };

    vm.startsWith = function (actual, expected) {
        var lowerStr = (actual + "").toLowerCase();
        return lowerStr.indexOf(expected.toLowerCase()) === 0;
    };


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