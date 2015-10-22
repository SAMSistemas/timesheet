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
            $scope.taskToCreate = {name: "", enabled: false};
            $scope.taskType = {name: "", enabled: false};

            // To clear the errors from previos create forms
            if ($scope.createForm !== null) {
                $scope.createForm.name.$setValidity('nameAvailable', true);
            }
        };

        $scope.create = function () {
            if ($scope.createForm.$valid) {
                $http.post('/taskType/create', $scope.taskTypeToCreate);
                $scope.addNewTaskTypeToTable();
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
                $scope.editUpdatedTaskTypeInTable();
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

        $scope.addNewTaskTypeToTable = function () {
            $scope.taskTypes.push($scope.taskTypeToCreate);
        };

        $scope.editUpdatedTaskTypeInTable = function () {
            for (var i = 0, len = $scope.taskTypes.length; i < len; i++)
                if ($scope.taskTypes[i].id === $scope.taskTypeToEdit.id)
                    $scope.taskTypes[i] = $scope.taskTypeToEdit;
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
                    if (scope.taskType.name !== viewValue) {
                        $http.get('/taskType/existsName/' + viewValue).then(
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

}());