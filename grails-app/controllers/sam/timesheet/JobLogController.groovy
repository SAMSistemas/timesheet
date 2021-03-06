package sam.timesheet

import grails.converters.JSON
import grails.transaction.Transactional

import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.text.SimpleDateFormat
import java.text.ParseException

@Transactional(readOnly = true)
class JobLogController {

    def filters

    ReportService reportService

    static allowedMethods = [all: "POST", create: "POST", assign: "POST"]

    def all() {

        def paramsJSON = request.JSON

        def person = Person.findByUsername(paramsJSON.username)

        if(!person.enabled) {
            response.status = 404

            render(contentType: "application/json") {
                code = response.status
                error = "La persona "+paramsJSON.username+" no esta habilitada"
            }

            return
        }

        def result = JobLog.findAll {
            eq('person', person)
            eq('date_month', paramsJSON.month)
            eq('date_year', paramsJSON.year)
            ne('task_type',TaskType.findByName("Asignacion"))
        }

        render result as JSON

    }

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond JobLog.list(params), model:[jobLogCount: JobLog.count()]
    }

    def assignation() {
        return
    }

    @Transactional
    def assign() {

        def paramsJSON = request.JSON

        def jobLog = new JobLog()
        jobLog.person = Person.findByName(paramsJSON.get("person"))
        jobLog.project = Project.findByName(paramsJSON.get("project"))
        jobLog.task_type = TaskType.findByName("Asignacion")
        jobLog.date = new Date()
        jobLog.hours = "0"
        jobLog.observation = ""
        jobLog.solicitude = 0

        if (!jobLog.validate()) {

            response.status = 422

            render jobLog.errors.fieldErrors as JSON

            return
        }

        jobLog.save(flush: true)

        render jobLog as JSON

    }

    @Transactional
    def create() {
        def paramsJSON = request.JSON

        def newJoblogParams = [
                date: formatDate(paramsJSON.get("date")),
                hours: paramsJSON.get("hours"),
                solicitude: paramsJSON.get("solicitude"),
                observation: paramsJSON.get("observation"),
                project: Project.findByName(paramsJSON.get("project_name")),
                person: Person.findByUsername(paramsJSON.get("username")),
                task_type: TaskType.findByName(paramsJSON.get("task_type_name"))
        ]

        def newJobLog = new JobLog(newJoblogParams)

        if (!newJobLog.validate()) {

            response.status = 422

            render newJobLog.errors.fieldErrors as JSON

            return
        }

        newJobLog.save flush: true

        render newJobLog as JSON

    }

    def projectForHour(){

        def paramsJSON = request.JSON

        if(paramsJSON!=[:]){
            filters  = new FilterHsForProject()
            def projectSelected = paramsJSON.get("projectName")
            filters.client = paramsJSON.get("clientName")
            filters.dateFrom = formatDate(paramsJSON.get("dateFrom"))
            filters.dateTo = formatDate(paramsJSON.get("dateTo"))
            filters.project = Project.findById(projectSelected.id)
        }

        ArrayList<JobLog> resultData = new ArrayList<JobLog>()
        resultData = JobLog.findAllByProjectAndDateBetweenAndHoursNotEqual(filters.project,filters.dateFrom,filters.dateTo,"0")

        if(resultData.size() != 0 ){

            FileOutputStream file = reportService.makeReport(resultData,filters)

            Path path = Paths.get("E:\\Desarrollo\\SAM_Apps\\Timesheet\\Reports\\report.pdf");
            byte[] data = Files.readAllBytes(path);

            response.setContentType("application/pdf")
            response.setHeader("Content-disposition", "attachment; filename=report.pdf")
            response.setContentLength(data.length)
            response.getOutputStream().write(data)
        }else{
            response.status = 404
        }
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

    @Transactional
    def update() {

        def paramsJSON = request.JSON

        def jobLogToUpdate = JobLog.findById(paramsJSON.get("id"))

        if (jobLogToUpdate == null) {

            response.status = 404

            render(contentType: "application/json") {
                error = "El proyecto no existe"
            }

            return
        }

        jobLogToUpdate.project = Project.findById(paramsJSON.get("id_project"))
        jobLogToUpdate.person = Person.findById(paramsJSON.get("id_person"))
        jobLogToUpdate.task_type = TaskType.findById(paramsJSON.get("id_tasktype"))
        jobLogToUpdate.hours = paramsJSON.get("hours")
        jobLogToUpdate.date = formatDate(paramsJSON.get("work_date"))
        jobLogToUpdate.solicitude = paramsJSON.get("solicitude_number")
        jobLogToUpdate.observation = paramsJSON.get("observations")

        if (!jobLogToUpdate.validate()) {

            response.status = 422

            render jobLogToUpdate.errors.fieldErrors as JSON

            return
        }

        jobLogToUpdate.save flush: true

        render jobLogToUpdate as JSON

    }


    class FilterHsForProject{
        def client
        def project
        def dateFrom
        def dateTo
    }
}
