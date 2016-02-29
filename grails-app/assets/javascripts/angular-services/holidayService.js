(function() {
    'use strict';

    angular
        .module('services')
        .service('holidayService', holidayService);

    holidayService.$inject = ['$http'];

    function holidayService($http) {

        var vm = this;

        vm.getHolidays = getHolidays;
        vm.createHoliday = createHoliday;
        vm.updateHoliday = updateHoliday;
        vm.deleteHoliday = deleteHoliday;

        function getHolidays(callbackSuccess, callbackFailure) {
            $http.get('/holidays').then(callbackSuccess, callbackFailure);
        };

        function createHoliday(eventToCreate, callbackSuccess, callbackFailure) {
            $http.post('/holidays', eventToCreate).then(callbackSuccess, callbackFailure);
        };

        function updateHoliday(eventToEdit, callbackSuccess, callbackFailure) {
            $http.put('/holidays/' + eventToEdit.id, eventToEdit).then(callbackSuccess, callbackFailure);
        };

        function deleteHoliday(callbackSuccess, callbackFailure) {
            $http.delete('/holidays/' + vm.eventToUpdate.id).then(callbackSuccess, callbackFailure);
        };

    }

})();