//= require default
//= require shared/table-body-observer
//= require_self

app.controller('projectController', function ($scope, $http) {

        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.search = '';     // set the default search/filter term
        $scope.status = 'all';

        $scope.projects = [];
        $scope.projectToCreate = null;
        $scope.projectToEdit = null;
        $scope.project = null;

        $scope.enabledClients = [];
        $scope.clientSelected = null;

        $scope.createForm = null;
        $scope.editForm = null;

        $scope.months = "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre";

        $scope.dateSelected = new Date();

        $http.get('/client/allEnabled').then(function (response) {
            $scope.enabledClients = response.data;
        }, function () {

        });

        $http.get('/project/all').then(function (response) {
            $scope.projects = response.data;
        }, function () {

        });

        $scope.new = function () {
            $scope.clientSelected = "";
            $scope.projectToCreate = {client_name: "", client: {name: "", enabled: true}, project_name: "", short_name: "", start_date: "", enabled: true};

            // To clear the errors from previous create forms
            if ($scope.createForm !== null) {
                $scope.createForm.project_name.$setValidity('available', true);
                $scope.createForm.sname.$setValidity('available', true);
            }
        };

        $scope.create = function () {

            $scope.projectToCreate.client_name = $scope.clientSelected.name;
            $scope.projectToCreate.client.name = $scope.clientSelected.name;

            $scope.generateCreateStringDate($scope.dateSelected);

            if ($scope.createForm.$valid) {
                $http.post('/project/create', $scope.projectToCreate).then(function () {
                    $scope.addToTable($scope.projects, $scope.projectToCreate);
                }, function () {

                });
            }

            $scope.clientSelected = {};
        };

        $scope.generateCreateStringDate = function (date) {
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var month = monthIndex + 1;
            var year = date.getFullYear();
            $scope.projectToCreate.start_date = day + '-' + month + '-' + year;

        };

        $scope.edit = function (project) {

            $scope.clientSelected = {};
            $scope.clientSelected.name = project.client_name;
            $scope.parseDate(project.start_date);

            $scope.projectToEdit = angular.copy(project);
            $scope.project = project;

            // To clear the errors from previous edit forms
            if ($scope.editForm !== null) {
                $scope.editForm.project_name.$setValidity('available', true);
                $scope.editForm.sname.$setValidity('available', true);
            }

        };

        $scope.parseDate = function (date) {
            var date_array = date.split('-');
            $scope.dateSelected = new Date(date_array[2], date_array[1] - 1, date_array[0]);
        };

        $scope.update = function () {
            $scope.projectToEdit.client_name = $scope.clientSelected.name;

            $scope.generateEditStringDate($scope.dateSelected);

            if ($scope.editForm.$valid) {
                $http.put('/project/update', $scope.projectToEdit).then(function () {
                    $scope.updateInTable($scope.projects, $scope.projectToEdit);
                }, function () {

                });
            }

            $scope.clientSelected = {};
        };

        $scope.generateEditStringDate = function (date) {
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var month = monthIndex + 1;
            var year = date.getFullYear();

            $scope.projectToEdit.start_date = day + '-' + month + '-' + year;
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

        /* Filter clients by enabled */

        $scope.filter = function(clients) {
            var result = {};
            angular.forEach(clients, function(client, key) {
                if (!client.enabled) {
                    return;
                }
                result[key] = client;
            });
            return result;
        };

        $scope.isEnabled = function(client_name) {

            $scope.enabledClients.forEach(function(client){
                console.log(client_name);
                console.log(client.name);
                if(!client.name.localeCompare(client_name)) {
                    return true;
                }
            });
            return false;
        };

    });