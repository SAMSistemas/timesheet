angular.module('services')
    .service('holidayService', holidayService);

function holidayService($http) {

    var vm = this;

    vm.getHolidays = function(callbackSuccess, callbackFailure){
        $http.get('/holiday/all').then(callbackSuccess, callbackFailure);
    };

    vm.createHoliday = function(eventToCreate,callbackSuccess, callbackFailure){
        $http.post('/holiday/create', eventToCreate).then(callbackSuccess, callbackFailure);
    };

    vm.updateHoliday = function(eventToEdit, callbackSuccess, callbackFailure){
        $http.put('/holiday/update', eventToEdit).then(callbackSuccess, callbackFailure);
    };

    vm.deleteHoliday = function(eventToDelete, callbackSuccess, callbackFailure){
        $http.delete('/holiday/delete/' + eventToDelete).then(callbackSuccess,callbackFailure);
    };

}