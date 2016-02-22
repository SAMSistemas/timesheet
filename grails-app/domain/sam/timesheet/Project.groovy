package sam.timesheet

class Project {

    String name
    String short_name
    Date start_date
    Boolean enabled

    static belongsTo = [client: Client]

    static hasMany = [job_logs: JobLog]

    static constraints = {
        name blank: false, nullable: false, unique: 'client', maxSize: 50
        short_name blank: false, nullable: false, unique: 'client', maxSize: 10
        start_date nullable: false
        enabled nullable: false
    }

    String toString(){
        return name
    }
}
