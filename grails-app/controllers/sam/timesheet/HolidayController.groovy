package sam.timesheet

import grails.rest.RestfulController

import java.text.ParseException
import java.text.SimpleDateFormat

class HolidayController extends RestfulController {

    static responseFormats = ['json']

    HolidayController() {
        super(Holiday)
    }

    @Override
    def index() {
        def filters = [:]

        if (params.title)
            filters.put("title", params.title)

        if (filters.isEmpty())
            respond Holiday.list()
        else
            respond Holiday.findAllWhere(filters)
    }

    @Override
    protected getObjectToBind() {
        def paramsJSON = request.JSON
        def params = [:]

        if (paramsJSON.title)
            params.put("title", paramsJSON.title)

        if (paramsJSON.date)
            params.put("date", formatDate(paramsJSON.date))

        params
    }

    @Override
    protected Object queryForResource(Serializable query) {
        if (query.toString().isNumber())
            Holiday.findById(query)
        else
            Holiday.findByName(query)
    }

    def formatDate(String dateInString) {
        try {
            new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).parse(dateInString)
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

}
