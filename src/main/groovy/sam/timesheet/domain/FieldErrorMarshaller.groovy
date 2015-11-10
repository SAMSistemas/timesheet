package sam.timesheet.domain

import grails.converters.JSON
import org.springframework.validation.FieldError

/**
 * Created by jonisaa on 10/11/15.
 */
class FieldErrorMarshaller {

    void register() {
        JSON.registerObjectMarshaller(FieldError) { FieldError error ->
            return [
                    field: error.field,
                    message: error.defaultMessage
            ]
        }
    }

}
