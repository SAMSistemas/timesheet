var app = angular.module('myApp');

app.controller('holidayController', function ($scope, $http) {

        $scope.eventToCreate = {};
        $scope.eventToUpdate = {};

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
                $scope.$apply();

                $('#create_modal').openModal();

            },
            eventLimit: true, // allow "more" link when too many events
            events: $scope.events_array,
            eventColor: '#009688',
            eventClick: function (calEvent) {

                var indexEvent = $scope.searchEvent(calEvent.title, $scope.events_array);

                if(indexEvent >= 0) {
                    $scope.eventToUpdate = $scope.events_array[indexEvent];
                    $scope.events_array.splice(indexEvent, 1);
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
            holidayToCreate.id = response.id;
            $scope.events_array.push(holidayToCreate);
        });

        console.log($scope.events_array);

        $scope.refreshEventSource();

    };

    $scope.update = function() {

        $http.put('/holiday/update', $scope.eventToUpdate);

        $scope.events_array.push($scope.eventToUpdate);

        console.log($scope.events_array);

        $scope.refreshEventSource();

    };

    $scope.delete = function() {

        console.log($scope.eventToUpdate);

        $http.delete('/holiday/delete/' + $scope.eventToUpdate.id);

        console.log($scope.events_array);

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


    //Refresh calendar event source to render view

    $scope.refreshEventSource = function() {
        $('#calendar').fullCalendar( 'removeEventSource', $scope.events_array );
        $('#calendar').fullCalendar('addEventSource', $scope.events_array );
    };

});