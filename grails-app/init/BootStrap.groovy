import org.springframework.web.context.support.WebApplicationContextUtils
import sam.timesheet.domain.Person
import sam.timesheet.domain.WorkPosition

class BootStrap {

    def init = { servletContext ->
        def project_manager = (new WorkPosition(description: "project manager")).save flush: true
        def person1 = (new Person(name:"admin", lastname:"Administrador", username: "admin", password: "AAAAAAAA", picture: null, work_position: project_manager, enabled: true)).save flush: true

        def springContext = WebApplicationContextUtils.getWebApplicationContext( servletContext )
        springContext.getBean( "customObjectMarshallers" ).register()
    }

    def destroy = {
    }
}