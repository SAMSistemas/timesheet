//= require default
//= require shared/table-body-observer
//= require_self

app.controller('clientController', function ($http) {

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

        $http.get('/client/all').then(function (response) {
            vm.clients = response.data;
        }, function () {

        });

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
                $http.post('/client/create', vm.clientToCreate).then(function (response) {
                    vm.clientToCreate.id = response.data.id;
                    vm.addToTable(vm.clients, vm.clientToCreate);
                }, function () {

                });
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
                $http.put('/client/update', vm.clientToEdit).then(function () {
                    vm.updateInTable(vm.clients, vm.clientToEdit);
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