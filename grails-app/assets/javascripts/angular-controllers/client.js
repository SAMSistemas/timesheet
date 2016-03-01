(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ClientController', ClientController);

    ClientController.$inject = ['clientService', 'utilsService'];

    function ClientController(clientService, utilsService) {

        var vm = this;

        vm.clients = [];
        vm.clientToCreate = null;
        vm.clientToEdit = null;
        vm.client = null;

        vm.createForm = null;
        vm.editForm = null;

        vm.new = openCreate;
        vm.create = create;
        vm.edit = openUpdate;
        vm.update = update;

        clientService.get(getSuccess, callbackError);


        /** Controller Functions **/

        function openCreate() {
            vm.clientToCreate = {name: "", short_name: "", enabled: true};

            // To clear the errors from previous create forms
            if (vm.createForm !== null) {
                vm.createForm.name.$setValidity('available', true);
                vm.createForm.sname.$setValidity('available', true);
            }
        };

        function create() {
            if (vm.createForm.$valid) {
                clientService.create(vm.clientToCreate, createSuccess, callbackError);
            }
        };

        function openUpdate(client) {
            vm.clientToEdit = angular.copy(client);
            vm.client = client;

            // To clear the errors from previous edit forms
            if (vm.editForm !== null) {
                vm.editForm.name.$setValidity('available', true);
                vm.editForm.sname.$setValidity('available', true);
            }
        };

        function update() {
            if (vm.editForm.$valid) {
                clientService.update(vm.clientToEdit, updateSuccess, callbackError);
            }
        };

        /** Callback Handlers **/

        function getSuccess(response) {
            vm.clients = response.data;
        }

        function createSuccess(response) {
            utilsService.addToTable(vm.clients, response.data);
        }

        function updateSuccess(response) {
            utilsService.updateInTable(vm.clients, response.data);
        }

        function callbackError(response) {
            utilsService.writeToLog(response, 'error');
        }

    }

})();