package sam.timesheet.domain

class Person {

    String name
    String lastname
    String username
    String password
    Byte[] picture
    Boolean enabled

    static hasMany = [job_logs: JobLog]

    static constraints = {
    }
}
