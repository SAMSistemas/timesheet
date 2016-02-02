//= require default
//= require shared/table-body-observer
//= require_self

app.controller('taskTypeController', function ($http) {

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

        $http.get('/taskType/all').then(function (response) {
            vm.taskTypes = response.data;
        }, function () {

        });

        vm.new = function () {
            vm.taskTypeToCreate = {name: "", enabled: true};

            // To clear the errors from previous create forms
            if (vm.createForm !== null) {
                vm.createForm.name.$setValidity('available', true);
            }
        };

        vm.create = function () {
            if (vm.createForm.$valid) {
                $http.post('/taskType/create', vm.taskTypeToCreate).then(function (response) {
                    vm.taskTypeToCreate.id = response.data.id;
                    vm.addToTable(vm.taskTypes, vm.taskTypeToCreate);
                }, function () {

                });
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
                $http.put('/taskType/update', vm.taskTypeToEdit).then(function () {
                    vm.updateInTable(vm.taskTypes, vm.taskTypeToEdit);
                }, function () {

                });
            }
        };

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

    });