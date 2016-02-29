(function() {
    'use strict';

    angular
        .module('services')
        .service('jobLogService', jobLogService);

    jobLogService.$inject = ['$http'];

    function jobLogService($http) {

        var vm = this;

        vm.filterDataToReport = function (uri, filters, callbackSuccess, callbackFailure) {
            $http.post(uri, filters).then(callbackSuccess, callbackFailure);
        };

        vm.assignJobLog = function (jobLog, callbackSuccess, callbackFailure) {
            $http.post('/projects/' + jobLog.project.id + '/assign', jobLog).then(callbackSuccess, callbackFailure);
        };

    }
})();