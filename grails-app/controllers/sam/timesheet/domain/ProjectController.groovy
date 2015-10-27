package sam.timesheet.domain

import grails.converters.JSON
import grails.transaction.Transactional

import java.lang.reflect.Array
import java.text.ParseException
import java.text.SimpleDateFormat

@Transactional(readOnly = true)
class ProjectController {

    static allowedMethods = [create: "POST", update: "PUT"]

    def index() {
        return
    }

    def all() {

        def projectViews = new ArrayList<ProjectView>()

        for (project in Project.list()) {
            def projectToShow = new ProjectView()

            def client_found = Client.findById(project.client.id)
            projectToShow.client_name = client_found.name
            projectToShow.project_name = project.name
            projectToShow.short_name = project.short_name
            projectToShow.start_date = project.start_date
            projectToShow.enabled = project.enabled

            projectViews.add(projectToShow)
        }

        render projectViews as JSON
    }

    def allByClient() {

        def client = Client.findByName(params.id)

        def projectViews = new ArrayList<ProjectView>()

        for (project in Project.findAllWhere(client: client)) {
            def projectToShow = new ProjectView()

            projectToShow.client_name = client.name
            projectToShow.project_name = project.name
            projectToShow.short_name = project.short_name
            projectToShow.start_date = project.start_date
            projectToShow.enabled = project.enabled

            projectViews.add(projectToShow)
        }

        render projectViews as JSON
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

        def formatter = new SimpleDateFormat("dd-MM-yyyy", Locale.getDefault());

        try {

            def date = formatter.parse(dateInString);
            return date

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

            def fieldErrors = newProject.errors.fieldErrors
            def fieldErrorArray = new ArrayList<Errorcito>()

            for (e in fieldErrors) {
                Errorcito err = new Errorcito()
                err.field = e.field
                err.message = e.defaultMessage
                fieldErrorArray.add(err)
            }

            render fieldErrorArray as JSON
        }

        newProject.save flush: true

        response.status = 200
    }

    @Transactional
    def update() {
        def paramsJSON = request.JSON

        def projectToUpdate = Project.findById(paramsJSON.get("id"))

        if (projectToUpdate == null) {

            response.status = 500

            render(contentType: "application/json") {
                error = "El cliente no existe"
            }
        }

        projectToUpdate.client = Client.findByName(paramsJSON.get("client_name"))
        projectToUpdate.name = paramsJSON.get("project_name")
        projectToUpdate.short_name = paramsJSON.get("short_name")
        projectToUpdate.start_date = formatDate(paramsJSON.get("start_date"))
        projectToUpdate.enabled = paramsJSON.get("enabled")

        if (!projectToUpdate.validate()) {

            response.status = 500

            def fieldErrors = projectToUpdate.errors.fieldErrors
            def fieldErrorArray = new ArrayList<Errorcito>()

            for (e in fieldErrors) {
                Errorcito err = new Errorcito()
                err.field = e.field
                err.message = e.defaultMessage
                fieldErrorArray.add(err)
            }

            render fieldErrorArray as JSON
        }

        projectToUpdate.save flush: true

        response.status = 200
    }

}

class Errorcito {
    def field
    def message
}

class ProjectView {
    def client_name
    def project_name
    def short_name
    def start_date
    def enabled
}