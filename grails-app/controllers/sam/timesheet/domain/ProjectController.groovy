package sam.timesheet.domain

import grails.converters.JSON
import grails.transaction.Transactional
import java.text.ParseException
import java.text.SimpleDateFormat

@Transactional(readOnly = true)
class ProjectController {

    static allowedMethods = [create: "POST", update: "PUT"]

    def index() {
        return
    }

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

    def allByClient() {

        def client = Client.findByName(params.id)

        render(contentType: "application/json") {
            array {
                for (p in Project.findAllWhere(client: client)) {
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

        render(contentType: "application/json") {
            array {
                for (j in JobLog.findAllWhere(person: person, task_type: TaskType.findByName("Asignacion"))) {
                    def p = j.project
                    project (
                            id: p.id,
                            name: p.name,
                            short_name: p.short_name,
                            start_date: p.start_date.format("dd-MM-yyyy"),
                            enabled: p.enabled,
                            client: [
                                    id: p.client.id,
                                    name: p.client.name,
                                    short_name: p.client.short_name,
                                    enabled: p.client.enabled
                            ]
                    )
                }
            }
        }
    }

    def show() {

        def project = Project.findById(params.id)

        if (project == null) {

            response.status = 500

            render(contentType: "application/json") {
                error = "El cliente no existe"
            }
        }

        render project as JSON
    }

    def existsName() {

        def project = Project.findByName(params.id)

        if (project == null) {
            render(status: 200, contentType: "application/json") {
                exists = "false"
            }
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

            response.status = 500

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

            response.status = 500

            render(contentType: "application/json") {
                error = "El proyecto no existe"
            }
        }

        projectToUpdate.client = Client.findByName(paramsJSON.get("client_name"))
        projectToUpdate.name = paramsJSON.get("project_name")
        projectToUpdate.short_name = paramsJSON.get("short_name")
        projectToUpdate.start_date = formatDate(paramsJSON.get("start_date"))
        projectToUpdate.enabled = paramsJSON.get("enabled")

        if (!projectToUpdate.validate()) {

            response.status = 500

            render projectToUpdate.errors.fieldErrors as JSON

            return
        }

        projectToUpdate.save flush: true

        render projectToUpdate as JSON

    }

}