angular.module('services')
    .service('utilsService', utilsService);

function utilsService(){

    var vm = this;

    //Write result message to console
    vm.writeToLog = function(response, result){

        var resultMessage = {
            result: result,
            status: response.status,
            data: response.data
        };

        console.log(JSON.stringify(resultMessage));
    };

    //Add element in table
    vm.addToTable = function (items, item) {
        items.push(item);
    };

    //Update element in table
    vm.updateInTable = function (items, item) {
        for (var i = 0; i < items.length; i++)
            if (items[i].id === item.id)
                items[i] = item;
    };

    //Parse date into string
    vm.dateToString = function (date) {

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var month = monthIndex + 1;
        var year = date.getFullYear();
        return day + '-' + month + '-' + year;

    };

    // Change div element color
    vm.changeColor = function (divId) {
        $("#" + divId).css("cssText", " color: #009688 !important;");
    };
}