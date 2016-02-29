(function() {
    'use strict';

    angular
        .module('services')
        .service('jobLogService', jobLogService);

    jobLogService.$inject = ['$http'];

    function jobLogService($http) {

        var vm = this;

        vm.filterDataToReport = filterDataToReport;
        vm.assignJobLog = assignJobLog;

        function filterDataToReport(uri, filters, callbackSuccess, callbackFailure) {
            $http.post(uri, filters).then(callbackSuccess, callbackFailure);
        };

        function assignJobLog(jobLog, callbackSuccess, callbackFailure) {
            $http.post('/projects/' + jobLog.project.id + '/assign', jobLog).then(callbackSuccess, callbackFailure);
        };

    }

})();