(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('PersonController', PersonController);

    PersonController.$inject = ['personService', 'workPositionService', 'utilsService'];

    function PersonController(personService, workPositionService, utilsService) {

        var vm = this;

        vm.people = [];
        vm.personToCreate = null;
        vm.personToEdit = null;
        vm.person = null;

        vm.createForm = null;
        vm.editForm = null;

        vm.work_hours = [4, 6, 8];
        vm.work_positions = [];

        vm.new = openCreate;
        vm.create = create;
        vm.edit = openUpdate;
        vm.update = update;

        personService.get(getSuccess, callbackError);

        workPositionService.get(getWorkPositionSuccess, callbackError);


        /** Controller Functions **/

        function openCreate() {
            vm.personToCreate = {
                name: "",
                lastname: "",
                username: "",
                password: "",
                work_hours: "",
                work_position: "",
                enabled: true
            };

            // To clear the errors from previous create forms
            if (vm.createForm !== null) {
                vm.createForm.username.$setValidity('available', true);
            }
        };

        function create() {
            if (vm.createForm.$valid) {
                personService.create(vm.personToCreate, createSuccess, callbackError);
            }
        };

        function openUpdate(person) {
            vm.personToEdit = angular.copy(person);
            vm.person = person;

            // To clear the errors from previous edit forms
            if (vm.editForm !== null) {
                vm.editForm.username.$setValidity('available', true);
            }
        };

        function update() {
            if (vm.editForm.$valid) {
                personService.update(vm.personToEdit, updateSuccess, callbackError);
            }
        };


        /** Callback Handlers **/

        function getSuccess(response) {
            vm.people = response.data;
        }

        function createSuccess(response) {
            utilsService.addToTable(vm.people, response.data);
        }

        function updateSuccess(response) {
            utilsService.updateInTable(vm.people, response.data);
        }

        function getWorkPositionSuccess(response) {
            vm.work_positions = response.data;
        }

        function callbackError(response) {
            utilsService.writeToLog(response, 'error');
        }

    }

})();