//= require default
//= require shared/table-body-observer
//= require_self

app.controller('clientController', function ($scope, $http) {

        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.search = '';     // set the default search/filter term
        $scope.status = 'all';

        $scope.clients = [];
        $scope.clientToCreate = null;
        $scope.clientToEdit = null;
        $scope.client = null;

        $scope.createForm = null;
        $scope.editForm = null;

        $http.get('/client/all').then(function (response) {
            $scope.clients = response.data;
        }, function () {

        });

        $scope.new = function () {
            $scope.clientToCreate = {name: "", short_name: "", enabled: true};

            // To clear the errors from previous create forms
            if ($scope.createForm !== null) {
                $scope.createForm.name.$setValidity('available', true);
                $scope.createForm.sname.$setValidity('available', true);
            }
        };

        $scope.create = function () {
            if ($scope.createForm.$valid) {
                $http.post('/client/create', $scope.clientToCreate).then(function (response) {
                    $scope.clientToCreate.id = response.data.id;
                    $scope.addToTable($scope.clients, $scope.clientToCreate);
                }, function () {

                });
            }
        };

        $scope.edit = function (client) {
            $scope.clientToEdit = angular.copy(client);
            $scope.client = client;

            // To clear the errors from previous edit forms
            if ($scope.editForm !== null) {
                $scope.editForm.name.$setValidity('available', true);
                $scope.editForm.sname.$setValidity('available', true);
            }
        };

        $scope.update = function () {
            if ($scope.editForm.$valid) {
                $http.put('/client/update', $scope.clientToEdit).then(function () {
                    $scope.updateInTable($scope.clients, $scope.clientToEdit);
                }, function () {

                });
            }
        };

        $scope.reverseOrder = function (sortType) {
            $scope.sortType = sortType;
            $scope.sortReverse = !$scope.sortReverse
        };

        $scope.startsWith = function (actual, expected) {
            var lowerStr = (actual + "").toLowerCase();
            return lowerStr.indexOf(expected.toLowerCase()) === 0;
        };

        $scope.addToTable = function (items, item) {
            items.push(item);
        };

        $scope.updateInTable = function (items, item) {
            for (var i = 0; i < items.length; i++)
                if (items[i].id === item.id)
                    items[i] = item;
        };

    });