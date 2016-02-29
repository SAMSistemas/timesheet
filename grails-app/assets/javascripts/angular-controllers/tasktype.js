//= require shared/table-body-observer

(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('TaskTypeController', TaskTypeController);

    TaskTypeController.$inject = ['taskTypeService', 'utilsService'];

    function TaskTypeController(taskTypeService, utilsService) {

        /** Capturing controller instance **/
        var vm = this;

        vm.sortType = 'name'; // set the default sort type
        vm.sortReverse = false;  // set the default sort order
        vm.search = '';     // set the default search/filter term
        vm.status = 'all';

        vm.taskTypes = [];
        vm.taskTypeToCreate = null;
        vm.taskTypeToEdit = null;
        vm.taskType = null;

        vm.createForm = null;
        vm.editForm = null;

        vm.new = openCreate;
        vm.create = create;
        vm.edit = openUpdate;
        vm.update = update;


        /** Callback Handlers **/

        function getSuccess(response) {
            vm.taskTypes = response.data;
        }

        function createSuccess(response) {
            utilsService.addToTable(vm.taskTypes, response.data);
        }

        function updateSuccess(response) {
            utilsService.updateInTable(vm.taskTypes, response.data);
        }

        function callbackError(response) {
            utilsService.writeToLog(response, 'error');
        }


        /** TaskType ABM **/

        taskTypeService.get(getSuccess, callbackError);

        function openCreate() {
            vm.taskTypeToCreate = {name: "", enabled: true};

            // To clear the errors from previous create forms
            if (vm.createForm !== null) {
                vm.createForm.name.$setValidity('available', true);
            }
        };

        function create() {
            if (vm.createForm.$valid) {
                taskTypeService.create(vm.taskTypeToCreate, createSuccess, callbackError);
            }
        };

        function openUpdate(taskType) {
            vm.taskTypeToEdit = angular.copy(taskType);
            vm.taskType = taskType;

            // To clear the errors from previous edit forms
            if (vm.editForm !== null) {
                vm.editForm.name.$setValidity('available', true);
            }
        };

        function update() {
            if (vm.editForm.$valid) {
                taskTypeService.update(vm.taskTypeToEdit, updateSuccess, callbackError);
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

})();