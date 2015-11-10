package sam.timesheet.domain

import com.itextpdf.text.Document
import grails.converters.JSON
import grails.transaction.Transactional
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity

import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.text.SimpleDateFormat
import java.text.ParseException



import static org.springframework.http.HttpStatus.OK

@Transactional(readOnly = true)
class JobLogController {

    def filters

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

        if(paramsJSON!=[:]){
            filters  = new FilterHsForProject()
            def projectSelected = paramsJSON.get("projectName")
            filters.client = paramsJSON.get("clientName")
            filters.dateFrom = formatDate(paramsJSON.get("dateFrom"))
            filters.dateTo = formatDate(paramsJSON.get("dateTo"))
            filters.project = Project.findById(projectSelected.id)
            log.info("PARAMETROS DE LOS FILTROS ----------------->"+paramsJSON)
        }

        ArrayList<JobLog> resultData = new ArrayList<JobLog>()
        resultData = JobLog.findAllByProjectAndDateBetween(filters.project,filters.dateFrom,filters.dateTo)

//        def project1 = [
//                client: Client.findByName("Toyoya"),
//                name: "AutoMaker",
//                short_name: "AM",
//                start_date: new Date(),
//                enabled: true
//        ]
//        def proj1 = new Project(project1)
//
//        def person1 = [
//                 name:"Fede",
//                 lastname:"Catinello",
//                 username:"fcati",
//                 password:"123456",
//                 picture:null,
//                 enabled:true
//        ]
//
//        def person2 = [
//                name:"Joni",
//                lastname:"Salas",
//                username:"jsalas",
//                password:"123456",
//                picture:null,
//                enabled:true
//        ]
//
//        def person3 = [
//                name:"Santi",
//                lastname:"Perez Torres",
//                username:"fcati",
//                password:"123456",
//                picture:null,
//                enabled:true
//        ]
//        def per1 = new Person(person1)
//        def per2 = new Person(person2)
//        def per3 = new Person(person3)
//
//        def taskType = [name: "Programacion", enabled: true]
//        def task1 = new TaskType(taskType)
//
//
//        def jLog1 =    [project: proj1,person: per1,task_type:task1,date: new Date(), hours: "2", solicitude: "132456", observation: "TESSTT"]
//        def jLog2 =    [project: proj1,person: per2,task_type:task1,date: new Date(), hours: "7", solicitude: "456", observation: "TESSTT"]
//        def jLog3 =    [project: proj1,person: per3,task_type:task1,date: new Date(), hours: "6", solicitude: "78946", observation: "TESSTT"]
//        def jLog4 =    [project: proj1,person: per2,task_type:task1,date: new Date(), hours: "2.5", solicitude: "3664", observation: "TESSTT"]
//        def jLog5 =    [project: proj1,person: per1,task_type:task1,date: new Date(), hours: "5", solicitude: "16687", observation: "TESSTT"]
//
//        def jobLog1 = new JobLog(jLog1)
//        def jobLog2 = new JobLog(jLog2)
//        def jobLog3 = new JobLog(jLog3)
//        def jobLog4 = new JobLog(jLog4)
//        def jobLog5 = new JobLog(jLog5)
//        resultData.add(jobLog1)
//        resultData.add(jobLog2)
//        resultData.add(jobLog3)
//        resultData.add(jobLog4)
//        resultData.add(jobLog5)


        FileOutputStream file = reportService.makeReport(resultData,filters)

        Path path = Paths.get("C:/tmp/report.pdf");
        byte[] data = Files.readAllBytes(path);


        response.setContentType("application/pdf")
        response.setHeader("Content-disposition", "attachment; filename=report.pdf")
        response.setContentLength(data.length)
        response.getOutputStream().write(data)
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
