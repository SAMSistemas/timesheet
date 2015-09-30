package sam.timesheet.domain

class Project {

    String name
    String short_name
    Boolean enabled

    /** Override toString method **/
    String toString(){
        return name
    }

    static belongsTo = [client: Client]

    static hasMany = [job_logs: JobLog]

    static constraints = {
        name blank: false, nullable: false, unique: 'client'
        short_name blank: false, nullable: false, unique: 'client'
    }
}
