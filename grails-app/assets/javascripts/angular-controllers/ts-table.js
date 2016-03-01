//= require shared/table-body-observer

(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('TsTableController', TsTableController);

    function TsTableController() {

        var vm = this;

        vm.sortType = '';           // set the default sort type
        vm.sortReverse = false;     // set the default sort order
        vm.search = {};             // set the default search/filter term
        vm.status = 'all';          // set the default status filter
        

        /* Filter functions */

        vm.reverseOrder = function (sortType) {
            vm.sortType = sortType;
            vm.sortReverse = !vm.sortReverse
        };

        vm.startsWith = function (actual, expected) {
            var lowerStr = (actual + "").toLowerCase();
            return lowerStr.indexOf(expected.toLowerCase()) === 0;
        };


        /* Filter clients by enabled */

        vm.filter = function (clients) {
            var result = {};
            angular.forEach(clients, function (client, key) {
                if (!client.enabled) {
                    return;
                }
                result[key] = client;
            });
            return result;
        };

        vm.isEnabled = function (client_name) {

            vm.enabledClients.forEach(function (client) {
                console.log(client_name);
                console.log(client.name);
                if (!client.name.localeCompare(client_name)) {
                    return true;
                }
            });
            return false;
        };

    }

})();