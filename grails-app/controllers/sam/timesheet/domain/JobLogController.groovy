package sam.timesheet.domain

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class JobLogController {

    static allowedMethods = [save: "POST", update: "PUT", able: "PUT", disable: "PUT"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond JobLog.list(params), model:[jobLogCount: JobLog.count()]
    }

    def show(JobLog jobLog) {
        respond jobLog
    }

    def create() {
        respond new JobLog(params)
    }

    @Transactional
    def save(JobLog jobLog) {
        if (jobLog == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (jobLog.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond jobLog.errors, view:'create'
            return
        }

        jobLog.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'jobLog.label', default: 'JobLog'), jobLog.id])
                redirect action:"index", method:"GET"
            }
            '*' { respond jobLog, [status: CREATED] }
        }
    }

    def edit(JobLog jobLog) {
        respond jobLog
    }

    @Transactional
    def update(JobLog jobLog) {
        if (jobLog == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (jobLog.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond jobLog.errors, view:'edit'
            return
        }

        jobLog.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'jobLog.label', default: 'JobLog'), jobLog.id])
                redirect action:"index", method:"GET"
            }
            '*'{ respond jobLog, [status: OK] }
        }
    }

    @Transactional
    def able(JobLog jobLog) {

        if (jobLog == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        jobLog.enabled = true
        jobLog.save flush: true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'jobLog.label', default: 'JobLog'), jobLog.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    @Transactional
    def disable(JobLog jobLog) {

        if (jobLog == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        jobLog.enabled = false
        jobLog.save flush: true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'jobLog.label', default: 'JobLog'), jobLog.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'jobLog.label', default: 'JobLog'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
