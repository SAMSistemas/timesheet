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

    }

})();