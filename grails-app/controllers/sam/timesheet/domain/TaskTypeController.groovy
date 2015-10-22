package sam.timesheet.domain

import grails.converters.JSON
import grails.transaction.Transactional

@Transactional(readOnly = true)
class TaskTypeController {

    static allowedMethods = [create: "POST", update: "PUT"]

    def index() {
        return
    }

    def all() {
        render TaskType.list() as JSON
    }

    def show() {

        def taskType = TaskType.findById(params.id)

        if (taskType == null) {

            response.status = 500

            render(contentType: "application/json") {
                error = "El tipo de tarea no existe"
            }
        }

        render taskType as JSON
    }

    def existsName() {

        def taskType = TaskType.findByName(params.id)

        if (taskType == null) {
            render(status: 200, contentType: "application/json") {
                exists = "false"
            }
        }

        render(status: 200, contentType: "application/json") {
            exists = "true"
        }
    }

    @Transactional
    def create() {
        def paramsJSON = request.JSON

        def newTaskTypeParams = [
                name: paramsJSON.get("name"),
                enabled: paramsJSON.get("enabled")
        ]

        def newTaskType = new TaskType(newTaskTypeParams)

        if (!newTaskType.validate()) {

            response.status = 500

            def fieldErrors = newTaskType.errors.fieldErrors
            def fieldErrorArray = new ArrayList<Errorcito>()

            for (e in fieldErrors) {
                Errorcito err = new Errorcito()
                err.field = e.field
                err.message = e.defaultMessage
                fieldErrorArray.add(err)
            }

            render fieldErrorArray as JSON
        }

        newTaskType.save flush: true

        response.status = 200
    }

    @Transactional
    def update() {
        def paramsJSON = request.JSON

        def taskTypeToUpdate = TaskType.findById(paramsJSON.get("id"))

        if (taskTypeToUpdate == null) {

            response.status = 500

            render(contentType: "application/json") {
                error = "El tipo de tarea no existe"
            }
        }

        taskTypeToUpdate.name = paramsJSON.get("name")
        taskTypeToUpdate.enabled = paramsJSON.get("enabled")

        if (!taskTypeToUpdate.validate()) {

            response.status = 500

            def fieldErrors = taskTypeToUpdate.errors.fieldErrors
            def fieldErrorArray = new ArrayList<Errorcito>()

            for (e in fieldErrors) {
                Errorcito err = new Errorcito()
                err.field = e.field
                err.message = e.defaultMessage
                fieldErrorArray.add(err)
            }

            render fieldErrorArray as JSON
        }

        taskTypeToUpdate.save flush: true

        response.status = 200
    }

    class Errorcito {
        def field
        def message
    }
}
