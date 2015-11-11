import org.springframework.web.context.support.WebApplicationContextUtils
import sam.timesheet.domain.Client
import sam.timesheet.domain.Holiday
import sam.timesheet.domain.Person
import sam.timesheet.domain.Project
import sam.timesheet.domain.JobLog
import sam.timesheet.domain.TaskType
import sam.timesheet.domain.WorkPosition

class BootStrap {

    def init = { servletContext ->
        def client1 = (new Client(name:"Santiago", short_name:"S", enabled: true)).save flush: true
        def client2 = (new Client(name:"Federico", short_name:"F", enabled: true)).save flush: true
        def client3 = (new Client(name:"Jonatan", short_name:"J", enabled: false)).save flush: true
        def desarrollador = (new WorkPosition(description: "desarrollador")).save flush: true
        def project_manager = (new WorkPosition(description: "project manager")).save flush: true
        def person1 = (new Person(name:"Santiago", lastname:"Perez Torre", username: "spereztorre", password: "AAAAAAAA", picture: null, work_position: desarrollador, enabled: true)).save flush: true
        def person2 = (new Person(name:"Federico", lastname:"Catinello", username: "fcatinello", password: "BBBBBBBB", picture: null, work_position: desarrollador,  enabled: true)).save flush: true
        def person3 = (new Person(name:"Jonatan", lastname:"Salas", username: "jsalas", password: "CCCCCCCC", picture: null, work_position: desarrollador,  enabled: false)).save flush: true
        def person4 = (new Person(name:"Silvana", lastname:"Rojo", username: "srojo", password: "SSSSSSSS", picture: null, work_position: project_manager,  enabled: false)).save flush: true
        def project1 = (new Project(name:"Chat", client: client1, short_name: "C", enabled: true, start_date: new Date())).save flush: true
        def asignacion = (new TaskType(name: "Asignacion", enabled: true)).save flush: true
        (new JobLog(person: person1, project: project1, task_type: asignacion, hours: "3", solicitude: 168720,observation: "Corregir anchos de columnas de reporte, poner encabezado y pie.  ",date: new Date())).save flush: true
        (new JobLog(person: person2, project: project1, task_type: asignacion, hours: "3", solicitude: 213485,observation: "Agregar ROL en el ABM de persona (en listado de personas)     ",date: new Date())).save flush: true
        (new Holiday(description: "El dia de hoy" , holiday_date: new Date())).save flush: true

        def springContext = WebApplicationContextUtils.getWebApplicationContext( servletContext )
        springContext.getBean( "customObjectMarshallers" ).register()
    }

    def destroy = {
    }
}