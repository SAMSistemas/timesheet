package sam.timesheet

import grails.rest.RestfulController

class TaskTypeController extends RestfulController {

    static responseFormats = ['json']

    TaskTypeController() {
        super(TaskType)
    }

    @Override
    def index() {
        def filters = [:]

        if (params.name)
            filters.put("name", params.name)

        if (params.enabled)
            filters.put("enabled", Boolean.parseBoolean(params.enabled))

        if (filters.isEmpty())
            respond TaskType.list()
        else
            respond TaskType.findAllWhere(filters)
    }

    @Override
    protected Object queryForResource(Serializable query) {
        if (query.toString().isNumber())
            TaskType.findById(query)
        else
            TaskType.findByName(query)
    }

}
