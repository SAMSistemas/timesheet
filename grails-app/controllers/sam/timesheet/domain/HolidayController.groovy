package sam.timesheet.domain

import grails.converters.JSON

import java.text.ParseException
import java.text.SimpleDateFormat

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class HolidayController {

    static allowedMethods = [all: "GET", show: "GET", create: "POST", update: "PUT", delete: "DELETE"]

    def index() {}

    def all() {
        render(contentType: "application/json") {
            array {
                for (h in Holiday.list()) {
                    holiday (
                            id: h.id,
                            title: h.description,
                            start: h.holiday_date.format("yyyy-MM-dd"),
                    )
                }
            }
        }
    }

    def show() {

        def holiday = Holiday.findById(params.id)

        if (holiday == null) {

            response.status = 404

            render(contentType: "application/json") {
                error = "El feriado no existe"
            }

            return
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

            response.status = 422

            render newHoliday.errors.fieldErrors as JSON

            return
        }

        newHoliday.save flush: true

        render newHoliday as JSON

    }


    @Transactional
    def update() {

        def paramsJSON = request.JSON

        def holidayToUpdate = Holiday.findById(paramsJSON.get("id"))

        if (holidayToUpdate == null) {

            response.status = 404

            render(contentType: "application/json") {
                error = "El feriado no existe"
            }

            return
        }

        holidayToUpdate.description = paramsJSON.get("title")
        holidayToUpdate.holiday_date = formatDate(paramsJSON.get("start"))

        if (!holidayToUpdate.validate()) {

            response.status = 422

            render holidayToUpdate.errors.fieldErrors as JSON

            return
        }

        holidayToUpdate.save flush: true

        render holidayToUpdate as JSON

    }


    @Transactional
    def delete() {

        def holidayToDelete = Holiday.findById(params.id)

        if (holidayToDelete == null) {

            response.status = 500

            render(contentType: "application/json") {
                error = "El feriado no existe"
            }

            return
        }

        if (!holidayToDelete.validate()) {

            response.status = 500

            render holidayToDelete.errors.fieldErrors as JSON

            return
        }

        holidayToDelete.delete flush: true

        render OK

    }

}