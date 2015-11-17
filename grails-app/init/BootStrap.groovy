import org.springframework.web.context.support.WebApplicationContextUtils
import sam.timesheet.domain.Person
import sam.timesheet.domain.WorkPosition

class BootStrap {

    def init = { servletContext ->

        def project_manager = (new WorkPosition(description: "Project Manager")).save flush: true
        def developer = (new WorkPosition(description: "Desarrollador")).save flush: true
        def tester = (new WorkPosition(description: "Tester")).save flush: true
        def functional_analyst = (new WorkPosition(description: "Analista Funcional")).save flush: true
        def technical_leader = (new WorkPosition(description: "Lider Tecnico")).save flush: true
        def architect = (new WorkPosition(description: "Arquitecto")).save flush: true

        def person1 = (new Person(name:"admin", lastname:"Administrador", username: "admin", password: "AAAAAAAA", picture: null, work_position: project_manager, enabled: true)).save flush: true

        def springContext = WebApplicationContextUtils.getWebApplicationContext( servletContext )
        springContext.getBean( "customObjectMarshallers" ).register()
    }

    def destroy = {
    }
}