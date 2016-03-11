package sam.timesheet

import grails.rest.RestfulController

class PersonController extends RestfulController {

    static responseFormats = ['json']

    PersonController() {
        super(Person)
    }

    @Override
    def index() {

        if (params.availableFor) {
            respond Person.findAll("from Person as p where (select COUNT(*) from JobLog as j where j.person.id = p.id AND j.task_type.name = ? AND j.project.name = ?) = 0 AND p.enabled = true", ["Asignacion", params.availableFor])
            return
        }

        def filters = [:]

        if (params.name)
            filters.put("name", params.name)

        if (params.lastname)
            filters.put("lastname", params.lastname)

        if (params.username)
            filters.put("username", params.username)

        if (params.enabled)
            filters.put("enabled", Boolean.parseBoolean(params.enabled))

        if (filters.isEmpty())
            respond Person.list()
        else
            respond Person.findAllWhere(filters)
    }

    @Override
    protected getObjectToBind() {
        def paramsJSON = request.JSON
        def params = [:]

        if (paramsJSON.name)
            params.put("name", paramsJSON.name)

        if (paramsJSON.lastname)
            params.put("lastname", paramsJSON.lastname)

        if (paramsJSON.username)
            params.put("username", paramsJSON.username)

        if (paramsJSON.password)
            params.put("password", paramsJSON.password)

        if (paramsJSON.work_hours)
            params.put("work_hours", paramsJSON.work_hours)

        if (paramsJSON.work_position)
            params.put("work_position", WorkPosition.findByDescription(paramsJSON.work_position))

        if (paramsJSON.enabled != null)
            params.put("enabled", paramsJSON.enabled)

        params
    }

    @Override
    protected Object queryForResource(Serializable query) {
        if (query.toString().isNumber())
            Person.findById(query)
        else
            Person.findByUsername(query)
    }
}
