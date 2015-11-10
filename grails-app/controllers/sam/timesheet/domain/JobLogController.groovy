package sam.timesheet.domain

import com.itextpdf.text.Document
import grails.converters.JSON
import grails.transaction.Transactional

import java.text.SimpleDateFormat
import java.text.ParseException



import static org.springframework.http.HttpStatus.OK

@Transactional(readOnly = true)
class JobLogController {

    ReportService reportService


    static allowedMethods = [asign: "POST"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond JobLog.list(params), model:[jobLogCount: JobLog.count()]
    }

    def asignation() {
        return
    }

    @Transactional
    def asign() {
        def paramsJSON = request.JSON

        def jobLog = new JobLog()
        jobLog.person = Person.findByName(paramsJSON.get("person"))
        jobLog.project = Project.findByName(paramsJSON.get("project"))
        jobLog.task_type = TaskType.findOrCreateByName("Asignacion")
        jobLog.date = new Date()
        jobLog.hours = "0"
        jobLog.observation = ""
        jobLog.solicitude = 0

        if (!jobLog.validate()) {

            response.status = 500

            render jobLog.errors.fieldErrors as JSON

            return
        }

        jobLog.save(flush: true)

        render status: OK
    }

    def projectForHour(){
        def paramsJSON = request.JSON

        def filters  = new FilterHsForProject();
        def projectSelected = paramsJSON.get("projectName")
        filters.client = Client.findByName(paramsJSON.get("clientName"))
        filters.dateFrom = formatDate(paramsJSON.get("dateFrom"))
        filters.dateTo = formatDate(paramsJSON.get("dateTo"))
        filters.project = Project.findById(projectSelected.id)

        log.info("nombre del proyecto -------------->>"+projectSelected.name)
        ArrayList<JobLog> resultData = JobLog.findAllByProject(paramsJSON.get("projectName"))

        log.info("RESULTADO -------------->>"+resultData)

        Document file = reportService.makeReport(resultData)

        render resultData as JSON

    }

    def formatDate(dateInString) {

        def formatter = new SimpleDateFormat("dd-MM-yyyy", Locale.getDefault())

        try {

            def date = formatter.parse(dateInString)
            return  date

        } catch (ParseException e) {
            e.printStackTrace();
        }

    }


    class FilterHsForProject{
        def client
        def project
        def dateFrom
        def dateTo
    }

    class JobLogReport{
        def dateR
        def taskR
        def personR
        def solicitudeR
        def obsR
        def hoursR
    }

}
