import grails.util.Environment
import org.springframework.web.context.support.WebApplicationContextUtils
import sam.timesheet.*

import java.text.ParseException
import java.text.SimpleDateFormat

class BootStrap {

    def init = { servletContext ->

        environments {
            development {
                def desarrollador = new WorkPosition(description: "Desarrollador").save flush: true
                def lider = new WorkPosition(description: "Lider de Proyecto").save flush: true
                def project = new WorkPosition(description: "Project Manager").save flush: true

                def analisis = new TaskType(name: "Analisis", enabled: true).save flush: true
                def desarrollo = new TaskType(name: "Desarrollo", enabled: true).save flush: true
                def asignacion = new TaskType(name: "Asignacion", enabled: true).save flush: true

                new TaskType_x_WorkPosition(task_type: desarrollo, work_position: desarrollador).save flush: true
                new TaskType_x_WorkPosition(task_type: analisis, work_position: project).save flush: true
                new TaskType_x_WorkPosition(task_type: desarrollo, work_position: lider).save flush: true

                def sam = new Client(name: "Sam Sistemas", short_name: "S", enabled: true).save flush: true
                def citi = new Client(name: "CITI", short_name: "C", enabled: true).save flush: true
                def efectivoSi = new Client(name: "Efectivo Si", short_name: "E", enabled: true).save flush: true

                def timesheet = new Project(client: sam, name: "Timesheet", short_name: "TS", start_date: formatDate("2016-02-01"), enabled: true).save flush: true
                def bau1q16 = new Project(client: citi, name: "BAU1Q16", short_name: "BAU", start_date: formatDate("2016-01-01"), enabled: true).save flush: true
                def nuevoIvr = new Project(client: efectivoSi, name: "Nuevo IVR", short_name: "NIVR", start_date: formatDate("2016-02-10"), enabled: true).save flush: true

                def santi = new Person(name: "Santiago", lastname: "Perez Torre", username: "spereztorre", password: "AAAAAAAA", work_hours: "6", work_position: project, enabled: true).save flush: true
                def fede = new Person(name: "Federico", lastname: "Catinello", username: "fcatinello", password: "AAAAAAAA", work_hours: "6", work_position: desarrollador, enabled: true).save flush: true
                def joni = new Person(name: "Jonatan", lastname: "Salas", username: "jsalas", password: "AAAAAAAA", work_hours: "6", work_position: lider, enabled: true).save flush: true

                new Holiday(title: "Carnaval", date: formatDate("2016-02-08")).save flush: true
                new Holiday(title: "Navidad", date: formatDate("2016-12-25")).save flush: true
                new Holiday(title: "Año Nuevo", date: formatDate("2016-01-01")).save flush: true

                new JobLog(date: formatDate("2016-02-10"), hours: 6, solicitude: "10000", observation: "Bla", project: timesheet, task_type: asignacion, person: santi).save flush: true
                new JobLog(date: formatDate("2016-02-10"), hours: 6, solicitude: "10000", observation: "Bla", project: timesheet, task_type: asignacion, person: fede).save flush: true
                new JobLog(date: formatDate("2016-02-10"), hours: 6, solicitude: "10000", observation: "Bla", project: timesheet, task_type: asignacion, person: joni).save flush: true
            }
        }

        def springContext = WebApplicationContextUtils.getWebApplicationContext( servletContext )
        springContext.getBean( "customObjectMarshallers" ).register()
    }

    def destroy = {
    }

    def formatDate(String dateInString) {
        try {
            new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).parse(dateInString)
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

}