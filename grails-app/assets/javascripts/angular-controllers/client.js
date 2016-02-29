//= require shared/table-body-observer

angular
    .module('myApp')
    .controller('ClientController', ClientController);

ClientController.$inject = ['clientService', 'utilsService'];

function ClientController(clientService, utilsService) {

    /** Capturing controller instance **/
    var vm = this;

    vm.sortType = 'name'; // set the default sort type
    vm.sortReverse = false;  // set the default sort order
    vm.search = '';     // set the default search/filter term
    vm.status = 'all';

    vm.clients = [];
    vm.clientToCreate = null;
    vm.clientToEdit = null;
    vm.client = null;

    vm.createForm = null;
    vm.editForm = null;


    /** Callback Handlers **/

    function getSuccess(response) {
        vm.clients = response.data;
    }

    function createSuccess(response) {
        vm.clientToCreate.id = response.data.id;
        utilsService.addToTable(vm.clients, vm.clientToCreate);
        utilsService.writeToLog(response, 'created');
    }

    function updateSuccess(response) {
        utilsService.updateInTable(vm.clients, vm.clientToEdit);
        utilsService.writeToLog(response, 'updated');
    }

    function callbackError(response) {
        utilsService.writeToLog(response, 'error');
    }


    /** Client ABM **/

    clientService.getClients(getSuccess, callbackError);

    vm.new = function () {
        vm.clientToCreate = {name: "", short_name: "", enabled: true};

        // To clear the errors from previous create forms
        if (vm.createForm !== null) {
            vm.createForm.name.$setValidity('available', true);
            vm.createForm.sname.$setValidity('available', true);
        }
    };

    vm.create = function () {
        if (vm.createForm.$valid) {
            clientService.createClient(vm.clientToCreate, createSuccess, callbackError);
        }
    };

    vm.edit = function (client) {
        vm.clientToEdit = angular.copy(client);
        vm.client = client;

        // To clear the errors from previous edit forms
        if (vm.editForm !== null) {
            vm.editForm.name.$setValidity('available', true);
            vm.editForm.sname.$setValidity('available', true);
        }
    };

    vm.update = function () {
        if (vm.editForm.$valid) {
            clientService.updateClient(vm.clientToEdit, updateSuccess, callbackError);
        }
    };


    /** Table Ordering & Filtering **/

    vm.reverseOrder = function (sortType) {
        vm.sortType = sortType;
        vm.sortReverse = !vm.sortReverse
    };

    vm.startsWith = function (actual, expected) {
        var lowerStr = (actual + "").toLowerCase();
        return lowerStr.indexOf(expected.toLowerCase()) === 0;
    };

}