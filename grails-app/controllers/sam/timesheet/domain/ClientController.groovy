package sam.timesheet.domain

import grails.converters.JSON

import grails.transaction.Transactional

@Transactional(readOnly = true)
class ClientController {

    static allowedMethods = [create: "POST", update: "PUT"]

    def index() {
        return
    }

    def all() {
        render Client.list() as JSON
    }

    def show() {

        def client = Client.findById(params.id)

        if (client == null) {

            response.status = 500

            render(contentType: "application/json") {
                error = "El cliente no existe"
            }
        }

        render client as JSON
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

            response.status = 500

            def fieldErrors = newClient.errors.fieldErrors
            def fieldErrorArray = new ArrayList<Errorcito>()

            for (e in fieldErrors) {
                Errorcito err = new Errorcito()
                err.field = e.field
                err.message = e.defaultMessage
                fieldErrorArray.add(err)
            }

            render fieldErrorArray as JSON
        }

        newClient.save flush: true

        response.status = 200
    }

    @Transactional
    def update() {
        def paramsJSON = request.JSON

        def clientToUpdate = Client.findById(paramsJSON.get("id"))

        if (clientToUpdate == null) {

            response.status = 500

            render(contentType: "application/json") {
                error = "El cliente no existe"
            }
        }

        clientToUpdate.name = paramsJSON.get("name")
        clientToUpdate.short_name = paramsJSON.get("short_name")
        clientToUpdate.enabled = paramsJSON.get("enabled")

        if (!clientToUpdate.validate()) {

            response.status = 500

            def fieldErrors = newClient.errors.fieldErrors
            def fieldErrorArray = new ArrayList<Errorcito>()

            for (e in fieldErrors) {
                Errorcito err = new Errorcito()
                err.field = e.field
                err.message = e.defaultMessage
                fieldErrorArray.add(err)
            }

            render fieldErrorArray as JSON
        }

        clientToUpdate.save flush: true

        response.status = 200
    }

    class Errorcito {
        def field
        def message
    }

}
