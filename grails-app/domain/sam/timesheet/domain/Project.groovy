package sam.timesheet.domain

class Project {

    String name
    String short_name
    Boolean enabled

    static belongsTo = [client: Client]

    static hasMany = [job_logs: JobLog]

    static constraints = {
    }
}
