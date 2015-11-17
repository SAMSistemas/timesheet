import org.springframework.web.context.support.WebApplicationContextUtils
import sam.timesheet.domain.Person
import sam.timesheet.domain.WorkPosition

class BootStrap {

    def init = { servletContext ->

        def springContext = WebApplicationContextUtils.getWebApplicationContext( servletContext )
        springContext.getBean( "customObjectMarshallers" ).register()
    }

    def destroy = {
    }

}