package sam.timesheet.domain

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class TaskTypeController {

    static allowedMethods = [save: "POST", update: "PUT", able: "PUT", disable: "PUT"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond TaskType.list(params), model:[taskTypeCount: TaskType.count()]
    }

    def show(TaskType taskType) {
        respond taskType
    }

    def create() {
        respond new TaskType(params)
    }

    @Transactional
    def save(TaskType taskType) {
        if (taskType == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (taskType.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond taskType.errors, view:'create'
            return
        }

        taskType.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'taskType.label', default: 'TaskType'), taskType.id])
                redirect action:"index", method:"GET"
            }
            '*' { respond taskType, [status: CREATED] }
        }
    }

    def edit(TaskType taskType) {
        respond taskType
    }

    @Transactional
    def update(TaskType taskType) {
        if (taskType == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (taskType.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond taskType.errors, view:'edit'
            return
        }

        taskType.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'taskType.label', default: 'TaskType'), taskType.id])
                redirect action:"index", method:"GET"
            }
            '*'{ respond taskType, [status: OK] }
        }
    }

    @Transactional
    def able(TaskType taskType) {

        if (taskType == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        taskType.enabled = true
        taskType.save flush: true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'taskType.label', default: 'TaskType'), taskType.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    @Transactional
    def disable(TaskType taskType) {

        if (taskType == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        taskType.enabled = false
        taskType.save flush: true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'taskType.label', default: 'TaskType'), taskType.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'taskType.label', default: 'TaskType'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
