(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('HolidayController', HolidayController);

    HolidayController.$inject = ['$scope', 'holidayService', 'utilsService'];

    function HolidayController($scope, holidayService, utilsService) {

        var vm = this;

        vm.cuEvent = {};

        vm.events_array = [];
        vm.new_event_source = [];

        vm.cuForm = null;

        vm.delete = deleteHoliday;
        vm.createOrUpdate = createOrUpdate;

        holidayService.get(getSuccess, callbackError);


        /** Controller Functions **/

        function deleteHoliday() {
            holidayService.delete(vm.cuEvent, deleteSuccess, callbackError);

            //Remove event from calendar
            vm.removeEvent(vm.cuEvent);
        }

        function createOrUpdate() {
            if (vm.cuEvent.id) {
                //Remove previous event from calendar
                vm.removeEvent(vm.cuEvent);

                holidayService.update(vm.cuEvent, updateSuccess, callbackError);

                //Add new event source to calendar to render it
                vm.addEventSource(vm.cuEvent);
            } else {
                holidayService.create(vm.cuEvent, createSuccess, callbackError);
            }
        }


        /** Callback Handlers **/

        function getSuccess(response) {
            vm.events_array = response.data;
            vm.initCalendar();
        }

        function createSuccess(response) {
            vm.addEventSource(response.data);
        }

        function updateSuccess(response) {
        }

        function deleteSuccess(response) {
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
                    vm.cuEvent = {
                        id: null,
                        title: "",
                        date: date.format()
                    };
                    $scope.$apply();
                    vm.actionToPerform = "Crear";
                    $('#cu-modal').openModal();
                },
                eventLimit: true, // allow "more" link when too many events
                events: vm.events_array,
                eventColor: '#009688',
                eventClick: function (calEvent) {
                    var event_id = calEvent.id;
                    var events = vm.findEventById(event_id);
                    vm.cuEvent = {
                        id: events[0].id,
                        title: events[0].title,
                        date: events[0].date
                    };
                    vm.actionToPerform = "Editar";
                    $scope.$apply();
                    $('#cu-modal').openModal();
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