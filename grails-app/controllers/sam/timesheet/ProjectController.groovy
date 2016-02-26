package sam.timesheet

import grails.rest.RestfulController
import grails.transaction.Transactional
import grails.web.http.HttpHeaders

import java.text.ParseException
import java.text.SimpleDateFormat

import static org.springframework.http.HttpStatus.CREATED

@Transactional(readOnly = true)
class ProjectController extends RestfulController {

    static allowedMethods = [save: "POST", update: "PUT", patch: "PATCH", delete: "DELETE", assign: "POST"]

    static responseFormats = ['json']

    ProjectController() {
        super(Project)
    }

    @Override
    def index() {

        if (params.username) {
            if (params.enabled)
                respond Project.findAll("from Project p where (select COUNT(*) from JobLog j where p.id = j.id AND j.task_type.name = ? AND j.person.username = ?) = 1 AND p.enabled = ?", ["Asignacion", params.username, params.enabled])
            else
                respond Project.findAll("from Project p where (select COUNT(*) from JobLog j where p.id = j.id AND j.task_type.name = ? AND j.person.username = ?) = 1", ["Asignacion", params.username])
            return
        }

        def filters = [:]

        if (params.name)
            filters.put("name", params.name)

        if (params.short_name)
            filters.put("short_name", params.short_name)

        if (params.enabled)
            filters.put("enabled", Boolean.parseBoolean(params.enabled))

        if (params.clientId) {
            def client = Client.findById(params.clientId)
            filters.put("client", client)
        }

        if (filters.isEmpty())
            respond Project.list()
        else
            respond Project.findAllWhere(filters)
    }

    @Override
    protected getObjectToBind() {
        def paramsJSON = request.JSON
        def params = [:]

        if (paramsJSON.client_name)
            params.put("client", Client.findByName(paramsJSON.client_name))

        if (paramsJSON.name)
            params.put("name", paramsJSON.name)

        if (paramsJSON.short_name)
            params.put("short_name", paramsJSON.short_name)

        if (paramsJSON.start_date)
            params.put("start_date", formatDate(paramsJSON.start_date))

        if (paramsJSON.enabled)
            params.put("enabled", paramsJSON.enabled)

        params
    }

    @Override
    protected Object queryForResource(Serializable query) {
        if (query.toString().isNumber())
            Project.findById(query)
        else
            Project.findByName(query)
    }

    def formatDate(String dateInString) {
        try {
            new SimpleDateFormat("dd-MM-yyyy", Locale.getDefault()).parse(dateInString)
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @Transactional
    def assign() {
        def jobLog = new JobLog()
        jobLog.project = Project.findById(params.id)
        jobLog.person = Person.findByName(request.JSON.person)
        jobLog.task_type = TaskType.findByName("Asignacion")
        jobLog.date = new Date()
        jobLog.hours = "0"
        jobLog.observation = ""
        jobLog.solicitude = 0

        jobLog.validate()

        if (jobLog.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond jobLog.errors, view:'create' // STATUS CODE 422
            return
        }

        saveResource jobLog

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: "${resourceName}.label".toString(), default: resourceClassName), jobLog.id])
                redirect jobLog
            }
            '*' {
                response.addHeader(HttpHeaders.LOCATION,
                        grailsLinkGenerator.link( resource: this.controllerName, action: 'show',id: jobLog.id, absolute: true,
                                namespace: hasProperty('namespace') ? this.namespace : null ))
                respond jobLog, [status: CREATED]
            }
        }
    }
}
