package sam.timesheet.domain

class Project {

    String name
    String short_name
    Date start_date
    Boolean enabled

    static belongsTo = [client: Client]

    static hasMany = [job_logs: JobLog]

    static constraints = {
        name blank: false, nullable: false, unique: 'client'
        short_name blank: false, nullable: false, unique: 'client'
    }

    String toString(){
        return name
    }
}
