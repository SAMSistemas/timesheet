package sam.timesheet.domain

import grails.converters.JSON

import grails.transaction.Transactional

@Transactional(readOnly = true)
class PersonController {

    static allowedMethods = [create: "POST", update: "PUT"]

    def index() {}

    def all() {

        render(contentType: "application/json") {
            array {
                for (p in Person.list()) {
                    person (
                            id: p.id,
                            name: p.name,
                            lastname: p.lastname,
                            username: p.username,
                            password: p.password,
                            work_position: p.work_position.description,
                            enabled: p.enabled
                    )
                }
            }
        }
    }

    def show() {

        def person = Person.findByUsername(params.id)

        if (person == null) {

            response.status = 500

            render(contentType: "application/json") {
                error = "El cliente no existe"
            }
        }

        render(contentType: "application/json") {[
                id: person.id,
                name: person.name,
                lastname: person.lastname,
                work_position: [
                    id: person.work_position.id,
                    description: person.work_position.description,
                ],
                task_types: array {
                    for (t in TaskType_x_WorkPosition.findAllByWork_position(person.work_position)) {
                        tasktype (
                                id: t.task_type.id,
                                name: t.task_type.name,
                                enabled: t.task_type.enabled
                        )
                    }
                }
        ]}
    }

    def allAvailableForProject() {

        def project = Project.findByName(params.id)

        def taskType = TaskType.findByName("Asignacion")

        def jobLogForProject = JobLog.findAllByProjectAndTask_type(project, taskType)

        def people = Person.findAll()

        def results = []

        for (p in people) {
            if (!isAssigned(jobLogForProject, p)) {
                results.add(p)
            }
        }

        render(contentType: "application/json") {
            array {
                for (p in results) {
                    person name: p.name
                }
            }
        }
    }

    def isAssigned(joblogs, person) {
        for (j in joblogs) {
            if (person.name == j.person.name) {
                return true
            }
        }
        return false
    }

    def existsUsername() {

        def person = Person.findByUsername(params.id)

        if (person == null) {
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

        def newPersonParams = [
                name: paramsJSON.get("name"),
                lastname: paramsJSON.get("lastname"),
                username: paramsJSON.get("username"),
                password: paramsJSON.get("password"),
                work_position: WorkPosition.findByDescription(paramsJSON.get("work_position")),
                enabled: paramsJSON.get("enabled")
        ]

        def newPerson = new Person(newPersonParams)

        if (!newPerson.validate()) {

            response.status = 500

            render newPerson.errors.fieldErrors as JSON

            return
        }

        newPerson.save flush: true

        render newPerson as JSON

    }

    @Transactional
    def update() {
        def paramsJSON = request.JSON

        def personToUpdate = Person.findById(paramsJSON.get("id"))

        if (personToUpdate == null) {

            response.status = 500

            render(contentType: "application/json") {
                error = "El cliente no existe"
            }
        }

        personToUpdate.name = paramsJSON.get("name")
        personToUpdate.lastname = paramsJSON.get("lastname")
        personToUpdate.username = paramsJSON.get("username")
        personToUpdate.password = paramsJSON.get("password")
        personToUpdate.work_position = WorkPosition.findByDescription(paramsJSON.get("work_position"))
        personToUpdate.enabled = paramsJSON.get("enabled")

        if (!personToUpdate.validate()) {

            response.status = 500

            render personToUpdate.errors.fieldErrors as JSON

            return
        }

        personToUpdate.save flush: true

        render personToUpdate as JSON

    }

}
