package sam.timesheet

import grails.rest.RestfulController
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ClientController extends RestfulController {

    static responseFormats = ['json']

    ClientController() {
        super(Client)
    }

    @Override
    def index() {
        def filters = [:]

        if (params.name)
            filters.put("name", params.name)

        if (params.short_name)
            filters.put("short_name", params.short_name)

        if (params.enabled)
            filters.put("enabled", Boolean.parseBoolean(params.enabled))

        if (filters.isEmpty())
            respond Client.list()
        else
            respond Client.findAllWhere(filters)
    }

    @Override
    protected Object queryForResource(Serializable query) {
        if (query.toString().isNumber())
            Client.findById(query)
        else
            Client.findByName(query)
    }

}
