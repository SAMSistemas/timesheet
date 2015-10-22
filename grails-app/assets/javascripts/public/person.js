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

    var app = angular.module('personApp', ['filters']);

    app.controller('mainController', function ($scope, $http) {

        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.search = '';     // set the default search/filter term
        $scope.status = 'todos';

        $scope.people = [];
        $scope.personToCreate = {name: "", lastname: "", username: "", password: "", enabled: false};
        $scope.personToEdit = null;
        $scope.person = null;

        $scope.createForm = null;
        $scope.editForm = null;

        $http.get('/person/all').then(function(response) {
            $('select').material_select();
            $scope.people = response.data;
            console.log($scope.people);
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
                $scope.addNewPersonToTable();
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
                $scope.editUpdatedPersonInTable();
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

        $scope.addNewPersonToTable = function() {
            $scope.people.push($scope.personToCreate);
        };

        $scope.editUpdatedPersonInTable = function() {
            for (var i = 0, len = $scope.people.length; i < len; i ++)
                if ($scope.people[i].id === $scope.personToEdit.id)
                    $scope.people[i] = $scope.personToEdit;
        };

    });

    // Fuente: http://stackoverflow.com/questions/15592117/email-form-validation-one-at-a-time
    app.directive('usernameAvailable', function ($http) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                elem.on('blur', function() {

                    // get the value of the input
                    var viewValue = ctrl.$viewValue;

                    // check if the value is equal to the value before the edition
                    if (scope.person.username !== viewValue) {
                        $http.get('/person/existsUsername/' + viewValue).then(
                            function (response) {
                                if (response.data["exists"] === "true") { // if it exists, it set the validity to false
                                    ctrl.$setValidity('usernameAvailable', false);
                                } else {
                                    ctrl.$setValidity('usernameAvailable', true);
                                }
                            },
                            function () {
                                ctrl.$setValidity('usernameAvailable', false);
                            });
                    } else { // if it is equal, it's ok
                        ctrl.$setValidity('usernameAvailable', true);
                        scope.$apply();
                    }
                })
            }
        };
    });

}());