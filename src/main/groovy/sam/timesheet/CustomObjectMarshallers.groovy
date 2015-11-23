package sam.timesheet

/**
 * Created by jonisaa on 10/11/15.
 */
class CustomObjectMarshallers {

    List marshallers = []

    def register() {
        marshallers.each{ it.register() }
    }

}
