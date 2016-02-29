(function() {
    'use strict';

    angular
        .module('services')
        .service('utilsService', utilsService);

    function utilsService() {

        var vm = this;

        vm.writeToLog = writeToLog;
        vm.addToTable = addToTable;
        vm.updateInTable = updateInTable;
        vm.dateToString = dateToString;
        vm.changeColor = changeColor;

        //Write result message to console
        function writeToLog(response, result) {

            var resultMessage = {
                result: result,
                status: response.status,
                data: response.data
            };

            console.log(JSON.stringify(resultMessage));
        };

        //Add element in table
        function addToTable(items, item) {
            items.push(item);
        };

        //Update element in table
        function updateInTable(items, item) {
            for (var i = 0; i < items.length; i++)
                if (items[i].id === item.id)
                    items[i] = item;
        };

        //Parse date into string
        function dateToString(date) {
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var month = monthIndex + 1;
            var year = date.getFullYear();
            return day + '-' + month + '-' + year;
        };

        // Change div element color
        function changeColor(divId) {
            $("#" + divId).css("cssText", " color: #009688 !important;");
        };

    }

})();