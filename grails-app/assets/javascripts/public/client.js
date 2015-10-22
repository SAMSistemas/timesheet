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

    var app = angular.module('clientApp', ['filters']);

    app.controller('mainController', function ($scope, $http) {

        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.search = '';     // set the default search/filter term
        $scope.status = 'todos';

        $scope.clients = [];
        $scope.clientToCreate = null;
        $scope.clientToEdit = null;
        $scope.client = null;

        $scope.createForm = null;
        $scope.editForm = null;

        $http.get('/client/all').then(function (response) {
            $('select').material_select();
            $scope.clients = response.data;
            $('a.modal-trigger').leanModal();
        });

        $scope.new = function () {
            $scope.clientToCreate = {name: "", short_name: "", enabled: false};
            $scope.client = {name: "", short_name: "", enabled: false};

            // To clear the errors from previos create forms
            if ($scope.createForm !== null) {
                $scope.createForm.name.$setValidity('nameAvailable', true);
                $scope.createForm.sname.$setValidity('snameAvailable', true);
            }
        };

        $scope.create = function () {
            if ($scope.createForm.$valid) {
                $http.post('/client/create', $scope.clientToCreate);
                $scope.addNewClientToTable();
            }
        };

        $scope.edit = function (client) {
            $scope.clientToEdit = angular.copy(client);
            $scope.client = client;

            // To clear the errors from previos edit forms
            if ($scope.editForm !== null) {
                $scope.editForm.name.$setValidity('nameAvailable', true);
                $scope.editForm.sname.$setValidity('snameAvailable', true);
            }
        };

        $scope.update = function () {
            if ($scope.editForm.$valid) {
                $http.put('/client/update', $scope.clientToEdit);
                $scope.editUpdatedClientInTable();
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

        $scope.addNewClientToTable = function () {
            $scope.clients.push($scope.clientToCreate);
        };

        $scope.editUpdatedClientInTable = function () {
            for (var i = 0, len = $scope.clients.length; i < len; i++)
                if ($scope.clients[i].id === $scope.clientToEdit.id)
                    $scope.clients[i] = $scope.clientToEdit;
        };

    });

    // Fuente: http://stackoverflow.com/questions/15592117/email-form-validation-one-at-a-time
    app.directive('nameAvailable', function ($http) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                elem.on('blur', function() {

                    // get the value of the input
                    var viewValue = ctrl.$viewValue;

                    // check if the value is equal to the value before the edition
                    if (scope.client.name !== viewValue) {
                        $http.get('/client/existsName/' + viewValue).then(
                            function (response) {
                                if (response.data["exists"] === "true") { // if it exists, it set the validity to false
                                    ctrl.$setValidity('nameAvailable', false);
                                } else {
                                    ctrl.$setValidity('nameAvailable', true);
                                }
                            },
                            function () {
                                ctrl.$setValidity('nameAvailable', false);
                            });
                    } else { // if it is equal, it's ok
                        ctrl.$setValidity('nameAvailable', true);
                        scope.$apply();
                    }
                })
            }
        };
    });

    app.directive('snameAvailable', function ($http) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                elem.on('blur', function() {

                    // get the value of the input
                    var viewValue = ctrl.$viewValue;

                    // check if the value is equal to the value before the edition
                    if (scope.client.short_name !== viewValue) {
                        $http.get('/client/existsSName/' + viewValue).then(
                            function (response) {
                                if (response.data["exists"] === "true") { // if it exists, it set the validity to false
                                    ctrl.$setValidity('snameAvailable', false);
                                } else {
                                    ctrl.$setValidity('snameAvailable', true);
                                }
                            },
                            function () {
                                ctrl.$setValidity('snameAvailable', false);
                            });
                    } else { // if it is equal, it's ok
                        ctrl.$setValidity('snameAvailable', true);
                        scope.$apply();
                    }
                })
            }
        };
    });

}());