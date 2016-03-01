(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('SessionInfoController', SessionInfoController);

    SessionInfoController.$inject = ['personService', 'utilsService'];

    function SessionInfoController(personService, utilsService) {

        var vm = this;

        vm.user = "";
        vm.name = "";

        loadUserAndName();

        /** Controllers Functions **/

        function loadUserAndName() {
            vm.user = sessionStorage.getItem("username");
            personService.show(vm.user, showPersonSuccess, callbackError);
        };

        /** Callback Handlers **/

        function showPersonSuccess(response) {
            var user = response.data[0];
            vm.name = user.name + ' ' + user.lastname;
            sessionStorage.setItem("name", vm.name);
        }

        function callbackError(response) {
            utilsService.writeToLog(response, 'error');
        }

    }

})();