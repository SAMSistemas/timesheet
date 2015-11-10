package sam.timesheet.domain

import grails.converters.JSON

import grails.transaction.Transactional

@Transactional(readOnly = true)
class PersonController {

    static allowedMethods = [create: "POST", update: "PUT"]

    def index() {
        return
    }

    def all() {
        render Person.list() as JSON
    }

    def allAvailableForProject() {

        def project = Project.findByName(params.id)

        def taskType = TaskType.findByName("Asignacion")

        def jobLogForProject = JobLog.findAllByProjectAndTask_type(project, taskType)

        def people = Person.findAll()

        def results = []

        for (p in people) {
            if (!isAsignated(jobLogForProject, p)) {
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

    def isAsignated(joblogs, person) {
        for (j in joblogs) {
            if (person.name == j.person.name) {
                return true
            }
        }
        return false
    }

    def show() {

        def person = Person.findById(params.id)

        if (person == null) {

            response.status = 500

            render(contentType: "application/json") {
                error = "El cliente no existe"
            }
        }

        render person as JSON
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
//        newPerson.work_position = WorkPosition.findByDescription("desarrollador")

        if (!newPerson.validate()) {

            response.status = 500

            def fieldErrors = newPerson.errors.fieldErrors
            def fieldErrorArray = new ArrayList<Errorcito>()

            for (e in fieldErrors) {
                Errorcito err = new Errorcito()
                err.field = e.field
                err.message = e.defaultMessage
                fieldErrorArray.add(err)
            }

            render new JSON(fieldErrorArray)

            return
        }

        newPerson.save flush: true

        response.status = 200
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
        personToUpdate.enabled = paramsJSON.get("enabled")

        if (!personToUpdate.validate()) {

            response.status = 500

            def fieldErrors = personToUpdate.errors.fieldErrors
            def fieldErrorArray = new ArrayList<Errorcito>()

            for (e in fieldErrors) {
                Errorcito err = new Errorcito()
                err.field = e.field
                err.message = e.defaultMessage
                fieldErrorArray.add(err)
            }

            render fieldErrorArray as JSON
        }

        personToUpdate.save flush: true

        response.status = 200
    }

    class Errorcito {
        def field
        def message
    }

}
