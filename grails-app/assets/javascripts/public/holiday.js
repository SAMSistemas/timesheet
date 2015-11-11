var app = angular.module('myApp');

app.controller('holidayController', function ($scope, $http) {

        $scope.eventToCreate = {};
        $scope.eventToUpdate = {};

        $scope.events_array = [];
        $scope.new_event_source = [];

        $http.get('/holiday/all').then(function (response) {
            $scope.events_array = response.data;


        $('#calendar').fullCalendar({
            height: 500,
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
                $scope.eventToCreate.id = null;
                $scope.eventToCreate.title = event.title;
                $scope.eventToCreate.start = date.format();
                $scope.$apply();

                $('#create_modal').openModal();

            },
            eventLimit: true, // allow "more" link when too many events
            events: $scope.events_array,
            eventColor: '#009688',
            eventClick: function (calEvent) {

                var event_id = calEvent.id;
                var events = $scope.findEventById(event_id);

                $scope.eventToUpdate.id = events[0].id;
                $scope.eventToUpdate.title = events[0].title;
                $scope.eventToUpdate.start = events[0].start.format();
                $scope.$apply();

                $('#edit_modal').openModal();
            }
        });});

    $scope.create = function(holidayToCreate) {

        $http.post('/holiday/create', holidayToCreate).then(function(response){
            $scope.eventToCreate.id = response.data.id;
            $scope.addEventSource($scope.eventToCreate);
        });

    };

    $scope.update = function() {

        //Remove previous event from calendar
        $scope.removeEvent($scope.eventToUpdate);

        $http.put('/holiday/update', $scope.eventToUpdate);

        //Add new event source to calendar to render it
        $scope.addEventSource($scope.eventToUpdate);

    };

    $scope.delete = function() {

        $http.delete('/holiday/delete/'+ $scope.eventToUpdate.id);

        //Remove event from calendar
        $scope.removeEvent($scope.eventToUpdate);
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

    $scope.findEventById = function(id) {
       return $('#calendar').fullCalendar('clientEvents', function(evt) {
            return evt.id == id;
        });
    };

    //Add calendar event source to render view

    $scope.addEventSource = function(event){
        $scope.new_array = [];
        $scope.new_array.push(event);
        $('#calendar').fullCalendar( 'addEventSource', $scope.new_array );
    };


    //Remove calendar event source to render view

    $scope.removeEventSource = function(event){
        $scope.new_array = [];
        $scope.new_array.push(event);
        $('#calendar').fullCalendar( 'removeEventSource', $scope.new_array );
    };


    //Remove event from calendar
    $scope.removeEvent = function(event) {
        $('#calendar').fullCalendar( 'removeEvents', event.id);
    }

});