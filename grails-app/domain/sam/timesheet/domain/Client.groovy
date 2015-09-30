package sam.timesheet.domain

class Client {

    String name
    String short_name
    Boolean enabled

    static hasMany = [projects: Project]

    static constraints = {
    }
}
