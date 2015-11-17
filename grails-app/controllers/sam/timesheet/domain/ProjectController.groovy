package sam.timesheet.domain

import grails.converters.JSON
import grails.transaction.Transactional
import java.text.ParseException
import java.text.SimpleDateFormat

@Transactional(readOnly = true)
class ProjectController {

    static allowedMethods = [all: "GET", allEnabledByClient: "GET", allByUsername: "GET", show: "GET", existsName: "GET", existsSName: "GET", create: "POST", update: "PUT"]

    def index() {}

    def all() {
        render(contentType: "application/json") {
            array {
                for (p in Project.list()) {
                    project (
                            id: p.id,
                            client_name: p.client.name,
                            project_name: p.name,
                            short_name: p.short_name,
                            start_date: p.start_date.format("dd-MM-yyyy"),
                            enabled: p.enabled
                    )
                }
            }
        }
    }

    def allEnabledByClient() {

        def client = Client.findByName(params.id)

        render(contentType: "application/json") {
            array {
                for (p in Project.findAllWhere(client: client, enabled: true)) {
                    project (
                            id: p.id,
                            client_name: p.client.name,
                            project_name: p.name,
                            short_name: p.short_name,
                            start_date: p.start_date.format("dd-MM-yyyy"),
                            enabled: p.enabled
                    )
                }
            }
        }
    }

    def allByUsername() {

        def person = Person.findByUsername(params.id)

        if(!person.enabled) {

            response.status = 404

            render(contentType: "application/json") {
                code = response.status
                error = "La persona "+person.username+" no esta habilitada"
            }
        }

        render(contentType: "application/json") {
            array {
                for (j in JobLog.findAllWhere(person: person, task_type: TaskType.findByName("Asignacion"))) {
                    def p = j.project

                    if(p.enabled) {
                        project(
                                id: p.id,
                                name: p.name,
                                short_name: p.short_name,
                                start_date: p.start_date.format("dd-MM-yyyy"),
                                enabled: p.enabled,
                                client: [
                                        id        : p.client.id,
                                        name      : p.client.name,
                                        short_name: p.client.short_name,
                                        enabled   : p.client.enabled
                                ]
                        )
                    }
                }
            }
        }
    }

    def show() {

        def project = Project.findById(params.id)

        if (project == null) {

            response.status = 404

            render(contentType: "application/json") {
                error = "El cliente no existe"
            }

            return
        }

        render project as JSON

    }

    def existsName() {

        def project = Project.findByName(params.id)

        if (project == null) {
            render(status: 200, contentType: "application/json") {
                exists = "false"
            }

            return
        }

        render(status: 200, contentType: "application/json") {
            exists = "true"
        }
    }

    def existsSName() {

        def project = Project.findByShort_name(params.id)

        if (project == null) {
            render(status: 200, contentType: "application/json") {
                exists = "false"
            }

            return
        }

        render(status: 200, contentType: "application/json") {
            exists = "true"
        }
    }

    def formatDate(dateInString) {

        def formatter = new SimpleDateFormat("dd-MM-yyyy", Locale.getDefault())

        try {

            def date = formatter.parse(dateInString)
            return  date

        } catch (ParseException e) {
            e.printStackTrace();
        }

    }


    @Transactional
    def create() {

        def paramsJSON = request.JSON

        def newProjectParams = [
                client: Client.findByName(paramsJSON.get("client_name")),
                name: paramsJSON.get("project_name"),
                short_name: paramsJSON.get("short_name"),
                start_date: formatDate(paramsJSON.get("start_date")),
                enabled: paramsJSON.get("enabled")
        ]

        def newProject = new Project(newProjectParams)

        if (!newProject.validate()) {

            response.status = 422

            render newProject.errors.fieldErrors as JSON

            return
        }

        newProject.save flush: true

        render newProject as JSON

    }

    @Transactional
    def update() {

        def paramsJSON = request.JSON

        def projectToUpdate = Project.findById(paramsJSON.get("id"))

        if (projectToUpdate == null) {

            response.status = 404

            render(contentType: "application/json") {
                error = "El proyecto no existe"
            }

            return
        }

        projectToUpdate.client = Client.findByName(paramsJSON.get("client_name"))
        projectToUpdate.name = paramsJSON.get("project_name")
        projectToUpdate.short_name = paramsJSON.get("short_name")
        projectToUpdate.start_date = formatDate(paramsJSON.get("start_date"))
        projectToUpdate.enabled = paramsJSON.get("enabled")

        if (!projectToUpdate.validate()) {

            response.status = 422

            render projectToUpdate.errors.fieldErrors as JSON

            return
        }

        projectToUpdate.save flush: true

        render projectToUpdate as JSON

    }

}