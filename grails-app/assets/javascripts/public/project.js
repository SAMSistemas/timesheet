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

    var app = angular.module('projectApp', ['directives', 'filters']);

    app.controller('mainController', function ($scope, $http) {

        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.search = '';     // set the default search/filter term
        $scope.status = 'all';

        $scope.projects = [];
        $scope.projectToCreate = null;
        $scope.projectToEdit = null;
        $scope.project = null;

        $scope.createForm = null;
        $scope.editForm = null;

        $http.get('/project/all').then(function(response) {
            $('select').material_select();
            $scope.projects = response.data;
            console.log($scope.projects);
            $('.modal-trigger').leanModal();
        });

        $scope.new = function() {
            $scope.projectToCreate = {client_name: "", project_name: "", short_name: "", start_date: "", enabled: false};
            $scope.project = {client_name: "", project_name: "", short_name: "", start_date: "", enabled: false};

            // To clear the errors from previous create forms
            if ($scope.createForm !== null) {
                $scope.createForm.name.$setValidity('nameAvailable', true);
                $scope.createForm.sname.$setValidity('snameAvailable', true);
            }
        };

        $scope.create = function() {
            if ($scope.createForm.$valid) {
                $http.post('/project/create', $scope.projectToCreate);
                $scope.addToTable($scope.projects, $scope.projectToCreate);
            }
        };

        $scope.edit = function(project) {
            $scope.projectToEdit = angular.copy(project);
            $scope.project = project;

            // To clear the errors from previos edit forms
            if ($scope.editForm !== null) {
                $scope.editForm.name.$setValidity('nameAvailable', true);
                $scope.editForm.sname.$setValidity('snameAvailable', true);
            }
        };

        $scope.update = function() {
            if ($scope.editForm.$valid) {
                $http.put('/project/update', $scope.projectToEdit);
                $scope.updateInTable($scope.projects, $scope.projectToEdit);
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