package sam.timesheet.domain

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

        log.info paramsJSON

        def jobLog = new JobLog()
        jobLog.person = Person.findByName(paramsJSON.get("person"))
        jobLog.project = Project.findByName(paramsJSON.get("project"))
        jobLog.task_type = TaskType.findOrCreateByName("Asignacion")
        jobLog.date = new Date()
        jobLog.hours = "0"
        log.info jobLog.save(flush: true)

        render status: OK
    }

}
