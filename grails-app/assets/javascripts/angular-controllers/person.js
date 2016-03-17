(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('PersonController', PersonController);

    PersonController.$inject = ['personService', 'workPositionService', 'utilsService'];

    function PersonController(personService, workPositionService, utilsService) {

        var vm = this;

        vm.people = [];
        vm.cuPerson = null;
        vm.person = null;

        vm.cuForm = null;

        vm.work_hours = [4, 6, 8];
        vm.work_positions = [];

        vm.new = openCreate;
        vm.edit = openUpdate;
        vm.createOrUpdate = createOrUpdate;

        personService.get(getSuccess, callbackError);

        workPositionService.get(getWorkPositionSuccess, callbackError);


        /** Controller Functions **/

        function openCreate() {
            vm.cuPerson = {
                name: "",
                lastname: "",
                username: "",
                password: "",
                work_hours: "",
                work_position: "",
                enabled: true
            };
            vm.actionToPerform = "Crear";
            clearFields();
        };

        function openUpdate(person) {
            vm.cuPerson = angular.copy(person);
            vm.person = person;
            vm.actionToPerform = "Editar";
            clearFields();
        };

        function clearFields() {
            // To clear the errors from previous edit forms
            if (vm.cuForm !== null) {
                vm.cuForm.username.$setValidity('available', true);
            }
        }

        function createOrUpdate() {
            if (vm.cuForm.$valid) {
                if (vm.cuPerson.id) {
                    personService.update(vm.cuPerson, updateSuccess, callbackError);
                } else {
                    personService.create(vm.cuPerson, createSuccess, callbackError);
                }
            }
        }


        /** Callback Handlers **/

        function getSuccess(response) {
            vm.people = response.data;
        }

        function createSuccess(response) {
            utilsService.addToTable(vm.people, response.data);
            var $toast = $('<span>La persona se creó satisfactoriamente!</span>');
            Materialize.toast($toast, 4000, 'rounded');
        }

        function updateSuccess(response) {
            utilsService.updateInTable(vm.people, response.data);
            var $toast = $('<span>La persona ha sido editada!</span>');
            Materialize.toast($toast, 4000, 'rounded');
        }

        function getWorkPositionSuccess(response) {
            vm.work_positions = response.data;
        }

        function callbackError(response) {
            utilsService.writeToLog(response, 'error');
        }

    }

})();