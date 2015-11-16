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

var app = angular.module('myApp');

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
    });

    $scope.new = function () {
        $scope.clientToCreate = {name: "", short_name: "", enabled: true};
        $scope.client = {name: "", short_name: "", enabled: false};

        // To clear the errors from previos create forms
        if ($scope.createForm !== null) {
            $scope.createForm.name.$setValidity('available', true);
            $scope.createForm.sname.$setValidity('available', true);
        }
    };

    $scope.create = function () {
        if ($scope.createForm.$valid) {
            $http.post('/client/create', $scope.clientToCreate);
            $scope.addToTable($scope.clients, $scope.clientToCreate);
        }
    };

    $scope.edit = function (client) {
        $scope.clientToEdit = angular.copy(client);
        $scope.client = client;

        // To clear the errors from previos edit forms
        if ($scope.editForm !== null) {
            $scope.createForm.name.$setValidity('available', true);
            $scope.createForm.sname.$setValidity('available', true);
        }
    };

    $scope.update = function () {
        if ($scope.editForm.$valid) {
            $http.put('/client/update', $scope.clientToEdit);
            $scope.updateInTable($scope.clients, $scope.clientToEdit);
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