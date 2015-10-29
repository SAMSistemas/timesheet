$(document).ready(function() {

    var events_array = [
        {
            title: 'All Day Event',
            start: '2015-02-01'
        },
        {
            title: 'Long Event',
            start: '2015-10-07',
            end: '2015-10-10'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2015-10-09T16:00:00'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2015-02-16T16:00:00'
        },
        {
            title: 'Conference',
            start: '2015-02-11',
            end: '2015-02-13'
        },
        {
            title: 'Meeting',
            start: '2015-02-12T10:30:00',
            end: '2015-02-12T12:30:00'
        },
        {
            title: 'Lunch',
            start: '2015-02-12T12:00:00'
        },
        {
            title: 'Meeting',
            start: '2015-10-12',
            end: '2015-10-14'
        },
        {
            title: 'Happy Hour',
            start: '2015-02-12T17:30:00'
        },
        {
            title: 'Dinner',
            start: '2015-02-12T20:00:00'
        },
        {
            title: 'Birthday Party',
            start: '2015-02-13T07:00:00'
        },
        {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2015-02-28'
        }
    ];

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today', // --> mover a derecha?
            center: 'title',
            right: 'month,agendaWeek,agendaDay' // --> sacar?
        },
        defaultDate: new Date(),
        lang: 'es', // --> sacar todos los otros lenguajes
        timezone: 'America/Argentina/Buenos_Aires',
        editable: true,
        businessHours: {
            start: '09:00', // a start time (9am in this example) // --> si sacamos agendaDay, se iria?
            end: '18:00', // an end time (6pm in this example) // --> si sacamos agendaDay, se iria?

            dow: [ 1, 2, 3, 4, 5 ]  //days of week (Monday, Thursday, Wednesday, Tuesday, Friday in this example)
        },
        dayClick: function(date, event) {

            //event.editable = true;
            //
            //event.constraint = {
            //    start: '09:00', // a start time (9am in this example)
            //    end: '18:00', // an end time (6pm in this example)
            //    dow: [ 1, 2, 3, 4, 5 ]  //days of week (Monday, Thursday, Wednesday, Tuesday, Friday in this example)
            //};

            $("#create_name").val(event.title); // --> sacar cuando pongamos angular
            $('#create_date').val(date.format("dddd DD [de] MMMM [de] YYYY")); // --> sacar cuando pongamos angular
            //$('#create_date').attr('disabled','disabled');
            //$(this).attr('href', '#create_modal');
            $('#create_modal').openModal();

        },
        eventLimit: true, // allow "more" link when too many events
        //events: {
        //    url: 'http://10.0.0.67:8080/client/all',
        //    type: 'GET'
        //},
        events: events_array,
        eventColor: '#009688',
        eventClick: function(calEvent) {

            //calEvent.editable = true;

            //calEvent.constraint = {
            //    start: '09:00', // a start time (9am in this example)
            //    end: '18:00', // an end time (6pm in this example)
            //    dow: [ 1, 2, 3, 4, 5 ]  //days of week (Monday, Thursday, Wednesday, Tuesday, Friday in this example)
            //};

            $("#edit_name").val(calEvent.title); // --> sacar cuando pongamos angular
            $('#edit_date').val(calEvent.start.format("dddd DD [de] MMMM [de] YYYY")); // --> sacar cuando pongamos angular
            //$('#edit_date').attr('disabled','disabled');
            //$(this).attr('href', '#edit_modal');
            $('#edit_modal').openModal();
        }
    });

});