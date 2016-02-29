(function() {
    'use strict';

    angular
        .module('services')
        .service('holidayService', holidayService);

    holidayService.$inject = ['$http'];

    function holidayService($http) {

        var vm = this;

        vm.getHolidays = function (callbackSuccess, callbackFailure) {
            $http.get('/holidays').then(callbackSuccess, callbackFailure);
        };

        vm.createHoliday = function (eventToCreate, callbackSuccess, callbackFailure) {
            $http.post('/holidays', eventToCreate).then(callbackSuccess, callbackFailure);
        };

        vm.updateHoliday = function (eventToEdit, callbackSuccess, callbackFailure) {
            $http.put('/holidays/' + eventToEdit.id, eventToEdit).then(callbackSuccess, callbackFailure);
        };

        vm.deleteHoliday = function (callbackSuccess, callbackFailure) {
            $http.delete('/holidays/' + vm.eventToUpdate.id).then(callbackSuccess, callbackFailure);
        };

    }
})();