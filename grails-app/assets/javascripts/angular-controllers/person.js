//= require default
//= require shared/table-body-observer
//= require_self

app.controller('personController', function ($http) {

        /** Capturing controller instance **/
        var vm = this;

        vm.sortType = 'name'; // set the default sort type
        vm.sortReverse = false;  // set the default sort order
        vm.search = '';     // set the default search/filter term
        vm.status = 'all';

        vm.people = [];
        vm.personToCreate = null;
        vm.personToEdit = null;
        vm.person = null;

        vm.createForm = null;
        vm.editForm = null;

        vm.work_hours = [4,6,8];
        vm.work_positions = [];

        $http.get('/person/all').then(function (response) {
            vm.people = response.data;
        }, function () {

        });

        $http.get('/workPosition/all').then(function (response) {
            vm.work_positions = response.data;
        }, function () {

        });

        vm.new = function () {
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

        vm.create = function () {
            if (vm.createForm.$valid) {
                $http.post('/person/create', vm.personToCreate).then(function (response) {
                    vm.personToCreate.id = response.data.id;
                    vm.addToTable(vm.people, vm.personToCreate);
                }, function () {

                });
            }
        };

        vm.edit = function (person) {
            vm.personToEdit = angular.copy(person);
            vm.person = person;

            // To clear the errors from previous edit forms
            if (vm.editForm !== null) {
                vm.editForm.username.$setValidity('available', true);
            }
        };

        vm.update = function () {
            if (vm.editForm.$valid) {
                $http.put('/person/update', vm.personToEdit).then(function () {
                    vm.updateInTable(vm.people, vm.personToEdit);
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

        vm.changeColor = function (divId) {
            $("#" + divId).css("cssText", " color: #009688 !important;");
        };

    });