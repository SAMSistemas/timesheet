package sam.timesheet

import grails.rest.RestfulController

import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.text.ParseException
import java.text.SimpleDateFormat

import static org.springframework.http.HttpStatus.NO_CONTENT

class JobLogController extends RestfulController {
    static responseFormats = ['json']

    ReportService reportService

    def filters

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

    def projectForHour(){

        def paramsJSON = request.JSON

        if(paramsJSON != [:]){
            filters = new FilterHsForProject()
            filters.client = Client.findByName(paramsJSON.clientName)
            filters.dateFrom = formatDate(paramsJSON.dateFrom)
            filters.dateTo = formatDate(paramsJSON.dateTo)
            filters.project = Project.findByName(paramsJSON.projectName)
        }

        ArrayList<JobLog> resultData = new ArrayList<JobLog>()

        resultData = JobLog.findAllByProjectAndDateBetweenAndHoursNotEqual(filters.project, filters.dateFrom, filters.dateTo, "0")

        if(resultData.size() != 0 ){

            FileOutputStream file = reportService.makeReport(resultData,filters)

            Path path = Paths.get("report.pdf");
            byte[] data = Files.readAllBytes(path);

            response.setContentType("application/pdf")
            response.setHeader("Content-disposition", "attachment; filename=report.pdf")
            response.setContentLength(data.length)
            response.getOutputStream().write(data)
        }else{
            response.status = 404
        }
    }

    def formatDate(String dateInString) {
        try {
            new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).parse(dateInString)
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    class FilterHsForProject{
        def client
        def project
        Date dateFrom
        Date dateTo
    }

}
