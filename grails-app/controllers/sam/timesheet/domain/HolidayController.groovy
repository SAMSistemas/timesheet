package sam.timesheet.domain

import grails.converters.JSON

import java.text.ParseException
import java.text.SimpleDateFormat

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class HolidayController {

    static allowedMethods = [create: "POST", update: "PUT", delete: "DELETE"]

    def index() {
        return
    }

    def all() {

        def holidayViews = new ArrayList<HolidayView>()

        for(holiday in Holiday.list()) {
            def eventView = new HolidayView()
            eventView.id = holiday.id
            eventView.title = holiday.description
            eventView.start = holiday.holiday_date.format("yyyy-MM-dd")

            holidayViews.add(eventView)
        }

        render holidayViews as JSON
    }

    def show() {

        def holiday = Holiday.findById(params.id)

        if (holiday == null) {

            response.status = 500

            render(contentType: "application/json") {
                error = "El feriado no existe"
            }
        }

        render holiday as JSON
    }

    def formatDate(dateInString) {

        def formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())

        try {

            def date = formatter.parse(dateInString)
            return date

        } catch (ParseException e) {
            e.printStackTrace();
        }

    }

    @Transactional
    def create() {

        def paramsJSON = request.JSON

        def newHolidayParams = [
                description: paramsJSON.get("title"),
                holiday_date: formatDate(paramsJSON.get("start"))
        ]

        def newHoliday = new Holiday(newHolidayParams)

        if (!newHoliday.validate()) {

            response.status = 500

            def fieldErrors = newHoliday.errors.fieldErrors
            def fieldErrorArray = new ArrayList<Errorcito>()

            for (e in fieldErrors) {
                Errorcito err = new Errorcito()
                err.field = e.field
                err.message = e.defaultMessage
                fieldErrorArray.add(err)
            }

            render fieldErrorArray as JSON
        }

        newHoliday.save flush: true

        response.status = 200

        render newHoliday as JSON
    }


    @Transactional
    def update() {
        def paramsJSON = request.JSON

        def holidayToUpdate = Holiday.findById(paramsJSON.get("id"))

        if (holidayToUpdate == null) {

            response.status = 500

            render(contentType: "application/json") {
                error = "El feriado no existe"
            }
        }

        holidayToUpdate.description = paramsJSON.get("title")
        holidayToUpdate.holiday_date = formatDate(paramsJSON.get("start"))

        if (!holidayToUpdate.validate()) {

            response.status = 500

            def fieldErrors = holidayToUpdate.errors.fieldErrors
            def fieldErrorArray = new ArrayList<Errorcito>()

            for (e in fieldErrors) {
                Errorcito err = new Errorcito()
                err.field = e.field
                err.message = e.defaultMessage
                fieldErrorArray.add(err)
            }

            render fieldErrorArray as JSON
        }

        holidayToUpdate.save flush: true

        response.status = 200
    }


    @Transactional
    def delete() {

        def holidayToDelete = Holiday.findById(params.id)

        if (holidayToDelete == null) {

            response.status = 500

            render(contentType: "application/json") {
                error = "El feriado no existe"
            }
        }

        if (!holidayToDelete.validate()) {

            response.status = 500

            def fieldErrors = holidayToDelete.errors.fieldErrors
            def fieldErrorArray = new ArrayList<Errorcito>()

            for (e in fieldErrors) {
                Errorcito err = new Errorcito()
                err.field = e.field
                err.message = e.defaultMessage
                fieldErrorArray.add(err)
            }

            render fieldErrorArray as JSON
        }

        holidayToDelete.delete flush:true

        response.status = 200
    }

}

class HolidayView {
    def id
    def title
    def start
}
