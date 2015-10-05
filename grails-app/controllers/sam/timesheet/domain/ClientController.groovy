package sam.timesheet.domain

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ClientController {

    static allowedMethods = [save: "POST", update: "PUT", able: "PUT", disable: "PUT"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Client.list(params), model:[clientCount: Client.count()]
    }

    def show(Client client) {
        respond client
    }

    def create() {
        respond new Client(params)
    }

    @Transactional
    def save(Client client) {
        if (client == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (client.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond client.errors, view:'create'
            return
        }

        client.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'client.label', default: 'Client'), client.id])
                redirect action:"index", method:"GET"
            }
            '*' { respond client, [status: CREATED] }
        }
    }

    def edit(Client client) {
        respond client
    }

    @Transactional
    def update(Client client) {
        if (client == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (client.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond client.errors, view:'edit'
            return
        }

        client.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'client.label', default: 'Client'), client.id])
                redirect action:"index", method:"GET"
            }
            '*'{ respond client, [status: OK] }
        }
    }

    @Transactional
    def able(Client client) {

        if (client == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        client.enabled = true
        client.save flush: true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'client.label', default: 'Client'), client.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    @Transactional
    def disable(Client client) {

        if (client == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        client.enabled = false
        client.save flush: true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'client.label', default: 'Client'), client.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'client.label', default: 'Client'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
