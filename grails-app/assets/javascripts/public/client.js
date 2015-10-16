(function () {

    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function(mutations) {
        $('td .modal-trigger').leanModal();
    });

    observer.observe(document.querySelector('#table-body'), {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: false,
        attributeOldValue: false,
        characterDataOldValue: false
    });

    var app = angular.module('clientApp', []);

    app.controller('mainController', function ($scope, $http) {
        
        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.search = '';     // set the default search/filter term

        $scope.clients = [];
        $scope.clientToCreate = {name: "", short_name: "", enabled: false};
        $scope.clientToEdit = null;

        $http.get('/client/all').then(function(response) {
            $scope.clients = response.data;
            $('.modal-trigger').leanModal();
        });

        $scope.new = function() {
            $scope.clientToCreate = {name: "", short_name: "", enabled: false};
        };

        $scope.create = function() {
            $http.post('/client/create', $scope.clientToCreate);
            $scope.addNewClientToTable();
        };

        $scope.edit = function(client) {
            $scope.clientToEdit = jQuery.extend(true, {}, client);
        };

        $scope.update = function() {
            $http.put('/client/update', $scope.clientToEdit);
            $scope.editUpdatedClientInTable();
        };

        $scope.reverseOrder = function(sortType) {
            $scope.sortType = sortType;
            $scope.sortReverse = !$scope.sortReverse
        };

        $scope.startsWith = function (actual, expected) {
            var lowerStr = (actual + "").toLowerCase();
            return lowerStr.indexOf(expected.toLowerCase()) === 0;
        };

        $scope.addNewClientToTable = function() {
            $scope.clients.push($scope.clientToCreate);
        };

        $scope.editUpdatedClientInTable = function() {
            for (var i = 0, len = $scope.clients.length; i < len; i ++)
                if ($scope.clients[i].id === $scope.clientToEdit.id)
                    $scope.clients[i] = $scope.clientToEdit;
        };

    });

}());