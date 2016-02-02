//= require default
//= require_self

app.controller('assignationController', function ($http) {

    /** Capturing controller instance **/
    var vm = this;

    vm.clients = [];
    vm.projects = [];
    vm.people = [];

    vm.clientSelected = null;
    vm.projectSelected = null;
    vm.personSelected = null;

    vm.confirmation = "";

    vm.form = null;

    $http.get('/client/allEnabled').then(function (response) {
        vm.clients = response.data;
    }, function () {

    });

    vm.changeClient = function () {
        $http.get('/project/allEnabledByClient/' + vm.clientSelected.name).then(function (response) {
            vm.projects = response.data;
            vm.confirmation = "";
        }, function () {

        });
    };

    vm.changeProject = function () {
        $http.get('/person/allEnabledAndAvailableForProject/' + vm.projectSelected.project_name).then(function (response) {
            vm.people = response.data;
            vm.confirmation = "";
        }, function () {

        });
    };

    vm.submit = function () {
        var jobLog = {
            person: vm.personSelected.name,
            project: vm.projectSelected.project_name
        };

        $http.post('/jobLog/assign', jobLog).then(function (response) {
            if (response.status === 200) {
                vm.confirmation = "Se asigno la persona al proyecto";
                vm.personSelected = null;
                $http.get('/person/allEnabledAndAvailableForProject/' + vm.projectSelected.project_name).then(function (response) {
                    vm.people = response.data;
                }, function () {

                });
            }
            else
                vm.confirmation = "Fallo la asignacion";
        }, function () {

        });
    };

});