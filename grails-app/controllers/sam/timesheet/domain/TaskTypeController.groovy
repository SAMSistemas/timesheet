package sam.timesheet.domain

import grails.converters.JSON
import grails.transaction.Transactional

@Transactional(readOnly = true)
class TaskTypeController {

    static allowedMethods = [create: "POST", update: "PUT"]

    def index() {}

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

            response.status = 422

            render newTaskType.errors.fieldErrors as JSON

            return
        }

        newTaskType.save flush: true

        render newTaskType as JSON

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

            render taskTypeToUpdate.errors.fieldErrors as JSON

            return
        }

        taskTypeToUpdate.save flush: true

        render taskTypeToUpdate as JSON

    }

}
