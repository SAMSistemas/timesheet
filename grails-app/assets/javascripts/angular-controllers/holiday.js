(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('HolidayController', HolidayController);

    HolidayController.$inject = ['$scope', 'holidayService', 'utilsService'];

    function HolidayController($scope, holidayService, utilsService) {

        var vm = this;

        vm.eventToCreate = {};
        vm.eventToUpdate = {};

        vm.events_array = [];
        vm.new_event_source = [];

        vm.createForm = null;
        vm.editForm = null;

        vm.create = create;
        vm.update = update;
        vm.delete = deleteHoliday;

        holidayService.get(getSuccess, callbackError);


        /** Controller Functions **/

        function create() {
            holidayService.create(vm.eventToCreate, createSuccess, callbackError);
        };

        function update() {
            //Remove previous event from calendar
            vm.removeEvent(vm.eventToUpdate);

            holidayService.update(vm.eventToUpdate, updateSuccess, callbackError);

            //Add new event source to calendar to render it
            vm.addEventSource(vm.eventToUpdate);

        };

        function deleteHoliday() {
            holidayService.delete(vm.eventToUpdate.id, deleteSuccess, callbackError);

            //Remove event from calendar
            vm.removeEvent(vm.eventToUpdate);
        };


        /** Callback Handlers **/

        function getSuccess(response) {
            vm.events_array = response.data;
            vm.initCalendar();

        }

        function createSuccess(response) {
            vm.eventToCreate.id = response.data.id;
            vm.addEventSource(vm.eventToCreate);
            utilsService.writeToLog(response, 'created');
        }

        function updateSuccess(response) {
            utilsService.writeToLog(response, 'updated');
        }

        function deleteSuccess(response) {
            utilsService.writeToLog(response, 'deleted');
        }

        function callbackError(response) {
            utilsService.writeToLog(response, 'error');
        }


        /** Utils **/

        vm.initCalendar = function () {

            $('#calendar').fullCalendar({
                height: 500,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,basicWeek'
                },
                defaultDate: new Date(),
                lang: 'es',
                timezone: 'America/Argentina/Buenos_Aires',
                editable: true,
                businessHours: {
                    start: '09:00', // a start time (9am in this example)
                    end: '18:00', // an end time (6pm in this example)

                    dow: [1, 2, 3, 4, 5]  //days of week (Monday, Thursday, Wednesday, Tuesday, Friday in this example)
                },
                dayClick: function (date, event) {
                    vm.eventToCreate.id = null;
                    vm.eventToCreate.title = "";
                    vm.eventToCreate.date = date.format();
                    $scope.$apply();

                    $('#create_modal').openModal();

                },
                eventLimit: true, // allow "more" link when too many events
                events: vm.events_array,
                eventColor: '#009688',
                eventClick: function (calEvent) {
                    var event_id = calEvent.id;
                    var events = vm.findEventById(event_id);

                    vm.eventToUpdate.id = events[0].id;
                    vm.eventToUpdate.title = events[0].title;
                    vm.eventToUpdate.date = events[0].date;
                    $scope.$apply();

                    $('#edit_modal').openModal();
                }
            });
        };

        // Search for an event

        vm.searchEvent = function (nameKey, myArray) {
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].title === nameKey) {
                    return i;
                }
            }
        };

        vm.findEventById = function (id) {
            return $('#calendar').fullCalendar('clientEvents', function (evt) {
                return evt.id == id;
            });
        };

        //Add calendar event source to render view

        vm.addEventSource = function (event) {
            vm.new_array = [];
            vm.new_array.push(event);
            $('#calendar').fullCalendar('addEventSource', vm.new_array);
        };

        //Remove calendar event source to render view

        vm.removeEventSource = function (event) {
            vm.new_array = [];
            vm.new_array.push(event);
            $('#calendar').fullCalendar('removeEventSource', vm.new_array);
        };

        //Remove event from calendar
        vm.removeEvent = function (event) {
            $('#calendar').fullCalendar('removeEvents', event.id);
        };

    }

})();