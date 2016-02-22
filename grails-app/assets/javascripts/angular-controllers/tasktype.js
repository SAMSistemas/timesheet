//= require default
//= require shared/table-body-observer
//= require_self

app.controller('taskTypeController', function (taskTypeService) {

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


        /** Callback Handlers **/

        function getSuccess(response) {
            vm.taskTypes = response.data;
        }

        function createSuccess(response) {
            vm.taskTypeToCreate.id = response.data.id;
            vm.addToTable(vm.taskTypes, vm.taskTypeToCreate);
            vm.writeToLog(response, 'created');
        }

        function updateSuccess(response) {
            vm.updateInTable(vm.taskTypes, vm.taskTypeToEdit);
            vm.writeToLog(response, 'updated');
        }

        function callbackError(response) {
            vm.writeToLog(response, 'error');
        }


        /** TaskType ABM **/

        taskTypeService.getTaskTypes(getSuccess, callbackError);

        vm.new = function () {
            vm.taskTypeToCreate = {name: "", enabled: true};

            // To clear the errors from previous create forms
            if (vm.createForm !== null) {
                vm.createForm.name.$setValidity('available', true);
            }
        };

        vm.create = function () {
            if (vm.createForm.$valid) {
                taskTypeService.createTaskType(vm.taskTypeToCreate, createSuccess, callbackError);
            }
        };

        vm.edit = function (taskType) {
            vm.taskTypeToEdit = angular.copy(taskType);
            vm.taskType = taskType;

            // To clear the errors from previous edit forms
            if (vm.editForm !== null) {
                vm.editForm.name.$setValidity('available', true);
            }
        };

        vm.update = function () {
            if (vm.editForm.$valid) {
                taskTypeService.updateTaskType(vm.taskTypeToEdit, updateSuccess, callbackError);
            }
        };


        /** Utils **/

        vm.reverseOrder = function (sortType) {
            vm.sortType = sortType;
            vm.sortReverse = !vm.sortReverse
        };

        vm.startsWith = function (actual, expected) {
            var lowerStr = (actual + "").toLowerCase();
            return lowerStr.indexOf(expected.toLowerCase()) === 0;
        };

        vm.addToTable = function (items, item) {
            items.push(item);
        };

        vm.updateInTable = function (items, item) {
            for (var i = 0; i < items.length; i++)
                if (items[i].id === item.id)
                    items[i] = item;
        };

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