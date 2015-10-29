package sam.timesheet.domain

import grails.converters.JSON

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class JobLogController {

    static allowedMethods = [asign: "POST"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond JobLog.list(params), model:[jobLogCount: JobLog.count()]
    }

    def asignation() {
        return
    }

    @Transactional
    def asign() {
        def paramsJSON = request.JSON

        def jobLog = new JobLog()
        jobLog.person = Person.findByName(paramsJSON.get("person"))
        jobLog.project = Project.findByName(paramsJSON.get("project"))
        jobLog.task_type = TaskType.findOrCreateByName("Asignacion")
        jobLog.date = new Date()
        jobLog.hours = "0"

        if (!jobLog.validate()) {

            response.status = 500

            def fieldErrors = jobLog.errors.fieldErrors
            def fieldErrorArray = new ArrayList<Errorcito>()

            for (e in fieldErrors) {
                Errorcito err = new Errorcito()
                err.field = e.field
                err.message = e.defaultMessage
                fieldErrorArray.add(err)
            }

            render fieldErrorArray as JSON
        }

        jobLog.save(flush: true)

        render status: OK
    }

    def projectForHour(){
        def paramsJSON = request.JSON

        def filters  = new FilterHsForProject();

        filters.client = Client.findByName(paramsJSON.get("clientName"))
        filters.dateFrom = paramsJSON.get("dateFrom")
        filters.dateTo = paramsJSON.get("dateTo")
        filters.project = Project.findByName(paramsJSON.get("projectName"))

        def resultData = JobLog.findAllByProjectAndDateBetween(filters.project,filters.dateFrom,filters.dateTo)

        render status: OK

    }


    class FilterHsForProject{
        def client
        def project
        def dateFrom
        def dateTo
    }

}
