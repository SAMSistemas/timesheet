package sam.timesheet

import grails.rest.RestfulController
import java.text.ParseException
import java.text.SimpleDateFormat

class JobLogController extends RestfulController {
    static responseFormats = ['json']

    JobLogController() {
        super(JobLog)
    }

    @Override
    protected getObjectToBind() {
        def paramsJSON = request.JSON
        def params = [:]

        if (paramsJSON.date)
            params.put("date", formatDate(paramsJSON.date))

        if (paramsJSON.hours)
            params.put("hours", paramsJSON.hours)

        if (paramsJSON.observation)
            params.put("observation", paramsJSON.observation)

        if (paramsJSON.solicitude)
            params.put("solicitude", paramsJSON.solicitude)

        if (paramsJSON.project_name)
            params.put("project", Project.findByName(paramsJSON.project_name))

        if (paramsJSON.person_name)
            params.put("person", Person.findByName(paramsJSON.person_name))

        if (paramsJSON.task_type)
            params.put("task_type", TaskType.findByName(paramsJSON.task_type))

        if (paramsJSON.enabled)
            params.put("enabled", paramsJSON.enabled)

        params
    }

    def formatDate(String dateInString) {
        try {
            new SimpleDateFormat("dd-MM-yyyy", Locale.getDefault()).parse(dateInString)
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

}
