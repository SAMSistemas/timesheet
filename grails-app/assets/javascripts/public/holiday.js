var app = angular.module('myApp');

app.controller('holidayController', function ($scope, $http) {

        $scope.holidayToCreate = {};  //Todo quitar holiday y hacer solo con event
        $scope.holidayBefore = {};
        $scope.holidayAfter = {};

        $scope.holidays = [];

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
                $scope.eventToCreate.title = event.title;
                $scope.eventToCreate.start = date.format();

                $('#create_modal').openModal();

            },
            eventLimit: true, // allow "more" link when too many events
            events: $scope.events_array,
            eventColor: '#009688',
            eventClick: function (calEvent) {

                var indexEvent = $scope.searchEvent(calEvent.title, $scope.events_array);

                if(indexEvent >= 0) {
                    $scope.eventToEdit = $scope.events_array[indexEvent];
                    $scope.events_array.splice(indexEvent, 1);
                    $scope.holidayBefore.id = $scope.eventToEdit.id;
                    $scope.holidayBefore.description = calEvent.title;
                    $scope.holidayBefore.holiday_date = calEvent.start.format();
                    $scope.holidayAfter = angular.copy($scope.holidayBefore);
                    $scope.$apply();
                }

                $('#edit_modal').openModal();
            }
        });

    $http.get('/holiday/all').then(function (response) {
        $scope.events_array = response.data;
        $scope.refreshEventSource();
    });

    $scope.create = function(holidayToCreate) {

        $http.post('/holiday/create', holidayToCreate).success(function(response){
            $scope.holidays.push(response);
        });

        $scope.eventToCreate.title = holidayToCreate.description;
        $scope.eventToCreate.start = holidayToCreate.holiday_date;
        $scope.events_array.push($scope.eventToCreate);

        $scope.refreshEventSource();

        $scope.holidayToCreate = {};
    };

    $scope.edit = function(holidayToEdit) {
        var holidayFound = $scope.getHoliday($scope.holidayBefore);

        console.log(holidayFound);

        $http.put('/holiday/update', holidayFound).success(function(response){
            $scope.holidays.push(response);
        });

        $scope.eventToEdit.id = $scope.holidayBefore.id;
        $scope.eventToEdit.title = holidayToEdit.description;
        $scope.eventToEdit.start = holidayToEdit.holiday_date;
        $scope.events_array.push($scope.eventToEdit);

        $scope.refreshEventSource();

        $scope.holidayBefore = {};
        $scope.holidayAfter = {};

    };

    $scope.delete = function(holidayToDelete) {

        var holidayFound = $scope.getHoliday(holidayToDelete);

        $http.delete('/holiday/delete', holidayFound);

        $scope.refreshEventSource();
    };

    /** Utils **/

    // Search for an event

    $scope.searchEvent = function(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].title === nameKey) {
                return i;
            }
        }
    };


    // Remove and return holiday of list of holidays

    $scope.getHoliday = function(element) {
        for (var i=0; i < $scope.holidays.length; i++) {
            if ($scope.holidays[i].description === element.description) {
                var found = $scope.holidays[i];
                $scope.holidays.splice(i, 1);
                return found;
            }
        }
    };


    //Refresh calendar event source to render view

    $scope.refreshEventSource = function() {
        $('#calendar').fullCalendar( 'removeEventSource', $scope.events_array );
        $('#calendar').fullCalendar('addEventSource', $scope.events_array );
    };

});