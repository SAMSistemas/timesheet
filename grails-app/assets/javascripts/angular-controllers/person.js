//= require default
//= require shared/table-body-observer
//= require_self

app.controller('personController', function ($scope, $http) {

        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.search = '';     // set the default search/filter term
        $scope.status = 'all';

        $scope.people = [];
        $scope.personToCreate = null;
        $scope.personToEdit = null;
        $scope.person = null;

        $scope.createForm = null;
        $scope.editForm = null;

        $scope.work_hours = [4,6,8];
        $scope.work_positions = [];

        $http.get('/person/all').then(function (response) {
            $scope.people = response.data;
        }, function () {

        });

        $http.get('/workPosition/all').then(function (response) {
            $scope.work_positions = response.data;
        }, function () {

        });

        $scope.new = function () {
            $scope.personToCreate = {
                name: "",
                lastname: "",
                username: "",
                password: "",
                work_hours: "",
                work_position: "",
                enabled: true
            };

            // To clear the errors from previous create forms
            if ($scope.createForm !== null) {
                $scope.createForm.username.$setValidity('available', true);
            }
        };

        $scope.create = function () {
            if ($scope.createForm.$valid) {
                $http.post('/person/create', $scope.personToCreate).then(function () {
                    $scope.addToTable($scope.people, $scope.personToCreate);
                }, function () {

                });
            }
        };

        $scope.edit = function (person) {
            $scope.personToEdit = angular.copy(person);
            $scope.person = person;

            // To clear the errors from previous edit forms
            if ($scope.editForm !== null) {
                $scope.editForm.username.$setValidity('available', true);
            }
        };

        $scope.update = function () {
            if ($scope.editForm.$valid) {
                $http.put('/person/update', $scope.personToEdit).then(function () {
                    $scope.updateInTable($scope.people, $scope.personToEdit);
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

        $scope.changeColor = function (divId) {
            $("#" + divId).css("cssText", " color: #009688 !important;");
        };

    });