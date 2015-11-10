import sam.timesheet.domain.CustomObjectMarshallers
import sam.timesheet.domain.FieldErrorMarshaller

// Place your Spring DSL code here
beans = {
    localeResolver(org.springframework.web.servlet.i18n.SessionLocaleResolver) {
        defaultLocale = new Locale("es","ES")
        java.util.Locale.setDefault(defaultLocale)
    }

    customObjectMarshallers( CustomObjectMarshallers ) {
        marshallers = [
                new FieldErrorMarshaller()
        ]
    }
}
