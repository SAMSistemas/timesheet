var app = angular.module('myApp');

app.controller('holidayController', function ($scope, $http) {

        $scope.holidayToCreate = {};
        $scope.holidayToUpdate = {};

        $scope.eventToCreate = {};
        $scope.eventToEdit = {};

        $scope.events_array = [];

        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
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
                $scope.holidayToCreate.description = event.title;
                $scope.holidayToCreate.date = date.format();

                $('#create_modal').openModal();

            },
            eventLimit: true, // allow "more" link when too many events
            events: $scope.events_array,
            eventColor: '#009688',
            eventClick: function (calEvent) {

                var indexEvent = $scope.searchHoliday(calEvent.title, $scope.events_array);

                if(indexEvent >= 0) {
                    $scope.eventToEdit = $scope.events_array[indexEvent];
                    $scope.events_array.splice(indexEvent, 1);
                    $scope.holidayToUpdate.description = calEvent.title;
                    $scope.holidayToUpdate.date = calEvent.start.format();
                }

                $('#edit_modal').openModal();
            }
        });

    $http.get('/holiday/all').then(function (response) {
        $scope.events_array = response.data;
    });

    $scope.create = function(holidayToCreate) {

        /** Add holiday to DB **/
        $http.post('/holiday/create', holidayToCreate);

        $scope.eventToCreate.title = holidayToCreate.description;
        $scope.eventToCreate.start = holidayToCreate.date;
        $scope.events_array.push($scope.eventToCreate);

        /** Refresh event source **/
        $('#calendar').fullCalendar('addEventSource', $scope.events_array );

        $scope.holidayToCreate = {};
    };

    $scope.edit = function(holidayToEdit) {

        $http.put('/holiday/update', holidayToEdit);
        $scope.eventToEdit.title = holidayToEdit.description;
        $scope.eventToEdit.start = holidayToEdit.date;
        $scope.events_array.push($scope.eventToCreate);

        /** Refresh event source **/
        $('#calendar').fullCalendar( 'removeEventSource', $scope.events_array );
        $('#calendar').fullCalendar('addEventSource', $scope.events_array );

        $scope.holidayToUpdate = {};

    };

    $scope.delete = function(holidayToEdit) {

        $http.delete('/holiday/delete', holidayToEdit);

        /** Refresh event source **/
        $('#calendar').fullCalendar( 'removeEventSource', $scope.events_array );
        $('#calendar').fullCalendar('addEventSource', $scope.events_array );

        $scope.holidayToUpdate = {};

    };

    /** Utils **/

    $scope.searchHoliday = function(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].title === nameKey) {
                return i;
            }
        }
    };

});