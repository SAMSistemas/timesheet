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

        $http.get('/client/all').then(function (response) {
            $scope.clients = response.data;
            $scope.clientSelected = $scope.clients[0];
        });

        $http.get('/project/all').then(function(response) {
            $('select').material_select();
            $scope.projects = response.data;
            $('.modal-trigger').leanModal();
            $('#date').combodate({
                minYear: 2010,
                maxYear: 2020,
                value: new Date()
            });
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
            console.log($scope.projectToCreate);

            if ($scope.createForm.$valid) {
                $http.post('/project/create', $scope.projectToCreate);
                $scope.addToTable($scope.projects, $scope.projectToCreate);
            }
        };

        $scope.edit = function(project) {
            $scope.projectToEdit = angular.copy(project);
            $scope.project = project;


            $scope.clientSelected = $scope.projectToEdit.client_name;

            // To clear the errors from previous edit forms
            if ($scope.editForm !== null) {
                $scope.editForm.project_name.$setValidity('nameAvailable', true);
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
            console.log(items);
            console.log(item);
            for (var i = 0; i < items.length; i++)
                if (items[i].id === item.id)
                    items[i] = item;
        };

        $scope.changeColor = function(divId){
            $( "#"+divId+" .select-modal input.select-dropdown").css("cssText", " color: #009688 !important;");
        };

        //$scope.$watch('projectToCreate.start_date', function (newValue) {
        //    $scope.projectToCreate.start_date = $filter('date')(newValue, 'dd-MM-yyyy');
        //});

    });

    app.directive('moDateInput', function ($window) {
        return {
            require:'^ngModel',
            restrict:'A',
            link:function (scope, elm, attrs, ctrl) {
                var moment = $window.moment;
                var dateFormat = attrs.moMediumDate;
                attrs.$observe('moDateInput', function (newValue) {
                    if (dateFormat == newValue || !ctrl.$modelValue) return;
                    dateFormat = newValue;
                    ctrl.$modelValue = new Date(ctrl.$setViewValue);
                });

                ctrl.$formatters.unshift(function (modelValue) {
                    if (!dateFormat || !modelValue) return "";
                    var retVal = moment(modelValue).format(dateFormat);
                    return retVal;
                });

                ctrl.$parsers.unshift(function (viewValue) {
                    var date = moment(viewValue, dateFormat);
                    return (date && date.isValid() && date.year() > 1950 ) ? date.toDate() : "";
                });
            }
        };
    });

}());