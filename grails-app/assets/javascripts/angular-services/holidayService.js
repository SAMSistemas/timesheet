(function() {
    'use strict';

    angular
        .module('services')
        .service('holidayService', holidayService);

    holidayService.$inject = ['$http'];

    function holidayService($http) {

        var vm = this;

        vm.get = get;
        vm.create = create;
        vm.update = update;
        vm.delete = deleteHoliday;

        function get(callbackSuccess, callbackFailure) {
            $http.get('/holidays').then(callbackSuccess, callbackFailure);
        };

        function create(eventToCreate, callbackSuccess, callbackFailure) {
            $http.post('/holidays', eventToCreate).then(callbackSuccess, callbackFailure);
        };

        function update(eventToEdit, callbackSuccess, callbackFailure) {
            $http.put('/holidays/' + eventToEdit.id, eventToEdit).then(callbackSuccess, callbackFailure);
        };

        function deleteHoliday(callbackSuccess, callbackFailure) {
            $http.delete('/holidays/' + vm.eventToUpdate.id).then(callbackSuccess, callbackFailure);
        };

    }

})();