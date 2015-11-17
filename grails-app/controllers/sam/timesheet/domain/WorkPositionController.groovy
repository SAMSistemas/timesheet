package sam.timesheet.domain

import grails.converters.JSON

class WorkPositionController {

    static allowedMethods = [all: "GET", show: "GET"]

    def index() {}

    def all() {
        render WorkPosition.list() as JSON
    }


    def show() {

        def work_position = WorkPosition.findById(params.id)

        if (work_position == null) {

            response.status = 404

            render(contentType: "application/json") {
                error = "La ocupación no existe"
            }
        }

        render work_position as JSON
    }
}
