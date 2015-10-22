(function () {

    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function () {
        $('td .modal-trigger').not('.modal-trigger-applied').leanModal();
        $('td .modal-trigger').addClass('modal-trigger-applied');
    });

    observer.observe(document.querySelector('#table-body'), {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: false,
        attributeOldValue: false,
        characterDataOldValue: false
    });

    var app = angular.module('taskTypeApp', ['directives', 'filters']);

    app.controller('mainController', function ($scope, $http) {

        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.search = '';     // set the default search/filter term
        $scope.status = 'all';

        $scope.taskTypes = [];
        $scope.taskTypeToCreate = null;
        $scope.taskTypeToEdit = null;
        $scope.taskType = null;

        $scope.createForm = null;
        $scope.editForm = null;

        $http.get('/taskType/all').then(function (response) {
            $('select').material_select();
            $scope.taskTypes = response.data;
            $('a.modal-trigger').leanModal();
        });

        $scope.new = function () {
            $scope.taskTypeToCreate = {name: "", enabled: false};
            $scope.taskType = {name: "", enabled: false};

            // To clear the errors from previos create forms
            if ($scope.createForm !== null) {
                $scope.createForm.name.$setValidity('nameAvailable', true);
            }
        };

        $scope.create = function () {
            if ($scope.createForm.$valid) {
                $http.post('/taskType/create', $scope.taskTypeToCreate);
                $scope.addToTable($scope.taskTypes, $scope.taskTypeToCreate);
            }
        };

        $scope.edit = function (taskType) {
            $scope.taskTypeToEdit = angular.copy(taskType);
            $scope.taskType = taskType;

            // To clear the errors from previos edit forms
            if ($scope.editForm !== null) {
                $scope.editForm.name.$setValidity('nameAvailable', true);
            }
        };

        $scope.update = function () {
            if ($scope.editForm.$valid) {
                $http.put('/taskType/update', $scope.taskTypeToEdit);
                $scope.updateInTable($scope.taskTypes, $scope.taskTypeToEdit);
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

}());