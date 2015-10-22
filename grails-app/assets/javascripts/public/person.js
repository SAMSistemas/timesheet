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

    var app = angular.module('personApp', ['directives', 'filters']);

    app.controller('mainController', function ($scope, $http) {

        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.search = '';     // set the default search/filter term
        $scope.status = 'all';

        $scope.people = [];
        $scope.personToCreate = {name: "", lastname: "", username: "", password: "", enabled: false};
        $scope.personToEdit = null;
        $scope.person = null;

        $scope.createForm = null;
        $scope.editForm = null;

        $http.get('/person/all').then(function(response) {
            $('select').material_select();
            $scope.people = response.data;
            $('.modal-trigger').leanModal();
        });

        $scope.new = function() {
            $scope.personToCreate = {name: "", lastname: "", username: "", password: "", enabled: false};
            $scope.person = {name: "", lastname: "", username: "", password: "", enabled: false};

            // To clear the errors from previous create forms
            if ($scope.createForm !== null) {
                $scope.createForm.username.$setValidity('usernameAvailable', true);
            }
        };

        $scope.create = function() {
            if ($scope.createForm.$valid) {
                $http.post('/person/create', $scope.personToCreate);
                $scope.addToTable($scope.people, $scope.personToCreate);
            }
        };

        $scope.edit = function(person) {
            $scope.personToEdit = angular.copy(person);
            $scope.person = person;

            // To clear the errors from previos edit forms
            if ($scope.editForm !== null) {
                $scope.editForm.username.$setValidity('usernameAvailable', true);
            }
        };

        $scope.update = function() {
            if ($scope.editForm.$valid) {
                $http.put('/person/update', $scope.personToEdit);
                $scope.updateInTable($scope.people, $scope.personToEdit);
            }
        };

        $scope.reverseOrder = function(sortType) {
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