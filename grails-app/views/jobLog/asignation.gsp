<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main" />
    <title>Asignar</title>
    <style>
       select {
           display: inherit;
       }
    </style>
</head>
<body>

<div ng-app="myApp" ng-controller="mainController">
    <form ng-submit="submit()">
        <select ng-model="personSelected">
            <option ng-repeat="person in people" value="{{person.id}}">{{person.name}}</option>
        </select>
        <select ng-model="projectSelected">
            <option ng-repeat="project in projects" value="{{project.id}}">{{project.name}}</option>
        </select>
        <input type="submit" value="Asignar"></form>
    </form>
</div>

<script>
    var app = angular.module('myApp', []);

    app.controller('mainController', function ($scope, $http) {
        $scope.people = [];
        $scope.projects = [];
        $scope.personSelected = null;
        $scope.projectSelected = null;

        $.getJSON("/person.json", function (data) {
            $scope.people = data;
            $scope.$apply();
        });

        $.getJSON("/project.json", function (data) {
            $scope.projects = data;
            $scope.$apply();
        });

        $scope.submit = function() {
            var jobLog = {
                person: "" + $scope.personSelected,
                project: "" + $scope.projectSelected
            }
            $http.post('/jobLog/asign', jobLog);
        }

    });
</script>

</body>
</html>
