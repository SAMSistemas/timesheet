package sam.timesheet.domain

import grails.converters.JSON

import grails.transaction.Transactional

@Transactional(readOnly = true)
class ClientController {

    static allowedMethods = [all: "GET", allEnabled: "GET", show: "GET", existsName: "GET", existsSName: "GET", create: "POST", update: "PUT"]

    def index() {}

    def all() {
        render Client.list() as JSON
    }

    def allEnabled() {
        render Client.findAllByEnabled(true) as JSON
    }

    def show() {

        def client = Client.findById(params.id)

        if (client == null) {

            response.status = 404

            render(contentType: "application/json") {
                error = "El cliente no existe"
            }

            return
        }

        render client as JSON

    }

    def existsName() {

        def client = Client.findByName(params.id)

        if (client == null) {
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

        def client = Client.findByShort_name(params.id)

        if (client == null) {
            render(status: 200, contentType: "application/json") {
                exists = "false"
            }

            return
        }

        render(status: 200, contentType: "application/json") {
            exists = "true"
        }
    }

    @Transactional
    def create() {

        def paramsJSON = request.JSON

        def newClientParams = [
                name: paramsJSON.get("name"),
                short_name: paramsJSON.get("short_name"),
                enabled: paramsJSON.get("enabled")
        ]

        def newClient = new Client(newClientParams)

        if (!newClient.validate()) {

            response.status = 422

            render newClient.errors.fieldErrors as JSON

            return
        }

        newClient.save flush: true

        render newClient as JSON

    }

    @Transactional
    def update() {

        def paramsJSON = request.JSON

        def clientToUpdate = Client.findById(paramsJSON.get("id"))

        if (clientToUpdate == null) {

            response.status = 404

            render(contentType: "application/json") {
                error = "El cliente no existe"
            }

            return
        }

        clientToUpdate.name = paramsJSON.get("name")
        clientToUpdate.short_name = paramsJSON.get("short_name")
        clientToUpdate.enabled = paramsJSON.get("enabled")

        if (!clientToUpdate.validate()) {

            response.status = 422

            render clientToUpdate.errors.fieldErrors as JSON

            return
        }

        clientToUpdate.save flush: true

        render clientToUpdate as JSON

    }

}
