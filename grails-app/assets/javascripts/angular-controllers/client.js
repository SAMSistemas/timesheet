(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ClientController', ClientController);

    ClientController.$inject = ['clientService', 'utilsService'];

    function ClientController(clientService, utilsService) {

        var vm = this;

        vm.clients = [];
        vm.cuClient = null;
        vm.client = null;

        vm.cuForm = null;

        vm.new = openCreate;
        vm.edit = openUpdate;
        vm.createOrUpdate = createOrUpdate;

        clientService.get(getSuccess, callbackError);


        /** Controller Functions **/

        function openCreate() {
            vm.cuClient = {name: "", short_name: "", enabled: true};
            vm.actionToPerform = "Crear";
            clearFields();
        }

        function openUpdate(client) {
            vm.cuClient = angular.copy(client);
            vm.client = client;
            vm.actionToPerform = "Editar";
            clearFields();
        }

        function clearFields() {
            // To clear the errors from previous cuForms
            if (vm.cuForm !== null) {
                vm.cuForm.name.$setValidity('available', true);
                vm.cuForm.short_name.$setValidity('available', true);
            }
        }

        function createOrUpdate() {
            if (vm.cuForm.$valid) {
                if (vm.cuClient.id) {
                    clientService.update(vm.cuClient, updateSuccess, callbackError);
                    delete vm.client;
                } else {
                    clientService.create(vm.cuClient, createSuccess, callbackError);
                }
            }
        }

        /** Callback Handlers **/

        function getSuccess(response) {
            vm.clients = response.data;
        }

        function createSuccess(response) {
            utilsService.addToTable(vm.clients, response.data);
            var $toast = $('<span>El cliente se creó satisfactoriamente!</span>');
            Materialize.toast($toast, 4000, 'rounded');
        }

        function updateSuccess(response) {
            utilsService.updateInTable(vm.clients, response.data);
            var $toast = $('<span>El cliente ha sido editado!</span>');
            Materialize.toast($toast, 4000, 'rounded');
        }

        function callbackError(response) {
            utilsService.writeToLog(response, 'error');
        }

    }

})();