package sam.timesheet.domain

import grails.converters.JSON

import static grails.artefact.controller.RestResponder$Trait$Helper.respond
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ClientController {

    static allowedMethods = [create: "POST", update: "PUT"]

    def index() {
        return
    }

    def all() {
        def clients = Client.list()

        withFormat {
            json { render clients as JSON }
        }
    }

    def show() {
        respond Client.findById(request.JSON.get("id"))
    }

    @Transactional
    def create() {
        def paramsJSON = request.JSON

        def newClientParams = [
                name: paramsJSON.get("name"),
                short_name: paramsJSON.get("short_name"),
                enabled: paramsJSON.get("enabled")
        ]

        (new Client(newClientParams)).save flush: true

        render status: CREATED
    }

    @Transactional
    def update() {
        def paramsJSON = request.JSON

        def clientToUpdate = Client.findById(paramsJSON.get("id"))
        clientToUpdate.name = paramsJSON.get("name")
        clientToUpdate.short_name = paramsJSON.get("short_name")
        clientToUpdate.enabled = paramsJSON.get("enabled")
        clientToUpdate.save flush: true

        render status: OK
    }

}
