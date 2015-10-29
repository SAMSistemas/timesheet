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

    var app = angular.module('myApp');

    app.controller('projectController', function ($scope, $http) {

        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.search = '';     // set the default search/filter term
        $scope.status = 'all';

        $scope.projects = [];
        $scope.projectToCreate = null;
        $scope.projectToEdit = null;
        $scope.project = null;

        $scope.clients = [];
        $scope.clientSelected = null;

        $scope.createForm = null;
        $scope.editForm = null;

        $scope.months = "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre";

        $scope.dateSelected = new Date();

        $http.get('/client/all').then(function (response) {
            $scope.clients = response.data;
            $scope.clientSelected = $scope.clients[0];
        });

        $http.get('/project/all').then(function(response) {
            $scope.projects = response.data;
        });

        $scope.new = function() {
            $scope.projectToCreate = {client_name: "", project_name: "", short_name: "", start_date: "", enabled: false};
            $scope.project = {client_name: "", project_name: "", short_name: "", start_date: "", enabled: false};

            // To clear the errors from previous create forms
            if ($scope.createForm !== null) {
                $scope.createForm.project_name.$setValidity('nameAvailable', true);
                $scope.createForm.sname.$setValidity('snameAvailable', true);
            }
        };

        $scope.create = function() {
            $scope.projectToCreate.client_name = $scope.clientSelected.name;
            alert($scope.dateSelected);
            $scope.generateCreateStringDate($scope.dateSelected);
            if ($scope.createForm.$valid) {
                $http.post('/project/create', $scope.projectToCreate);
                $scope.addToTable($scope.projects, $scope.projectToCreate);
            }
        };

        $scope.generateCreateStringDate = function(date){
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var month = monthIndex+1;
            var year = date.getFullYear();
            $scope.projectToCreate.start_date = day+ '-' +month+ '-' +year;

        };

        $scope.edit = function(project) {
            $scope.projectToEdit = angular.copy(project);
            $scope.project = project;
            $scope.clientSelected = $scope.projectToEdit.client_name;
            //$scope.parseDate($scope.projectToEdit.start_date);

            // To clear the errors from previous edit forms
            if ($scope.editForm !== null) {
                $scope.editForm.project_name.$setValidity('nameAvailable', true);
                $scope.editForm.sname.$setValidity('snameAvailable', true);
            }
        };

        //$scope.parseDate = function(date) {
        //    var date_array = date.split('-');
        //    $scope.dateSelected = new Date(date_array[2],date_array[1],date_array[0]);
        //};

        $scope.update = function() {
            $scope.generateEditStringDate($scope.dateSelected);
            if ($scope.editForm.$valid) {
                $http.put('/project/update', $scope.projectToEdit);
                $scope.updateInTable($scope.projects, $scope.projectToEdit);
            }
        };

        $scope.generateEditStringDate = function(date){
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var month = monthIndex+1;
            var year = date.getFullYear();

            $scope.projectToEdit.start_date = day+ '-' +month+ '-' +year;
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
            console.log(items);
            console.log(item);
            for (var i = 0; i < items.length; i++)
                if (items[i].id === item.id)
                    items[i] = item;
        };

        $scope.changeColor = function(divId){
            $( "#"+divId+" .select-modal input.select-dropdown").css("cssText", " color: #009688 !important;");
        };

    });
}());